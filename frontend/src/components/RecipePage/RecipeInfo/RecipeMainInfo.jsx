import React from 'react';
import styles from './RecipeMainInfo.module.css';
import { useAuth } from '../../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';

const RecipeMainInfo = ({ preview, title, category, description, author }) => {
  const { isAuth } = useAuth();
  const navigate = useNavigate();

  const handleAuthorClick = () => {
    if (!isAuth) {
      // тут буде логіка відкриття модалки
      alert('Please sign in to view user profiles');
    } else {
      navigate(`/user/${author._id}`);
    }
  };

  return (
    <section className="container">
      <div className={styles.recipeMainInfo}>
        <img src={preview} alt={title} className={styles.image} />

        <div className={styles.info}>
          <h2 className={styles.title}>{title}</h2>
          <p className={styles.category}>{category}</p>
          <p className={styles.description}>{description}</p>

          <button className={styles.authorBtn} onClick={handleAuthorClick}>
            by {author?.name || 'Anonymous'}
          </button>
        </div>
      </div>
    </section>
  );
};

export default RecipeMainInfo;
