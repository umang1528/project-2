import { api } from './axios';

export const homeCarouselApi = {
  getHomeCarouselItems: () => api.get('/home-carousel'),
  createHomeCarousel: (payload: Record<string, unknown>) => api.post('/home-carousel', payload),
  updateHomeCarousel: (id: string, payload: Record<string, unknown>) => api.put(`/home-carousel/${id}`, payload),
  deleteHomeCarousel: (id: string) => api.delete(`/home-carousel/${id}`),
};
