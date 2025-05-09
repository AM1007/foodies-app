import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import RecipePreview from '../RecipePreview/RecipePreview';
import UserPreview from '../UserPreview/UserPreview';
import emptyMessages from '../../data/emptyMessages';
import {
  deleteRecipe,
  removeFromFavorites,
} from '../../redux/recipes/recipesSlice';
import styles from './ListItems.module.css';

const ListItems = ({
  activeTab,
  items = [],
  onFollowToggle,
  onFavoriteRemoved,
  localFollowingIds = [],
}) => {
  const dispatch = useDispatch();
  const { loading } = useSelector(state => state.recipes);

  const isRecipeTab = ['my-recipes', 'my-favorites', 'recipes'].includes(
    activeTab,
  );
  const isUserTab = ['followers', 'following'].includes(activeTab);

  const processedItems = React.useMemo(() => {
    if (!items) return [];

    if (Array.isArray(items)) return items;

    if (items.data && Array.isArray(items.data)) return items.data;

    return [];
  }, [items]);

  const [localItems, setLocalItems] = useState(processedItems);
  const [deletingItemIds, setDeletingItemIds] = useState([]);

  useEffect(() => {
    setLocalItems(processedItems);
  }, [processedItems]);

  const displayItems = localItems;

  const handleDeleteRecipe = async recipeId => {
    try {
      setDeletingItemIds(prev => [...prev, recipeId]);

      await dispatch(deleteRecipe(recipeId)).unwrap();
      console.log(`Recipe ${recipeId} deleted successfully`);

      setLocalItems(prev =>
        prev.filter(item => item.id !== recipeId && item._id !== recipeId),
      );

      setDeletingItemIds(prev => prev.filter(id => id !== recipeId));

      return true;
    } catch (error) {
      console.error(`Failed to delete recipe ${recipeId}:`, error);

      setDeletingItemIds(prev => prev.filter(id => id !== recipeId));

      return Promise.reject(error);
    }
  };

  const handleRemoveFromFavorites = async recipeId => {
    try {
      setDeletingItemIds(prev => [...prev, recipeId]);

      await dispatch(removeFromFavorites(recipeId)).unwrap();
      console.log(`Recipe ${recipeId} removed from favorites`);

      setLocalItems(prev =>
        prev.filter(item => item.id !== recipeId && item._id !== recipeId),
      );

      if (typeof onFavoriteRemoved === 'function') {
        onFavoriteRemoved();
      }

      setDeletingItemIds(prev => prev.filter(id => id !== recipeId));

      return true;
    } catch (error) {
      console.error(
        `Failed to remove recipe ${recipeId} from favorites:`,
        error,
      );

      setDeletingItemIds(prev => prev.filter(id => id !== recipeId));

      return Promise.reject(error);
    }
  };

  const handleUserFollowToggle = useCallback(
    (userId, shouldFollow) => {
      console.log(
        `Toggle follow for user ${userId}, shouldFollow: ${shouldFollow}`,
      );

      if (activeTab === 'following' && !shouldFollow) {
        setLocalItems(prevItems =>
          prevItems.filter(user => user.id !== userId && user._id !== userId),
        );
      }

      if (onFollowToggle && typeof onFollowToggle === 'function') {
        onFollowToggle(userId, shouldFollow);
      }
    },
    [activeTab, onFollowToggle],
  );

  if (!displayItems.length) {
    return (
      <div className={styles.empty}>
        {emptyMessages[activeTab] || 'No items to show.'}
      </div>
    );
  }

  return (
    <div className={styles.list}>
      {isRecipeTab &&
        displayItems.map(recipe => {
          const recipeId = recipe.id || recipe._id;
          const isDeleting = deletingItemIds.includes(recipeId);

          return (
            <RecipePreview
              key={recipeId}
              recipe={recipe}
              activeTab={activeTab}
              isDeleting={isDeleting}
              onDelete={
                isDeleting
                  ? null
                  : activeTab === 'my-recipes'
                  ? handleDeleteRecipe
                  : activeTab === 'my-favorites'
                  ? handleRemoveFromFavorites
                  : undefined
              }
            />
          );
        })}

      {isUserTab &&
        displayItems.map(user => {
          const userId = user.id || user._id;

          const isFollowedByMe =
            activeTab === 'following' ||
            (Array.isArray(localFollowingIds) &&
              localFollowingIds.includes(userId));

          return (
            <UserPreview
              key={userId}
              user={user}
              activeTab={activeTab}
              isFollowedByMe={isFollowedByMe}
              localFollowingIds={localFollowingIds}
              onFollowToggle={handleUserFollowToggle}
            />
          );
        })}
    </div>
  );
};

export default ListItems;
