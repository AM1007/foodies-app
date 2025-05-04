import styles from './CategoryList.module.css';
import categories from '../../data/categories.js';
import icons from '../../icons/sprite.svg';

export default function CategoryList({ onCategoryClick }) {
  return (
    <section className={styles.container}>
      <div className={styles.categoryListContainer}>
        <div className={styles.grid}>
          {categories.map(cat => (
            <div
              key={cat.name}
              className={`
                ${styles.card} 
                ${cat.isWideTablet ? styles.tabletWide : ''} 
                ${cat.isWideDesktop ? styles.desktopWide : ''}
              `}
              onClick={() => onCategoryClick(cat.name)}
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
            onClick={() => onCategoryClick('All categories')}
          >
            ALL CATEGORIES
          </div>
        </div>
      </div>
    </section>
  );
}
