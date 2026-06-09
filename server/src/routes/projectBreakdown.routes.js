import express from 'express';

import {
  createProjectBreakdown,
  getProjectBreakdown,
  updateProjectBreakdown,
  deleteProjectBreakdown,
} from '../controllers/projectBreakdown.controller.js';

import { authenticate } from '../middleware/auth.middleware.js';
import { requireAdmin } from '../middleware/admin.middleware.js';

const router = express.Router();

router.get('/', getProjectBreakdown);
router.post('/', authenticate, requireAdmin, createProjectBreakdown);
router.put('/:id', authenticate, requireAdmin, updateProjectBreakdown);
router.delete('/:id', authenticate, requireAdmin, deleteProjectBreakdown);

export default router;