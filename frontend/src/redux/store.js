import { configureStore } from '@reduxjs/toolkit';
import authReducer from './users/authSlice';
import userReducer from './users/userSlice';
import categoriesReducer from './categories/categoriesSlice';
import areasReducer from './areas/areasSlice';
import ingredientsReducer from './ingredients/ingredientsSlice';
import testimonialsReducer from './testimonials/testimonialsSlice';
import recipesReducer from './recipes/recipesSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    categories: categoriesReducer,
    areas: areasReducer,
    ingredients: ingredientsReducer,
    testimonials: testimonialsReducer,
    recipes: recipesReducer,
  },
});

export default store;
