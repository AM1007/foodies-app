import React from 'react';
import { Link } from 'react-router-dom';
import styles from './RecipeCard.module.css';
import icons from '../../../icons/sprite.svg';

const RecipeCard = ({
  recipe,
  isFavorite,
  onFavoriteToggle,
  onAuthorClick,
  onViewRecipe,
}) => {
  if (!recipe) return null;

  const avatarUrl = recipe.user?.avatar?.startsWith('http')
    ? recipe.user.avatar
    : null;

  const recipeId = recipe.id || recipe._id;

  const handleFavoriteClick = e => {
    e.preventDefault();
    e.stopPropagation();
    e.nativeEvent.stopImmediatePropagation();
    onFavoriteToggle?.();
  };

  return (
    <div className={styles.card}>
      <Link to={`/recipes/${recipeId}`} className={styles.imageLink}>
        <img src={recipe.thumb} alt={recipe.title} className={styles.image} />
      </Link>
      <div className={styles.content}>
        <h4 className={styles.title}>{recipe.title}</h4>
        <p className={styles.description}>{recipe.description}</p>
        <div className={styles.wrapper}>
          <button
            type="button"
            className={styles.author}
            onClick={onAuthorClick}
          >
            <img
              src={avatarUrl}
              alt={recipe.user?.name || 'Anonymous'}
              className={styles.avatar}
            />
            {recipe.user?.name || 'Anonymous'}
          </button>
          <div className={styles.wrap}>
            <button
              type="button"
              className={`${styles.heart} ${isFavorite ? styles.active : ''}`}
              onMouseDown={e => e.preventDefault()}
              onClick={handleFavoriteClick}
              aria-label="Toggle favorite"
            >
              <svg className={styles.icon}>
                <use href={`${icons}#heart`} />
              </svg>
            </button>

            <button
              type="button"
              className={styles.arrow}
              onClick={onViewRecipe}
              aria-label="View recipe"
            >
              <svg className={styles.icon}>
                <use href={`${icons}#arrow-up-right`} />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(RecipeCard);
