import Media from '../models/Media.js';
import { ApiError } from '../utils/ApiError.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { uploadBuffer, deleteAsset } from '../services/cloudinary.service.js';

export const uploadMedia = asyncHandler(async (req, res, next) => {
  const file = req.file;
  if (!file) {
    return next(new ApiError(400, 'No file uploaded')); 
  }

  const uploadResult = await uploadBuffer(file.buffer, {
    folder: 'portfolio/media',
    resource_type: 'auto',
  });

  const media = await Media.create({
    title: req.body.title || file.originalname,
    type: file.mimetype.startsWith('video') ? 'video' : 'image',
    url: uploadResult.secure_url,
    publicId: uploadResult.public_id,
    resourceType: uploadResult.resource_type,
    folder: uploadResult.folder || 'portfolio/media',
    uploadedBy: req.user?._id,
    metadata: {
      bytes: uploadResult.bytes,
      width: uploadResult.width,
      height: uploadResult.height,
    },
  });

  res.status(201).json({ status: 'success', data: media });
});

export const deleteMedia = asyncHandler(async (req, res, next) => {
  const media = await Media.findById(req.params.id);
  if (!media) {
    return next(new ApiError(404, 'Media asset not found'));
  }

  await deleteAsset(media.publicId, media.resourceType);
  await media.deleteOne();

  res.status(200).json({ status: 'success', message: 'Media asset removed' });
});
