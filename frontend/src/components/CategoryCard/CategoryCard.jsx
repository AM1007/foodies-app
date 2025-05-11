import React from 'react';
import styles from './CategoryCard.module.css';
import icons from '../../icons/sprite.svg';

export default function CategoryCard({
  category,
  onClick,
  isAllCategories = false,
  className = '',
}) {
  const { id, name, imageUrl } = category;
  const handleClick = () => onClick(id, name);

  const cardClasses = [
    styles.card,
    isAllCategories && styles.allCategories,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={cardClasses} onClick={handleClick}>
      {!isAllCategories ? (
        <>
          <img
            src={imageUrl || `/image/categories/${name.toLowerCase()}-1x.png`}
            alt={name}
            className={styles.image}
          />
          <div className={styles.buttonWrap}>
            <button className={styles.button}>{name}</button>
            <svg className={styles.icon}>
              <use href={`${icons}#arrow-up-right`} />
            </svg>
          </div>
        </>
      ) : (
        <span>All categories</span>
      )}
    </div>
  );
}
