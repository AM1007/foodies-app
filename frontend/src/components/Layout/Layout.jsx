import React, { useEffect, useRef } from 'react';
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

const Layout = () => {
  const dispatch = useDispatch();
  const { modal, closeModal } = useModal();
  const { isAuthenticated, loading, user } = useSelector(state => state.auth);

  // Використовуємо useRef для відстеження спроб оновлення токена
  const hasAttemptedRef = useRef(false);

  useEffect(() => {
    if (hasAttemptedRef.current) return;

    const storedToken = localStorage.getItem('token');
    const storedRefreshToken = localStorage.getItem('refreshToken');

    if (storedToken && !storedRefreshToken) {
      console.log('Token exists but no refresh token, removing token');
      localStorage.removeItem('token');
      hasAttemptedRef.current = true;
      return;
    }

    if (storedToken && storedRefreshToken && !user && !loading) {
      hasAttemptedRef.current = true;
      dispatch(refreshToken())
        .unwrap()
        .then(() => {
          if (!user) {
            dispatch(fetchCurrentUser());
          }
        })
        .catch(err => {
          console.error('Error refreshing token:', err);
          localStorage.removeItem('token');
          localStorage.removeItem('refreshToken');
        });
    }
  }, [dispatch, user, loading]);

  useEffect(() => {
    if (isAuthenticated && !user) {
      dispatch(fetchCurrentUser());
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
      <Footer />

      {modal === 'signup' && <SignUpModal onClose={closeModal} />}
      {modal === 'signin' && <SignInModal onClose={closeModal} />}
      {modal === 'logout' && <LogOutModal onClose={closeModal} />}
    </>
  );
};

export default Layout;
