import React, { useState, useEffect } from 'react';
import TabsList from '../TabsList/TabsList';
import RecipePreview from '../RecipePreview/RecipePreview';
// import UserCard from '../UserCard/UserCard';
import styles from './ListItems.module.css';

const emptyMessages = {
  'my-recipes':
    'Nothing has been added to your recipes list yet. Please browse our recipes and add your favorites for easy access in the future.',
  'my-favorites':
    'Nothing has been added to your favorite recipes list yet. Please browse our recipes and add your favorites for easy access in the future.',
  recipes:
    'Nothing has been added to the recipes list yet. Please browse our recipes and add your favorites for easy access in the future.',
  followers:
    'There are currently no followers on your account. Please engage our visitors with interesting content and draw their attention to your profile.',
  following:
    'Your account currently has no subscriptions to other users. Learn more about our users and select those whose content interests you.',
};

const ListItems = ({ isOwnProfile = true, fetchData }) => {
  const [activeTab, setActiveTab] = useState(
    isOwnProfile ? 'my-recipes' : 'recipes',
  );
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchTabData = async () => {
      const result = await fetchData(activeTab);
      setData(result || []);
    };
    fetchTabData();
  }, [activeTab, fetchData]);

  const isRecipeTab = ['my-recipes', 'my-favorites', 'recipes'].includes(
    activeTab,
  );
  const isUserTab = ['followers', 'following'].includes(activeTab);

  if (!data || data.length === 0) {
    const message = emptyMessages[activeTab] || 'No results found';
    return (
      <div className={styles.container}>
        <TabsList isOwnProfile={isOwnProfile} onTabChange={setActiveTab} />
        <div className={styles.empty}>{message}</div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <TabsList isOwnProfile={isOwnProfile} onTabChange={setActiveTab} />
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
    </div>
  );
};

export default ListItems;
