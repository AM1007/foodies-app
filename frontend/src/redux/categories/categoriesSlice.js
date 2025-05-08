import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosAPI from '../../api/api';

export const fetchCategories = createAsyncThunk(
  'categories/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosAPI.get('/categories');
      return response.data; // assuming the response contains the category data in 'data'
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || 'Failed to fetch categories', // using a fallback message if no specific error is provided
      );
    }
  },
);

const initialState = {
  items: [], // categories data
  loading: false, // loading state
  error: null, // error state
};

const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    resetCategoriesError(state) {
      state.error = null; // reset error state
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchCategories.pending, state => {
        state.loading = true; // start loading when the request is made
        state.error = null; // reset previous error when a new request starts
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.loading = false; // stop loading once the request is successful
        state.items = action.payload; // set the received categories
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.loading = false; // stop loading once the request fails
        state.error = action.payload; // set the error message from the rejected action
      });
  },
});

export const { resetCategoriesError } = categoriesSlice.actions;

export default categoriesSlice.reducer;

// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import axiosAPI from '../../api/api';

// export const fetchCategories = createAsyncThunk(
//   'categories/fetchAll',
//   async (_, { rejectWithValue }) => {
//     try {
//       const response = await axiosAPI.get('/categories');
//       return response.data;
//     } catch (err) {
//       return rejectWithValue(
//         err.response?.data?.message || 'Failed to fetch categories',
//       );
//     }
//   },
// );

// const initialState = {
//   items: [],
//   loading: false,
//   error: null,
// };

// const categoriesSlice = createSlice({
//   name: 'categories',
//   initialState,
//   reducers: {
//     resetCategoriesError(state) {
//       state.error = null;
//     },
//   },
//   extraReducers: builder => {
//     builder
//       .addCase(fetchCategories.pending, state => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(fetchCategories.fulfilled, (state, action) => {
//         state.loading = false;
//         state.items = action.payload;
//       })
//       .addCase(fetchCategories.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       });
//   },
// });

// export const { resetCategoriesError } = categoriesSlice.actions;

// export default categoriesSlice.reducer;
