import React, { useEffect, useState, useRef, useCallback } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
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
  const location = useLocation();
  const navigate = useNavigate();

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

  const [localFollowingIds, setLocalFollowingIds] = useState([]);

  const [localFavoritesCount, setLocalFavoritesCount] = useState(0);
  const [localFollowingCount, setLocalFollowingCount] = useState(0);
  const [localFollowersCount, setLocalFollowersCount] = useState(0);

  useEffect(() => {
    setActiveTab(isOwnProfile ? 'my-recipes' : 'recipes');
  }, [location.pathname, isOwnProfile]);

  useEffect(() => {
    dispatch(fetchCurrentUser());
  }, [dispatch]);

  useEffect(() => {
    if (
      id &&
      current &&
      (id === current._id || id === current.id) &&
      id !== 'current'
    ) {
      console.log('Redirecting to /users/current');
      navigate('/users/current', { replace: true });
    }
  }, [id, current, navigate]);

  useEffect(() => {
    if (following && Array.isArray(following)) {
      const followingIds = following
        .map(user => user._id || user.id)
        .filter(Boolean);
      setLocalFollowingIds(followingIds);

      setLocalFollowingCount(following.length);
    }
  }, [following]);

  useEffect(() => {
    setLocalFavoritesCount(
      favoriteRecipes?.data?.length || favoriteRecipes?.length || 0,
    );
  }, [favoriteRecipes]);

  useEffect(() => {
    if (followers && Array.isArray(followers)) {
      setLocalFollowersCount(followers.length);
    }
  }, [followers]);

  const handleFavoriteRemoved = useCallback(() => {
    setLocalFavoritesCount(prev => Math.max(0, prev - 1));
  }, []);

  useEffect(() => {
    if (!current) return;

    if (isOwnProfile) {
      const currentUserId = current._id || current.id;

      if (currentUserId) {
        dispatch(fetchFollowers(currentUserId));
      }

      dispatch(fetchFollowing());
      dispatch(fetchOwnRecipes());
      dispatch(fetchFavoriteRecipes());
    } else if (id) {
      dispatch(fetchUserById(id));
      dispatch(fetchFollowers(id));
      dispatch(fetchUserRecipes(id));
    }
  }, [dispatch, isOwnProfile, current, id]);

  useEffect(() => {
    if (activeTab === 'followers' && followers) {
      const mappedFollowers = Array.isArray(followers)
        ? followers.map(follower => ({
            ...follower,
            id: follower.id || follower._id,
            name: follower.name || 'User',
            avatar: follower.avatar || null,
            recipes: follower.recipes || [],
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
            recipes: followingUser.recipes || [],
          }))
        : [];

      setUniqueFollowing(mappedFollowing);
    }
  }, [followers, following, activeTab]);

  const handleFollowToggle = useCallback(
    (userId, shouldFollow) => {
      if (shouldFollow) {
        setLocalFollowingIds(prev => [...prev, userId]);

        setLocalFollowingCount(prev => prev + 1);

        dispatch(followUser(userId))
          .unwrap()
          .then(() => {
            console.log(`Successfully followed user ${userId}`);
          })
          .catch(error => {
            console.error(`Failed to follow user ${userId}:`, error);
      
            setLocalFollowingIds(prev => prev.filter(id => id !== userId));
       
            setLocalFollowingCount(prev => Math.max(0, prev - 1));
          });
      } else {
        
        setLocalFollowingIds(prev => prev.filter(id => id !== userId));
       
        setLocalFollowingCount(prev => Math.max(0, prev - 1));

        dispatch(unfollowUser(userId))
          .unwrap()
          .then(() => {
            console.log(`Successfully unfollowed user ${userId}`);
          })
          .catch(error => {
            console.error(`Failed to unfollow user ${userId}:`, error);
            
            setLocalFollowingIds(prev => [...prev, userId]);
            
            setLocalFollowingCount(prev => prev + 1);
          });
      }
    },
    [dispatch],
  );

  
  const handleUnfollowFromList = useCallback(
    (userId, shouldFollow) => {
      if (!shouldFollow) {
        
        setLocalFollowingIds(prev => prev.filter(id => id !== userId));
        
        setLocalFollowingCount(prev => Math.max(0, prev - 1));

      
        setUniqueFollowing(prev =>
          prev.filter(user => user.id !== userId && user._id !== userId),
        );

        dispatch(unfollowUser(userId))
          .unwrap()
          .then(() => {
            console.log(`Successfully unfollowed user ${userId}`);
          })
          .catch(error => {
            console.error(`Failed to unfollow user ${userId}:`, error);
            
            setLocalFollowingIds(prev => [...prev, userId]);
         
            setLocalFollowingCount(prev => prev + 1);
            
          });
      }
    },
    [dispatch],
  );

  const profileUser = isOwnProfile ? current : selected;


  const followersCount = localFollowersCount;
  const followingCount = localFollowingCount;

  const recipesCount = isOwnProfile
    ? ownRecipes?.data?.length || ownRecipes?.length || 0
    : userRecipes?.data?.length ||
      userRecipes?.length ||
      profileUser?.recipes?.length ||
      0;
  const favoritesCount = localFavoritesCount;

  if (userLoading || recipesLoading) return <Loader />;

  if (userError || recipesError)
    return <div>Error: {userError || recipesError}</div>;

  if (!profileUser) {
    return <div>Loading user profile...</div>;
  }

  const renderTabContent = () => {
    switch (activeTab) {
      case 'my-recipes':
        return <ListItems activeTab={activeTab} items={ownRecipes} />;
      case 'my-favorites':
        return (
          <ListItems
            activeTab={activeTab}
            items={favoriteRecipes}
            onFavoriteRemoved={handleFavoriteRemoved}
          />
        );
      case 'followers':
        return (
          <ListItems
            activeTab={activeTab}
            items={uniqueFollowers || []}
            onFollowToggle={handleFollowToggle}
            localFollowingIds={localFollowingIds}
          />
        );
      case 'following':
        return (
          <ListItems
            activeTab={activeTab}
            items={uniqueFollowing || []}
            onFollowToggle={handleUnfollowFromList}
            localFollowingIds={localFollowingIds}
          />
        );
      case 'recipes':
        return <ListItems activeTab={activeTab} items={userRecipes} />;
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
