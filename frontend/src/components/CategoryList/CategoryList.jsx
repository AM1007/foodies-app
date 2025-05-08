import { useDispatch } from 'react-redux';
import { fetchRecipes } from '../../redux/recipes/recipesSlice';
import styles from './CategoryList.module.css';
import categories from '../../data/categories.js';
import icons from '../../icons/sprite.svg';

export default function CategoryList({ onCategoryClick }) {
  const dispatch = useDispatch();

  const handleCategoryClick = async (categoryId, categoryName) => {
    try {
      if (categoryName === 'All categories') {
        await dispatch(fetchRecipes({ page: 1 })).unwrap();
      } else {
        await dispatch(
          fetchRecipes({ page: 1, category: categoryId }),
        ).unwrap();
      }

      onCategoryClick(categoryId, categoryName);
    } catch (error) {
      console.log(
        `Failed to fetch recipes: ${error.message || 'Unknown error'}`,
      );
    }
  };

  return (
    <section className="container">
      <div className={styles.categoryListContainer}>
        <div className={styles.grid}>
          {categories.map(cat => (
            <div
              key={cat.name}
              className={`
                ${styles.card}
              `}
              onClick={() => handleCategoryClick(cat.id, cat.name)}
            >
              <img src={cat.image} alt={cat.name} className={styles.image} />
              <div className={styles.buttonWrap}>
                <button className={styles.button}>{cat.name}</button>
                <svg
                  width="24"
                  height="24"
                  className={styles.icon}
                  onClick={() => handleCategoryClick('All categories')}
                >
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
      </div>
    </section>
  );
}
