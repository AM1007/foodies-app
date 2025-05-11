import { useState } from 'react';
import { Link } from 'react-router-dom';
import css from './RecipePreview.module.css';
import ArrowBtn from '../ui/ArrowBtn/ArrowBtn';
import DeleteBtn from '../ui/DeleteBtn/DeleteBtn';

function RecipePreview({ recipe, onDelete, activeTab, isDeleting }) {
  const [isVisible, setIsVisible] = useState(true);

  const recipeId = recipe.id || recipe._id;

  const handleDelete = async () => {
    if (isDeleting) return;
    setIsVisible(false);

    try {
      if (typeof onDelete === 'function') {
        await onDelete(recipeId);
      }
    } catch (error) {
      console.error('Error deleting recipe:', error);
      setIsVisible(true);
    }
  };

  const showDeleteButton =
    (activeTab === 'my-recipes' || activeTab === 'my-favorites') &&
    typeof onDelete === 'function';

  if (!isVisible) return null;

  return (
    <div className={css.recipePreviewCard}>
      <Link to={`/recipes/${recipeId}`} className={css.imageLink}>
        <img
          src={recipe.thumb || '/placeholder.jpg'}
          alt={recipe.title}
          className={css.recipePreviewCardImage}
        />
      </Link>

      <div className={css.recipePreviewCardContent}>
        <div className={css.recipePreviewCardInfo}>
          <p className={css.recipePreviewCardTitle}>{recipe.title}</p>
          <p className={css.recipePreviewCardDescription}>
            {recipe.description}
          </p>
        </div>

        <div className={css.recipePreviewCardActions}>
          <ArrowBtn to={`/recipes/${recipeId}`} ariaLabel="Go to recipe" />

          {showDeleteButton && (
            <DeleteBtn
              ariaLabel={
                activeTab === 'my-recipes'
                  ? 'Delete recipe'
                  : 'Remove from favorites'
              }
              onClick={handleDelete}
              disabled={isDeleting}
            />
          )}

          {isDeleting && (
            <span className={css.loadingIndicator}>
              {activeTab === 'my-recipes' ? 'Deleting...' : 'Removing...'}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

export default RecipePreview;
