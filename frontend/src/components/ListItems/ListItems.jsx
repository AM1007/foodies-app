import React, { useState, useEffect } from 'react';
import RecipePreview from '../RecipePreview/RecipePreview';
import UserPreview from '../UserPreview/UserPreview';
import emptyMessages from '../../data/emptyMessages';
import styles from './ListItems.module.css';

const ListItems = ({ activeTab, items = [] }) => {
  const isRecipeTab = ['my-recipes', 'my-favorites', 'recipes'].includes(
    activeTab,
  );
  const isUserTab = ['followers', 'following'].includes(activeTab);
  const [list, setList] = useState(items);

  const handleRemove = id => {
    setList(prev => prev.filter(user => user.id !== id));
  };

  if (!list.length) {
    return (
      <div className={styles.empty}>
        {emptyMessages[activeTab] || 'No items to show.'}
      </div>
    );
  }

  return (
    <div className={styles.list}>
      {isRecipeTab &&
        list.map(recipe => (
          <RecipePreview key={recipe._id || recipe.id} recipe={recipe} />
        ))}

      {isUserTab &&
        list.map(user => (
          <UserPreview
            key={user.id}
            user={user}
            type={activeTab}
            onRemove={handleRemove}
          />
        ))}
    </div>
  );
};

export default ListItems;
