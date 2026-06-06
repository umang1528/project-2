import express from 'express';
import {
  createHomeCarousel,
  getHomeCarousel,
  updateHomeCarousel,
  deleteHomeCarousel,
} from '../controllers/homeCarousel.controller.js';
import { authenticate } from '../middleware/auth.middleware.js';
import { requireAdmin } from '../middleware/admin.middleware.js';

const router = express.Router();

router.get('/', getHomeCarousel);
router.post('/', authenticate, requireAdmin, createHomeCarousel);
router.put('/:id', authenticate, requireAdmin, updateHomeCarousel);
router.delete('/:id', authenticate, requireAdmin, deleteHomeCarousel);

export default router;
