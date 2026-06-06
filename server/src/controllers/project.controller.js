import Project from '../models/Project.js';
import { ApiError } from '../utils/ApiError.js';
import { asyncHandler } from '../utils/asyncHandler.js';

import { buildProjectSlug } from '../services/project.service.js';

import {
  uploadCloudinaryFiles,
  deleteAsset,
} from '../services/cloudinary.service.js';

// HELPERS

function parseArrayField(value) {
  if (!value) return [];

  if (Array.isArray(value)) {
    return value
      .map((item) =>
        item.toString().trim()
      )
      .filter(Boolean);
  }

  return value
    .toString()
    .split(',')
    .map((item) => item.trim())
    .filter(Boolean);
}

function normalizeProjectPayload(body) {

  const payload = {
    title: body.title
      ?.toString()
      .trim(),

    shortDescription:
      body.shortDescription
        ?.toString()
        .trim() ||
      body.description
        ?.toString()
        .trim() ||
      '',

    fullDescription:
      body.fullDescription
        ?.toString()
        .trim() ||
      body.details
        ?.toString()
        .trim() ||
      '',

    category:
      body.category
        ?.toString()
        .trim() ||
      'Portfolio',

    hashtags: parseArrayField(
      body.hashtags || body.tags
    ),

    tags: parseArrayField(
      body.tags || body.hashtags
    ),

    featured:
      body.featured === 'true' ||
      body.featured === true,

    status:
      body.status
        ?.toString()
        .trim() || 'published',

    caseStudy:
      body.caseStudy
        ?.toString()
        .trim() || '',

    createdBy:
      body.createdBy
        ?.toString()
        .trim(),

    order:
      Number(body.order) || 0,
  };

  payload.slug = body.slug
    ? body.slug
      .toString()
      .trim()
      .toLowerCase()
    : buildProjectSlug(
      payload.title || 'project'
    );

  payload.description =
    payload.shortDescription;

  return payload;
}

// CLEANUP

async function cleanupProjectAssets(
  project
) {

  if (!project) return;

  if (project.thumbnail?.publicId) {
    await deleteAsset(
      project.thumbnail.publicId,
      'image'
    );
  }

  if (Array.isArray(project.images)) {

    await Promise.all(
      project.images.map((image) =>
        image.publicId
          ? deleteAsset(
            image.publicId,
            'image'
          )
          : null
      )
    );
  }
}

// GET ALL PROJECTS

export const getProjects =
  asyncHandler(async (req, res) => {

    const page = Math.max(
      1,
      Number(req.query.page) || 1
    );

    const limit = Math.min(
      50,
      Number(req.query.limit) || 6
    );

    const search =
      req.query.search
        ?.toString()
        .trim();

    const category =
      req.query.category
        ?.toString()
        .trim();

    const sort =
      req.query.sort
        ?.toString()
        .trim();

    const slug =
      req.query.slug
        ?.toString()
        .trim();

    const filter = {};

    if (category)
      filter.category = category;

    if (slug)
      filter.slug = slug;

    if (search) {
      filter.$text = {
        $search: search,
      };
    }

    if (
      !req.user ||
      req.user.role !== 'admin'
    ) {
      filter.status = 'published';
    }

    const sortOptions = {
      featured: -1,
      createdAt: -1,
    };

    if (sort === 'views')
      sortOptions.views = -1;

    if (sort === 'latest')
      sortOptions.createdAt = -1;

    if (sort === 'oldest')
      sortOptions.createdAt = 1;

    const totalCount =
      await Project.countDocuments(
        filter
      );

    const projects =
      await Project.find(filter)
        .sort(sortOptions)
        .skip((page - 1) * limit)
        .limit(limit)
        .lean();

    const totalPages = Math.ceil(
      totalCount / limit
    );

    res.status(200).json({
      status: 'success',
      data: {
        projects,
        pagination: {
          currentPage: page,
          totalPages,
          totalCount,
        },
      },
    });
  });

// ✅ GET PROJECT BY ID

export const getProjectById =
  asyncHandler(
    async (req, res, next) => {

      const project =
        await Project.findById(
          req.params.id
        ).lean();

      if (!project) {
        return next(
          new ApiError(
            404,
            'Project not found'
          )
        );
      }

      res.status(200).json({
        status: 'success',
        data: project,
      });
    }
  );

// GET PROJECT BY SLUG

export const getProjectBySlug =
  asyncHandler(
    async (req, res, next) => {

      const project =
        await Project.findOneAndUpdate(
          {
            slug: req.params.slug,
            status: 'published',
          },
          {
            $inc: { views: 1 },
          },
          {
            new: true,
          }
        ).lean();

      if (!project) {
        return next(
          new ApiError(
            404,
            'Project not found'
          )
        );
      }

      const relatedProjects =
        await Project.find({
          category: project.category,
          _id: {
            $ne: project._id,
          },
          status: 'published',
        })
          .sort({
            featured: -1,
            createdAt: -1,
          })
          .limit(200)
          .lean();

      res.status(200).json({
        status: 'success',
        data: {
          project,
          relatedProjects,
        },
      });
    }
  );

// CREATE PROJECT

export const createProject =
  asyncHandler(
    async (req, res, next) => {

      const payload =
        normalizeProjectPayload(
          req.body
        );

      payload.createdBy =
        req.user?.email ||
        req.user?.name ||
        'admin';

      if (
        !req.files ||
        !req.files.thumbnail ||
        !req.files.thumbnail[0]
      ) {
        return next(
          new ApiError(
            400,
            'Thumbnail image is required'
          )
        );
      }

      try {

        const [thumbnail] =
          await uploadCloudinaryFiles(
            req.files.thumbnail
          );

        payload.thumbnail =
          thumbnail;

      } catch (error) {

        return next(
          new ApiError(
            500,
            'Failed to upload thumbnail'
          )
        );
      }

      if (
        req.files.images &&
        req.files.images.length > 0
      ) {

        payload.images =
          await uploadCloudinaryFiles(
            req.files.images
          );
      }

      const project =
        await Project.create(
          payload
        );

      res.status(201).json({
        status: 'success',
        data: project,
      });
    }
  );

// UPDATE PROJECT

export const updateProject =
  asyncHandler(
    async (req, res, next) => {

      const { id } = req.params;

      const payload =
        normalizeProjectPayload(
          req.body
        );

      const project =
        await Project.findById(id);

      if (!project) {
        return next(
          new ApiError(
            404,
            'Project not found'
          )
        );
      }

      if (
        req.files?.thumbnail?.[0]
      ) {

        if (
          project.thumbnail?.publicId
        ) {
          await deleteAsset(
            project.thumbnail.publicId,
            'image'
          );
        }

        const [thumbnail] =
          await uploadCloudinaryFiles(
            req.files.thumbnail
          );

        payload.thumbnail =
          thumbnail;
      }

      if (
        req.files?.images?.length
      ) {

        if (
          project.images?.length
        ) {

          await Promise.all(
            project.images.map(
              (image) =>
                image.publicId
                  ? deleteAsset(
                    image.publicId,
                    'image'
                  )
                  : null
            )
          );
        }

        payload.images =
          await uploadCloudinaryFiles(
            req.files.images
          );
      }

      const updatedProject =
        await Project.findByIdAndUpdate(
          id,
          payload,
          {
            new: true,
            runValidators: true,
          }
        );

      res.status(200).json({
        status: 'success',
        data: updatedProject,
      });
    }
  );

// DELETE PROJECT

export const deleteProject =
  asyncHandler(
    async (req, res, next) => {

      const { id } = req.params;

      const project =
        await Project.findById(id);

      if (!project) {
        return next(
          new ApiError(
            404,
            'Project not found'
          )
        );
      }

      await cleanupProjectAssets(
        project
      );

      await project.deleteOne();

      res.status(200).json({
        status: 'success',
        message:
          'Project deleted',
      });
    }
  );