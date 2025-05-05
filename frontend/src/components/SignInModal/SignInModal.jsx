import React from 'react';
import Modal from '../Modal/Modal';
import SignInForm from '../SignInForm/SignInForm';
import { useModal } from '../../hooks/useModal';
import styles from './SignInModal.module.css';

const SignInModal = ({ onClose }) => {
  const { openModal } = useModal();

  const switchToSignUp = () => {
    onClose();
    openModal('signup');
  };

  return (
    <Modal isOpen={true} onClose={onClose}>
      <div className={styles.container}>
        <h2 className={styles.title}>Sign in</h2>

        <SignInForm onSuccess={onClose} />

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
      </div>
    </Modal>
  );
};

export default SignInModal;
