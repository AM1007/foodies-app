import { useEffect, useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchRecipes } from '../../redux/recipes/recipesSlice';
import styles from './RecipeList.module.css';
import RecipeCardContainer from '../../components/RecipeCardContainer/RecipeCardContainer';
import Loader from '../../components/Loader/Loader';
import RecipeFilters from '../../components/RecipeFilters/RecipeFilters';
import Pagination from '../Pagination/Pagination';

const RecipeList = ({ categoryId = null }) => {
  const dispatch = useDispatch();
  const { recipes, loading, error } = useSelector(state => state.recipes);

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(8);
  const [filters, setFilters] = useState({
    category: categoryId,
    ingredient: '',
    area: '',
  });

  const listRef = useRef();

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      setItemsPerPage(width >= 768 ? 12 : 8);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (categoryId !== filters.category) {
      setFilters(prev => ({ ...prev, category: categoryId }));
      setCurrentPage(1);
    }
  }, [categoryId]);

  useEffect(() => {
    dispatch(
      fetchRecipes({
        category: filters.category,
        ingredient: filters.ingredient,
        area: filters.area,
      }),
    );
  }, [dispatch, filters]);

  const handleFilterChange = newFilters => {
    setFilters(prev => ({ ...prev, ...newFilters }));
    setCurrentPage(1);
  };

  const handlePageChange = pageNumber => {
    setCurrentPage(pageNumber);
  };

  const indexOfLastRecipe = currentPage * itemsPerPage;
  const indexOfFirstRecipe = indexOfLastRecipe - itemsPerPage;

  const currentRecipes = recipes
    ? recipes.slice(indexOfFirstRecipe, indexOfLastRecipe)
    : [];

  const totalPages = recipes ? Math.ceil(recipes.length / itemsPerPage) : 0;

  return (
    <div className={styles.wrap}>
      <div className={styles.filterWrapper}>
        <RecipeFilters onFilterChange={handleFilterChange} />
      </div>

      <div>
        {loading && (
          <div className={styles.loaderWrapper}>
            <Loader />
          </div>
        )}

        {error && <p className={styles.errorMessage}>{error}</p>}

        <div className={styles.wrapper} ref={listRef}>
          {currentRecipes.length > 0
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
          <Pagination
            totalPages={totalPages}
            currentPage={currentPage}
            onPageChange={handlePageChange}
          />
        )}
      </div>
    </div>
  );
};

export default RecipeList;
