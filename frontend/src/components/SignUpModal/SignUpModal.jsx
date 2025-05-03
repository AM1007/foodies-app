import React from 'react';
import Modal from '../Modal/Modal';
import SignUpForm from '../SignUpForm/SignUpForm';
import { useModal } from '../../hooks/useModal';
import styles from './SignUpModal.module.css';

const SignUpModal = ({ onClose }) => {
  const { openModal } = useModal();

  const switchToSignIn = () => {
    onClose();
    openModal('signin');
  };

  return (
    <Modal isOpen={true} onClose={onClose}>
      <div className={styles.container}>
        <h2 className={styles.title}>Sign Up</h2>

        <SignUpForm onSuccess={onClose} />

        <p className={styles.switchText}>
          I already have an account? Sign in{' '}
          <button
            type="button"
            onClick={switchToSignIn}
            className={styles.switchButton}
          >
            Sign In
          </button>
        </p>
      </div>
    </Modal>
  );
};

export default SignUpModal;
