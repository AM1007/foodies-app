import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchRecipes } from '../../redux/recipes/recipesSlice';
import styles from './RecipeList.module.css';
import MainTitle from '../../components/ui/MainTitle/MainTitle';
import SubTitle from '../../components/ui/SubTitle/SubTitle';
import RecipeCardContainer from '../../components/RecipeCardContainer/RecipeCardContainer';
import Loader from '../../components/Loader/Loader';
import RecipeFilters from '../../components/RecipeFilters/RecipeFilters';

const RecipeList = ({ category }) => {
  const dispatch = useDispatch();
  const { recipes, loading, error } = useSelector(state => state.recipes);

  useEffect(() => {
    if (!category) {
      dispatch(fetchRecipes({ page: 1 }));
    }
  }, [dispatch, category]);

  useEffect(() => {
    console.log('Recipes from Redux:', recipes);
  }, [recipes]);

  const handleDelete = async id => {
    try {
      dispatch(deleteRecipe(id));
    } catch (error) {
      console.error('Error deleting recipe:', error);
    }
  };

  return (
    <>
      <MainTitle text={category || 'Recipes'} />
      <SubTitle text="Browse our delicious collection" />
      <div className={styles.wrap}>
        <RecipeFilters />
        <div>
          {loading && (
            <div className={styles.loaderWrapper}>
              <Loader />
            </div>
          )}
          {error && <p className={styles.errorMessage}>{error}</p>}
          <div className={styles.wrapper}>
            {recipes && recipes.length > 0
              ? recipes.map(recipe => (
                  <RecipeCardContainer key={recipe.id} recipe={recipe} />
                ))
              : !loading && (
                  <div className={styles.emptyState}>
                    <p>No recipes found for this category. Try another one!</p>
                  </div>
                )}
          </div>
        </div>
      </div>
    </>
  );
};

export default RecipeList;
