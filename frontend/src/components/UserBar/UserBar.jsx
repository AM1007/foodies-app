import { useState } from 'react';
import clsx from 'clsx';
import { useSelector } from 'react-redux';
import { useModal } from '../../hooks/useModal';
import { useNavigate } from 'react-router-dom';
import Button from '../Button/Button';
import icons from '../../icons/sprite.svg';
import styles from './UserBar.module.css';
import UserAvatar from '../ui/UserAvatar/UserAvatar';

const UserBar = () => {
  const user = useSelector(state => state.user.current) || {};
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { openModal } = useModal();
  const navigate = useNavigate();

  if (!user) return null;

  return (
    <div className={styles.userBar}>
      <button
        className={styles.userBtn}
        onClick={() => setIsDropdownOpen(prev => !prev)}
      >
        <UserAvatar avatarType="user" isOwnProfile={true} showUpload={false} />

        <div className={styles.wrapper}>
          <span className={styles.username}>{user.name}</span>
          <svg
            className={clsx(styles.arrow, isDropdownOpen && styles.open)}
            width="18"
            height="18"
          >
            <use href={`${icons}#down`} />
          </svg>
        </div>
      </button>

      {isDropdownOpen && (
        <div className={styles.dropdown}>
          <Button
            className={styles.dropdownItem}
            onClick={() => {
              navigate('/user');
              setIsDropdownOpen(false); 
            }}
          >
            PROFILE
          </Button>
          <Button
            className={styles.dropdownItem}
            onClick={() => openModal('logout')}
          >
            LOG OUT{' '}
            <svg className={styles.icon} width="18" height="18">
              <use href={`${icons}#arrow-up-right`} />
            </svg>
          </Button>
        </div>
      )}
    </div>
  );
};

export default UserBar;
