import styles from './RecipeMainInfo.module.css';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useModal } from '../../hooks/useModal';

const RecipeMainInfo = ({ title, category, time, description, author }) => {
  const { isAuthenticated } = useSelector(state => state.auth);
  const navigate = useNavigate();
  const { openModal } = useModal();

  const handleAuthorClick = () => {
    if (!author?._id) return;

    if (!isAuthenticated) {
      openModal('signin');
    } else {
      navigate(`/user/${author._id}`);
    }
  };

  return (
    <section className="container">
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
              src={author?.avatar || '/placeholder.jpg'}
              alt={author?.name || 'Anonymous'}
              className={styles.authorImage}
            />
            <div className={styles.authorText}>
              <span className={styles.authorLabel}>Created by:</span>
              <button
                type="button"
                onClick={handleAuthorClick}
                className={styles.authorName}
              >
                {author?.name || 'Anonymous'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RecipeMainInfo;
