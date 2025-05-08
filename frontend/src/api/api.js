import axios from 'axios';

const axiosAPI = axios.create({
  baseURL: 'http://localhost:3000/api',
});

const privateEndpoints = [
  '/auth/logout',
  '/users/current',
  '/users/avatar',
  '/users/',
  '/recipes/own',
  '/recipes/favorites',
];

axiosAPI.interceptors.request.use(
  config => {
    const token = localStorage.getItem('token');

    const isPrivateEndpoint = privateEndpoints.some(
      endpoint =>
        config.url.includes(endpoint) ||
        config.url.match(/\/recipes\/\w+\/favorite/) !== null ||
        (config.method !== 'get' &&
          config.url.match(/\/recipes\/\w+$/) !== null),
    );

    if (token && isPrivateEndpoint) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  error => {
    console.error('❌ Request Error:', error);
    return Promise.reject(error);
  },
);

axiosAPI.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const response = await axios.post(
          'https://foodies-app-pke3.onrender.com/api/auth/refresh',
        );
        const { token } = response.data;

        localStorage.setItem('token', token);

        const isPrivateEndpoint = privateEndpoints.some(
          endpoint =>
            originalRequest.url.includes(endpoint) ||
            originalRequest.url.match(/\/recipes\/\w+\/favorite/) !== null ||
            (originalRequest.method !== 'get' &&
              originalRequest.url.match(/\/recipes\/\w+$/) !== null),
        );

        if (isPrivateEndpoint) {
          originalRequest.headers.Authorization = `Bearer ${token}`;
        }

        return axiosAPI(originalRequest);
      } catch (refreshError) {
        localStorage.removeItem('token');
        window.location.href = '/';
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  },
);

export default axiosAPI;
