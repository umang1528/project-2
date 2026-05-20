import express from 'express';

import {
  getProjects,
  getProjectBySlug,
  getProjectById,
  createProject,
  updateProject,
  deleteProject,
} from '../controllers/project.controller.js';

import { authenticate } from '../middleware/auth.middleware.js';

import { requireAdmin } from '../middleware/admin.middleware.js';

import { projectUploads } from '../middleware/upload.middleware.js';

const router = express.Router();

// GET ALL
router.get('/', getProjects);

// ✅ GET BY ID
router.get('/id/:id', getProjectById);

// GET BY SLUG
router.get('/:slug', getProjectBySlug);

// CREATE
router.post(
  '/',
  authenticate,
  requireAdmin,
  projectUploads,
  createProject
);

// UPDATE
router.put(
  '/:id',
  authenticate,
  requireAdmin,
  projectUploads,
  updateProject
);

// DELETE
router.delete(
  '/:id',
  authenticate,
  requireAdmin,
  deleteProject
);

export default router;