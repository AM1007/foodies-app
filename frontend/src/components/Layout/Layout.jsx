import React, { useEffect, useRef } from 'react';
import { Outlet } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { refreshToken, fetchCurrentUser } from '../../redux/users/authSlice';

import Header from '../sections/Header/Header';
import Footer from '../sections/Footer/Footer';

import SignUpModal from '../SignUpModal/SignUpModal';
import SignInModal from '../SignInModal/SignInModal';
import LogOutModal from '../LogOutModal/LogOutModal';
import TeamModal from '../TeamModal/TeamModal';
import { useModal } from '../../hooks/useModal';
import Loader from '../Loader/Loader';
import { Toaster } from 'react-hot-toast';

const Layout = () => {
  const dispatch = useDispatch();
  const { modal, openModal, closeModal } = useModal();
  const { isAuthenticated, loading, user } = useSelector(state => state.auth);

  const hasAttemptedRef = useRef(false);
  const authInProgressRef = useRef(false);

  useEffect(() => {
    if (hasAttemptedRef.current || authInProgressRef.current) return;

    const storedToken = localStorage.getItem('token');
    const storedRefreshToken = localStorage.getItem('refreshToken');

    if (!storedToken || !storedRefreshToken) {
      if (storedToken && !storedRefreshToken) {
        localStorage.removeItem('token');
      }

      hasAttemptedRef.current = true;
      return;
    }

    if (storedToken && storedRefreshToken && !user && !loading) {
      authInProgressRef.current = true;

      dispatch(refreshToken())
        .unwrap()
        .then(() => {
          if (!user) {
            dispatch(fetchCurrentUser()).finally(() => {
              authInProgressRef.current = false;
            });
          } else {
            authInProgressRef.current = false;
          }
        })
        .catch(err => {
          console.error('Error refreshing token:', err);
          localStorage.removeItem('token');
          localStorage.removeItem('refreshToken');
          authInProgressRef.current = false;
        });

      hasAttemptedRef.current = true;
    }
  }, [dispatch, user, loading]);

  useEffect(() => {
    if (isAuthenticated && !user && !authInProgressRef.current) {
      authInProgressRef.current = true;

      dispatch(fetchCurrentUser()).finally(() => {
        authInProgressRef.current = false;
      });
    }
  }, [isAuthenticated, user, dispatch]);

  useEffect(() => {
    if (isAuthenticated && (modal === 'signin' || modal === 'signup')) {
      closeModal();
    }
  }, [isAuthenticated, modal, closeModal]);

  return (
    <>
      <Header />
      <main>{loading ? <Loader /> : <Outlet />}</main>
      <Footer openModal={openModal} />
      <Toaster position="top-center" reverseOrder={false} />

      {modal === 'signup' && <SignUpModal onClose={closeModal} />}
      {modal === 'signin' && <SignInModal onClose={closeModal} />}
      {modal === 'logout' && <LogOutModal onClose={closeModal} />}
      {modal === 'team' && <TeamModal onClose={closeModal} />}
    </>
  );
};

export default Layout;
