import React from 'react';
import styles from './RecipeIngredients.module.css';

const RecipeIngredients = ({ ingredients }) => {
  return (
    <section className="container">
      <div className={styles.ingredients}>
        <h3 className={styles.title}>Ingredients</h3>
        <ul className={styles.list}>
          {ingredients?.map((item) => (
            <li key={item.id} className={styles.item}>
              <div className={styles.imageWrapper}>
                <img
                  src={item.image || '/placeholder.png'}
                  alt={item.name}
                  className={styles.image}
                />
              </div>
              <p className={styles.name}>{item.name}</p>
              <p className={styles.amount}>{item.amount}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default RecipeIngredients;
