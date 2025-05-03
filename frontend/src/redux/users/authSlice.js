import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosAPI from '../../api/api';

const setToken = token => {
  localStorage.setItem('token', token);
};

const clearToken = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('refreshToken');
};

const processAuthResponse = response => {
  if (!response || typeof response !== 'object') {
    console.error('Отримана недійсна відповідь:', response);
    throw new Error('Отримана недійсна відповідь від API');
  }

  console.log('Отримана відповідь від API:', response);

  if (response.message === 'Registration successful' && response.user) {
    console.log('Обробка відповіді реєстрації:', response);

    return {
      token: response.token || null,
      user: response.user,
    };
  }

  if (response.token) {
    console.log('Обробка відповіді логіну:', response);

    if (response.refreshToken) {
      localStorage.setItem('refreshToken', response.refreshToken);
    }

    return {
      token: response.token,
      user: response.user || null,
    };
  }

  console.error('Неочікуваний формат відповіді:', response);
  throw new Error('Неочікуваний формат відповіді від API');
};

export const registerUser = createAsyncThunk(
  'auth/register',
  async (formData, { rejectWithValue }) => {
    try {
      console.log('🔄 Sending registration request...');
      const res = await axiosAPI.post('/auth/register', formData);
      console.log('✅ Registration successful');
      const processedData = processAuthResponse(res.data);

      if (processedData.token) {
        setToken(processedData.token);
      }

      return processedData;
    } catch (err) {
      console.log(
        '❌ Registration failed:',
        err.response?.data?.message || 'Registration failed',
      );
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
      console.log('🔄 Sending login request...');
      const res = await axiosAPI.post('/auth/login', formData);
      console.log('✅ Login successful, received token');
      const processedData = processAuthResponse(res.data);

      setToken(processedData.token);

      return processedData;
    } catch (err) {
      console.log(
        '❌ Login failed:',
        err.response?.data?.message || 'Login failed',
      );
      return rejectWithValue(err.response?.data?.message || 'Помилка входу');
    }
  },
);

export const logoutUser = createAsyncThunk(
  'auth/logout',
  async (_, { rejectWithValue }) => {
    try {
      console.log('🔄 Sending logout request...');
      await axiosAPI.post('/auth/logout');
      console.log('✅ Logout API call successful');
      clearToken();
      return null;
    } catch (err) {
      console.log(
        '❌ Logout API call failed:',
        err.response?.data?.message || 'Logout failed',
      );
      clearToken();
      return rejectWithValue(err.response?.data?.message || 'Помилка виходу');
    }
  },
);

export const refreshToken = createAsyncThunk(
  'auth/refreshToken',
  async (_, { rejectWithValue }) => {
    try {
      const refreshTokenValue = localStorage.getItem('refreshToken');

      if (!refreshTokenValue) {
        return rejectWithValue('Відсутній refreshToken');
      }

      const res = await axiosAPI.post('/auth/refresh', {
        refreshToken: refreshTokenValue,
      });

      const processedData = processAuthResponse(res.data);
      setToken(processedData.token);

      if (!processedData.user) {
        try {
          const userRes = await axiosAPI.get('/users/current');
          processedData.user = userRes.data.user;
        } catch (userError) {
          console.error('Помилка отримання даних користувача:', userError);
        }
      }

      return processedData;
    } catch (err) {
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
      const { auth } = getState();

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

const initialState = {
  user: null,
  token: localStorage.getItem('token') || null,
  isAuthenticated: Boolean(localStorage.getItem('token')),
  loading: false,
  error: null,
};

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

      .addCase(loginUser.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;

        if (action.payload && action.payload.user) {
          state.user = action.payload.user;
        }

        if (action.payload && action.payload.token) {
          state.token = action.payload.token;
          state.isAuthenticated = true;
        }
        console.log('🔐 Auth state updated: User logged in and authenticated');
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        console.log('❌ Auth state updated: Login failed');
      })

      .addCase(logoutUser.pending, state => {
        state.loading = true;
      })
      .addCase(logoutUser.fulfilled, state => {
        state.user = null;
        state.token = null;
        state.isAuthenticated = false;
        state.loading = false;
        state.error = null;
        console.log('🔓 Auth state updated: User logged out');
      })
      .addCase(logoutUser.rejected, state => {
        state.user = null;
        state.token = null;
        state.isAuthenticated = false;
        state.loading = false;
        state.error = null;
      })

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
