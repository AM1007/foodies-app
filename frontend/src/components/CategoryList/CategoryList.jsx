import { useDispatch } from 'react-redux';
import { fetchRecipes } from '../../redux/recipes/recipesSlice';
import { useState, useEffect } from 'react';
import styles from './CategoryList.module.css';
import categories from '../../data/categories.js';
import icons from '../../icons/sprite.svg';

export default function CategoryList({ onCategoryClick }) {
  const dispatch = useDispatch();
  const [isDesktop, setIsDesktop] = useState(
    typeof window !== 'undefined' && window.innerWidth >= 1440,
  );
  // temporary comment
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 1440);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleCategoryClick = async categoryName => {
    try {
      if (categoryName === 'All categories') {
        await dispatch(fetchRecipes({ page: 1 })).unwrap();
      } else {
        await dispatch(
          fetchRecipes({ page: 1, category: categoryName }),
        ).unwrap();
      }
      onCategoryClick(categoryName);
    } catch (error) {
      console.log(
        `Failed to fetch recipes: ${error.message || 'Unknown error'}`,
      );
    }
  };

  const rows = Array.from(
    { length: Math.ceil(categories.length / 3) },
    (_, i) => categories.slice(i * 3, i * 3 + 3),
  );
  const lastRow = rows.length - 1;

  return (
    <section className={styles.categoriesWrapper}>
      <div className={styles.categoryListContainer}>
        {isDesktop ? (
          rows.map((row, rowIndex) => (
            <div key={rowIndex} className={styles.row}>
              {row.map((cat, idx) => (
                <div
                  key={cat.name}
                  className={`${styles.card} ${
                    styles[`card-row${rowIndex % 4}-item${idx}`]
                  }`}
                  onClick={() => handleCategoryClick(cat.name)}
                >
                  <img
                    src={cat.image}
                    alt={cat.name}
                    className={styles.image}
                  />
                  <div className={styles.buttonWrap}>
                    <button className={styles.button}>{cat.name}</button>
                    <svg width="24" height="24" className={styles.icon}>
                      <use href={`${icons}#arrow-up-right`} />
                    </svg>
                  </div>
                </div>
              ))}
              {rowIndex === lastRow && (
                <div
                  className={`${styles.card} ${styles.allCategories}`}
                  onClick={() => handleCategoryClick('All categories')}
                >
                  All categories
                </div>
              )}
            </div>
          ))
        ) : (
          <div className={styles.grid}>
            {categories.map((cat, index) => (
              <div
                key={cat.name}
                className={`${styles.card} ${
                  styles.wideCard && (index === 2 || index === 7)
                    ? styles.wideCard
                    : ''
                }`}
                onClick={() => handleCategoryClick(cat.name)}
              >
                <img src={cat.image} alt={cat.name} className={styles.image} />
                <div className={styles.buttonWrap}>
                  <button className={styles.button}>{cat.name}</button>
                  <svg width="24" height="24" className={styles.icon}>
                    <use href={`${icons}#arrow-up-right`} />
                  </svg>
                </div>
              </div>
            ))}
            <div
              className={`${styles.card} ${styles.allCategories}`}
              onClick={() => handleCategoryClick('All categories')}
            >
              All categories
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
