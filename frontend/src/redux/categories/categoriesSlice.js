import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosAPI from '../../api/api';

export const fetchCategories = createAsyncThunk(
  'categories/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosAPI.get('/categories');
      return response.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || 'Failed to fetch categories',
      );
    }
  },
);

const initialState = {
  items: [],
  loading: false,
  error: null,
};

const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    resetCategoriesError(state) {
      state.error = null;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchCategories.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.loading = false;

        // Визначаємо порядок сортування
        const customOrder = [5, 12, 6, 2, 14, 10, 11, 8, 1, 13, 3, 4, 7, 9, 15];

        // Сортуємо дані перед збереженням їх у state
        const sortedItems = [...action.payload].sort((a, b) => {
          const indexA = customOrder.indexOf(a.id);
          const indexB = customOrder.indexOf(b.id);

          // Якщо ID немає в нашому масиві сортування, ставимо його в кінець
          if (indexA === -1) return 1;
          if (indexB === -1) return -1;

          return indexA - indexB;
        });

        state.items = sortedItems;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
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
//       return response.data; // assuming the response contains the category data in 'data'
//     } catch (err) {
//       return rejectWithValue(
//         err.response?.data?.message || 'Failed to fetch categories', // using a fallback message if no specific error is provided
//       );
//     }
//   },
// );

// const initialState = {
//   items: [], // categories data
//   loading: false, // loading state
//   error: null, // error state
// };

// const categoriesSlice = createSlice({
//   name: 'categories',
//   initialState,
//   reducers: {
//     resetCategoriesError(state) {
//       state.error = null; // reset error state
//     },
//   },
//   extraReducers: builder => {
//     builder
//       .addCase(fetchCategories.pending, state => {
//         state.loading = true; // start loading when the request is made
//         state.error = null; // reset previous error when a new request starts
//       })
//       .addCase(fetchCategories.fulfilled, (state, action) => {
//         state.loading = false; // stop loading once the request is successful
//         state.items = action.payload; // set the received categories
//       })
//       .addCase(fetchCategories.rejected, (state, action) => {
//         state.loading = false; // stop loading once the request fails
//         state.error = action.payload; // set the error message from the rejected action
//       });
//   },
// });

// export const { resetCategoriesError } = categoriesSlice.actions;

// export default categoriesSlice.reducer;
