import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosAPI from '../../api/api';
import { setTokens, clearTokens } from '../../api/auth';

const processAuthResponse = response => {
  if (!response || typeof response !== 'object') {
    console.error('Invalid response received:', response);
    throw new Error('Invalid response received from API');
  }

  if (response.message === 'Registration successful' && response.user) {
    return {
      token: response.token || null,
      refreshToken: response.refreshToken || null,
      user: response.user,
    };
  }

  if (response.token) {
    return {
      token: response.token,
      refreshToken: response.refreshToken || null,
      user: response.user || null,
    };
  }

  console.error('Unexpected response format:', response);
  throw new Error('Unexpected response format from API');
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
        setTokens({
          accessToken: processedData.token,
          refreshToken: processedData.refreshToken,
        });
      }

      return processedData;
    } catch (err) {
      console.log(
        '❌ Registration failed:',
        err.response?.data?.message || 'Registration failed',
      );
      return rejectWithValue(
        err.response?.data?.message || 'Registration error',
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

      setTokens({
        accessToken: processedData.token,
        refreshToken: processedData.refreshToken,
      });

      return processedData;
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Login failed';
      console.log('❌ Login failed:', errorMessage);

      return rejectWithValue(errorMessage);
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
      clearTokens();
      return null;
    } catch (err) {
      console.log(
        '❌ Logout API call failed:',
        err.response?.data?.message || 'Logout failed',
      );
      clearTokens();
      return rejectWithValue(err.response?.data?.message || 'Exit error');
    }
  },
);

export const refreshToken = createAsyncThunk(
  'auth/refreshToken',
  async (_, { rejectWithValue }) => {
    try {
      const refreshTokenValue = localStorage.getItem('refreshToken');

      if (!refreshTokenValue) {
        return rejectWithValue('Missing refreshToken');
      }

      const res = await axiosAPI.post('/auth/refresh', {
        refreshToken: refreshTokenValue,
      });

      const processedData = processAuthResponse(res.data);

      setTokens({
        accessToken: processedData.token,
        refreshToken: processedData.refreshToken,
      });

      if (!processedData.user) {
        try {
          const userRes = await axiosAPI.get('/users/current');
          processedData.user = userRes.data.user;
        } catch (userError) {
          console.error('Error retrieving user data:', userError);
        }
      }

      return processedData;
    } catch (err) {
      clearTokens();
      return rejectWithValue(
        err.response?.data?.message || 'Token refresh error',
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
        return rejectWithValue('No authorization token');
      }

      const res = await axiosAPI.get('/users/current');
      return res.data.user;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || 'Error retrieving user data',
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

        if (action.payload === 'No authorization token') {
          state.isAuthenticated = false;
          state.token = null;
        }
        state.error = action.payload;
      });
  },
});

export const { resetAuthError } = authSlice.actions;

export default authSlice.reducer;
