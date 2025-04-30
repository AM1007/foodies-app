import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../hooks/useAuth';
import styles from './Hero.module.css';
import MainTitle from '../../sharedTitle/MainTitle/MainTitle';
import Subtitle from '../../sharedTitle/SubTitle/Subtitle';

const Hero = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  const handleAddRecipe = () => {
    if (isAuthenticated) {
      navigate('/recipe/add');
    } else {
      alert('Please sign in to add a recipe.');
    }
  };

  return (
    <section className={styles.hero}>
      <div>
        <MainTitle>Improve Your Culinary Talents</MainTitle>
        <Subtitle>
          Amazing recipes for beginners in the world of cooking, enveloping you
          in the aromas and tastes of various cuisines.
        </Subtitle>
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
