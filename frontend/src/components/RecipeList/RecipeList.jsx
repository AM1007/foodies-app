import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchRecipes } from '../../redux/recipes/recipesSlice';
import styles from './RecipeList.module.css';
import MainTitle from '../../components/ui/MainTitle/MainTitle';
import SubTitle from '../../components/ui/SubTitle/SubTitle';
import RecipeCardContainer from '../../components/RecipeCardContainer/RecipeCardContainer';
import Loader from '../../components/Loader/Loader';

const RecipeList = ({ category }) => {
  const dispatch = useDispatch();
  const { recipes, loading, error } = useSelector(state => state.recipes);

  useEffect(() => {
    // Запит відбувається лише при першому рендері, якщо не було передано категорію
    // При виборі категорії запит вже відбувся в CategoryList
    if (!category) {
      dispatch(fetchRecipes({ page: 1 }));
    }
  }, [dispatch, category]);

  useEffect(() => {
    console.log('Recipes from Redux:', recipes);
  }, [recipes]);

  return (
    <div className="container">
      <MainTitle text={category || 'Recipes'} />
      <SubTitle text="Browse our delicious collection" />
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
  );
};

export default RecipeList;
