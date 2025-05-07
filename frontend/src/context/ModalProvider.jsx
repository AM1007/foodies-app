import { ModalContext } from './ModalContext';
import { useState } from 'react';

export const ModalProvider = ({ children }) => {
  const [modal, setModal] = useState(null);
  const [activeForm, setActiveForm] = useState('signUp');

  const openModal = type => {
    setModal(type);
    setActiveForm(type);
  };

  const switchForm = type => {
    setActiveForm(type);
  };

  const switchModal = type => {
    setModal(type);
    setActiveForm(type);
  };

  const closeModal = () => setModal(null);

  return (
    <ModalContext.Provider
      value={{
        modal,
        openModal,
        closeModal,
        activeForm,
        setActiveForm,
        switchForm,
        switchModal,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
};
