import { useDispatch, useSelector } from 'react-redux';
import { fetchCategories } from '../../redux/categories/categoriesSlice';
import { fetchRecipes } from '../../redux/recipes/recipesSlice';
import { useState, useEffect } from 'react';
import styles from './CategoryList.module.css';
import icons from '../../icons/sprite.svg';
import Loader from '../Loader/Loader';

export default function CategoryList({ onCategoryClick }) {
  const dispatch = useDispatch();
  const {
    items: categories,
    loading,
    error,
  } = useSelector(state => state.categories);
  const [isDesktop, setIsDesktop] = useState(
    typeof window !== 'undefined' && window.innerWidth >= 1440,
  );
  const [showAllCategories, setShowAllCategories] = useState(false);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 1440);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleCategoryClick = async (categoryId, categoryName) => {
    try {
      if (categoryName === 'All categories') {
        setShowAllCategories(true);
        return;
      } else {
        await dispatch(
          fetchRecipes({ page: 1, category: categoryId }),
        ).unwrap();
        onCategoryClick(categoryId, categoryName);
      }
    } catch (error) {
 
    }
  };

  if (loading) return <Loader />;
  if (error) return <div>Помилка завантаження категорій: {error}</div>;
  if (!categories || categories.length === 0)
    return <div>Категорії не знайдено</div>;

  const limitedCategories = showAllCategories
    ? categories
    : categories.slice(0, Math.max(0, categories.length - 4));

  const rows = Array.from(
    { length: Math.ceil(limitedCategories.length / 3) },
    (_, i) => limitedCategories.slice(i * 3, i * 3 + 3),
  );
  const lastRow = rows.length - 1;

  const showAllCategoriesButton = !showAllCategories;

  return (
    <section className={styles.categoriesWrapper}>
      <div className={styles.categoryListContainer}>
        {isDesktop ? (
          rows.map((row, rowIndex) => (
            <div key={rowIndex} className={styles.row}>
              {row.map((cat, idx) => (
                <div
                  key={cat.id}
                  className={`${styles.card} ${
                    styles[`card-row${rowIndex % 4}-item${idx}`]
                  }`}
                  onClick={() => handleCategoryClick(cat.id, cat.name)}
                >
                  <img
                    src={
                      cat.imageUrl ||
                      `/image/categories/${cat.name.toLowerCase()}-1x.png`
                    }
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
              {rowIndex === lastRow && showAllCategoriesButton && (
                <div
                  className={`${styles.card} ${styles.allCategories}`}
                  onClick={() => handleCategoryClick(null, 'All categories')}
                >
                  All categories
                </div>
              )}
            </div>
          ))
        ) : (
          <div className={styles.grid}>
            {limitedCategories.map(cat => (
              <div
                key={cat.id}
                className={styles.card}
                onClick={() => handleCategoryClick(cat.id, cat.name)}
              >
                <img
                  src={
                    cat.imageUrl ||
                    `/image/categories/${cat.name.toLowerCase()}-1x.png`
                  }
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
            {showAllCategoriesButton && (
              <div
                className={`${styles.card} ${styles.allCategories}`}
                onClick={() => handleCategoryClick(null, 'All categories')}
              >
                All categories
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
