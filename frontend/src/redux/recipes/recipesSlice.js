import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosAPI from '../../api/api';

export const fetchRecipes = createAsyncThunk(
  'recipes/fetchAll',
  async ({ page = 1, category, ingredient, area }, { rejectWithValue }) => {
    try {
      const params = {};
      if (page) params.page = page;
      if (category && category !== 'All categories') params.category = category;
      if (ingredient) params.ingredient = ingredient;
      if (area) params.area = area;

      console.log('Fetching recipes with params:', params);

      const response = await axiosAPI.get('/recipes', { params });

      console.log('Recipes fetched successfully:', response.data);

      return response.data;
    } catch (err) {
      console.error('Error fetching recipes:', err);

      return rejectWithValue(
        err.response?.data?.message || 'Failed to fetch recipes',
      );
    }
  },
);

export const fetchRecipeDetails = createAsyncThunk(
  'recipes/fetchDetails',
  async (recipeId, { rejectWithValue }) => {
    try {
      const response = await axiosAPI.get(`/recipes/${recipeId}`);
      return response.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || 'Failed to fetch recipe details',
      );
    }
  },
);

export const fetchUserRecipes = createAsyncThunk(
  'recipes/fetchUserRecipes',
  async (userId, { rejectWithValue }) => {
    try {
      console.log(`Fetching recipes for user ID ${userId}`);
      const response = await axiosAPI.get(`/users/${userId}`);
      console.log('User recipes response:', response.data);

      if (response.data.recipes) {
        return response.data.recipes;
      } else if (response.data.user && response.data.user.recipes) {
        return response.data.user.recipes;
      } else {
        console.warn(
          'Unexpected API response format for user recipes:',
          response.data,
        );
        return [];
      }
    } catch (err) {
      console.error('Error fetching user recipes:', err);
      return rejectWithValue(
        err.response?.data?.message || 'Failed to fetch user recipes',
      );
    }
  },
);

export const fetchPopularRecipes = createAsyncThunk(
  'recipes/fetchPopular',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosAPI.get('/recipes/popular');
      return response.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || 'Failed to fetch popular recipes',
      );
    }
  },
);

export const createRecipe = createAsyncThunk(
  'recipes/create',
  async (recipeData, { rejectWithValue }) => {
    try {
      const response = await axiosAPI.post('/recipes', recipeData);
      return response.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || 'Failed to create recipe',
      );
    }
  },
);

export const deleteRecipe = createAsyncThunk(
  'recipes/delete',
  async (recipeId, { rejectWithValue }) => {
    try {
      await axiosAPI.delete(`/recipes/${recipeId}`);
      return recipeId;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || 'Failed to delete recipe',
      );
    }
  },
);

export const fetchOwnRecipes = createAsyncThunk(
  'recipes/fetchOwn',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosAPI.get('/recipes/own');
      return response.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || 'Failed to fetch own recipes',
      );
    }
  },
);

export const addToFavorites = createAsyncThunk(
  'recipes/addToFavorites',
  async (recipeId, { rejectWithValue }) => {
    try {
      const response = await axiosAPI.post(`/recipes/${recipeId}/favorite`);
      return response.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || 'Failed to add recipe to favorites',
      );
    }
  },
);

export const removeFromFavorites = createAsyncThunk(
  'recipes/removeFromFavorites',
  async (recipeId, { rejectWithValue }) => {
    try {
      const response = await axiosAPI.delete(`/recipes/${recipeId}/favorite`);
      return response.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || 'Failed to remove recipe from favorites',
      );
    }
  },
);

export const fetchFavoriteRecipes = createAsyncThunk(
  'recipes/fetchFavorites',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosAPI.get('/recipes/favorites');
      return response.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || 'Failed to fetch favorite recipes',
      );
    }
  },
);

const initialState = {
  recipes: [],
  popularRecipes: [],
  ownRecipes: [],
  favoriteRecipes: [],
  currentRecipe: null,
  loading: false,
  error: null,
};

const recipesSlice = createSlice({
  name: 'recipes',
  initialState,
  reducers: {
    resetRecipesError(state) {
      state.error = null;
    },
  },
  extraReducers: builder => {
    builder

      .addCase(fetchRecipes.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchRecipes.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.recipes = action.payload.data;
        state.pagination = action.payload.pagination;
      })
      .addCase(fetchRecipes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(fetchRecipeDetails.pending, state => {
        state.loading = true;
      })
      .addCase(fetchRecipeDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.currentRecipe = action.payload;
      })
      .addCase(fetchRecipeDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(fetchUserRecipes.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserRecipes.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        console.log('Setting user recipes:', action.payload);
        state.userRecipes = action.payload;
      })
      .addCase(fetchUserRecipes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.userRecipes = [];
      })

      .addCase(fetchPopularRecipes.pending, state => {
        state.loading = true;
      })
      .addCase(fetchPopularRecipes.fulfilled, (state, action) => {
        state.loading = false;
        state.popularRecipes = action.payload;
      })
      .addCase(fetchPopularRecipes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(createRecipe.pending, state => {
        state.loading = true;
      })
      .addCase(createRecipe.fulfilled, (state, action) => {
        state.loading = false;
        state.ownRecipes.push(action.payload);
      })
      .addCase(createRecipe.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(deleteRecipe.pending, state => {
        state.loading = true;
      })
      .addCase(deleteRecipe.fulfilled, (state, action) => {
        state.loading = false;
        state.ownRecipes = state.ownRecipes.filter(
          recipe => recipe._id !== action.payload,
        );
      })
      .addCase(deleteRecipe.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(fetchOwnRecipes.pending, state => {
        state.loading = true;
      })
      .addCase(fetchOwnRecipes.fulfilled, (state, action) => {
        state.loading = false;
        state.ownRecipes = action.payload;
      })
      .addCase(fetchOwnRecipes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(addToFavorites.pending, state => {
        state.loading = true;
      })
      .addCase(addToFavorites.fulfilled, (state, action) => {
        state.loading = false;
        state.favoriteRecipes.push(action.payload);
      })
      .addCase(addToFavorites.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(removeFromFavorites.pending, state => {
        state.loading = true;
      })
      .addCase(removeFromFavorites.fulfilled, (state, action) => {
        state.loading = false;
        state.favoriteRecipes = state.favoriteRecipes.filter(
          recipe => recipe._id !== action.payload,
        );
      })
      .addCase(removeFromFavorites.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(fetchFavoriteRecipes.pending, state => {
        state.loading = true;
      })
      .addCase(fetchFavoriteRecipes.fulfilled, (state, action) => {
        state.loading = false;
        state.favoriteRecipes = action.payload;
      })
      .addCase(fetchFavoriteRecipes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetRecipesError } = recipesSlice.actions;

export default recipesSlice.reducer;
