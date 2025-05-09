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

  const hasAttemptedRef = useRef(false);
  const authInProgressRef = useRef(false);

  // Single authentication attempt with debouncing mechanism
  useEffect(() => {
    // Prevent multiple auth attempts
    if (hasAttemptedRef.current || authInProgressRef.current) return;
    
    const storedToken = localStorage.getItem('token');
    const storedRefreshToken = localStorage.getItem('refreshToken');

    if (!storedToken || !storedRefreshToken) {
      // Clear partial auth state
      if (storedToken && !storedRefreshToken) {
        console.log('Token exists but no refresh token, removing token');
        localStorage.removeItem('token');
      }
      
      hasAttemptedRef.current = true;
      return;
    }

    // If we have both tokens but no user and not currently loading
    if (storedToken && storedRefreshToken && !user && !loading) {
      // Mark that we're handling auth
      authInProgressRef.current = true;
      
      dispatch(refreshToken())
        .unwrap()
        .then(() => {
          if (!user) {
            dispatch(fetchCurrentUser())
              .finally(() => {
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

  // Only fetch user if authenticated and no user loaded yet
  useEffect(() => {
    // Avoid unnecessary API calls when we already have a user
    // or when we're not authenticated
    if (isAuthenticated && !user && !authInProgressRef.current) {
      authInProgressRef.current = true;
      
      dispatch(fetchCurrentUser())
        .finally(() => {
          authInProgressRef.current = false;
        });
    }
  }, [isAuthenticated, user, dispatch]);

  // Close authentication modals when user becomes authenticated
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