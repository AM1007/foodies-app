import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

axios.defaults.baseURL = '/api';

export const fetchCurrentUser = createAsyncThunk(
  'user/fetchCurrentUser',
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get('/users/current');
      return res.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || 'Failed to fetch current user',
      );
    }
  },
);

export const fetchUserById = createAsyncThunk(
  'user/fetchUserById',
  async (userId, { rejectWithValue }) => {
    try {
      const res = await axios.get(`/users/${userId}`);
      return res.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || 'Failed to fetch user data',
      );
    }
  },
);

export const updateUserAvatar = createAsyncThunk(
  'user/updateUserAvatar',
  async (formData, { rejectWithValue }) => {
    try {
      const res = await axios.patch('/users/avatar', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      return res.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || 'Failed to update avatar',
      );
    }
  },
);

export const fetchFollowers = createAsyncThunk(
  'user/fetchFollowers',
  async (userId, { rejectWithValue }) => {
    try {
      const res = await axios.get(`/users/${userId}/followers`);
      return res.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || 'Failed to fetch followers',
      );
    }
  },
);

export const fetchFollowing = createAsyncThunk(
  'user/fetchFollowing',
  async (userId, { rejectWithValue }) => {
    try {
      const res = await axios.get(`/users/${userId}/following`);
      return res.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || 'Failed to fetch following list',
      );
    }
  },
);

export const followUser = createAsyncThunk(
  'user/followUser',
  async (userId, { rejectWithValue }) => {
    try {
      const res = await axios.post(`/users/${userId}/follow`);
      return res.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || 'Failed to follow user',
      );
    }
  },
);

export const unfollowUser = createAsyncThunk(
  'user/unfollowUser',
  async (userId, { rejectWithValue }) => {
    try {
      const res = await axios.delete(`/users/${userId}/follow`);
      return res.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || 'Failed to unfollow user',
      );
    }
  },
);

const initialState = {
  current: null,
  selected: null,
  followers: [],
  following: [],
  loading: false,
  error: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    clearUserError(state) {
      state.error = null;
    },
  },
  extraReducers: builder => {
    builder

      .addCase(fetchCurrentUser.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCurrentUser.fulfilled, (state, action) => {
        state.loading = false;
        state.current = action.payload;
      })
      .addCase(fetchCurrentUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(fetchUserById.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserById.fulfilled, (state, action) => {
        state.loading = false;
        state.selected = action.payload;
      })
      .addCase(fetchUserById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(updateUserAvatar.fulfilled, (state, action) => {
        if (state.current && state.current._id === action.payload._id) {
          state.current.avatarURL = action.payload.avatarURL;
        }
      })

      .addCase(fetchFollowers.fulfilled, (state, action) => {
        state.followers = action.payload;
      })
      .addCase(fetchFollowers.rejected, (state, action) => {
        state.error = action.payload;
      })

      .addCase(fetchFollowing.fulfilled, (state, action) => {
        state.following = action.payload;
      })
      .addCase(fetchFollowing.rejected, (state, action) => {
        state.error = action.payload;
      })

      .addCase(followUser.fulfilled, (state, action) => {
        state.following.push(action.payload);
      })

      .addCase(unfollowUser.fulfilled, (state, action) => {
        state.following = state.following.filter(
          user => user._id !== action.meta.arg,
        );
      });
  },
});

export const { clearUserError } = userSlice.actions;
export default userSlice.reducer;
