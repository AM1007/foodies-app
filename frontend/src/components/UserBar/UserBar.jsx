import { useState, useEffect, useMemo } from 'react';
import clsx from 'clsx';
import { useSelector, useDispatch } from 'react-redux';
import { useModal } from '../../hooks/useModal';
import { useNavigate, useLocation } from 'react-router-dom'; 
import Button from '../Button/Button';
import UserAvatar from '../ui/UserAvatar/UserAvatar';
import { fetchCurrentUser } from '../../redux/users/userSlice';
import icons from '../../icons/sprite.svg';
import styles from './UserBar.module.css';

const UserBar = () => {
  const userFromState = useSelector(state => state.user.current);
  const user = useMemo(() => userFromState || {}, [userFromState]);

  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { openModal } = useModal();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation(); 

  useEffect(() => {
    if (isAuthenticated && !user) {
      dispatch(fetchCurrentUser());
    }
  }, [isAuthenticated, user, dispatch]);


  useEffect(() => {
    setIsDropdownOpen(false);
  }, [location.pathname]);

  if (!isAuthenticated || !user) return null;

  return (
    <div className={styles.userBar}>
      <button
        className={styles.userBtn}
        onClick={() => setIsDropdownOpen(prev => !prev)}
      >
        <UserAvatar
          className={styles.avatar}
          avatarType="user"
          isOwnProfile={true}
          showUpload={false}
        />

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
              navigate('/users/current');
              setIsDropdownOpen(false);
            }}
          >
            Profile
          </Button>
          <Button
            className={styles.dropdownItem}
            onClick={() => {
              openModal('logout');
              setIsDropdownOpen(false); 
            }}
          >
            Log out{' '}
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
