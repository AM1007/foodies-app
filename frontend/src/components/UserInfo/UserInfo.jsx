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
  <li className={css.userStatItem}>
    <span className={css.statLabel}>Email:</span>
    <span className={css.statValue}>{email}</span>
  </li>
  <li className={css.userStatItem}>
    <span className={css.statLabel}>Recipes:</span>
    <span className={css.statValue}>{recipesCount || 0}</span>
  </li>
  <li className={css.userStatItem}>
    <span className={css.statLabel}>Favorites:</span>
    <span className={css.statValue}>{favoritesCount || 0}</span>
  </li>
  <li className={css.userStatItem}>
    <span className={css.statLabel}>Followers:</span>
    <span className={css.statValue}>{followersCount || 0}</span>
  </li>
  <li className={css.userStatItem}>
    <span className={css.statLabel}>Following:</span>
    <span className={css.statValue}>{followingCount || 0}</span>
  </li>
</ul>
    </div>
  );
};

export default UserInfo;
