import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useModal } from '../../hooks/useModal';
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
import UserProfile from '../../components/UserProfile/UserProfile';
import ListItems from '../../components/ListItems/ListItems';

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

  const followersCount = followers?.followers?.length || 0;
  const followingCount = following?.response?.length || 0;
  const recipesCount = ownRecipes?.data?.length || 0;
  const favoritesCount = favoriteRecipes?.data?.length || 0;

  const [uniqueFollowers, setUniqueFollowers] = useState([]);
  const [uniqueFollowing, setUniqueFollowing] = useState([]);

  useEffect(() => {
    dispatch(fetchCurrentUser());
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchCurrentUser());

    if (isOwnProfile && current?.id) {
      dispatch(fetchFollowers(current.id));
      dispatch(fetchFollowing());
      dispatch(fetchFavoriteRecipes());
      dispatch(fetchOwnRecipes());
    } else if (userId) {
      dispatch(fetchUserById(userId));
      dispatch(fetchFollowers(userId));
      dispatch(fetchFollowing(userId));
      dispatch(fetchUserRecipes(userId));
    }
  }, [dispatch, isOwnProfile, current?.id, userId]);

  useEffect(() => {
    if (activeTab === 'followers') {
      const mappedFollowers = followers?.followers?.map(follower => ({
        ...follower,
        avatar: follower.avatar || 'default_avatar_url_here',
      }));
      setUniqueFollowers(mappedFollowers);
    }

    if (activeTab === 'following') {
      const mappedFollowing = following?.response?.map(followingUser => ({
        ...followingUser,
        avatar: followingUser.avatar || 'default_avatar_url_here',
      }));
      setUniqueFollowing(mappedFollowing);
    }
  }, [followers, following, activeTab]);

  if (userLoading || recipesLoading) return <Loader />;
  if (userError || recipesError)
    return <div>Error: {userError || recipesError}</div>;

  const renderTabContent = () => {
    switch (activeTab) {
      case 'my-recipes':
        return <ListItems activeTab={activeTab} items={ownRecipes?.data} />;
      case 'my-favorites':
        return (
          <ListItems activeTab={activeTab} items={favoriteRecipes?.data} />
        );
      case 'followers':
        return <ListItems activeTab={activeTab} items={uniqueFollowers} />;
      case 'following':
        return <ListItems activeTab={activeTab} items={uniqueFollowing} />;
      case 'recipes':
        return <ListItems activeTab={activeTab} items={userRecipes?.data} />;
      default:
        return null;
    }
  };

  return (
    <UserProfile
      profileUser={profileUser}
      isOwnProfile={isOwnProfile}
      followersCount={followersCount}
      followingCount={followingCount}
      recipesCount={recipesCount}
      favoritesCount={favoritesCount}
      activeTab={activeTab}
      setActiveTab={setActiveTab}
      uniqueFollowers={uniqueFollowers}
      uniqueFollowing={uniqueFollowing}
      renderTabContent={renderTabContent}
      openModal={openModal}
    />
  );
};

export default Profile;
