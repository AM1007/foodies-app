import RecipeMainInfo from '../RecipeMainInfo/RecipeMainInfo';
import RecipeIngredients from '../RecipeIngredients/RecipeIngredients';
import RecipePreparation from '../RecipePreparation/RecipePreparation';
import styles from './RecipeInfo.module.css';

const RecipeInfo = ({ recipe, favoriteRecipes }) => {
  const isRecipeFavorite = favoriteRecipes.some(
    favoriteRecipe => favoriteRecipe._id === recipe._id
  );

  return (
    <div className={styles.recipeInfo}>
      <div className={styles.imageBlock}>
        <img src={recipe.preview} alt={recipe.title} />
      </div>
      <div className={styles.detailsBlock}>
        <RecipeMainInfo
          title={recipe.title}
          category={recipe.category?.name || 'Unknown'}
          time={recipe.time}
          description={recipe.description}
          author={recipe.user || { name: 'Anonymous', id: null }}
        />

        <RecipeIngredients
          ingredients={
            recipe.ingredients?.map(ingredient => ({
              id: ingredient.id,
              name: ingredient.name,
              image: ingredient.image,
              amount:
                ingredient?.RecipeIngredients?.measure ||
                ingredient?.through?.measure ||
                'n/a',
            })) || []
          }
        />
        <RecipePreparation
          preparation={recipe.instructions}
          recipeId={recipe._id}
          isFavorite={isRecipeFavorite}
        />
      </div>
    </div>
  );
};

export default RecipeInfo;
