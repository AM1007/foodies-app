import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosAPI from '../../api/api';

// Утиліти для роботи з токеном
const setToken = token => {
  localStorage.setItem('token', token);
};

const clearToken = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('refreshToken');
};

// Функція для обробки відповіді авторизації відповідно до документації API
const processAuthResponse = response => {
  // Реєстрація: відповідь містить message і user
  if (response.message === 'Registration successful' && response.user) {
    // Повертаємо токен (якщо є) та користувача
    return {
      token: response.token || null,
      user: response.user,
    };
  }

  // Логін: відповідь містить token, refreshToken і user
  if (response.token && response.user) {
    // Зберігаємо refreshToken в локальне сховище, якщо він є
    if (response.refreshToken) {
      localStorage.setItem('refreshToken', response.refreshToken);
    }

    // Повертаємо структуру, яку очікує наш редюсер
    return {
      token: response.token,
      user: response.user,
    };
  }

  // Оновлення токену: відповідь містить тільки token
  if (response.token && !response.user) {
    // Повертаємо структуру з токеном, але без користувача
    // Користувача будемо отримувати окремим запитом
    return {
      token: response.token,
      user: null,
    };
  }

  // Якщо нічого з вищеперерахованого не підходить, повертаємо помилку
  throw new Error('Неочікуваний формат відповіді від API');
};

// Асинхронні операції (thunks)
export const registerUser = createAsyncThunk(
  'auth/register',
  async (formData, { rejectWithValue }) => {
    try {
      const res = await axiosAPI.post('/auth/register', formData);
      const processedData = processAuthResponse(res.data);

      // Якщо в відповіді є токен, зберігаємо його
      if (processedData.token) {
        setToken(processedData.token);
      }

      return processedData;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || 'Помилка реєстрації',
      );
    }
  },
);

export const loginUser = createAsyncThunk(
  'auth/login',
  async (formData, { rejectWithValue }) => {
    try {
      const res = await axiosAPI.post('/auth/login', formData);
      const processedData = processAuthResponse(res.data);

      // Зберігаємо токен
      setToken(processedData.token);

      return processedData;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Помилка входу');
    }
  },
);

export const logoutUser = createAsyncThunk(
  'auth/logout',
  async (_, { rejectWithValue }) => {
    try {
      await axiosAPI.post('/auth/logout');
      clearToken(); // Очищаємо token і refreshToken
      return null;
    } catch (err) {
      // Навіть якщо запит невдалий, ми все одно виходимо локально
      clearToken(); // Очищаємо token і refreshToken
      return rejectWithValue(err.response?.data?.message || 'Помилка виходу');
    }
  },
);

export const refreshToken = createAsyncThunk(
  'auth/refreshToken',
  async (_, { rejectWithValue }) => {
    try {
      // Отримуємо refreshToken з localStorage
      const refreshTokenValue = localStorage.getItem('refreshToken');

      // Якщо немає refreshToken, не робимо запит
      if (!refreshTokenValue) {
        return rejectWithValue('Відсутній refreshToken');
      }

      // Відправляємо запит на оновлення токена
      const res = await axiosAPI.post('/auth/refresh', {
        refreshToken: refreshTokenValue,
      });

      // Обробляємо відповідь
      const processedData = processAuthResponse(res.data);
      setToken(processedData.token);

      // Якщо немає даних користувача, отримуємо їх окремим запитом
      if (!processedData.user) {
        try {
          // Отримуємо дані користувача
          const userRes = await axiosAPI.get('/users/current');
          processedData.user = userRes.data.user;
        } catch (userError) {
          // Якщо не вдалося отримати дані користувача, продовжуємо без них
          console.error('Помилка отримання даних користувача:', userError);
        }
      }

      return processedData;
    } catch (err) {
      // У випадку помилки оновлення токена, очищаємо локальне сховище
      clearToken();
      return rejectWithValue(
        err.response?.data?.message || 'Помилка оновлення токена',
      );
    }
  },
);

export const fetchCurrentUser = createAsyncThunk(
  'auth/fetchCurrentUser',
  async (_, { rejectWithValue, getState }) => {
    try {
      // Отримуємо стан автентифікації
      const { auth } = getState();
      // Якщо немає токена, не робимо запит
      if (!auth.token) {
        return rejectWithValue('Немає токена для авторизації');
      }

      const res = await axiosAPI.get('/users/current');
      return res.data.user;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || 'Помилка отримання даних користувача',
      );
    }
  },
);

// Початковий стан
const initialState = {
  user: null,
  token: localStorage.getItem('token') || null,
  isAuthenticated: Boolean(localStorage.getItem('token')), // Оновлено
  loading: false,
  error: null,
};

// Створення slice
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    resetAuthError(state) {
      state.error = null;
    },
  },
  extraReducers: builder => {
    builder
      // Обробка registerUser
      .addCase(registerUser.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isAuthenticated = Boolean(action.payload.token);
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Обробка loginUser
      .addCase(loginUser.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isAuthenticated = true;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Обробка logoutUser
      .addCase(logoutUser.pending, state => {
        state.loading = true;
      })
      .addCase(logoutUser.fulfilled, state => {
        state.user = null;
        state.token = null;
        state.isAuthenticated = false;
        state.loading = false;
        state.error = null;
      })
      .addCase(logoutUser.rejected, state => {
        // Навіть у випадку помилки, ми виходимо
        state.user = null;
        state.token = null;
        state.isAuthenticated = false;
        state.loading = false;
        state.error = null;
      })

      // Обробка refreshToken
      .addCase(refreshToken.pending, state => {
        state.loading = true;
      })
      .addCase(refreshToken.fulfilled, (state, action) => {
        state.token = action.payload.token;
        if (action.payload.user) {
          state.user = action.payload.user;
        }
        state.isAuthenticated = true;
        state.loading = false;
      })
      .addCase(refreshToken.rejected, (state, action) => {
        state.token = null;
        state.isAuthenticated = false;
        state.user = null;
        state.error = action.payload;
        state.loading = false;
      })

      // Обробка fetchCurrentUser
      .addCase(fetchCurrentUser.pending, state => {
        state.loading = true;
      })
      .addCase(fetchCurrentUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isAuthenticated = true;
        state.loading = false;
      })
      .addCase(fetchCurrentUser.rejected, (state, action) => {
        state.loading = false;
        // Якщо помилка отримання даних користувача, не скидаємо автентифікацію,
        // лише зазначаємо помилку
        if (action.payload === 'Немає токена для авторизації') {
          state.isAuthenticated = false;
          state.token = null;
        }
        state.error = action.payload;
      });
  },
});

export const { resetAuthError } = authSlice.actions;

export default authSlice.reducer;
