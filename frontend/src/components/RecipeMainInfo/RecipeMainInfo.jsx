import styles from './RecipeMainInfo.module.css';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useModal } from '../../hooks/useModal';

const RecipeMainInfo = ({ title, category, time, description, user }) => {
  const { isAuthenticated } = useSelector(state => state.auth);
  const navigate = useNavigate();
  const { openModal } = useModal();

  const handleAuthorClick = () => {
    if (!user?.id) return;

    if (!isAuthenticated) {
      openModal('signin');
    } else {
      navigate(`/users/${user.id}`);
    }
  };

  const avatarUrl = user?.avatar?.startsWith('http') ? user.avatar : null;

  return (
    <div className={styles.recipeMainInfo}>
      <div className={styles.info}>
        <h2 className={styles.title}>{title}</h2>
        <div className={styles.category}>
          <span>{category}</span>
          <span>{time} min</span>
        </div>
        <p className={styles.description}>{description}</p>
        <div className={styles.authorBlock}>
          <img
            src={avatarUrl}
            alt={user && user.name ? user.name : 'Anonymous'}
            className={styles.authorImage}
          />
          <div className={styles.authorText}>
            <span className={styles.authorLabel}>Created by:</span>
            <button
              type="button"
              onClick={handleAuthorClick}
              className={styles.authorName}
            >
              {user && user.name ? user.name : 'Anonymous'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeMainInfo;
