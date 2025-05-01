
import css from './UserInfo.module.css';

import UserAvatar from '../ui/UserAvatar/UserAvatar';

function UserInfo({
  user = {},
  isOwnProfile = true,
  onAvatarChange = () => {},
}) {
  const {
    avatarUrl,
    name = 'Anonymous',
    email = 'example@example.com',
    recipesCount = 0,
    favoritesCount = 0,
    followersCount = 0,
    followingCount = 0,
  } = user;

  return (
    <div className={css.userInfo}>
      <UserAvatar
        avatarUrl={avatarUrl}
        name={name || email}
        isOwnProfile={isOwnProfile}
        onAvatarChange={onAvatarChange}
      />

      <ul className={css.userStats}>
        <li className={css.userStatItem}>Email: {email}</li>
        <li className={css.userStatItem}>Recipes: {recipesCount}</li>
        <li className={css.userStatItem}>Favorites: {favoritesCount}</li>
        <li className={css.userStatItem}>Followers: {followersCount}</li>
        <li className={css.userStatItem}>Following: {followingCount}</li>
      </ul>
    </div>
  );
}

export default UserInfo;
