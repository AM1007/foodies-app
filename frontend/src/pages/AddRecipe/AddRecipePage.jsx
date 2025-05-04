import { useNavigate } from 'react-router-dom';

import PathInfo from '../../components/ui/PathInfo/PathInfo';
import MainTitle from '../../components/ui/MainTitle/MainTitle';
import SubTitle from '../../components/ui/SubTitle/SubTitle';
import AddRecipeForm from '../../components/AddRecipeForm/AddRecipeForm';

const AddRecipePage = () => {
  const navigate = useNavigate();

  const handleHome = () => {
    navigate('/');
  };

  return (
    <div className="container">
      <PathInfo current="ADD RECIPE" onHomeClick={handleHome} />
      <MainTitle text="Add recipe" />
      <SubTitle text="Reveal your culinary art, share your favorite recipe and create gastronomic masterpieces with us." />
      <AddRecipeForm />
    </div>
  );
};

export default AddRecipePage;
