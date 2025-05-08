import React from 'react';
import RecipePreview from '../RecipePreview/RecipePreview';
import UserPreview from '../UserPreview/UserPreview';
import emptyMessages from '../../data/emptyMessages';
import styles from './ListItems.module.css';

const ListItems = ({ activeTab, items = [] }) => {
  const isRecipeTab = ['my-recipes', 'my-favorites', 'recipes'].includes(
    activeTab,
  );
  const isUserTab = ['followers', 'following'].includes(activeTab);

  if (!items.length) {
    return (
      <div className={styles.empty}>
        {emptyMessages[activeTab] || 'No items to show.'}
      </div>
    );
  }

  return (
    <div className={styles.list}>
      {isRecipeTab &&
        items.map(recipe => (
          <RecipePreview key={recipe._id || recipe.id} recipe={recipe} />
        ))}

      {isUserTab &&
        items.map(user => <UserPreview key={user.id} user={user} />)}
    </div>
  );
};

export default ListItems;
