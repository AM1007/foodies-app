import css from './UserAvatar.module.css';
import { FaUserAlt, FaPlus } from 'react-icons/fa';
import UploadAvatar from '../UploadAvatar/UploadAvatar';

function UserAvatar({
  avatarUrl,
  avatarType = 'user',
  onAvatarChange,
  isOwnProfile,
}) {
  return (
    <div
      className={`${css.avatarWrapper} ${
        avatarType === 'follower'
          ? css.followerAvatar
          : avatarType === 'following'
          ? css.followingAvatar
          : css.userAvatar
      }`}
    >
      {avatarUrl ? (
        <img src={avatarUrl} alt="User avatar" className={css.avatarImage} />
      ) : (
        <div className={css.avatarIconWrapper}>
          <FaUserAlt />
        </div>
      )}

      {isOwnProfile && (
        <label className={css.avatarInputWrapper}>
          <UploadAvatar
            onClick={() => document.querySelector(`#avatarInput`).click()}
          />
          <input
            id="avatarInput"
            type="file"
            accept="image/*"
            className={css.avatarInput}
            onChange={onAvatarChange}
          />
        </label>
      )}
    </div>
  );
}

export default UserAvatar;
