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

  const isFavorite = favoriteRecipes.some(fav => fav._id === recipe._id);

  const handleFavoriteToggle = () => {
    if (!isAuthenticated) {
      openModal('signin');
      return;
    }
    if (isFavorite) {
      dispatch(removeFromFavorites(recipe._id));
    } else {
      dispatch(addToFavorites(recipe._id));
    }
  };

  const handleAuthorClick = () => {
    if (!isAuthenticated) {
      openModal('signin');
      return;
    }
    if (recipe.user?._id) navigate(`/user/${recipe.user._id}`);
  };

  const handleViewRecipe = () => navigate(`/recipe/${recipe._id}`);

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
