import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  addToFavorites,
  removeFromFavorites,
} from '../../redux/recipes/recipesSlice';
import { useModal } from '../../hooks/useModal';
import RecipeCard from '../ui/RecipeCard/RecipeCard';

const RecipeCardContainer = ({ recipe }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector(state => state.auth);
  const favoriteRecipes = useSelector(state => state.recipes.favoriteRecipes);
  const { openModal } = useModal();

  if (!recipe || (!recipe.id && !recipe._id)) return null;

  const recipeId = recipe._id?.$oid || recipe.id;

  const isFavorite =
    Array.isArray(favoriteRecipes) &&
    favoriteRecipes.some(
      favorite => favorite._id === recipeId || favorite.id === recipeId,
    );

  const handleFavoriteToggle = () => {
    if (!isAuthenticated) {
      openModal('signin');
      return;
    }
    if (isFavorite) {
      dispatch(removeFromFavorites(recipeId));
    } else {
      dispatch(addToFavorites(recipeId));
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

export default RecipeCardContainer;
