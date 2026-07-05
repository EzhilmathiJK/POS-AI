import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Interceptor to handle 401 Unauthorized and 403 Forbidden
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      if (error.response.status === 401) {
        // Skip triggering the global unauthorized modal for the login endpoint
        if (error.config.url && error.config.url.includes('/auth/login')) {
          return Promise.reject(error);
        }

        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('user');
        localStorage.removeItem('permissions');
        window.dispatchEvent(new CustomEvent('unauthorized', { detail: { type: 'login_required' } }));
      } else if (error.response.status === 403) {
        window.dispatchEvent(new CustomEvent('unauthorized', { detail: { type: 'forbidden' } }));
      }
    }
    return Promise.reject(error);
  }
);

export default api;
