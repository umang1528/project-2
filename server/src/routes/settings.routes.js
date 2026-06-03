import express from 'express';
import { getSettings, updateSettings } from '../controllers/settings.controller.js';
import { authenticate } from '../middleware/auth.middleware.js';
import { requireAdmin } from '../middleware/admin.middleware.js';

const router = express.Router();

router.get('/', getSettings);
router.put('/', authenticate, requireAdmin, updateSettings);

export default router;
