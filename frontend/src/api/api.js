import axios from 'axios';

// Створення інстансу axios з базовим URL
const axiosAPI = axios.create({
  baseURL: 'https://foodies-app-pke3.onrender.com/api',
});

// Масив приватних ендпоінтів, які потребують авторизації
const privateEndpoints = [
  '/auth/logout',
  '/users/current',
  '/users/avatar',
  '/users/', // Всі підендпоінти користувачів, що починаються з /users/
  '/recipes/own',
  '/recipes/favorites',
];

// Перехоплювач запитів - додає токен авторизації тільки для приватних ендпоінтів
axiosAPI.interceptors.request.use(
  config => {
    const token = localStorage.getItem('token');

    // Перевіряємо, чи URL є приватним ендпоінтом
    const isPrivateEndpoint = privateEndpoints.some(
      endpoint =>
        config.url.includes(endpoint) ||
        config.url.match(/\/recipes\/\w+\/favorite/) !== null || // Для /recipes/:id/favorite
        (config.method !== 'get' &&
          config.url.match(/\/recipes\/\w+$/) !== null), // Для DELETE /recipes/:id
    );

    if (token && isPrivateEndpoint) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  error => {
    return Promise.reject(error);
  },
);

// Перехоплювач відповідей - обробляє помилки та оновлює токен при необхідності
axiosAPI.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config;

    // Якщо помилка 401 (неавторизований) і це не повторний запит оновлення токена
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // Спроба оновити токен
        const response = await axios.post(
          'https://foodies-app-pke3.onrender.com/api/auth/refresh',
        );
        const { token } = response.data;

        // Зберегти новий токен
        localStorage.setItem('token', token);

        // Оновити заголовок авторизації для приватних ендпоінтів
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

        // Повторити оригінальний запит з новим токеном
        return axiosAPI(originalRequest);
      } catch (refreshError) {
        // Якщо не вдалося оновити токен, очистити localStorage і редіректити на логін
        localStorage.removeItem('token');
        window.location.href = '/';
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  },
);

// Експорт налаштованого інстансу axios
export default axiosAPI;
