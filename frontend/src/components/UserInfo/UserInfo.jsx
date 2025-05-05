import css from './UserInfo.module.css';
import UserAvatar from '../ui/UserAvatar/UserAvatar';

const UserInfo = ({ user = {}, isOwnProfile = true }) => {
  const {
    name,
    email,
    recipesCount,
    favoritesCount,
    followersCount,
    followingCount,
  } = user;

  return (
    <div className={css.userInfo}>
      <UserAvatar isOwnProfile={isOwnProfile} />
      <h2>{name}</h2>

      <ul className={css.userStats}>
        <li className={css.userStatItem}>Email: {email}</li>
        <li className={css.userStatItem}>Recipes: {recipesCount}</li>
        <li className={css.userStatItem}>Favorites: {favoritesCount}</li>
        <li className={css.userStatItem}>Followers: {followersCount}</li>
        <li className={css.userStatItem}>Following: {followingCount}</li>
      </ul>
    </div>
  );
};

export default UserInfo;
