import { useState } from 'react';
import clsx from 'clsx';
import icons from '../../icons/sprite.svg';
import styles from './UserBar.module.css';

const UserBar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  return (
    <div className={styles.userBar}>
      <button
        className={styles.userBtn}
        onClick={() => setIsDropdownOpen(prev => !prev)}
      >
        {/* Тестовий аватар */}
        <img
          src="https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80"
          alt="Avatar"
          className={styles.avatar}
        />
        {/* Тестове ім'я користувача */}
        <span className={styles.username}>VICTORIA</span>
        <svg
          className={clsx(styles.arrow, isDropdownOpen && styles.open)}
          width="18"
          height="18"
        >
          <use href={`${icons}#down`} />
        </svg>
      </button>

      {isDropdownOpen && (
        <div className={styles.dropdown}>
          <button className={styles.dropdownItem}>PROFILE</button>
          <button className={styles.dropdownItem}>
            LOG OUT{' '}
            <svg className={styles.icon} width="18" height="18">
              <use href={`${icons}#arrow-up-right`} />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
};

export default UserBar;
