import { Link } from 'react-router-dom';
// import { useAuth } from '../../../hooks/useAuth';
import HeroImages from '../../ui/HeroImages/HeroImages.jsx';
import styles from './Hero.module.css';

const Hero = () => {
  // const navigate = useNavigate();
  // const { isAuthenticated } = useAuth();

  // const handleAddRecipe = () => {
  //   if (isAuthenticated) {
  //     navigate('/recipe/add');
  //   } else {
  //     alert('Please sign in to add a recipe.');
  //   }
  // };

  return (
    <section className="container">
      <div className={styles.heroSection}>
        <div className={styles.textWrapper}>
          <h1 className={styles.title}>Improve Your Culinary Talents</h1>
          <p className={styles.subtitle}>
            Amazing recipes for beginners in the world of cooking, enveloping
            you in the aromas and tastes of various cuisines.
          </p>
          <Link to="/recipe/add" className={styles.heroButton}>
            Add Recipe
          </Link>
        </div>

        <HeroImages />
      </div>
    </section>
  );
};

export default Hero;
