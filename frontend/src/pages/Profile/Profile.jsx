import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useModal } from '../../hooks/useModal';
import Loader from '../../components/Loader/Loader';
import MainTitle from '../../components/ui/MainTitle/MainTitle';
import SubTitle from '../../components/ui/SubTitle/SubTitle';
import {
  fetchCurrentUser,
  fetchUserById,
  fetchFollowers,
  fetchFollowing,
  followUser,
  unfollowUser,
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
  const { id } = useParams();

  const {
    current,
    selected,
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


  const isOwnProfile = !id || id === 'current';


  const [activeTab, setActiveTab] = useState(
    isOwnProfile ? 'my-recipes' : 'recipes',
  );

 
  const [uniqueFollowers, setUniqueFollowers] = useState([]);
  const [uniqueFollowing, setUniqueFollowing] = useState([]);

 
  useEffect(() => {
    console.log('Profile Component Data:', {
      id,
      isOwnProfile,
      current,
      selected,
      followers,
      following,
    });
  }, [id, isOwnProfile, current, selected, followers, following]);

  
  useEffect(() => {
    dispatch(fetchCurrentUser());
  }, [dispatch]);

  
  useEffect(() => {
    if (!current) return; 

    if (isOwnProfile) {
      
      const currentUserId = current.id || current._id;

      if (currentUserId) {
        dispatch(fetchFollowers(currentUserId));
      }

      dispatch(fetchFollowing());
      dispatch(fetchOwnRecipes());
      dispatch(fetchFavoriteRecipes());
    } else if (id) {
      
      console.log(`Fetching data for user ID ${id}`);
      dispatch(fetchUserById(id));
      dispatch(fetchFollowers(id));
      dispatch(fetchUserRecipes(id));
    }
  }, [dispatch, isOwnProfile, current, id]);

  
  useEffect(() => {
    if (activeTab === 'followers' && followers) {
      console.log('Processing followers:', followers);

      const mappedFollowers = Array.isArray(followers)
        ? followers.map(follower => {
            return {
              ...follower,
              id: follower.id || follower._id,
              name: follower.name || 'User',
              avatar: follower.avatar || null,
              recipes: follower.recipes || [],
            };
          })
        : [];

      setUniqueFollowers(mappedFollowers);
    }

    if (activeTab === 'following' && following) {
      console.log('Processing following:', following);

      const mappedFollowing = Array.isArray(following)
        ? following.map(followingUser => {
            return {
              ...followingUser,
              id: followingUser.id || followingUser._id,
              name: followingUser.name || 'User',
              avatar: followingUser.avatar || null,
              recipes: followingUser.recipes || [],
            };
          })
        : [];

      setUniqueFollowing(mappedFollowing);
    }
  }, [followers, following, activeTab]);

  
  const handleFollowToggle = (userId, shouldFollow) => {
    if (shouldFollow) {
      dispatch(followUser(userId))
        .unwrap()
        .then(() => {
          console.log(`Successfully followed user ${userId}`);
        })
        .catch(error => {
          console.error(`Failed to follow user ${userId}:`, error);
        });
    } else {
      dispatch(unfollowUser(userId))
        .unwrap()
        .then(() => {
          console.log(`Successfully unfollowed user ${userId}`);
        })
        .catch(error => {
          console.error(`Failed to unfollow user ${userId}:`, error);
        });
    }
  };


  const profileUser = isOwnProfile ? current : selected;

  
  const followersCount = followers?.length || 0;
  const followingCount = following?.length || 0;
  const recipesCount = isOwnProfile
    ? ownRecipes?.data?.length || ownRecipes?.length || 0
    : userRecipes?.data?.length ||
      userRecipes?.length ||
      profileUser?.recipes?.length ||
      0;
  const favoritesCount =
    favoriteRecipes?.data?.length || favoriteRecipes?.length || 0;

  
  if (userLoading || recipesLoading) return <Loader />;

  
  if (userError || recipesError)
    return <div>Error: {userError || recipesError}</div>;


  if (!profileUser) {
    console.warn('Profile user not available yet!', {
      isOwnProfile,
      current,
      selected,
    });
    return <div>Loading user profile...</div>;
  }

  const renderTabContent = () => {
    switch (activeTab) {
      case 'my-recipes':
        return (
          <ListItems
            activeTab={activeTab}
            items={ownRecipes?.data || ownRecipes || []}
          />
        );
      case 'my-favorites':
        return (
          <ListItems
            activeTab={activeTab}
            items={favoriteRecipes?.data || favoriteRecipes || []}
          />
        );
      case 'followers':
        return (
          <ListItems
            activeTab={activeTab}
            items={uniqueFollowers || []}
            onFollowToggle={handleFollowToggle}
          />
        );
      case 'following':
        return (
          <ListItems
            activeTab={activeTab}
            items={uniqueFollowing || []}
            onFollowToggle={handleFollowToggle}
          />
        );
      case 'recipes':
        
        const otherUserRecipes =
          userRecipes?.data || userRecipes || profileUser?.recipes || [];
        console.log('Other user recipes:', otherUserRecipes);
        return <ListItems activeTab={activeTab} items={otherUserRecipes} />;
      default:
        return null;
    }
  };

  return (
    <div className="container">
      <MainTitle
        text={isOwnProfile ? 'My Profile' : `${profileUser?.name}'s Profile`}
      />
      <SubTitle text="Reveal your culinary art, share your favorite recipe, and create gastronomic masterpieces with us." />
      <UserProfile
        profileUser={profileUser}
        isOwnProfile={isOwnProfile}
        followersCount={followersCount}
        followingCount={followingCount}
        recipesCount={recipesCount}
        favoritesCount={favoritesCount}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        renderTabContent={renderTabContent}
        openModal={openModal}
      />
    </div>
  );
};

export default Profile;
