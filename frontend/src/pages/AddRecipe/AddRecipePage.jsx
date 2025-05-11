import { useNavigate } from 'react-router-dom';

import PathInfo from '../../components/ui/PathInfo/PathInfo';
import MainTitle from '../../components/ui/MainTitle/MainTitle';
import SubTitle from '../../components/ui/SubTitle/SubTitle';
import AddRecipeForm from '../../components/AddRecipeForm/AddRecipeForm';
import styles from './AddRecipePage.module.css';

const AddRecipePage = () => {
  const navigate = useNavigate();

  const handleHome = () => {
    navigate('/');
  };

  return (
    <div className={`container ${styles.recipePageWrapper}`}>
      <div className={styles.recipePageInfo}>
        <PathInfo current="Add recipe" onHomeClick={handleHome} />
        <div className={styles.subTitle}>
          <MainTitle text="Add recipe" />
          <SubTitle text="Reveal your culinary art, share your favorite recipe and create gastronomic masterpieces with us." />
        </div>
      </div>
      <AddRecipeForm />
    </div>
  );
};

export default AddRecipePage;
