import { useState } from 'react';
import css from './RecipePreview.module.css';
import ArrowBtn from '../ui/ArrowBtn/ArrowBtn';
import DeleteBtn from '../ui/DeleteBtn/DeleteBtn';

function RecipePreview({ recipe, onDelete }) {
  const [isVisible, setIsVisible] = useState(true);

  const handleDelete = async () => {
    try {
      await onDelete?.(recipe.id);
      setIsVisible(false);
    } catch (error) {
      console.error('Error deleting recipe:', error);
    }
  };

  if (!isVisible) return null;

  return (
    <div className={css.recipePreviewCard}>
      <img
        src={recipe.thumb || '/placeholder.jpg'}
        alt={recipe.title}
        className={css.recipePreviewCardImage}
      />

      <div className={css.recipePreviewCardContent}>
        <div className={css.recipePreviewCardInfo}>
          <p className={css.recipePreviewCardTitle}>{recipe.title}</p>
          <p className={css.recipePreviewCardDescription}>
            {recipe.description}
          </p>
        </div>

        <div className={css.recipePreviewCardActions}>
          <ArrowBtn to={`/recipes/${recipe.id}`} ariaLabel="Go to recipe" />
          {onDelete && (
            <DeleteBtn ariaLabel="Delete recipe" onClick={handleDelete} />
          )}
        </div>
      </div>
    </div>
  );
}

export default RecipePreview;
