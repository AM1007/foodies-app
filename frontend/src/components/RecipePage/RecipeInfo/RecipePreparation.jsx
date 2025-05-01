import React, { useState } from 'react';
import styles from './RecipePreparation.module.css';
import { useAuth } from '../../../hooks/useAuth';
// import { useNavigate } from 'react-router-dom';
import axios from "axios";


const RecipePreparation = ({ preparation, isFavorite, recipeId }) => {
  const { isAuth } = useAuth();
//   const navigate = useNavigate();
  const [favorite, setFavorite] = useState(isFavorite);

  const handleToggleFavorite = async () => {
    if (!isAuth) {
      // Показати модалку або перенаправити
      alert('Sign in to add recipes to favorites!');
      return;
    }

    try {
      if (favorite) {
        await axios.delete(`/favorites/${recipeId}`);
      } else {
        await axios.post(`/favorites`, { recipeId });
      }
      setFavorite(!favorite);
    } catch (err) {
      console.error('Failed to update favorites', err);
    }
  };

  return (
    <section className="container">
      <div className={styles.wrapper}>
        <h3 className={styles.title}>Recipe Preparation</h3>
        <p className={styles.text}>{preparation}</p>

        <button onClick={handleToggleFavorite} className={styles.favoriteBtn}>
          {favorite ? 'Remove from favorites' : 'Add to favorites'}
        </button>
      </div>
    </section>
  );
};

export default RecipePreparation;
