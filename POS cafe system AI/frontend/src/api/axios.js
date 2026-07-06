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

let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach(prom => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

const triggerLogout = () => {
  localStorage.removeItem('accessToken');
  localStorage.removeItem('refreshToken');
  localStorage.removeItem('user');
  localStorage.removeItem('permissions');
  window.dispatchEvent(new CustomEvent('unauthorized', { detail: { type: 'login_required' } }));
};

// Interceptor to handle 401 Unauthorized and 403 Forbidden
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const originalRequest = error.config;

    if (error.response) {
      if (error.response.status === 401) {
        // Skip for login or refresh routes
        if (originalRequest.url && (originalRequest.url.includes('/auth/login') || originalRequest.url.includes('/auth/refresh-token'))) {
          return Promise.reject(error);
        }

        if (!originalRequest._retry) {
          if (isRefreshing) {
            return new Promise(function(resolve, reject) {
              failedQueue.push({ resolve, reject });
            }).then(token => {
              originalRequest.headers.Authorization = 'Bearer ' + token;
              return api(originalRequest);
            }).catch(err => {
              return Promise.reject(err);
            });
          }

          originalRequest._retry = true;
          isRefreshing = true;
          
          const refreshToken = localStorage.getItem('refreshToken');
          if (!refreshToken) {
            triggerLogout();
            return Promise.reject(error);
          }

          return new Promise(function (resolve, reject) {
            axios.post('http://localhost:8000/api/auth/refresh-token', { token: refreshToken })
              .then(({ data }) => {
                if (data.success) {
                  const newAccessToken = data.data.accessToken;
                  localStorage.setItem('accessToken', newAccessToken);
                  api.defaults.headers.common['Authorization'] = 'Bearer ' + newAccessToken;
                  originalRequest.headers.Authorization = 'Bearer ' + newAccessToken;
                  
                  // Dispatch event so AppContext can reset its auto-expire clock
                  window.dispatchEvent(new CustomEvent('token_refreshed'));

                  processQueue(null, newAccessToken);
                  resolve(api(originalRequest));
                }
              })
              .catch((err) => {
                processQueue(err, null);
                triggerLogout();
                reject(err);
              })
              .finally(() => {
                isRefreshing = false;
              });
          });
        }
      } else if (error.response.status === 403) {
        window.dispatchEvent(new CustomEvent('unauthorized', { detail: { type: 'forbidden' } }));
      }
    }
    return Promise.reject(error);
  }
);

export default api;
