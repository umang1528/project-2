import Theme from '../models/Theme.js';
import { ApiError } from '../utils/ApiError.js';
import { asyncHandler } from '../utils/asyncHandler.js';

export const getSettings = asyncHandler(async (req, res) => {
  const settings = await Theme.findOne({ isActive: true }).lean();
  if (!settings) {
    return res.status(200).json({ status: 'success', data: null, message: 'No active theme configured' });
  }
  res.status(200).json({ status: 'success', data: settings });
});

export const updateSettings = asyncHandler(async (req, res, next) => {
  const { slug, name, palette, settings } = req.body;
  if (!slug || !name) {
    return next(new ApiError(400, 'Theme name and slug are required')); 
  }

  const updated = await Theme.findOneAndUpdate(
    { slug },
    { name, slug, palette, settings, isActive: req.body.isActive ?? true },
    { upsert: true, new: true, setDefaultsOnInsert: true }
  );

  if (updated.isActive) {
    await Theme.updateMany({ _id: { $ne: updated._id } }, { isActive: false });
  }

  res.status(200).json({ status: 'success', data: updated });
});
