import React from 'react';
import { Outlet } from 'react-router-dom';

import Header from '../sections/Header/Header';
import Footer from '../sections/Footer/Footer';

import SignUpModal from '../SignUpModal/SignUpModal';
import SignInModal from '../SignInModal/SignInModal';
import LogOutModal from '../LogOutModal/LogOutModal';
import { useModal } from '../../hooks/useModal';

const Layout = () => {
  const { activeModal, closeModal } = useModal();
  console.log('activeModal =', activeModal);

  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>

      <Footer />

      {activeModal === 'signup' && <SignUpModal onClose={closeModal} />}
      {activeModal === 'signin' && <SignInModal onClose={closeModal} />}
      {activeModal === 'logout' && <LogOutModal onClose={closeModal} />}
    </>
  );
};

export default Layout;
