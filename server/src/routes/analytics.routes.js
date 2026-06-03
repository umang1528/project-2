import express from 'express';
import { trackAnalytics, getDashboardAnalytics } from '../controllers/analytics.controller.js';
import { authenticate } from '../middleware/auth.middleware.js';
import { requireAdmin } from '../middleware/admin.middleware.js';

const router = express.Router();

router.post('/track', trackAnalytics);
router.get('/dashboard', authenticate, requireAdmin, getDashboardAnalytics);

export default router;
