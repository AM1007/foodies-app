import { Link } from 'react-router-dom';
// import { useAuth } from '../../../hooks/useAuth';
import HeroImages from '../../ui/HeroImages/HeroImages.jsx';

import styles from './Hero.module.css';

const Hero = () => {
  // const navigate = useNavigate();
  // const { isAuthenticated } = useAuth();

  return (
    <section className={styles.heroSection}>
      <div className={styles.heroContainer}>
        <div className={styles.textWrapper}>
          <h1 className={styles.title}>Improve Your Culinary Talents</h1>
          <p className={styles.subtitle}>
            Amazing recipes for beginners in the world of cooking, enveloping
            you in the aromas and tastes of various cuisines.
          </p>
          <Link to="/recipes/add" className={styles.heroButton}>
            Add Recipe
          </Link>
        </div>

        <HeroImages />
      </div>
    </section>
  );
};

export default Hero;
