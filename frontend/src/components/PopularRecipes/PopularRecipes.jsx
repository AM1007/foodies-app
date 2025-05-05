import styles from './PopularRecipes.module.css';
import RecipeCardContainer from '../RecipeCardContainer/RecipeCardContainer';
import { useSelector } from 'react-redux';

const PopularRecipes = ({ recipes }) => {
  const { popularLoading, popularError } = useSelector(state => state.recipes);

  if (popularLoading) return <p className={styles.message}>Loading popular recipes...</p>;
  if (popularError) return <p className={styles.message}>Error: {popularError}</p>;
  if (!recipes?.length) return <p className={styles.message}>No popular recipes available.</p>;

  return (
    <section className={styles.popular}>
      <h3 className={styles.title}>Popular Recipes</h3>
      <ul className={styles.list}>
        {recipes.map(recipe => (
          <li key={recipe._id}>
            <RecipeCardContainer recipe={recipe} />
          </li>
        ))}
      </ul>
    </section>
  );
};

export default PopularRecipes;
