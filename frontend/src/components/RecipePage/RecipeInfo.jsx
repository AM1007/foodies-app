import React from 'react';
import RecipeMainInfo from './RecipeInfo/RecipeMainInfo';
import RecipeIngredients from './RecipeInfo/RecipeIngredients';
import RecipePreparation from './RecipeInfo/RecipePreparation';

const RecipeInfo = ({ recipe, favoriteRecipes }) => {
  const isFavorite = favoriteRecipes.some((r) => r._id === recipe._id);

  return (
    <>
      <RecipeMainInfo
        preview={recipe.preview}
        title={recipe.title}
        category={recipe.category?.name || 'Unknown'}
        description={recipe.description}
        author={recipe.user || { name: 'Anonymous', id: null }}
      />
      <RecipeIngredients
        ingredients={
          recipe.ingredients?.map((ingredient) => ({
            id: ingredient.id,
            name: ingredient.name,
            image: ingredient.image,
            amount: ingredient?.RecipeIngredients?.measure || ingredient?.through?.measure || 'n/a',
          })) || []
        }
      />
      <RecipePreparation
        preparation={recipe.instructions}
        isFavorite={isFavorite}
        recipeId={recipe._id}
      />
    </>
  );
};

export default RecipeInfo;
