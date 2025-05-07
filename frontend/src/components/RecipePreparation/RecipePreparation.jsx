import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { addToFavorites, removeFromFavorites } from '../../redux/recipes/recipesSlice';
import { useModal } from '../../hooks/useModal';
import styles from './RecipePreparation.module.css';

const RecipePreparation = ({ preparation, recipeId }) => {
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector(state => state.auth);
  const favoriteRecipes = useSelector(state => state.recipes.favoriteRecipes);
  const { openModal } = useModal();

  const [isRecipeFavorite, setIsRecipeFavorite] = useState(false);

  useEffect(() => {
    const isFavoriteInList = favoriteRecipes.some(
      fav => fav._id === recipeId || fav.id === recipeId
    );
    setIsRecipeFavorite(isFavoriteInList);
  }, [favoriteRecipes, recipeId]);

  const handleToggleFavorite = () => {
    if (!isAuthenticated) {
      openModal('signin');
      return;
    }
    if (isRecipeFavorite) {
      dispatch(removeFromFavorites(recipeId));
    } else {
      dispatch(addToFavorites(recipeId));
    }
  };

  return (
    <section className="wrap">
      <div className={styles.wrapper}>
        <h3 className={styles.title}>Recipe Preparation</h3>
        <p className={styles.text}>{preparation}</p>
        <button onClick={handleToggleFavorite} className={styles.favoriteBtn}>
          {isRecipeFavorite ? 'Remove from favorites' : 'Add to favorites'}
        </button>
      </div>
    </section>
  );
};

export default RecipePreparation;
