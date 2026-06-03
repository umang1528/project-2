import { api } from './axios';

export const analyticsApi = {
  trackEvent: (payload: object) => api.post('/analytics/track', payload),
  getDashboard: () => api.get('/analytics/dashboard'),
};
