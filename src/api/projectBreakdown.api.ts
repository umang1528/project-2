import { api } from './axios';

type ProjectBreakdownPayload = Record<string, unknown>;

export const projectBreakdownApi = {
  getProjectBreakdownItems: (params?: { all?: boolean }) =>
    api.get('/project-breakdown', { params }),
  createProjectBreakdown: (payload: ProjectBreakdownPayload) =>
    api.post('/project-breakdown', payload),
  updateProjectBreakdown: (id: string, payload: ProjectBreakdownPayload) =>
    api.put(`/project-breakdown/${id}`, payload),
  deleteProjectBreakdown: (id: string) =>
    api.delete(`/project-breakdown/${id}`),
};