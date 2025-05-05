import styles from './PopularRecipes.module.css';
import RecipeCardContainer from '../RecipeCardContainer/RecipeCardContainer';

const PopularRecipes = ({ recipes }) => {
  if (!recipes?.length) return null;

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
