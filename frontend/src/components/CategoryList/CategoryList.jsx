// CategoryList.jsx
import { useDispatch } from 'react-redux';
import { fetchRecipes } from '../../redux/recipes/recipesSlice';
import { toast } from 'react-toastify';
import styles from '../CategoryList/CategoryList.module.css';
import categories from '../../data/categories.js';
import CategoryCard from '../../components/CategoryCard/CategoryCard.jsx';

export default function CategoryList({ onCategoryClick }) {
  const dispatch = useDispatch();

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
      toast.error(
        `Failed to fetch recipes: ${error.message || 'Unknown error'}`,
      );
    }
  };

  return (
    <section className="container">
      <div className={styles.categoryListContainer}>
        <div className={styles.grid}>
          {categories.map(cat => (
            <div key={cat.name} className={styles.card}>
              <CategoryCard
                category={cat}
                onCategoryClick={handleCategoryClick}
              />
            </div>
          ))}

          <div
            className={`${styles.card} ${styles.allCategories}`}
            onClick={() => handleCategoryClick('All categories')}
          >
            All categories
          </div>
        </div>
      </div>
    </section>
  );
}
