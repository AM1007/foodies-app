import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Button from '../Button/Button';
import UserInfo from '../UserInfo/UserInfo';
import TabsList from '../TabsList/TabsList';
import {
  followUser,
  unfollowUser,
  fetchFollowers,
} from '../../redux/users/userSlice';
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
  renderTabContent,
  openModal,
}) => {
  const dispatch = useDispatch();
  const { following } = useSelector(state => state.user);
  const [isFollowing, setIsFollowing] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    if (profileUser && following && !isOwnProfile) {
      const userId = profileUser._id || profileUser.id;

      const alreadyFollowing =
        Array.isArray(following) &&
        following.some(followedUser => {
          const followedId = followedUser._id || followedUser.id;
          return followedId === userId;
        });

      setIsFollowing(alreadyFollowing);
    }
  }, [following, profileUser, isOwnProfile]);

  const handleFollowToggle = () => {
    if (!profileUser || isProcessing) return;

    const userId = profileUser._id || profileUser.id;
    setIsProcessing(true);

    if (isFollowing) {
      setIsFollowing(false);

      dispatch(unfollowUser(userId))
        .unwrap()
        .then(() => {
          setIsFollowing(false);
          dispatch(fetchFollowers(userId));
        })
        .catch(error => {
          console.error('Failed to unfollow:', error);
          setIsFollowing(true);
        })
        .finally(() => {
          setIsProcessing(false);
        });
    } else {
      setIsFollowing(true);

      dispatch(followUser(userId))
        .unwrap()
        .then(() => {
          setIsFollowing(true);
          dispatch(fetchFollowers(userId));
        })
        .catch(error => {
          console.error('Failed to follow:', error);
          setIsFollowing(false);
        })
        .finally(() => {
          setIsProcessing(false);
        });
    }
  };

  const handleMouseEnter = () => {
    if (isFollowing) {
      setIsHovering(true);
    }
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
  };

  return (
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

        {isOwnProfile ? (
          <Button className={css.button} onClick={() => openModal('logout')}>
            Log Out
          </Button>
        ) : (
          profileUser && (
            <Button
              onClick={handleFollowToggle}
              variant={isFollowing ? 'following' : 'follow'}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              className={isFollowing && isHovering ? css.unfollowHover : ''}
              style={{ cursor: isProcessing ? 'wait' : 'pointer' }}
              disabled={isProcessing}
            >
              {isProcessing
                ? 'Processing...'
                : isFollowing
                ? isHovering
                  ? 'Unfollow'
                  : 'FOLLOWING'
                : 'FOLLOW'}
            </Button>
          )
        )}
      </div>

      <div className={css.tabsContentWrapper}>
        <TabsList
          isOwnProfile={isOwnProfile}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />
        <div className={css.tabContentContainer}>{renderTabContent()}</div>
      </div>
    </div>
  );
};

export default React.memo(UserProfile);
