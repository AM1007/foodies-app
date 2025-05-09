import React, { useState, useEffect } from 'react';
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
}) => {
  const navigate = useNavigate();
  const currentUser = useSelector(state => state.user.current);
  
  const initialFollowState = activeTab === 'following' ? true : false;
  const [isFollowing, setIsFollowing] = useState(initialFollowState);

  const { name = 'User', avatar, id, _id, recipes = [] } = user;
  const userId = id || _id; 
  
  
  const isCurrentUser = currentUser && 
    (currentUser._id === userId || currentUser.id === userId);
  
  
  const safeAvatar =
    typeof avatar === 'string'
      ? avatar.replace(/^"|"$/g, '') || 'default_avatar_url_here'
      : 'default_avatar_url_here';

  
  useEffect(() => {
    setIsFollowing(activeTab === 'following');
  }, [activeTab]);

  const handleFollowToggle = () => {
    
    const newFollowState = !isFollowing;
    setIsFollowing(newFollowState);
    
    
    if (onFollowToggle) {
      onFollowToggle(userId, newFollowState);
    }
  };
  
  
  const handleUserClick = (e) => {
    
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
        <p className={css.recipesCount}>Own recipes: {recipes.length}</p>

        {!isCurrentUser && (
          <Button 
            type="button" 
            onClick={handleFollowToggle}
            variant={isFollowing ? 'inactive' : 'dark'}
          >
            {isFollowing ? 'Following' : 'Follow'}
          </Button>
        )}
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

      <ArrowBtn 
        to={isCurrentUser ? '/users/current' : `/users/${userId}`} 
        ariaLabel={`Go to ${name}'s profile`}
        onClick={handleUserClick}
      />
    </div>
  );
};

export default UserPreview;