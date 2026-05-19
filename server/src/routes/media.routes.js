import express from 'express';
import { uploadMedia, deleteMedia } from '../controllers/media.controller.js';
import { authenticate } from '../middleware/auth.middleware.js';
import { requireAdmin } from '../middleware/admin.middleware.js';
import { mediaUpload } from '../middleware/upload.middleware.js';

const router = express.Router();

router.post('/upload', authenticate, requireAdmin, mediaUpload.single('file'), uploadMedia);
router.delete('/:id', authenticate, requireAdmin, deleteMedia);

export default router;
