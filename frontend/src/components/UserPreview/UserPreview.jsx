import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import css from './UserPreview.module.css';
import UserAvatar from '../ui/UserAvatar/UserAvatar';
import Button from '../Button/Button';
import ArrowBtn from '../ui/ArrowBtn/ArrowBtn';

const UserPreview = ({
  user = {},
  isFollowingInitial = false,
  onFollowToggle,
}) => {
  const [isFollowing, setIsFollowing] = useState(isFollowingInitial);

  const { name = 'User', avatar, id, _id, recipes = [] } = user;
  const userId = id || _id;

  const safeAvatar =
    typeof avatar === 'string'
      ? avatar.replace(/^"|"$/g, '') || 'default_avatar_url_here'
      : 'default_avatar_url_here';

  const handleFollowToggle = () => {
    setIsFollowing(!isFollowing);
    if (onFollowToggle) onFollowToggle(userId, !isFollowing);
  };

  if (!userId) {
    console.warn('UserPreview received user without ID:', user);
    return null;
  }

  return (
    <div className={css.card}>
      <Link to={`/users/${userId}`} className={css.info}>
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
        <p className={css.recipesCount}>Own recipes: {recipes.length}</p>

        <Button
          type="button"
          onClick={handleFollowToggle}
          variant={isFollowing ? 'inactive' : 'dark'}
        >
          {isFollowing ? 'Following' : 'Follow'}
        </Button>
      </div>

      <div className={css.recipeImageContainer}>
        {recipes.slice(0, 4).map(recipe => (
          <Link
            key={recipe.id || recipe._id}
            to={`/recipes/${recipe.id || recipe._id}`}
            className={css.recipeLink}
          >
            <img
              src={recipe.thumb}
              alt={recipe.title}
              className={css.recipeImage}
            />
          </Link>
        ))}
      </div>

      <ArrowBtn to={`/users/${userId}`} ariaLabel={`Go to ${name}'s profile`} />
    </div>
  );
};

export default UserPreview;
