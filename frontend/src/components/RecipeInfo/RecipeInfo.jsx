import RecipeMainInfo from '../RecipeMainInfo/RecipeMainInfo';
import RecipeIngredients from '../RecipeIngredients/RecipeIngredients';
import RecipePreparation from '../RecipePreparation/RecipePreparation';
import styles from './RecipeInfo.module.css';

const RecipeInfo = ({ recipe, favoriteRecipes = [] }) => {
  const recipeId = recipe?._id?.$oid || recipe?._id || recipe?.id;

  const isRecipeFavorite =
    Array.isArray(favoriteRecipes) &&
    favoriteRecipes.some(
      favorite => favorite?._id === recipeId || favorite?.id === recipeId,
    );

  if (!recipe) {
    return <div>Recipe information not available</div>;
  }

  return (
    <div className={styles.recipeInfo}>
      <div className={styles.imageBlock}>
        <img
          src={recipe.preview || recipe.thumb || '/placeholder.jpg'}
          alt={recipe.title}
        />
      </div>
      <div className={styles.detailsBlock}>
        <RecipeMainInfo
          title={recipe.title}
          category={recipe.category?.name || 'Unknown'}
          time={recipe.time}
          description={recipe.description}
          user={recipe.user || { name: 'Anonymous', id: null }}
        />

        <RecipeIngredients
          ingredients={
            recipe.ingredients?.map(ingredient => ({
              _id: ingredient._id || ingredient.id,
              name: ingredient.name,
              img: ingredient.img,
              amount:
                ingredient?.RecipeIngredient?.measure ||
                ingredient?.through?.measure ||
                ingredient.measure ||
                'n/a',
            })) || []
          }
        />
        <RecipePreparation
          preparation={recipe.instructions}
          recipeId={recipeId}
          isFavorite={isRecipeFavorite}
        />
      </div>
    </div>
  );
};

export default RecipeInfo;
