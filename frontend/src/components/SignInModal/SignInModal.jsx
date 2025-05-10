import Modal from '../Modal/Modal';
import SignInForm from '../SignInForm/SignInForm';
import { useModal } from '../../hooks/useModal';
import styles from './SignInModal.module.css';

const SignInModal = ({ onClose }) => {
  const { switchModal } = useModal();

  const switchToSignUp = () => {
    switchModal('signup');
  };

  return (
    <Modal isOpen={true} onClose={onClose}>
      <div className={styles.container}>
        <h2 className={styles.title}>Sign In</h2>
        <SignInForm onSuccess={onClose} />
      </div>
      <p className={styles.switchText}>
        Don't have an account?{' '}
        <button
          type="button"
          onClick={switchToSignUp}
          className={styles.switchButton}
        >
          Create an account
        </button>
      </p>
    </Modal>
  );
};

export default SignInModal;
