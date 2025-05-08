import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import css from './UserPreview.module.css';
import UserAvatar from '../ui/UserAvatar/UserAvatar';
import Button from '../Button/Button';
import ArrowBtn from '../ui/ArrowBtn/ArrowBtn';

import { followUser, unfollowUser } from '../../redux/users/userSlice';

const UserPreview = ({
  user = {},
  recipes = [],
  isFollowingInitial = false,
  onFollowToggle,
}) => {
  const [isFollowing, setIsFollowing] = useState(isFollowingInitial);

  const { name, avatar, id } = user;

  const handleFollowToggle = () => {
    setIsFollowing(!isFollowing);
    if (onFollowToggle) onFollowToggle(id, !isFollowing);
  };

  return (
    <div className={css.card}>
      <Link to={`/users/${id}`} className={css.info}>
        <UserAvatar src={avatar} alt={name} showUpload={false} />
        <div>
          <h3 className={css.name}>{name}</h3>
          <p className={css.recipesCount}>{recipes.length} Recipes</p>
        </div>
      </Link>

      <Button type="button" onClick={handleFollowToggle}>
        {isFollowing ? 'Following' : 'Follow'}
      </Button>

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
