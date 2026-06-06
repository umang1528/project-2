import HomeCarousel from '../models/homeCarousel.model.js';
import { ApiError } from '../utils/ApiError.js';
import { asyncHandler } from '../utils/asyncHandler.js';

export const createHomeCarousel = asyncHandler(async (req, res, next) => {
  const { title, image, order, isActive } = req.body;

  if (!title || !image) {
    return next(new ApiError(400, 'Title and image URL are required'));
  }

  const homeCarouselItem = await HomeCarousel.create({
    title,
    image,
    order: Number(order) || 0,
    isActive: isActive ?? true,
  });

  res.status(201).json({ status: 'success', data: homeCarouselItem });
});

export const getHomeCarousel = asyncHandler(async (req, res) => {
  const items = await HomeCarousel.find({ isActive: true })
    .sort({ order: 1, createdAt: 1 })
    .lean();

  res.status(200).json({ status: 'success', data: items });
});

export const updateHomeCarousel = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const { title, image, order, isActive } = req.body;

  const item = await HomeCarousel.findById(id);
  if (!item) {
    return next(new ApiError(404, 'Carousel item not found'));
  }

  item.title = title ?? item.title;
  item.image = image ?? item.image;
  item.order = Number(order ?? item.order);
  item.isActive = isActive ?? item.isActive;

  await item.save();

  res.status(200).json({ status: 'success', data: item });
});

export const deleteHomeCarousel = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const item = await HomeCarousel.findById(id);
  if (!item) {
    return next(new ApiError(404, 'Carousel item not found'));
  }

  await item.deleteOne();

  res.status(200).json({ status: 'success', message: 'Carousel item deleted' });
});
