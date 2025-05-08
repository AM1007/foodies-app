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

  const { name, avatar, id, recipes = [] } = user;

  const safeAvatar =
    typeof avatar === 'string'
      ? avatar.replace(/^"|"$/g, '') || 'default_avatar_url_here'
      : 'default_avatar_url_here';

  const handleFollowToggle = () => {
    setIsFollowing(!isFollowing);
    if (onFollowToggle) onFollowToggle(id, !isFollowing);
  };

  return (
    <div className={css.card}>
      <Link to={`/users/${id}`} className={css.info}>
        <UserAvatar src={safeAvatar} alt={name} showUpload={false} className={css.userPreviewAvatar}/>
      </Link>

      <div className={css.userDetails}>
        <h3 className={css.name}>{name}</h3>
        <p className={css.recipesCount}>Own recipes: {recipes.length}</p>

        <Button type="button" onClick={handleFollowToggle}>
          {isFollowing ? 'Following' : 'Follow'}
        </Button>
      </div>

      <div className={css.recipeImageContainer}>
        {recipes.slice(0, 4).map(recipe => (
          <Link
            key={recipe.id}
            to={`/recipes/${recipe.id}`}
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

      <ArrowBtn to={`/users/${id}`} ariaLabel={`Go to ${name}'s profile`} />
    </div>
  );
};

export default UserPreview;
