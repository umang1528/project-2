import { api } from './axios';

export const mediaApi = {
  uploadMedia: (formData: FormData) => api.post('/media/upload', formData),
  deleteMedia: (id: string) => api.delete(`/media/${id}`),
};
