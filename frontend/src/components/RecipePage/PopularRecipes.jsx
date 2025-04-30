import React from 'react';
import styles from './PopularRecipes.module.css';
import RecipeCard from '../../ui/RecipeCard/RecipeCard';

const PopularRecipes = ({ recipes }) => {
  if (!recipes?.length) return null;

  return (
    <section className="container">
      <div className={styles.popular}>
        <h3 className={styles.title}>Popular Recipes</h3>
        <ul className={styles.list}>
          {recipes.map((recipe) => (
            <li key={recipe._id}>
              <RecipeCard recipe={recipe} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default PopularRecipes;