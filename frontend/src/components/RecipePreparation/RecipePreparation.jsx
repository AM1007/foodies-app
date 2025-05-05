import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { addToFavorites, removeFromFavorites } from '../../redux/recipes/recipesSlice';
import { useAuth } from '../../hooks/useAuth';
import styles from './RecipePreparation.module.css';

const RecipePreparation = ({ preparation, recipeId }) => {
  const dispatch = useDispatch();
  const { isAuth } = useAuth();
  const favoriteRecipes = useSelector(state => state.recipes.favoriteRecipes);
  const [isRecipeFavorite, setIsRecipeFavorite] = useState(false);

  useEffect(() => {
    const isFavoriteInList = favoriteRecipes.some(favoriteRecipe => favoriteRecipe._id === recipeId);
    setIsRecipeFavorite(isFavoriteInList);
  }, [favoriteRecipes, recipeId]);

  const handleToggleFavorite = () => {
    if (!isAuth) {
      alert('Sign in to add recipes to favorites!');
      return;
    }
    if (isRecipeFavorite) {
      dispatch(removeFromFavorites(recipeId));
    } else {
      dispatch(addToFavorites(recipeId));
    }
  };

  return (
    <section className="container">
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
