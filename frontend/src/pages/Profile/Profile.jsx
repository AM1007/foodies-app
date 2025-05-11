import React, { useEffect, useState, useCallback, useRef } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useModal } from '../../hooks/useModal';
import Loader from '../../components/Loader/Loader';
import PathInfo from '../../components/ui/PathInfo/PathInfo';
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
import styles from './Profile.module.css';

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
  const recentlyFollowedIds = useRef([]);
  const recentlyUnfollowedIds = useRef([]);

  const [localFavoritesCount, setLocalFavoritesCount] = useState(0);
  const [localFollowingCount, setLocalFollowingCount] = useState(0);
  const [localFollowersCount, setLocalFollowersCount] = useState(0);

  const needToUpdateFollowingRef = useRef(false);

  const updateUniqueFollowing = useCallback(() => {
    if (!following || !Array.isArray(following)) return;

    let mappedFollowing = following.map(followingUser => ({
      ...followingUser,
      id: followingUser.id || followingUser._id,
      name: followingUser.name || 'User',
      avatar: followingUser.avatar || null,
      recipes: followingUser.recipes || [],
    }));

    mappedFollowing = mappedFollowing.filter(
      user =>
        !recentlyUnfollowedIds.current.includes(user.id) &&
        !recentlyUnfollowedIds.current.includes(user._id),
    );

    let followersToAdd = [];
    if (uniqueFollowers && uniqueFollowers.length > 0) {
      followersToAdd = uniqueFollowers.filter(
        follower =>
          (recentlyFollowedIds.current.includes(follower.id) ||
            recentlyFollowedIds.current.includes(follower._id)) &&
          !mappedFollowing.some(
            f => f.id === follower.id || f._id === follower._id,
          ),
      );
    }

    setUniqueFollowing([...mappedFollowing, ...followersToAdd]);

    needToUpdateFollowingRef.current = false;
  }, [following, uniqueFollowers]);

  useEffect(() => {
    setActiveTab(isOwnProfile ? 'my-recipes' : 'recipes');
  }, [location.pathname, isOwnProfile]);

  useEffect(() => {
    if (
      activeTab === 'following' &&
      (following || needToUpdateFollowingRef.current)
    ) {
      updateUniqueFollowing();
    }
  }, [activeTab, following, updateUniqueFollowing]);

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
    if (isOwnProfile && current) {
      setTimeout(() => {
        dispatch(fetchFavoriteRecipes());
      }, 300);
    }
  }, [dispatch, isOwnProfile, current]);

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
      dispatch(fetchFollowing());
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
  }, [followers, activeTab]);

  const handleFollowToggle = useCallback(
    (userId, shouldFollow) => {
      if (shouldFollow) {
        setLocalFollowingIds(prev => {
          if (!prev.includes(userId)) {
            return [...prev, userId];
          }
          return prev;
        });

        recentlyFollowedIds.current = [...recentlyFollowedIds.current, userId];
        recentlyUnfollowedIds.current = recentlyUnfollowedIds.current.filter(
          id => id !== userId,
        );
        setLocalFollowingCount(prev => prev + 1);
        needToUpdateFollowingRef.current = true;

        dispatch(followUser(userId))
          .unwrap()
          .catch(error => {
            console.error(`Failed to follow user ${userId}:`, error);
            setLocalFollowingIds(prev => prev.filter(id => id !== userId));
            recentlyFollowedIds.current = recentlyFollowedIds.current.filter(
              id => id !== userId,
            );
            setLocalFollowingCount(prev => Math.max(0, prev - 1));
          });
      } else {
        setLocalFollowingIds(prev => prev.filter(id => id !== userId));
        recentlyUnfollowedIds.current = [
          ...recentlyUnfollowedIds.current,
          userId,
        ];
        recentlyFollowedIds.current = recentlyFollowedIds.current.filter(
          id => id !== userId,
        );
        setLocalFollowingCount(prev => Math.max(0, prev - 1));
        needToUpdateFollowingRef.current = true;

        dispatch(unfollowUser(userId))
          .unwrap()
          .catch(error => {
            console.error(`Failed to unfollow user ${userId}:`, error);
            setLocalFollowingIds(prev => [...prev, userId]);
            recentlyUnfollowedIds.current =
              recentlyUnfollowedIds.current.filter(id => id !== userId);
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
        recentlyUnfollowedIds.current = [
          ...recentlyUnfollowedIds.current,
          userId,
        ];
        recentlyFollowedIds.current = recentlyFollowedIds.current.filter(
          id => id !== userId,
        );
        setLocalFollowingCount(prev => Math.max(0, prev - 1));
        setUniqueFollowing(prev =>
          prev.filter(user => user.id !== userId && user._id !== userId),
        );

        dispatch(unfollowUser(userId))
          .unwrap()
          .catch(error => {
            console.error(`Failed to unfollow user ${userId}:`, error);
            setLocalFollowingIds(prev => [...prev, userId]);
            recentlyUnfollowedIds.current =
              recentlyUnfollowedIds.current.filter(id => id !== userId);
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
    const tabKey = `tab-content-${activeTab}`;

    let content;
    switch (activeTab) {
      case 'my-recipes':
        content = (
          <ListItems
            key={tabKey}
            activeTab={activeTab}
            items={ownRecipes}
            isOwnProfile={isOwnProfile}
          />
        );
        break;
      case 'my-favorites':
        content = (
          <ListItems
            key={tabKey}
            activeTab={activeTab}
            items={favoriteRecipes}
            onFavoriteRemoved={handleFavoriteRemoved}
            isOwnProfile={isOwnProfile}
          />
        );
        break;
      case 'followers':
        content = (
          <ListItems
            key={tabKey}
            activeTab={activeTab}
            items={uniqueFollowers || []}
            onFollowToggle={handleFollowToggle}
            localFollowingIds={localFollowingIds}
            isOwnProfile={isOwnProfile}
          />
        );
        break;
      case 'following':
        content = (
          <ListItems
            key={tabKey}
            activeTab={activeTab}
            items={uniqueFollowing || []}
            onFollowToggle={handleUnfollowFromList}
            localFollowingIds={localFollowingIds}
            isOwnProfile={isOwnProfile}
          />
        );
        break;
      case 'recipes':
        content = (
          <ListItems
            key={tabKey}
            activeTab={activeTab}
            items={userRecipes}
            isOwnProfile={isOwnProfile}
          />
        );
        break;
      default:
        content = null;
    }

    return <div className="tab-content-wrapper">{content}</div>;
  };

  return (
    <div className="container">
      <PathInfo current="Profile" />
      <div className={styles.titleWrapper}>
        <MainTitle
          text={isOwnProfile ? 'Profile' : `${profileUser?.name}'s Profile`}
        />
        <SubTitle text="Reveal your culinary art, share your favorite recipe, and create gastronomic masterpieces with us." />
      </div>
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
