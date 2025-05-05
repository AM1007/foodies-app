import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import styles from './RecipeCard.module.css';
import { addToFavorites, removeFromFavorites } from '../../../redux/recipes/recipesSlice';
import { useModal } from '../../../hooks/useModal';
import icons from '../../../icons/sprite.svg';

const RecipeCard = ({ recipe }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector(state => state.auth);
  const favoriteRecipes = useSelector(state => state.recipes.favoriteRecipes);
  const { openModal } = useModal();

  const isRecipeFavorite = favoriteRecipes.some(fav => fav._id === recipe._id);

  const handleFavoriteToggle = () => {
    if (!isAuthenticated) {
      openModal('signin');
      return;
    }
    if (isRecipeFavorite) {
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
    <div className={styles.card}>
      <img src={recipe.preview} alt={recipe.title} className={styles.image} />
      <div className={styles.content}>
        <h4 className={styles.title}>{recipe.title}</h4>
        <p className={styles.description}>{recipe.description}</p>
        <div className={styles.footer}>
          <button className={styles.author} onClick={handleAuthorClick}>
            <img
              src={recipe.user?.avatar || '/default-avatar.jpg'}
              alt={recipe.user?.name || 'Anonymous'}
              className={styles.authorAvatar}
            />
            {recipe.user?.name || 'Anonymous'}
          </button>
          <div className={styles.actions}>
            <button
              className={`${styles.heart} ${isRecipeFavorite ? styles.active : ''}`}
              onClick={handleFavoriteToggle}
              aria-label="Toggle favorite"
            >
              <svg className={styles.icon}>
                <use href={`${icons}#heart`} />
              </svg>
            </button>
            <button
              className={`${styles.arrow}`}
              onClick={handleViewRecipe}
              aria-label="View recipe"
            >
              <svg className={styles.icon}>
                <use href={`${icons}#arrow`} />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeCard;
