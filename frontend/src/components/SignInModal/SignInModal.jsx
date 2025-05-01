import React from 'react';
import Modal from '../Modal/Modal';
import SignInForm from '../SignInForm/SignInForm';
import styles from './SignInModal.module.css';

const SignInModal = ({ onClose }) => {
  return (
    <Modal isOpen={true} onClose={onClose}>
      <div className={styles.container}>
        <h2 className={styles.title}>Sign In</h2>
        <SignInForm onSuccess={onClose} />
        <p>Don't have an account? Create an account</p>
      </div>
    </Modal>
  );
};

export default SignInModal;
