import styles from './CategoryList.module.css';

const categories = [
  { name: 'Beef', image: '/image/categories/Beef_1x-min.png' },
  { name: 'Breakfast', image: '/image/categories/Breakfast_1x-min.png' },
  {
    name: 'Desserts',
    image: '/image/categories/Desserts_1x-min.png',
    large: true,
  },
  { name: 'Lamb', image: '/image/categories/Lamb_1x-min.png' },
  { name: 'Goat', image: '/image/categories/Goat_1x-min.png' },
  {
    name: 'Miscellaneous',
    image: '/image/categories/Miscellaneous_1x-min.png',
  },
  { name: 'Pasta', image: '/image/categories/Pasta_1x-min.png' },
  { name: 'Pork', image: '/image/categories/Pork_1x-min.png', large: true },
  {
    name: 'Seafood',
    image: '/image/categories/Seafood_1x-min.png',
    large: true,
  },
  { name: 'Side', image: '/image/categories/Side_1x-min.png' },
  { name: 'Starter', image: '/image/categories/Starter_1x-min.png' },
];

export default function CategoryList({ onCategoryClick }) {
  return (
    <div className={styles.grid}>
      {categories.map(cat => (
        <div
          key={cat.name}
          className={`${styles.card} ${
            cat.large ? styles.large : styles.small
          }`}
          onClick={() => onCategoryClick(cat.name)}
        >
          <img src={cat.image} alt={cat.name} className={styles.image} />
          <div className={styles.buttonWrap}>
            <button className={styles.button}>{cat.name}</button>
            <svg width="24" height="24" className={styles.icon}>
              <use href="/icons/sprite.svg#arrow-up-right"></use>
            </svg>
          </div>
        </div>
      ))}

      {/* <div className={styles.buttonWrap}>
        <button className={styles.button}>ALL CATEGORIES</button>
      </div> */}
    </div>
  );
}
