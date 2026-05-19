import axios from 'axios';

const baseURL = import.meta.env.MODE === 'development'
  ? 'http://localhost:4000/api'
  : (import.meta.env.VITE_API_URL || 'https://pot-self.vercel.app/api');

function getStoredToken() {
  return window.localStorage.getItem('accessToken');
}

function setStoredToken(token) {
  if (token) {
    window.localStorage.setItem('accessToken', token);
  } else {
    window.localStorage.removeItem('accessToken');
  }
}

const api = axios.create({
  baseURL,
  withCredentials: true,
});

api.interceptors.request.use((config) => {
  const token = getStoredToken();
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  if (config.data instanceof FormData && config.headers) {
    delete config.headers['Content-Type'];
    delete config.headers['content-type'];
  }

  return config;
});

let isRefreshing = false;
let refreshQueue = [];

async function processQueue(error, token = null) {
  refreshQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });

  refreshQueue = [];
}

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          refreshQueue.push({ resolve, reject });
        })
          .then((token) => {
            originalRequest.headers.Authorization = `Bearer ${token}`;
            return api(originalRequest);
          })
          .catch((err) => Promise.reject(err));
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const response = await api.post('/auth/refresh');
        const newToken = response.data?.data?.accessToken || response.data?.accessToken;
        setStoredToken(newToken);
        originalRequest.headers.Authorization = `Bearer ${newToken}`;
        await processQueue(null, newToken);
        return api(originalRequest);
      } catch (refreshError) {
        await processQueue(refreshError, null);
        setStoredToken(null);
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

export { api, setStoredToken, getStoredToken };
