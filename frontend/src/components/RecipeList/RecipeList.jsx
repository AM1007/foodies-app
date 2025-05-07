import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchRecipes } from '../../redux/recipes/recipesSlice';
import styles from './RecipeList.module.css';
import MainTitle from '../../components/ui/MainTitle/MainTitle';
import SubTitle from '../../components/ui/SubTitle/SubTitle';
import RecipeCardContainer from '../../components/RecipeCardContainer/RecipeCardContainer';
import Loader from '../../components/Loader/Loader';
import RecipeFilters from '../../components/RecipeFilters/RecipeFilters';
import RecipePagination from '../../components/RecipePagination/RecipePagination';

const RecipeList = ({ category }) => {
  const dispatch = useDispatch();
  const { recipes, loading, error } = useSelector(state => state.recipes);

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(8);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [filters, setFilters] = useState({
    category: category || '',
    ingredient: '',
    region: '',
  });

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      setWindowWidth(width);
      setItemsPerPage(width >= 768 ? 12 : 8);
    };

    handleResize();

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (category !== filters.category) {
      setFilters(prev => ({ ...prev, category }));
      setCurrentPage(1);
    }
  }, [category]);

  useEffect(() => {
    dispatch(
      fetchRecipes({
        page: currentPage,
        category: filters.category,
        ingredient: filters.ingredient,
        region: filters.region,
      }),
    );
  }, [dispatch, currentPage, filters]);

  const handleFilterChange = newFilters => {
    setFilters(prev => ({ ...prev, ...newFilters }));
    setCurrentPage(1);
  };

  const totalPages = recipes ? Math.ceil(recipes.length / itemsPerPage) : 0;

  const handlePageChange = pageNumber => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const indexOfLastRecipe = currentPage * itemsPerPage;
  const indexOfFirstRecipe = indexOfLastRecipe - itemsPerPage;
  const currentRecipes = recipes
    ? recipes.slice(indexOfFirstRecipe, indexOfLastRecipe)
    : [];

  return (
    <>
      <MainTitle text={category} />
      <SubTitle text="Go on a taste journey, where every sip is a sophisticated creative chord, and every dessert is an expression of the most refined gastronomic desires." />
      <div className={styles.wrap}>
        <RecipeFilters onFilterChange={handleFilterChange} />
        <div>
          {loading && (
            <div className={styles.loaderWrapper}>
              <Loader />
            </div>
          )}
          {error && <p className={styles.errorMessage}>{error}</p>}
          <div className={styles.wrapper}>
            {currentRecipes && currentRecipes.length > 0
              ? currentRecipes.map(recipe => (
                  <RecipeCardContainer key={recipe.id} recipe={recipe} />
                ))
              : !loading && (
                  <div className={styles.emptyState}>
                    <p>No recipes found for this category. Try another one!</p>
                  </div>
                )}
          </div>

          {totalPages > 1 && (
            <RecipePagination
              totalPages={totalPages}
              currentPage={currentPage}
              onPageChange={handlePageChange}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default RecipeList;
