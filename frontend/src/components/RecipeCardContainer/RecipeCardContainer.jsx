import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addToFavorites, removeFromFavorites } from '../../redux/recipes/recipesSlice';
import { useModal } from '../../hooks/useModal';
import RecipeCardUI from '../ui/RecipeCard/RecipeCard';

const RecipeCardContainer = ({ recipe }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector(state => state.auth);
  const favoriteRecipes = useSelector(state => state.recipes.favoriteRecipes);
  const { openModal } = useModal();

  const isFavorite = favoriteRecipes.some(favorite => favorite.id === recipe.id);

  const handleFavoriteToggle = () => {
    if (!isAuthenticated) {
      openModal('signin');
      return;
    }
    if (isFavorite) {
      dispatch(removeFromFavorites(recipe.id));
    } else {
      dispatch(addToFavorites(recipe.id));
    }
  };

  const handleAuthorClick = () => {
    if (!isAuthenticated) {
      openModal('signin');
      return;
    }
    if (recipe.user?.id) navigate(`/user/${recipe.user.id}`);
  };

  const handleViewRecipe = () => navigate(`/recipe/${recipe.id}`);

  return (
    <RecipeCardUI
      recipe={recipe}
      isFavorite={isFavorite}
      onFavoriteToggle={handleFavoriteToggle}
      onAuthorClick={handleAuthorClick}
      onViewRecipe={handleViewRecipe}
    />
  );
};

export default RecipeCardContainer;
