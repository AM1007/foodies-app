import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import RecipePreview from '../RecipePreview/RecipePreview';
import UserPreview from '../UserPreview/UserPreview';
import Pagination from '../Pagination/Pagination';
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
  isOwnProfile = true,
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
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;

  useEffect(() => {
    setLocalItems(processedItems);
    setCurrentPage(1);
  }, [processedItems]);

  const totalPages = Math.ceil(localItems.length / itemsPerPage);

  const paginatedItems = localItems.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  const handlePageChange = pageNumber => {
    setCurrentPage(pageNumber);
  };

  const handleDeleteRecipe = async recipeId => {
    try {
      setDeletingItemIds(prev => [...prev, recipeId]);
      await dispatch(deleteRecipe(recipeId)).unwrap();
      setLocalItems(prev =>
        prev.filter(item => item.id !== recipeId && item._id !== recipeId),
      );
    } catch (error) {
      console.error(`Failed to delete recipe ${recipeId}:`, error);
    } finally {
      setDeletingItemIds(prev => prev.filter(id => id !== recipeId));
    }
  };

  const handleRemoveFromFavorites = async recipeId => {
    setLocalItems(prev => {
      const updatedItems = prev.filter(item => {
        const itemId = item.id || item._id;
        return itemId !== recipeId;
      });
      return updatedItems;
    });
    try {
      setDeletingItemIds(prev => [...prev, recipeId]);
      await dispatch(removeFromFavorites(recipeId)).unwrap();
      

      if (typeof onFavoriteRemoved === 'function') {
        onFavoriteRemoved();
      }
    } catch (error) {
      console.error(
        `Failed to remove recipe ${recipeId} from favorites:`,
        error,
      );
    } finally {
      setDeletingItemIds(prev => prev.filter(id => id !== recipeId));
    }
  };

  const handleUserFollowToggle = useCallback(
    (userId, shouldFollow) => {
      if (activeTab === 'following' && !shouldFollow) {
        setLocalItems(prevItems =>
          prevItems.filter(user => user.id !== userId && user._id !== userId),
        );
      }
      if (onFollowToggle && typeof onFollowToggle === 'function') {
        onFollowToggle(userId, shouldFollow);
      }
    },
    [onFollowToggle],
  );

  const getEmptyMessage = () => {
    if (!isOwnProfile) {
      if (activeTab === 'recipes' || activeTab === 'my-recipes') {
        return emptyMessages['other-recipes'];
      } else if (activeTab === 'followers') {
        return emptyMessages['other-followers'];
      } else if (activeTab === 'following') {
        return emptyMessages['other-following'];
      }
    }

    return emptyMessages[activeTab] || 'No items to show.';
  };

  if (!paginatedItems.length) {
    return <div className={styles.empty}>{getEmptyMessage()}</div>;
  }

  return (
    <>
      <div className={styles.list}>
        {isRecipeTab &&
          paginatedItems.map(recipe => {
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
          paginatedItems.map(user => {
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

      {totalPages > 1 && (
        <Pagination
          totalPages={totalPages}
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />
      )}
    </>
  );
};

export default React.memo(ListItems);
