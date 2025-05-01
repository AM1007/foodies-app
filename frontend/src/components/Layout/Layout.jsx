import React from 'react';
import { Outlet } from 'react-router-dom';

import Header from '../Header/Header';
import Footer from '../sections/Footer/Footer';

import SignUpModal from '../SignUpModal/SignUpModal';
import SignInModal from '../SignInModal/SignInModal';
import LogOutModal from '../LogOutModal/LogOutModal';
import { useModal } from '../../context/ModalContext';

import Button from '../Button/Button';
// import Modal from '../Modal/Modal';

const Layout = () => {
  const { activeModal, closeModal } = useModal();

  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>

      <Footer />
      <Button>test</Button>

      {activeModal === 'signup' && <SignUpModal onClose={closeModal} />}
      {activeModal === 'signin' && <SignInModal onClose={closeModal} />}
      {activeModal === 'logout' && <LogOutModal onClose={closeModal} />}
    </>
  );
};

export default Layout;
