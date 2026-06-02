import axios from 'axios';
import { clearAuthStorage, getRefreshToken, persistAuthTokens, getAccessToken } from '../lib/auth.js';

export const api = axios.create({ baseURL: '' });

function isAuthPublicUrl(url) {
  if (!url || typeof url !== 'string') return false;
  return (
    url.includes('/api/auth/login') ||
    url.includes('/api/auth/signup') ||
    url.includes('/api/auth/refresh') ||
    url.includes('/api/auth/logout')
  );
}

api.interceptors.request.use((config) => {
  if (!isAuthPublicUrl(config.url)) {
    const t = getAccessToken();
    if (t) config.headers.Authorization = `Bearer ${t}`;
  }
  return config;
});

let isRefreshing = false;
let failedQueue = [];

function processQueue(error) {
  failedQueue.forEach((p) => {
    if (error) p.reject(error);
    else p.resolve();
  });
  failedQueue = [];
}

api.interceptors.response.use(
  (r) => r,
  async (error) => {
    const originalRequest = error.config;
    if (!originalRequest || originalRequest._retry) {
      return Promise.reject(error);
    }
    if (error.response?.status !== 401) {
      return Promise.reject(error);
    }
    if (isAuthPublicUrl(originalRequest.url) || originalRequest.url?.includes('/api/auth/refresh')) {
      return Promise.reject(error);
    }

    if (isRefreshing) {
      return new Promise((resolve, reject) => {
        failedQueue.push({ resolve, reject });
      }).then(() => {
        originalRequest.headers.Authorization = `Bearer ${getAccessToken()}`;
        return api(originalRequest);
      });
    }

    originalRequest._retry = true;
    isRefreshing = true;
    const refreshToken = getRefreshToken();

    if (!refreshToken) {
      processQueue(error);
      isRefreshing = false;
      clearAuthStorage();
      return Promise.reject(error);
    }

    try {
      const { data } = await api.post('/api/auth/refresh', { refreshToken });
      persistAuthTokens({ accessToken: data.accessToken, refreshToken: data.refreshToken });
      isRefreshing = false;
      processQueue(null);
      originalRequest.headers.Authorization = `Bearer ${data.accessToken}`;
      return api(originalRequest);
    } catch (refreshErr) {
      isRefreshing = false;
      processQueue(refreshErr);
      clearAuthStorage();
      return Promise.reject(refreshErr);
    }
  }
);
