import styles from './PopularRecipes.module.css';
import RecipeCardContainer from '../RecipeCardContainer/RecipeCardContainer';
import { useSelector } from 'react-redux';

const PopularRecipes = () => {
  const { loading, error, popularRecipes } = useSelector(
    state => state.recipes,
  );

  if (loading) {
    return <p className={styles.message}>Loading popular recipes...</p>;
  }
  if (error) {
    return <p className={styles.message}>Error: {error}</p>;
  }
  if (!popularRecipes?.data?.length) {
    return <p className={styles.message}>No popular recipes available.</p>;
  }

  return (

    <div className={styles.popular}>
      <h3 className={styles.title}>Popular Recipes</h3>
      <ul className={styles.list}>
        {popularRecipes.data.slice(0, 4).map(recipe => (
          <li key={recipe._id?.$oid || recipe.id}>
            <RecipeCardContainer recipe={recipe} />
          </li>
        ))}
      </ul>
    </div>

  );
};

export default PopularRecipes;
