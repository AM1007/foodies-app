import styles from './RecipeIngredients.module.css';

const RecipeIngredients = ({ ingredients, onRemove, removable = false }) => {
  return (
      <div className={styles.ingredients}>
        <h3 className={styles.title}>Ingredients</h3>
        <ul className={styles.list}>
          {ingredients.map(item => (
            <li key={item._id || item.id} className={styles.item}>
              <div className={styles.imageWrapper}>
                <img src={item.img || '/placeholder.png'} alt={item.name} className={styles.image} />
              </div>
              <div className={styles.textBlock}>
                <p className={styles.name}>{item.name}</p>
                <p className={styles.amount}>{item.amount}</p>
              </div>
              {removable && onRemove && (
                <button 
                  type="button"
                  className={styles.removeButton}
                  onClick={() => onRemove(item._id || item.id)}
                  aria-label={`Remove ${item.name}`}
                >
                  ✕
                </button>
              )}
            </li>
          ))}
        </ul>
      </div>
  );
};

export default RecipeIngredients;