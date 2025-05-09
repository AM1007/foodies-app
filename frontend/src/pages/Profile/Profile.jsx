import React, { useEffect, useState, useRef } from 'react';
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
  
  // Track data loading status to prevent duplicate requests
  const dataFetchedRef = useRef({
    currentUser: false,
    followers: false,
    following: false,
    ownRecipes: false,
    favoriteRecipes: false,
    otherUser: {},
    otherUserRecipes: {},
  });

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

  // Check if we're viewing our own profile (/users/current)
  const isOwnProfile = !id || id === 'current';
  
  // Set initial active tab
  const [activeTab, setActiveTab] = useState(
    isOwnProfile ? 'my-recipes' : 'recipes',
  );
  
  // Store processed data for followers and following
  const [uniqueFollowers, setUniqueFollowers] = useState([]);
  const [uniqueFollowing, setUniqueFollowing] = useState([]);

  // Load current user data only once
  useEffect(() => {
    if (!dataFetchedRef.current.currentUser && !current) {
      dataFetchedRef.current.currentUser = true;
      dispatch(fetchCurrentUser());
    }
  }, [dispatch, current]);

  // Load profile-specific data only once after current user is loaded
  useEffect(() => {
    if (!current) return;
    
    if (isOwnProfile) {
      const currentUserId = current.id || current._id;
      
      // Load followers only if not already loaded
      if (!dataFetchedRef.current.followers && currentUserId) {
        dataFetchedRef.current.followers = true;
        dispatch(fetchFollowers(currentUserId));
      }
      
      // Load following only if not already loaded
      if (!dataFetchedRef.current.following) {
        dataFetchedRef.current.following = true;
        dispatch(fetchFollowing());
      }
      
      // Load own recipes only if not already loaded
      if (!dataFetchedRef.current.ownRecipes && 
          (!ownRecipes || (Array.isArray(ownRecipes) && ownRecipes.length === 0))) {
        dataFetchedRef.current.ownRecipes = true;
        dispatch(fetchOwnRecipes());
      }
      
      // Load favorite recipes only if not already loaded
      if (!dataFetchedRef.current.favoriteRecipes && 
          (!favoriteRecipes || (Array.isArray(favoriteRecipes) && favoriteRecipes.length === 0))) {
        dataFetchedRef.current.favoriteRecipes = true;
        dispatch(fetchFavoriteRecipes());
      }
    } else if (id) {
      // User is viewing someone else's profile
      
      // Load other user data only if not already loaded for this ID
      if (!dataFetchedRef.current.otherUser[id] && (!selected || selected.id !== id)) {
        dataFetchedRef.current.otherUser[id] = true;
        dispatch(fetchUserById(id));
      }
      
      // Load other user's followers only if not already loaded for this ID
      if (!dataFetchedRef.current.otherUser[`${id}-followers`]) {
        dataFetchedRef.current.otherUser[`${id}-followers`] = true;
        dispatch(fetchFollowers(id));
      }
      
      // Load other user's recipes only if not already loaded for this ID
      if (!dataFetchedRef.current.otherUserRecipes[id] && 
          (!userRecipes || (Array.isArray(userRecipes) && userRecipes.length === 0))) {
        dataFetchedRef.current.otherUserRecipes[id] = true;
        dispatch(fetchUserRecipes(id));
      }
    }
  }, [dispatch, isOwnProfile, current, id, selected, ownRecipes, favoriteRecipes, userRecipes]);

  // Reset data fetched flags when navigating to a different profile
  useEffect(() => {
    // When route changes, reset some flags but keep user data
    return () => {
      if (id) {
        dataFetchedRef.current = {
          ...dataFetchedRef.current,
          followers: false,
          following: false
        };
      }
    };
  }, [id]);

  // Process followers and following data when tab changes or data updates
  useEffect(() => {
    if (activeTab === 'followers' && followers) {
      const mappedFollowers = Array.isArray(followers) 
        ? followers.map(follower => ({
            ...follower,
            id: follower.id || follower._id,
            name: follower.name || 'User',
            avatar: follower.avatar || null,
            recipes: follower.recipes || []
          }))
        : [];
      
      setUniqueFollowers(mappedFollowers);
    }

    if (activeTab === 'following' && following) {
      const mappedFollowing = Array.isArray(following)
        ? following.map(followingUser => ({
            ...followingUser,
            id: followingUser.id || followingUser._id,
            name: followingUser.name || 'User',
            avatar: followingUser.avatar || null,
            recipes: followingUser.recipes || []
          }))
        : [];
      
      setUniqueFollowing(mappedFollowing);
    }
  }, [followers, following, activeTab]);

  // Handle follow/unfollow from user cards in list
  const handleFollowToggle = (userId, shouldFollow) => {
    if (shouldFollow) {
      dispatch(followUser(userId));
    } else {
      dispatch(unfollowUser(userId));
    }
  };

  // Get the profile user - either current user or selected user
  const profileUser = isOwnProfile ? current : selected;
  
  // Calculate various counts
  const followersCount = followers?.length || 0;
  const followingCount = following?.length || 0;
  const recipesCount = isOwnProfile 
    ? (ownRecipes?.data?.length || ownRecipes?.length || 0) 
    : (userRecipes?.data?.length || userRecipes?.length || profileUser?.recipes?.length || 0);
  const favoritesCount = favoriteRecipes?.data?.length || favoriteRecipes?.length || 0;

  // Show loading state when needed
  if (userLoading || recipesLoading) return <Loader />;
  
  // Show error state if there's an error
  if (userError || recipesError)
    return <div>Error: {userError || recipesError}</div>;
  
  // Show loading state if profile data isn't available yet
  if (!profileUser) {
    return <div>Loading user profile...</div>;
  }

  const renderTabContent = () => {
    switch (activeTab) {
      case 'my-recipes':
        return <ListItems activeTab={activeTab} items={ownRecipes?.data || ownRecipes || []} />;
      case 'my-favorites':
        return <ListItems activeTab={activeTab} items={favoriteRecipes?.data || favoriteRecipes || []} />;
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
        // For other users' profiles, try multiple ways to get their recipes
        const otherUserRecipes = userRecipes?.data || userRecipes || profileUser?.recipes || [];
        return <ListItems activeTab={activeTab} items={otherUserRecipes} />;
      default:
        return null;
    }
  };

  return (
    <div className="container">
      <MainTitle text={isOwnProfile ? "My Profile" : `${profileUser?.name}'s Profile`} />
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