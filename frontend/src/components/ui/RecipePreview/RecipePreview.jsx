import { useState } from 'react';

import css from './RecipePreview.module.css';

import ArrowBtn from '../ArrowBtn/ArrowBtn';

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

          <button
            type="button"
            className={css.recipePreviewCardDelete}
            onClick={handleDelete}
            aria-label="Видалити рецепт"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path
                d="M3 6h18M8 6V4h8v2m1 0v14a2 2 0 0 1-2 2H9a2 2 0 0 1-2-2V6h10z"
                stroke="currentColor"
                strokeWidth="2"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

export default RecipePreview;
