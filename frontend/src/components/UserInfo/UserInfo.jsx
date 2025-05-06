import css from './UserInfo.module.css';
import UserAvatar from '../ui/UserAvatar/UserAvatar';

const UserInfo = ({
  user = {},
  isOwnProfile = true,
  followersCount = 0,
  followingCount = 0,
}) => {
  const { name, email, recipesCount, favoritesCount } = user;

  return (
    <div className={css.userInfo}>
      <UserAvatar isOwnProfile={isOwnProfile} />
      <h2>{name}</h2>

      <ul className={css.userStats}>
        <li className={css.userStatItem}>Email: {email}</li>
        <li className={css.userStatItem}>Recipes: {recipesCount || 0}</li>
        <li className={css.userStatItem}>Favorites: {favoritesCount || 0}</li>
        <li className={css.userStatItem}>Followers: {followersCount}</li>
        <li className={css.userStatItem}>Following: {followingCount}</li>
      </ul>
    </div>
  );
};

export default UserInfo;
