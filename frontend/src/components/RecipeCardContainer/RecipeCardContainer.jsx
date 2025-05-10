import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  addToFavorites,
  removeFromFavorites,
} from '../../redux/recipes/recipesSlice';
import { useModal } from '../../hooks/useModal';
import RecipeCard from '../ui/RecipeCard/RecipeCard';
import React, { useState, useEffect } from 'react';

const RecipeCardContainer = ({ recipe }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector(state => state.auth);
  const favoriteRecipesFromState = useSelector(
    state => state.recipes.favoriteRecipes,
  );
  const { openModal } = useModal();

  const [isFavorite, setIsFavorite] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  if (!recipe || (!recipe.id && !recipe._id)) return null;

  const recipeId = recipe._id?.$oid || recipe.id || recipe._id;

  useEffect(() => {
    const favoriteRecipes = Array.isArray(favoriteRecipesFromState)
      ? favoriteRecipesFromState
      : favoriteRecipesFromState?.data || [];

    const isRecipeFavorite = favoriteRecipes.some(
      favorite => favorite?._id === recipeId || favorite?.id === recipeId,
    );

    setIsFavorite(isRecipeFavorite);
  }, [favoriteRecipesFromState, recipeId]);

  const handleFavoriteToggle = () => {
    if (!isAuthenticated) {
      openModal('signin');
      return;
    }

    if (isProcessing) return;

    setIsProcessing(true);

    setIsFavorite(!isFavorite);

    if (isFavorite) {
      dispatch(removeFromFavorites(recipeId))
        .unwrap()
        .catch(error => {
          console.error('Failed to remove from favorites:', error);
          setIsFavorite(true);
        })
        .finally(() => {
          setIsProcessing(false);
        });
    } else {
      dispatch(addToFavorites(recipeId))
        .unwrap()
        .catch(error => {
          // Revert on error
          console.error('Failed to add to favorites:', error);
          setIsFavorite(false);
        })
        .finally(() => {
          setIsProcessing(false);
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

  const handleViewRecipe = () => navigate(`/recipes/${recipeId}`);

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

function areEqual(prevProps, nextProps) {
  return (
    prevProps.recipe.id === nextProps.recipe.id &&
    prevProps.recipe._id === nextProps.recipe._id
  );
}

export default React.memo(RecipeCardContainer, areEqual);
