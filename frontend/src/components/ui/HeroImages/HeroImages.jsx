import styles from './HeroImages.module.css';

const HeroImages = () => {
  return (
    <div className={styles.imageWrapper}>
      <img
        src="/image/hero/dish2-2x.png"
        alt="Dish large"
        className={styles.imageSmall}
      />
      <img
        src="/image/hero/dish1-2x.png"
        alt="Dish small"
        className={styles.imageLarge}
      />
    </div>
  );
};

export default HeroImages;
