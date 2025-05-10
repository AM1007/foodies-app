import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchRecipeDetails,
  fetchPopularRecipes,
  fetchFavoriteRecipes,
} from '../../redux/recipes/recipesSlice';
import Loader from '../../components/Loader/Loader';
import PathInfo from '../../components/ui/PathInfo/PathInfo';
import RecipeInfo from '../../components/RecipeInfo/RecipeInfo';
import PopularRecipes from '../../components/PopularRecipes/PopularRecipes';
import styles from './Recipe.module.css';

const RecipePage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { currentRecipe, favoriteRecipes, loading, error } = useSelector(
    state => state.recipes,
  );
  const { current: currentUser } = useSelector(state => state.user);

  useEffect(() => {
    if (id) {
      dispatch(fetchRecipeDetails(id));
    }

    dispatch(fetchPopularRecipes());

    if (currentUser) {
      dispatch(fetchFavoriteRecipes());
    }
  }, [dispatch, id, currentUser]);

  if (loading) return <Loader />;
  if (error) return <p style={{ textAlign: 'center' }}>Error: {error}</p>;
  if (!currentRecipe)
    return <p style={{ textAlign: 'center' }}>Recipe not found</p>;

  const safelyPassedFavorites = Array.isArray(favoriteRecipes)
    ? favoriteRecipes
    : favoriteRecipes?.data || [];

  return (
    <div className="container">
      <div className={styles.pageWrapper}>
        <PathInfo current={currentRecipe.title} />
        <RecipeInfo
          recipe={currentRecipe}
          favoriteRecipes={safelyPassedFavorites}
        />
        <div>
          <PopularRecipes />
        </div>
      </div>
    </div>
  );
};

export default RecipePage;
