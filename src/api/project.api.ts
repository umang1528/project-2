import { api } from './axios';

export const projectApi = {

  // GET ALL PROJECTS
  getProjects: (
    params: Record<string, unknown> = {}
  ) =>
    api.get('/projects', { params }),

  // GET PROJECT BY SLUG
  getProject: (slug: string) =>
    api.get(`/projects/${slug}`),

  // ✅ GET PROJECT BY ID
  getProjectById: (id: string) =>
    api.get(`/projects/id/${id}`),

  // CREATE PROJECT
  createProject: (
    payload: FormData | Record<string, unknown>
  ) =>
    payload instanceof FormData
      ? api.post('/projects', payload)
      : api.post('/projects', payload),

  // UPDATE PROJECT
  updateProject: (
    id: string,
    payload: FormData | Record<string, unknown>
  ) =>
    payload instanceof FormData
      ? api.put(`/projects/${id}`, payload)
      : api.put(`/projects/${id}`, payload),

  // DELETE PROJECT
  deleteProject: (id: string) =>
    api.delete(`/projects/${id}`),
};