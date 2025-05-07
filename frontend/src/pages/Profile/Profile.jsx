import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import styles from './Profile.module.css';
import { useModal } from '../../hooks/useModal';
import PathInfo from '../../components/ui/PathInfo/PathInfo';
import MainTitle from '../../components/ui/MainTitle/MainTitle';
import SubTitle from '../../components/ui/SubTitle/SubTitle';
import Button from '../../components/Button/Button';
import RecipePreview from '../../components/RecipePreview/RecipePreview';
import UserInfo from '../../components/UserInfo/UserInfo';
import TabsList from '../../components/TabsList/TabsList';
import ListItems from '../../components/ListItems/ListItems';
import Loader from '../../components/Loader/Loader';

import {
  fetchCurrentUser,
  fetchUserById,
  fetchFollowers,
  fetchFollowing,
} from '../../redux/users/userSlice';

import {
  fetchOwnRecipes,
  fetchFavoriteRecipes,
  fetchUserRecipes,
} from '../../redux/recipes/recipesSlice';

const Profile = () => {
  const dispatch = useDispatch();
  const { openModal } = useModal();
  const { userId } = useParams();

  const {
    current,
    selectedUser,
    followers,
    following,
    loading: userLoading,
    error: userError,
  } = useSelector(state => state.user);

  const {
    ownRecipes,
    favoriteRecipes,
    userRecipes,
    loading: recipesLoading,
    error: recipesError,
  } = useSelector(state => state.recipes);

  const isOwnProfile = !userId || userId === current?._id;
  const [activeTab, setActiveTab] = useState(
    isOwnProfile ? 'my-recipes' : 'recipes',
  );

  const profileUser = isOwnProfile ? current : selectedUser;

  const followersCount = followers?.response?.length || 0;
  const followingCount = following?.response?.length || 0;
  const recipesCount = ownRecipes?.data?.length || 0;
  const favoritesCount = favoriteRecipes?.data?.length || 0;

  useEffect(() => {
    dispatch(fetchCurrentUser());

    if (!isOwnProfile && userId) {
      dispatch(fetchUserById(userId));
      dispatch(fetchUserRecipes(userId));
      dispatch(fetchFollowers(userId));
      dispatch(fetchFollowing(userId));
    } else {
      dispatch(fetchFollowers());
      dispatch(fetchFollowing());
      dispatch(fetchOwnRecipes());
      dispatch(fetchFavoriteRecipes());
    }
  }, [dispatch, userId, isOwnProfile]);

  if (userLoading || recipesLoading) return <Loader />;
  if (userError || recipesError)
    return <div>Error: {userError || recipesError}</div>;

  const renderTabContent = () => {
    switch (activeTab) {
      case 'my-recipes':
        return <ListItems items={ownRecipes?.data} />; 
      case 'my-favorites':
        return <ListItems items={favoriteRecipes?.data} />; 
      case 'followers':
        return <ListItems items={followers?.response} />; 
      case 'following':
        return <ListItems items={following?.response} />; 
      case 'recipes':
        return <ListItems items={userRecipes?.data} />; 
      default:
        return null;
    }
  };

  return (
    <div className="container">
      <PathInfo current="Profile" />
      <MainTitle text="Profile" />
      <SubTitle text="Reveal your culinary art, share your favorite recipe, and create gastronomic masterpieces with us." />

      <div className={styles.wrapper}>
        <div className={styles.userCardWrapper}>
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

        <TabsList
          isOwnProfile={isOwnProfile}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />

        <div>{renderTabContent()}</div>

        <RecipePreview />
      </div>
    </div>
  );
};

export default Profile;
