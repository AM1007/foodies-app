// Hero.jsx
import { useNavigate } from 'react-router-dom';
import styles from './Hero.module.css';

const Hero = () => {
  const navigate = useNavigate();

  const handleAddRecipe = () => {
    navigate('/add-recipe');
  };

  return (
    <section className={styles.hero}>
      <div className={styles.textContainer}>
        <h1 className={styles.mainTitle}>Improve Your Culinary Talents</h1>

        <p className={styles.subtitle}>
          Amazing recipes for beginners in the world of cooking, enveloping you
          in the aromas and tastes of various cuisines.
        </p>

        <button className={styles.button} onClick={handleAddRecipe}>
          ADD RECIPE
        </button>
      </div>

      <div className={styles.imagesWrapper}>
        <img
          src="/image_hero/image_hero_dish1_1x.png"
          alt="Dish1"
          className={styles.image1}
        />
        <img
          src="/image_hero/image_hero_dish2_1x.png"
          alt="Dish2"
          className={styles.image2}
        />
      </div>
    </section>
  );
};

export default Hero;
