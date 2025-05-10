import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosAPI from '../../api/api';

export const fetchCurrentUser = createAsyncThunk(
  'user/fetchCurrentUser',
  async (_, { rejectWithValue }) => {
    try {
      const res = await axiosAPI.get('/users/current');
      return res.data.user;
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

      const res = await axiosAPI.get(`/users/${userId}`);


      if (res.data.user) {
        return res.data.user;
      } else if (res.data.id || res.data._id) {
        return res.data;
      } else {
        console.error('Unexpected API response format:', res.data);
        return rejectWithValue('Invalid user data format received');
      }
    } catch (err) {
      console.error('Error fetching user:', err);
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
      const res = await axiosAPI.patch('/users/avatar', formData, {
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
      if (!userId) {
        return rejectWithValue('User ID is required to fetch followers');
      }

      const res = await axiosAPI.get(`/users/${userId}/followers`);

      if (res.data && res.data.followers) {
        return res.data.followers;
      } else if (Array.isArray(res.data)) {
        return res.data;
      } else {
        return [];
      }
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || 'Failed to fetch followers',
      );
    }
  },
);

export const fetchFollowing = createAsyncThunk(
  'user/fetchFollowing',
  async (_, { rejectWithValue }) => {
    try {
      const res = await axiosAPI.get('/users/following');

      if (res.data && res.data.response) {
        return res.data.response;
      } else if (Array.isArray(res.data)) {
        return res.data;
      } else {
        return [];
      }
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || 'Failed to fetch following list',
      );
    }
  },
);

export const followUser = createAsyncThunk(
  'user/followUser',
  async (userId, { rejectWithValue, getState }) => {
    try {
      const res = await axiosAPI.post(`/users/${userId}/follow`);

      if (!res.data || (!res.data._id && !res.data.id)) {
        const state = getState();
        const selectedUser = state.user.selected;

        if (
          selectedUser &&
          (selectedUser._id === userId || selectedUser.id === userId)
        ) {
          return { ...selectedUser, id: selectedUser._id || selectedUser.id };
        }

        return { id: userId, _id: userId };
      }

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

      const res = await axiosAPI.post(`/users/${userId}/unfollow`);

      return {
        userId,
        response: res.data,
      };
    } catch (err) {
      console.error('Error in unfollowUser action:', err.response || err);
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
        console.error('Failed to fetch user:', action.payload);
      })

      .addCase(updateUserAvatar.fulfilled, (state, action) => {
        if (state.current) {
          state.current.avatar = action.payload.avatar;
        }
      })
      .addCase(fetchFollowers.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchFollowers.fulfilled, (state, action) => {
        state.loading = false;
        state.followers = action.payload;
      })
      .addCase(fetchFollowers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.followers = [];
      })

      .addCase(fetchFollowing.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchFollowing.fulfilled, (state, action) => {
        state.loading = false;
        state.following = action.payload;
      })
      .addCase(fetchFollowing.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.following = [];
      })

      .addCase(followUser.fulfilled, (state, action) => {
        const followedUser = action.payload;

        if (!followedUser) return;

        const userId = followedUser._id || followedUser.id;

        if (!userId) return;

        const alreadyFollowing = state.following.some(
          user => user._id === userId || user.id === userId,
        );

        if (!alreadyFollowing) {
          state.following.push(followedUser);
        }

        if (
          state.selected &&
          (state.selected._id === userId || state.selected.id === userId)
        ) {
          if (state.selected.followerCount !== undefined) {
            state.selected.followerCount += 1;
          }
        }
      })

      .addCase(unfollowUser.fulfilled, (state, action) => {
        const userId = action.payload.userId;

        state.following = state.following.filter(user => {
          return user._id !== userId && user.id !== userId;
        });

        if (
          state.selected &&
          (state.selected._id === userId || state.selected.id === userId)
        ) {
          if (
            state.selected.followerCount !== undefined &&
            state.selected.followerCount > 0
          ) {
            state.selected.followerCount -= 1;
          }
        }
      });
  },
});

export const { clearUserError } = userSlice.actions;
export default userSlice.reducer;
