import React from 'react';
import Button from '../Button/Button';
import UserInfo from '../UserInfo/UserInfo';
import TabsList from '../TabsList/TabsList';
import ListItems from '../ListItems/ListItems';
import css from './UserProfile.module.css'; 

const UserProfile = ({
  profileUser,
  isOwnProfile,
  followersCount,
  followingCount,
  recipesCount,
  favoritesCount,
  activeTab,
  setActiveTab,
  uniqueFollowers,
  uniqueFollowing,
  renderTabContent,
  openModal,
}) => {
  return (
    <div className="container">
      <div className={css.wrapper}>
        <div className={css.userCardWrapper}>
          {profileUser ? (
            <UserInfo
              user={profileUser}
              isOwnProfile={isOwnProfile}
              followersCount={followersCount}
              followingCount={followingCount}
              recipesCount={recipesCount}
              favoritesCount={favoritesCount}
            />
          ) : (
            <div>No user data available.</div>
          )}

          {isOwnProfile && (
            <Button onClick={() => openModal('logout')}>Log Out</Button>
          )}
        </div>

        <div className={css.tabsContentWrapper}>
          <TabsList
            isOwnProfile={isOwnProfile}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
          />
          <div>{renderTabContent()}</div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
