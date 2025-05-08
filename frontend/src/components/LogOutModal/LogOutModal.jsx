import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from '../../redux/users/authSlice';
import Modal from '../Modal/Modal';
import Button from '../Button/Button';
import styles from './LogOutModal.module.css';

import { useModal } from '../../hooks/useModal';
import { BeatLoader } from 'react-spinners';

const LogOutModal = () => {
  const dispatch = useDispatch();
  const { loading } = useSelector(state => state.auth);
  const { closeModal } = useModal();

  const handleLogout = async () => {
    try {
      await dispatch(logoutUser()).unwrap();
      console.log('Logged out successfully');
      closeModal();
    } catch (error) {
      console.log(`Logout failed: ${error.message || error}`);
    }
  };

  return (
    <Modal isOpen={true} onClose={closeModal}>
      <div className={styles.container}>
        <h2 className={styles.title}>Log Out</h2>
        <p className={styles.text}>You can always log back in.</p>

        <div className={styles.buttonsContainer}>
          <Button
            variant="dark"
            className={styles.modalButton}
            onClick={handleLogout}
            disabled={loading}
          >
            {loading ? 'Logging out...' : 'Log Out'}
          </Button>

          <Button
            variant="white"
            className={`${styles.modalButton} ${styles.modalButtonSize}`}
            onClick={closeModal}
            disabled={loading}
          >
            Cancel
          </Button>
        </div>
      </div>
      <ToastContainer position="top-center" autoClose={3000} />
    </Modal>
  );
};

export default LogOutModal;
