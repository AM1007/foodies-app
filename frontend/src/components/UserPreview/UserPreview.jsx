import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import css from './UserPreview.module.css';
import UserAvatar from '../ui/UserAvatar/UserAvatar';
import Button from '../Button/Button';
import ArrowBtn from '../ui/ArrowBtn/ArrowBtn';

const UserPreview = ({
  user = {},
  activeTab,
  onFollowToggle,
  localFollowingIds = [],
  isFollowedByMe: initialIsFollowedByMe = false,
}) => {
  const navigate = useNavigate();
  const currentUser = useSelector(state => state.user.current);

  const userId = user.id || user._id;

  const isInFollowingIds =
    Array.isArray(localFollowingIds) && localFollowingIds.includes(userId);

  const pendingActionRef = useRef(false);

  const [isFollowing, setIsFollowing] = useState(
    initialIsFollowedByMe || isInFollowingIds,
  );

  const [isHovering, setIsHovering] = useState(false);

  const { name = 'User', avatar, recipes = [] } = user;

  const isCurrentUser =
    currentUser && (currentUser._id === userId || currentUser.id === userId);

  const safeAvatar =
    typeof avatar === 'string' ? avatar.replace(/^"|"$/g, '') || null : null;

  useEffect(() => {
    if (!pendingActionRef.current) {
      const newFollowState = initialIsFollowedByMe || isInFollowingIds;
      setIsFollowing(newFollowState);
    }
  }, [initialIsFollowedByMe, isInFollowingIds]);

  const handleFollowToggle = () => {
    const newFollowState = !isFollowing;

    pendingActionRef.current = true;

    setIsFollowing(newFollowState);
    setIsHovering(false);

    if (onFollowToggle && typeof onFollowToggle === 'function') {
      onFollowToggle(userId, newFollowState);

      setTimeout(() => {
        pendingActionRef.current = false;
      }, 2000);
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

  const handleUserClick = e => {
    if (isCurrentUser) {
      e.preventDefault();
      navigate('/users/current');
    }
  };

  if (!userId) {
    console.warn('UserPreview received user without ID:', user);
    return null;
  }

  return (
    <div className={css.card}>
      <Link
        to={isCurrentUser ? '/users/current' : `/users/${userId}`}
        className={css.info}
        onClick={handleUserClick}
      >
        <UserAvatar
          src={safeAvatar}
          alt={`${name}'s avatar`}
          showUpload={false}
          isOwnProfile={false}
          className={css.userPreviewAvatar}
        />
      </Link>

      <div className={css.userDetails}>
        <h3 className={css.name}>{name}</h3>
        <p className={css.recipesCount}>Own recipes: {recipes.length || 0}</p>

        {!isCurrentUser && (
          <Button
            type="button"
            onClick={handleFollowToggle}
            variant={isFollowing ? 'secondary' : 'dark'}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className={isFollowing && isHovering ? css.unfollowHover : ''}
          >
            {isFollowing ? (isHovering ? 'Unfollow' : 'Following') : 'Follow'}
          </Button>
        )}
      </div>

      <div className={css.recipeImageContainer}>
        {recipes.slice(0, 4).map((recipe, index) => (
          <Link
            key={recipe.id || recipe._id || index}
            to={`/recipes/${recipe.id || recipe._id}`}
            className={css.recipeLink}
          >
            <img
              src={recipe.thumb || '/placeholder.jpg'}
              alt={recipe.title || 'Recipe'}
              className={css.recipeImage}
            />
          </Link>
        ))}
      </div>

      <ArrowBtn
        to={isCurrentUser ? '/users/current' : `/users/${userId}`}
        ariaLabel={`Go to ${name}'s profile`}
        onClick={handleUserClick}
      />
    </div>
  );
};

export default UserPreview;
