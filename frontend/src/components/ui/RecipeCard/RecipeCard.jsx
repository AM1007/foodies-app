import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import styles from './RecipeCard.module.css';
import { addToFavorites, removeFromFavorites } from '../../../redux/recipes/recipesSlice';
// import { ReactComponent as HeartIcon } from '../../assets/icons/heart.svg';
// import { ReactComponent as ArrowIcon } from '../assets/icons/arrow.svg';
import { useAuth } from '../../../hooks/useAuth';

const RecipeCard = ({ recipe }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isAuth } = useAuth();
  const favoriteList = useSelector((state) => state.recipes.favoriteRecipes);

  const isFavorite = favoriteList.some((r) => r._id === recipe._id);

  const handleFavoriteToggle = () => {
    if (!isAuth) return alert('Please sign in to manage favorites');
    if (isFavorite) {
      dispatch(removeFromFavorites(recipe._id));
    } else {
      dispatch(addToFavorites(recipe._id));
    }
  };

  const handleAuthorClick = () => {
    if (!isAuth) return alert('Sign in to view profile');
    if (recipe.user?.id) navigate(`/user/${recipe.user.id}`);
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
              className={`${styles.heart} ${isFavorite ? styles.active : ''}`}
              onClick={handleFavoriteToggle}
            >
              {/* <HeartIcon /> */}
            </button>
            <button className={styles.arrow} onClick={handleViewRecipe}>
              {/* <ArrowIcon /> */}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeCard;
