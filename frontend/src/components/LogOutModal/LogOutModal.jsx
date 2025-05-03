import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logoutUser } from '../../redux/users/authSlice';
import Modal from '../Modal/Modal';
import Button from '../Button/Button';
import styles from './LogOutModal.module.css';

const LogOutModal = ({ onClose }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading } = useSelector(state => state.auth);

  const handleLogout = async () => {
    try {
      await dispatch(logoutUser()).unwrap();
      navigate('/');
      if (onClose) {
        onClose();
      }
    } catch (error) {
      console.error('Logout error:', error);
      if (onClose) {
        onClose();
      }
    }
  };

  return (
    <Modal isOpen={true} onClose={onClose}>
      <div className={styles.container}>
        <h2 className={styles.title}>Are you logging out?</h2>

        <p className={styles.question}>
          You can always log back in at my time.
        </p>

        <div className={styles.buttonsWrapper}>
          <Button onClick={onClose} className={styles.cancelButton}>
            CANCEL
          </Button>

          <Button
            onClick={handleLogout}
            className={styles.logoutButton}
            disabled={loading}
          >
            {loading ? 'Logging out' : 'Logout'}
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default LogOutModal;
