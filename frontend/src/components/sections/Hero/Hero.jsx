import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useModal } from '../../../hooks/useModal.js';
import HeroImages from '../../ui/HeroImages/HeroImages.jsx';
import styles from './Hero.module.css';

const Hero = () => {
  const navigate = useNavigate();
  const { openModal } = useModal();
  const { isAuthenticated = false } = useSelector(state => state.auth || {});

  const handleAddRecipeClick = () => {
    if (isAuthenticated) {
      navigate('/recipes/add');
    } else {
      openModal('signin');
    }
  };
  return (
    <section className={styles.heroSection}>
      <div className={styles.heroContainer}>
        <div className={styles.textWrapper}>
          <motion.h1
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
            className={styles.title}
          >
            Improve Your Culinary Talents
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.6 }}
            className={styles.subtitle}
          >
            Amazing recipes for beginners in the world of cooking, enveloping
            you in the aromas and tastes of various cuisines.
          </motion.p>
          <button className={styles.heroButton} onClick={handleAddRecipeClick}>
            Add Recipe
          </button>
        </div>

        <HeroImages />
      </div>
    </section>
  );
};

export default Hero;
