import React from 'react';
import Modal from '../Modal/Modal';
// import SignInForm from '../SignInForm/SignInForm';
import styles from './SignInModal.module.css';

const SignInModal = ({ onClose }) => {
  return (
    <Modal isOpen={true} onClose={onClose}>
      <div className={styles.container}>
        <h2 className={styles.title}>Sign In</h2>
        {/* Передаємо onSuccess, щоб після успішного входу закрити модалку */}
        <SignInForm onSuccess={onClose} />
      </div>
    </Modal>
  );
};

export default SignInModal;
