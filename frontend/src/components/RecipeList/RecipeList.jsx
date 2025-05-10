import { useEffect, useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  fetchRecipes,
  fetchFavoriteRecipes,
} from '../../redux/recipes/recipesSlice';
import styles from './RecipeList.module.css';
import RecipeCardContainer from '../../components/RecipeCardContainer/RecipeCardContainer';
import Loader from '../../components/Loader/Loader';
import RecipeFilters from '../../components/RecipeFilters/RecipeFilters';
import Pagination from '../Pagination/Pagination';
import React from 'react';

const RecipeList = React.memo(({ categoryId = null }) => {
  const dispatch = useDispatch();
  const { recipes, loading, error } = useSelector(state => state.recipes);
  const { isAuthenticated } = useSelector(state => state.auth);

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(8);
  const [filters, setFilters] = useState({
    category: categoryId,
    ingredient: '',
    area: '',
  });

  const listRef = useRef();
  const prevHeightRef = useRef(0);

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(fetchFavoriteRecipes());
    }
  }, [dispatch, isAuthenticated]);

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
    if (listRef.current) {
      prevHeightRef.current = listRef.current.offsetHeight;
    }

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

    if (listRef.current) {
      listRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const indexOfLastRecipe = currentPage * itemsPerPage;
  const indexOfFirstRecipe = indexOfLastRecipe - itemsPerPage;

  const currentRecipes = recipes
    ? recipes.slice(indexOfFirstRecipe, indexOfLastRecipe)
    : [];

  const totalPages = recipes ? Math.ceil(recipes.length / itemsPerPage) : 0;

  const minHeight = prevHeightRef.current > 0 ? prevHeightRef.current : 400;

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

        <div
          className={styles.wrapper}
          ref={listRef}
          style={{ minHeight: loading ? minHeight : 'auto' }}
        >
          {currentRecipes.length > 0
            ? currentRecipes.map(recipe => (
                <RecipeCardContainer
                  key={recipe.id || recipe._id}
                  recipe={recipe}
                />
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
});

export default RecipeList;
