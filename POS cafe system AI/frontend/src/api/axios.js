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

// Interceptor to handle 401 Unauthorized (e.g., token expired)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Basic implementation: if 401, you could try to refresh token here
    // or log the user out by clearing local storage and redirecting to login.
    if (error.response && error.response.status === 401) {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('user');
      // window.location.href = '/login'; // Optional: force redirect
    }
    return Promise.reject(error);
  }
);

export default api;
