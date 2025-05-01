import React from 'react';
import Modal from '../Modal/Modal';
// import SignUpForm from '../SignUpForm/SignUpForm';
import styles from './SignUpModal.module.css';

const SignUpModal = ({ onClose }) => {
  return (
    <Modal isOpen={true} onClose={onClose}>
      <div className={styles.container}>
        <h2 className={styles.title}>Sign Up</h2>
        {/* Закриваємо модалку після успішної реєстрації */}
        <SignUpForm onSuccess={onClose} />
      </div>
    </Modal>
  );
};

export default SignUpModal;
