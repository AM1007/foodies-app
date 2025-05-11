import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  addToFavorites,
  removeFromFavorites,
  fetchFavoriteRecipes,
} from '../../redux/recipes/recipesSlice';
import { useModal } from '../../hooks/useModal';
import RecipeCard from '../ui/RecipeCard/RecipeCard';
import React from 'react';

const RecipeCardContainer = ({ recipe }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector(state => state.auth);
  const favoriteRecipesFromState = useSelector(
    state => state.recipes.favoriteRecipes,
  );
  const { openModal } = useModal();

  if (!recipe || (!recipe.id && !recipe._id)) return null;

  const recipeId = recipe._id?.$oid || recipe.id || recipe._id;

  const favoriteRecipes = Array.isArray(favoriteRecipesFromState)
    ? favoriteRecipesFromState
    : favoriteRecipesFromState?.data || [];

  const isFavorite = favoriteRecipes.some(
    favorite => favorite?._id === recipeId || favorite?.id === recipeId,
  );

  const handleFavoriteToggle = () => {
    if (!isAuthenticated) {
      openModal('signin');
      return;
    }

    if (isFavorite) {
      dispatch(removeFromFavorites(recipeId)).then(() => {
        dispatch(fetchFavoriteRecipes());
      });
    } else {
      dispatch(addToFavorites(recipeId)).then(() => {
        dispatch(fetchFavoriteRecipes());
      });
    }
  };

  const handleAuthorClick = () => {
    if (!isAuthenticated) {
      openModal('signin');
      return;
    }
    if (recipe.user?.id) navigate(`/users/${recipe.user.id}`);
  };

  const handleViewRecipe = e => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    navigate(`/recipes/${recipeId}`);
  };

  return (
    <RecipeCard
      recipe={recipe}
      isFavorite={isFavorite}
      onFavoriteToggle={handleFavoriteToggle}
      onAuthorClick={handleAuthorClick}
      onViewRecipe={handleViewRecipe}
    />
  );
};

export default React.memo(RecipeCardContainer);
