import { useDispatch, useSelector } from 'react-redux';
import {
  addToFavorites,
  removeFromFavorites,
  fetchFavoriteRecipes, 
} from '../../redux/recipes/recipesSlice';
import { useModal } from '../../hooks/useModal';
import styles from './RecipePreparation.module.css';

const RecipePreparation = ({ preparation = '', recipeId }) => {
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector(state => state.auth);
  const favoriteRecipesFromState = useSelector(state => state.recipes.favoriteRecipes);
  const { openModal } = useModal();

  const favoriteRecipes = Array.isArray(favoriteRecipesFromState)
    ? favoriteRecipesFromState
    : (favoriteRecipesFromState?.data || []);

  const isRecipeFavorite = favoriteRecipes.some(
    fav => fav?._id === recipeId || fav?.id === recipeId
  );

  const handleToggleFavorite = (e) => {
    e.preventDefault?.();
    e.stopPropagation?.();

    if (!isAuthenticated) {
      openModal('signin');
      return;
    }

    if (isRecipeFavorite) {
      dispatch(removeFromFavorites(recipeId)).then(() => {
        dispatch(fetchFavoriteRecipes()); 
      });
    } else {
      dispatch(addToFavorites(recipeId)).then(() => {
        dispatch(fetchFavoriteRecipes()); 
      });
    }
  };

  const paragraphs = preparation ? preparation.split('\n\n') : [];

  return (
    <div className={styles.wrapper}>
      <h3 className={styles.title}>Recipe Preparation</h3>
      {paragraphs.map((para, index) => (
        <p key={index} className={styles.text}>
          {para}
        </p>
      ))}
      <button
        type="button"
        onClick={handleToggleFavorite}
        className={styles.favoriteBtn}
      >
        {isRecipeFavorite ? 'Remove from favorites' : 'Add to favorites'}
      </button>
    </div>
  );
};

export default RecipePreparation;
