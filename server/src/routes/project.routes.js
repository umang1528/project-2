import express from 'express';
import {
  getProjects,
  getProjectBySlug,
  createProject,
  updateProject,
  deleteProject,
} from '../controllers/project.controller.js';
import { authenticate } from '../middleware/auth.middleware.js';
import { requireAdmin } from '../middleware/admin.middleware.js';
import { projectUploads } from '../middleware/upload.middleware.js';

const router = express.Router();

router.get('/', getProjects);
router.get('/:slug', getProjectBySlug);
router.post('/', authenticate, requireAdmin, projectUploads, createProject);
router.put('/:id', authenticate, requireAdmin, projectUploads, updateProject);
router.delete('/:id', authenticate, requireAdmin, deleteProject);

export default router;
