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
  const { modal, closeModal } = useModal();
  const { isAuthenticated, loading, user } = useSelector(state => state.auth);

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken && !user && !loading) {
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

      <ToastContainer position="top-center" autoClose={3000} />
    </>
  );
};

export default Layout;
