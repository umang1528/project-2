import { api } from './axios';

export const projectApi = {
  getProjects: (params: Record<string, unknown> = {}) => api.get('/projects', { params }),
  getProject: (slug: string) => api.get(`/projects/${slug}`),
  createProject: (payload: FormData | Record<string, unknown>) =>
    payload instanceof FormData ? api.post('/projects', payload) : api.post('/projects', payload),
  updateProject: (id: string, payload: FormData | Record<string, unknown>) =>
    payload instanceof FormData ? api.put(`/projects/${id}`, payload) : api.put(`/projects/${id}`, payload),
  deleteProject: (id: string) => api.delete(`/projects/${id}`),
};
