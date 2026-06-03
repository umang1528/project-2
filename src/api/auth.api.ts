import { api, setStoredToken } from './axios';

export const authApi = {
  login: async (email: string, password: string) => {
    const response = await api.post('/auth/login', { email, password });
    const accessToken = response.data?.data?.accessToken;
    if (accessToken) {
      setStoredToken(accessToken);
    }
    return response.data;
  },

  logout: async () => {
    setStoredToken(null);
    return api.post('/auth/logout');
  },

  refresh: async () => {
    const response = await api.post('/auth/refresh');
    const accessToken = response.data?.data?.accessToken;
    if (accessToken) {
      setStoredToken(accessToken);
    }
    return response.data;
  },

  me: async () => {
    return api.get('/auth/me');
  },
};
