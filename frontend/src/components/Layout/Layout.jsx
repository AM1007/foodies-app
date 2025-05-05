import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { refreshToken, fetchCurrentUser } from '../../redux/users/authSlice';

import Header from '../sections/Header/Header';
import Footer from '../sections/Footer/Footer';

import SignUpModal from '../SignUpModal/SignUpModal';
import SignInModal from '../SignInModal/SignInModal';
import LogOutModal from '../LogOutModal/LogOutModal';
import { useModal } from '../../hooks/useModal';
import Loader from '../Loader/Loader';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Layout = () => {
  const dispatch = useDispatch();
  const { activeModal, closeModal } = useModal();
  const { isAuthenticated, loading, user, token } = useSelector(
    state => state.auth,
  );

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken && !user) {
      dispatch(refreshToken())
        .unwrap()
        .then(() => {
          if (!user) {
            dispatch(fetchCurrentUser());
          }
        })
        .catch(err => {
          console.error('Error refreshing token:', err);
        });
    }
  }, [dispatch, user]);

  useEffect(() => {
    if (isAuthenticated && token && !user) {
      dispatch(fetchCurrentUser());
    }
  }, [isAuthenticated, token, user, dispatch]);

  useEffect(() => {
    if (
      isAuthenticated &&
      (activeModal === 'signin' || activeModal === 'signup')
    ) {
      closeModal();
    }
  }, [isAuthenticated, activeModal, closeModal]);

  return (
    <>
      <Header />
      <main>{loading ? <Loader /> : <Outlet />}</main>
      <Footer />

      {activeModal === 'signup' && <SignUpModal onClose={closeModal} />}
      {activeModal === 'signin' && <SignInModal onClose={closeModal} />}
      {activeModal === 'logout' && <LogOutModal onClose={closeModal} />}

      <ToastContainer position="top-right" autoClose={3000} />
    </>
  );
};

export default Layout;
