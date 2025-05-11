import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCategories } from '../../redux/categories/categoriesSlice';
import { fetchRecipes } from '../../redux/recipes/recipesSlice';
import CategoryCard from '../CategoryCard/CategoryCard';
import styles from './CategoryList.module.css';
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
    const handleResize = () => setIsDesktop(window.innerWidth >= 1440);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleCategoryClick = async (categoryId, categoryName) => {
    if (categoryName === 'All categories') {
      setShowAllCategories(true);
      return;
    }
    await dispatch(fetchRecipes({ page: 1, category: categoryId })).unwrap();
    onCategoryClick(categoryId, categoryName);
  };

  if (loading) return <Loader />;
  if (error) return <div>Error loading categories: {error}</div>;
  if (!categories.length) return <div>Categories not found</div>;

  const limited = showAllCategories
    ? categories
    : categories.slice(0, categories.length - 4);

  const rows = Array.from({ length: Math.ceil(limited.length / 3) }, (_, i) =>
    limited.slice(i * 3, i * 3 + 3),
  );
  const lastRow = rows.length - 1;
  const showAllBtn = !showAllCategories;

  return (
    <section className={styles.categoriesWrapper}>
      <div className={styles.categoryListContainer}>
        {isDesktop ? (
          rows.map((row, rowIndex) => (
            <div key={rowIndex} className={styles.row}>
              {row.map((cat, idx) => (
                <CategoryCard
                  key={cat.id}
                  category={cat}
                  onClick={handleCategoryClick}
                  className={styles[`card-row${rowIndex}-item${idx}`]}
                />
              ))}
              {rowIndex === lastRow && showAllBtn && (
                <CategoryCard
                  key="all-categories"
                  category={{ id: null, name: 'All categories' }}
                  onClick={handleCategoryClick}
                  isAllCategories
                  className={styles[`card-row${rowIndex}-item${row.length}`]}
                />
              )}
            </div>
          ))
        ) : (
          <div className={styles.grid}>
            {limited.map(cat => (
              <CategoryCard
                key={cat.id}
                category={cat}
                onClick={handleCategoryClick}
              />
            ))}
            {showAllBtn && (
              <CategoryCard
                key="all-categories"
                category={{ id: null, name: 'All categories' }}
                onClick={handleCategoryClick}
                isAllCategories
              />
            )}
          </div>
        )}
      </div>
    </section>
  );
}
