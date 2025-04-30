import { useState } from 'react';

import css from './RecipePreview.module.css';

import ArrowBtn from '../ui/ArrowBtn/ArrowBtn';
import DeleteBtn from '../ui/DeleteBtn/DeleteBtn';

function RecipePreview({ recipe, onDelete }) {
  const [isVisible, setIsVisible] = useState(true);

  const handleDelete = async () => {
    try {
      await onDelete(recipe.id);
      setIsVisible(false);
    } catch (error) {
      console.error('Помилка при видаленні рецепта:', error);
    }
  };

  if (!isVisible) return null;

  return (
    <div className={css.recipePreviewCard}>
      <img
        // src={recipe.imageUrl}
        // alt={recipe.title}
        className={css.recipePreviewCardImage}
      />

      <div className={css.recipePreviewCardContent}>
        <div className={css.recipePreviewCardInfo}>
          <h2 className={css.recipePreviewCardTitle}>Salmon Avocado Salad</h2>
          <p className={css.recipePreviewCardDescription}>
            Mix the dressing ingredients in a small bowl and season with salt
            and pepper. Set aside. Cook the pasta according to the packet
            instructions. Add the sugar snap peas for the last minute or so of
            cooking time. Meanwhile, heat the oil in a wok or large frying pan,
            toss in the garlic and chilli and cook over a fairly gentle heat for
            about 30 seconds without letting the garlic brown.
          </p>
        </div>

        <div className={css.recipePreviewCardActions}>
          <ArrowBtn ariaLabel="Go to recipe" />
          {/* <ArrowBtn to={`/recipes/${recipeId}`} ariaLabel="Go to recipe" /> */}
          <DeleteBtn ariaLabel="Delete recipe" />
        </div>
      </div>
    </div>
  );
}

export default RecipePreview;
