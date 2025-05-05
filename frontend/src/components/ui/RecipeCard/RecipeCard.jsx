import styles from './RecipeCard.module.css';
import icons from '../../../icons/sprite.svg';
import avatar from '/assets/avatar.png';

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
    : avatar;

  return (
    <div className={styles.card}>
      <img src={recipe.thumb} alt={recipe.title} className={styles.image} />
      <div className={styles.content}>
        <h4 className={styles.title}>{recipe.title}</h4>
        <p className={styles.description}>{recipe.description}</p>
        <div className={styles.wrapper}>
          <button className={styles.author} onClick={onAuthorClick}>
            <img
              src={avatarUrl}
              alt={recipe.user?.name || 'Anonymous'}
              className={styles.avatar}
            />
            {recipe.user?.name || 'Anonymous'}
          </button>
          <div className={styles.wrap}>
            <button
              className={`${styles.heart} ${isFavorite ? styles.active : ''}`}
              onClick={onFavoriteToggle}
              aria-label="Toggle favorite"
            >
              <svg className={styles.icon}>
                <use href={`${icons}#heart`} />
              </svg>
            </button>
            <button
              className={styles.arrow}
              onClick={onViewRecipe}
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
