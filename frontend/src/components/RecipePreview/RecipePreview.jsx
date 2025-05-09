import { useState } from 'react';
import { Link } from 'react-router-dom';
import css from './RecipePreview.module.css';
import ArrowBtn from '../ui/ArrowBtn/ArrowBtn';
import DeleteBtn from '../ui/DeleteBtn/DeleteBtn';

function RecipePreview({ recipe, onDelete, activeTab }) {
  const [isVisible, setIsVisible] = useState(true);
  

  const recipeId = recipe.id || recipe._id;

  const handleDelete = async () => {
    try {
      await onDelete?.(recipeId);
      setIsVisible(false);
    } catch (error) {
      console.error('Error deleting recipe:', error);
    }
  };

  
  const showDeleteButton = activeTab === 'my-recipes' || activeTab === 'my-favorites';

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
          
          {showDeleteButton && onDelete && (
            <DeleteBtn 
              ariaLabel={activeTab === 'my-recipes' ? 'Delete recipe' : 'Remove from favorites'} 
              onClick={handleDelete} 
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default RecipePreview;