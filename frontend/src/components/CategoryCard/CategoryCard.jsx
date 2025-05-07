// CategoryCard.jsx - Make sure to save this with .jsx extension
import React from 'react';
import styles from './CategoryCard.module.css';
import icons from '../../icons/sprite.svg';

const CategoryCard = ({ category, onCategoryClick }) => {
  const handleIconClick = e => {
    e.stopPropagation();
    onCategoryClick('All categories');
  };

  return (
    <div className={styles.card} onClick={() => onCategoryClick(category.name)}>
      <img src={category.image} alt={category.name} className={styles.image} />
      <div className={styles.buttonWrap}>
        <button className={styles.button}>{category.name}</button>
        <svg
          width="24"
          height="24"
          className={styles.icon}
          onClick={handleIconClick}
        >
          <use href={`${icons}#arrow-up-right`} />
        </svg>
      </div>
    </div>
  );
};

export default CategoryCard;
