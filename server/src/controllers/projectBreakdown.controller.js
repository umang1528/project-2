import ProjectBreakdown from '../models/projectBreakdown.model.js';
import { ApiError } from '../utils/ApiError.js';
import { asyncHandler } from '../utils/asyncHandler.js';

function parseBoolean(value, fallback = true) {
  if (value === undefined || value === null || value === '') {
    return fallback;
  }

  if (typeof value === 'boolean') {
    return value;
  }

  return value.toString().toLowerCase() === 'true';
}

function normalizeOrder(value, fallback = 0) {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : fallback;
}

export const createProjectBreakdown = asyncHandler(async (req, res, next) => {
  const title = req.body.title?.toString().trim();
  const image = req.body.image?.toString().trim();

  if (!title || !image) {
    return next(new ApiError(400, 'Title and image are required'));
  }

  const breakdownItem = await ProjectBreakdown.create({
    title,
    image,
    order: normalizeOrder(req.body.order),
    isActive: parseBoolean(req.body.isActive, true),
  });

  res.status(201).json({ status: 'success', data: breakdownItem });
});

export const getProjectBreakdown = asyncHandler(async (req, res) => {
  const includeAll = req.query.all === 'true' || req.query.all === '1';

  const filter = includeAll ? {} : { isActive: true };

  const items = await ProjectBreakdown.find(filter)
    .sort({ order: 1, createdAt: 1 })
    .lean();

  res.status(200).json({ status: 'success', data: items });
});

export const updateProjectBreakdown = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const item = await ProjectBreakdown.findById(id);

  if (!item) {
    return next(new ApiError(404, 'Project breakdown item not found'));
  }

  const title = req.body.title?.toString().trim();
  const image = req.body.image?.toString().trim();

  if (title !== undefined) {
    item.title = title;
  }

  if (image !== undefined) {
    item.image = image;
  }

  if (req.body.order !== undefined) {
    item.order = normalizeOrder(req.body.order, item.order);
  }

  if (req.body.isActive !== undefined) {
    item.isActive = parseBoolean(req.body.isActive, item.isActive);
  }

  await item.save();

  res.status(200).json({ status: 'success', data: item });
});

export const deleteProjectBreakdown = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const item = await ProjectBreakdown.findById(id);

  if (!item) {
    return next(new ApiError(404, 'Project breakdown item not found'));
  }

  await item.deleteOne();

  res.status(200).json({
    status: 'success',
    message: 'Project breakdown item deleted',
  });
});