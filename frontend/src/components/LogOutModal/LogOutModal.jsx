import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from '../../redux/users/authSlice';
import Modal from '../Modal/Modal';
import Button from '../Button/Button';
import styles from './LogOutModal.module.css';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const LogOutModal = ({ onClose }) => {
  const dispatch = useDispatch();
  const { loading } = useSelector(state => state.auth);

  const handleLogout = async () => {
    try {
      console.log('🔄 Attempting to logout user...');
      await dispatch(logoutUser()).unwrap();
      toast.success('Logged out successfully');
      setTimeout(() => {
        onClose();
      }, 1000);
    } catch (error) {
      toast.error(`Logout failed: ${error.message || error}`);
    }
  };

  return (
    <Modal isOpen={true} onClose={onClose}>
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
            onClick={onClose}
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
