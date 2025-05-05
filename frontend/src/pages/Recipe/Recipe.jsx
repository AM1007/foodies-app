import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRecipeDetails, fetchPopularRecipes } from '../../redux/recipes/recipesSlice';
import Loader from '../../components/Loader/Loader';
import PathInfo from '../../components/ui/PathInfo/PathInfo';
import RecipeInfo from '../../components/RecipeInfo/RecipeInfo';
import PopularRecipes from '../../components/PopularRecipes/PopularRecipes';

const RecipePage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { currentRecipe, favoriteRecipes, loading, error } = useSelector(state => state.recipes);

  useEffect(() => {
    if (id) dispatch(fetchRecipeDetails(id));
    dispatch(fetchPopularRecipes());
  }, [dispatch, id]);

  if (loading) return <Loader />;
  if (error) return <p style={{ textAlign: 'center' }}>Error: {error}</p>;
  if (!currentRecipe) return <p style={{ textAlign: 'center' }}>Recipe not found</p>;

  return (
    <div className="container">
      <PathInfo current={currentRecipe.title} />
      <RecipeInfo recipe={currentRecipe} favoriteRecipes={favoriteRecipes} />
      <div style={{ marginTop: '120px' }}>
        <PopularRecipes  />
      </div>
    </div>
  );
};

export default RecipePage;
