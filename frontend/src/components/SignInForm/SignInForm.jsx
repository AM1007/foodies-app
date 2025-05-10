import React, { useEffect, useId, useState } from 'react';
import { Field, Form, Formik, ErrorMessage } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser, resetAuthError } from '../../redux/users/authSlice';
import { fetchCurrentUser } from '../../redux/users/userSlice';
import icons from '../../icons/sprite.svg';
import * as Yup from 'yup';
import Button from '../Button/Button';
import styles from './SignInForm.module.css';
import { toast } from 'react-hot-toast';

const SignInForm = ({ onSuccess }) => {
  const emailId = useId();
  const passwordId = useId();
  const dispatch = useDispatch();
  const { loading, error: reduxError } = useSelector(state => state.auth);
  const [showPassword, setShowPassword] = useState(false);
  const [serverError, setServerError] = useState(null);

  useEffect(() => {
    return () => dispatch(resetAuthError());
  }, [dispatch]);

  useEffect(() => {
    if (reduxError) {
      setServerError(reduxError);
    }
  }, [reduxError]);

  const validationSchema = Yup.object({
    email: Yup.string()
      .email('Invalid email address')
      .required('Email is required'),
    password: Yup.string()
      .min(6, 'Password must be at least 6 characters')
      .required('Password is required'),
  });

  const handleSubmit = async (values, { setSubmitting, setFieldError }) => {
    try {
      setServerError(null);

      const result = await dispatch(loginUser(values)).unwrap();

      if (result && result.token) {
        await dispatch(fetchCurrentUser()).unwrap();
        toast.success('Successfully signed in!');
        if (onSuccess) {
          setTimeout(onSuccess, 1000);
        }
      }
    } catch (error) {
      toast.error(
        error.message || 'Email or password is wrong. Please try again.',
      );
      if (error.includes('Password must be at least 6 characters')) {
        setFieldError('password', 'Password must be at least 6 characters');
      } else if (error.includes('Email or password is wrong')) {
        setFieldError('email', 'Email or password is incorrect');
      } else {
        setServerError(
          error || 'Email or password is wrong. Please try again.',
        );
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Formik
      initialValues={{ email: '', password: '' }}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting, isValid, dirty, errors, touched }) => (
        <Form className={styles.form}>
          <div className={styles.inputWithError}>
            <label htmlFor={emailId} className={styles.visuallyHidden}>
              Email
            </label>
            <div className={styles.inputWrapper}>
              <Field
                id={emailId}
                name="email"
                type="email"
                required
                placeholder="Email*"
                className={`${styles.input} ${
                  touched.email && errors.email ? styles.inputError : ''
                }`}
              />
            </div>
            <ErrorMessage
              name="email"
              component="div"
              className={styles.error}
            />
          </div>

          <div className={styles.inputWithError}>
            <label htmlFor={passwordId} className={styles.visuallyHidden}>
              Password
            </label>
            <div className={styles.inputWrapper}>
              <Field
                id={passwordId}
                name="password"
                type={showPassword ? 'text' : 'password'}
                required
                placeholder="Password*"
                className={`${styles.input} ${
                  touched.password && errors.password ? styles.inputError : ''
                }`}
              />
              {showPassword ? (
                <svg
                  className={styles.eyeIcon}
                  aria-hidden="true"
                  onClick={() => setShowPassword(false)}
                >
                  <use href={`${icons}#eye-off`} />
                </svg>
              ) : (
                <svg
                  className={styles.eyeIcon}
                  aria-hidden="true"
                  onClick={() => setShowPassword(true)}
                >
                  <use href={`${icons}#eye`} />
                </svg>
              )}
            </div>
            <ErrorMessage
              name="password"
              component="div"
              className={styles.error}
            />
          </div>

          {serverError && !errors.email && !errors.password && (
            <div className={styles.serverError}>
              Email or password is wrong. Please try again.
            </div>
          )}

          <div className={styles.buttonWrapper}>
            <Button
              type="submit"
              className={styles.submitButton}
              variant={
                !isValid || !dirty || isSubmitting || loading
                  ? 'inactive'
                  : 'dark'
              }
              disabled={!isValid || !dirty || isSubmitting || loading}
            >
              {loading || isSubmitting ? 'Signing in...' : 'Sign in'}
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default SignInForm;
