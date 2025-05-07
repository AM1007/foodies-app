import React from 'react';
import Modal from '../Modal/Modal';
import SignUpForm from '../SignUpForm/SignUpForm';
import { useModal } from '../../hooks/useModal';
import styles from './SignUpModal.module.css';

const SignUpModal = ({ onClose }) => {
  const { switchModal } = useModal();

  const switchToSignIn = () => {
    switchModal('signin');
  };

  return (
    <Modal isOpen={true} onClose={onClose}>
      <div className={styles.container}>
        <h2 className={styles.title}>Sign Up</h2>
        <SignUpForm onSuccess={onClose} />
      </div>
      <p className={styles.switchText}>
        Already have an account?{' '}
        <button
          type="button"
          onClick={switchToSignIn}
          className={styles.switchButton}
        >
          Sign In
        </button>
      </p>
    </Modal>
  );
};

export default SignUpModal;
