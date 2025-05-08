import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FaUserAlt } from 'react-icons/fa';
import css from './UserAvatar.module.css';
import { updateUserAvatar } from '../../../redux/users/userSlice';
import UploadAvatar from '../UploadAvatar/UploadAvatar';

function UserAvatar({
  avatarType = 'user',
  isOwnProfile = true,
  showUpload = true,
  className = '',
}) {
  const dispatch = useDispatch();
  const avatar = useSelector(state => state.user.current?.avatar);

  const handleAvatarChange = async e => {
    const file = e.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append('avatar', file);
      try {
        await dispatch(updateUserAvatar(formData)).unwrap();
        console.log('Avatar updated successfully');
      } catch (error) {
        console.log(error);
      }
    }
  };

  const avatarClass =
    className ||
    (avatarType === 'follower'
      ? css.followerAvatar
      : avatarType === 'following'
      ? css.followingAvatar
      : css.userAvatar);

  return (
    <div className={css.avatarOuterWrapper}>
      <div className={`${css.avatarWrapper} ${avatarClass}`}>
        {avatar ? (
          <img
            src={avatar}
            alt="User avatar"
            className={`${css.avatarImage} ${className}`}
          />
        ) : (
          <div className={css.avatarIconWrapper}>
            <FaUserAlt />
          </div>
        )}
      </div>

      {isOwnProfile && showUpload && (
        <label className={css.avatarInputWrapper}>
          <UploadAvatar />
          <input
            type="file"
            accept="image/*"
            className={css.avatarInput}
            onChange={handleAvatarChange}
            hidden
          />
        </label>
      )}
    </div>
  );
}

export default UserAvatar;
