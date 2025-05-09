import { useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { useModal } from '../../../hooks/useModal.js';
// import { useAuth } from '../../../hooks/useAuth';
import HeroImages from '../../ui/HeroImages/HeroImages.jsx';

import styles from './Hero.module.css';

const Hero = () => {
  // const navigate = useNavigate();
  // const { isAuthenticated } = useAuth();
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
          <h1 className={styles.title}>Improve Your Culinary Talents</h1>
          <p className={styles.subtitle}>
            Amazing recipes for beginners in the world of cooking, enveloping
            you in the aromas and tastes of various cuisines.
          </p>
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
