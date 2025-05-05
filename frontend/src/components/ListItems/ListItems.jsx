import React from 'react';
import RecipePreview from '../RecipePreview/RecipePreview';
// import UserCard from '../UserCard/UserCard';
import emptyMessages from '../../data/emptyMessages';
import styles from './ListItems.module.css';

const ListItems = ({ activeTab, data = [] }) => {
  const isRecipeTab = ['my-recipes', 'my-favorites', 'recipes'].includes(
    activeTab,
  );
  const isUserTab = ['followers', 'following'].includes(activeTab);

  if (!data.length) {
    return (
      <div className={styles.empty}>
        {emptyMessages[activeTab] || 'No items to show.'}
      </div>
    );
  }

  return (
    <div className={styles.list}>
      {isRecipeTab &&
        data.map(recipe => <RecipePreview key={recipe.id} recipe={recipe} />)}
      {isUserTab &&
        data.map(user => (
          <div key={user.id} className={styles.userStub}>
            {user.name}
          </div>
          // <UserCard user={user} />
        ))}
    </div>
  );
};

export default ListItems;
