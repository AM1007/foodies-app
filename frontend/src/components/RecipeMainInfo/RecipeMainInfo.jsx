import styles from './RecipeMainInfo.module.css';
import { useAuth } from '../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';

const RecipeMainInfo = ({ title, category, time, description, author }) => {
  const { isAuth } = useAuth();
  const navigate = useNavigate();

  const handleAuthorClick = () => {
    if (!isAuth) {
      alert('Please sign in to view user profiles');
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
              <span className={styles.authorName} onClick={handleAuthorClick}>
                {author?.name || 'Anonymous'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RecipeMainInfo;
