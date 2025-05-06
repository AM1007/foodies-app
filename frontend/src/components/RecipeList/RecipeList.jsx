import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchRecipes } from '../../redux/recipes/recipesSlice';

import styles from './RecipeList.module.css';
import MainTitle from '../../components/ui/MainTitle/MainTitle';
import SubTitle from '../../components/ui/SubTitle/SubTitle';
import RecipeCard from '../../components/ui/RecipeCard/RecipeCard';

const RecipeList = () => {
  const dispatch = useDispatch();
  const { recipes, loading, error } = useSelector(state => state.recipes);

  useEffect(() => {
    dispatch(fetchRecipes({ page: 1 }));
  }, [dispatch]);

  useEffect(() => {
    console.log('Recipes from Redux:', recipes);
  }, [recipes]);

  const handleFavoriteToggle = id => {
    console.log('Toggle favorite for recipe:', id);
  };

  const handleAuthorClick = () => {
    console.log('Go to author profile');
  };

  const handleViewRecipe = () => {
    console.log('View recipe details');
  };

  return (
    <div className="container">
      <MainTitle text="Recipes" />
      <SubTitle text="Browse our delicious collection" />
      <div>
        {loading && <p>Loading...</p>}
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <div className={styles.wrapper}>
          {recipes && recipes.length > 0
            ? recipes.map(recipe => (
                <RecipeCard
                  key={recipe.id}
                  recipe={recipe}
                  isFavorite={false}
                  onFavoriteToggle={() => handleFavoriteToggle(recipe.id)}
                  onAuthorClick={handleAuthorClick}
                  onViewRecipe={handleViewRecipe}
                />
              ))
            : !loading && <p>No recipes found</p>}
        </div>
      </div>
    </div>
  );
};

export default RecipeList;
