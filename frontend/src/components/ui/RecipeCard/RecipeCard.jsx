import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import styles from './RecipeCard.module.css';
import { addToFavorites, removeFromFavorites } from '../../../redux/recipes/recipesSlice';
import { useAuth } from '../../../hooks/useAuth';
import { ModalContext } from '../../../context/ModalContext';

const RecipeCard = ({ recipe }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isAuth } = useAuth();
  const { openModal } = useContext(ModalContext);
  const favoriteRecipes = useSelector(state => state.recipes.favoriteRecipes);

  const isRecipeFavorite = favoriteRecipes.some(favoriteRecipe => favoriteRecipe._id === recipe._id);

  const handleFavoriteToggle = () => {
    if (!isAuth) {
      openModal('signIn');
      return;
    }
    if (isRecipeFavorite) {
      dispatch(removeFromFavorites(recipe._id));
    } else {
      dispatch(addToFavorites(recipe._id));
    }
  };

  const handleAuthorClick = () => {
    if (!isAuth) {
      openModal('signIn');
      return;
    }
    if (recipe.user?._id) navigate(`/user/${recipe.user._id}`);
  };

  const handleViewRecipe = () => navigate(`/recipe/${recipe._id}`);

  return (
    <div className={styles.card}>
      <img src={recipe.preview} alt={recipe.title} className={styles.image} />
      <div className={styles.content}>
        <h4 className={styles.title}>{recipe.title}</h4>
        <p className={styles.description}>{recipe.description}</p>
        <div className={styles.footer}>
          <button className={styles.author} onClick={handleAuthorClick}>
            by {recipe.user?.name || 'Anonymous'}
          </button>
          <div className={styles.actions}>
            <button
              className={`${styles.heart} ${isRecipeFavorite ? styles.active : ''}`}
              onClick={handleFavoriteToggle}
            >
              ❤️
            </button>
            <button className={styles.arrow} onClick={handleViewRecipe}>
              ➡️
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeCard;
