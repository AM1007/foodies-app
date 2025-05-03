import React, { useEffect } from 'react';
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

  const { currentRecipe, popularRecipes, favoriteRecipes, loading, error } = useSelector(
    (state) => state.recipes
  );

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
      <PopularRecipes recipes={popularRecipes} />
    </div>
  );
};

export default RecipePage;




// import React, { useEffect, useState } from 'react';
// import PathInfo from '../../components/ui/PathInfo/PathInfo';
// import RecipeInfo from '../../components/RecipeInfo/RecipeInfo';
// import PopularRecipes from '../../components/PopularRecipes/PopularRecipes';

// const mockRecipe = {
//   _id: '1',
//   title: 'Battenberg Cake',
//   preview: 'https://ftp.goit.study/img/so-yummy/preview/Battenberg%20Cake.jpg',
//   description: 'A classic British cake made with almond sponge cake...',
//   instructions: 'Heat oven to 180C/160C fan/gas 4...',
//   category: { name: 'Dessert' },
//   user: { id: '1', name: 'Test User' },
//   ingredients: [
//     {
//       id: '1',
//       name: 'Butter',
//       image: '',
//       through: { measure: '175g' },
//     },
//     {
//       id: '2',
//       name: 'Sugar',
//       image: '',
//       through: { measure: '175g' },
//     },
//   ],
// };

// const RecipePage = () => {
//   const [recipe, setRecipe] = useState(null);

//   useEffect(() => {
//     setRecipe(mockRecipe);
//   }, []);

//   if (!recipe) return <p style={{ textAlign: 'center' }}>Loading...</p>;

//   return (
//     <div className="container">
//       <PathInfo current={recipe.title} />
//       <RecipeInfo recipe={recipe} favoriteRecipes={[]} />
//       <PopularRecipes recipes={[]} />
//     </div>
//   );
// };

// export default RecipePage;
