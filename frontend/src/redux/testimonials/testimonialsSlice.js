import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosAPI from '../../api/api';

export const fetchTestimonials = createAsyncThunk(
  'testimonials/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosAPI.get('/testimonials');
      return response.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || 'Failed to fetch testimonials',
      );
    }
  },
);

const initialState = {
  items: [],
  loading: false,
  error: null,
  isFetched: false,
};

const testimonialsSlice = createSlice({
  name: 'testimonials',
  initialState,
  reducers: {
    resetTestimonialsError(state) {
      state.error = null;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchTestimonials.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTestimonials.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
        state.isFetched = true;
      })
      .addCase(fetchTestimonials.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.isFetched = false;
      });
  },
});

export const { resetTestimonialsError } = testimonialsSlice.actions;

export default testimonialsSlice.reducer;
