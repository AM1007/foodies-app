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
  const { currentRecipe, popularRecipes, favoriteRecipes, loading, error } = useSelector(state => state.recipes);

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
        <PopularRecipes recipes={popularRecipes} />
      </div>
    </div>
  );
};

export default RecipePage;



// import PathInfo from '../../components/ui/PathInfo/PathInfo';
// import RecipeInfo from '../../components/RecipeInfo/RecipeInfo';
// import PopularRecipes from '../../components/PopularRecipes/PopularRecipes';
// import Loader from '../../components/Loader/Loader';

// const mockCurrentRecipe = {
//   _id: '1',
//   title: 'Spaghetti Carbonara',
//   category: { name: 'Pasta' },
//   time: 30,
//   description: 'Classic Italian pasta dish with eggs, cheese, pancetta, and pepper.',
//   preview: '/images/carbonara.jpg',
//   instructions: '1. Boil pasta. 2. Fry pancetta. 3. Mix eggs and cheese. 4. Combine all.',
//   user: { _id: 'user1', name: 'Chef Mario', avatar: '/images/chef-mario.jpg' },
//   ingredients: [
//     { id: 'ing1', name: 'Spaghetti', image: '/images/spaghetti.jpg', RecipeIngredients: { measure: '200g' } },
//     { id: 'ing2', name: 'Pancetta', image: '/images/pancetta.jpg', RecipeIngredients: { measure: '100g' } },
//     { id: 'ing3', name: 'Eggs', image: '/images/eggs.jpg', RecipeIngredients: { measure: '2' } },
//     { id: 'ing4', name: 'Parmesan cheese', image: '/images/parmesan.jpg', RecipeIngredients: { measure: '50g' } },
//   ],
// };

// const mockPopularRecipes = [
//   {
//     _id: '2',
//     title: 'Margherita Pizza',
//     description: 'Simple pizza with tomato, mozzarella, and basil.',
//     preview: '/images/margherita.jpg',
//     user: { id: 'user2', name: 'Chef Luigi', avatar: '/images/chef-luigi.jpg' },
//   },
//   {
//     _id: '3',
//     title: 'Caesar Salad',
//     description: 'Crisp romaine, croutons, parmesan, and Caesar dressing.',
//     preview: '/images/caesar.jpg',
//     user: { id: 'user3', name: 'Chef Anna', avatar: '/images/chef-anna.jpg' },
//   },
// ];

// const mockFavoriteRecipes = [
//   {
//     _id: '1',
//     title: 'Spaghetti Carbonara',
//     description: 'Classic Italian pasta dish with eggs, cheese, pancetta, and pepper.',
//     preview: '/images/carbonara.jpg',
//     user: { id: 'user1', name: 'Chef Mario', avatar: '/images/chef-mario.jpg' },
//   },
// ];

// const RecipePage = () => {
//   const currentRecipe = mockCurrentRecipe;
//   const popularRecipes = mockPopularRecipes;
//   const favoriteRecipes = mockFavoriteRecipes;
//   const loading = false;
//   const error = null;

//   if (loading) return <Loader />;
//   if (error) return <p style={{ textAlign: 'center' }}>Error: {error}</p>;
//   if (!currentRecipe) return <p style={{ textAlign: 'center' }}>Recipe not found</p>;

//   return (
//     <div className="container">
//       <PathInfo current={currentRecipe.title} />
//       <RecipeInfo recipe={currentRecipe} favoriteRecipes={favoriteRecipes} />
//       <div style={{ marginTop: '120px' }}>
//         <PopularRecipes recipes={popularRecipes} />
//       </div>
//     </div>
//   );
// };

// export default RecipePage;
