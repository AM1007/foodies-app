import React, { useEffect, useId, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser, resetAuthError } from '../../redux/users/authSlice';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import icons from '../../icons/sprite.svg';
import * as Yup from 'yup';
import Button from '../Button/Button.jsx';
import styles from './SignUpForm.module.css';
import { toast } from 'react-hot-toast';

export default function SignUpForm({ onSuccess }) {
  const dispatch = useDispatch();
  const { loading, error } = useSelector(state => state.auth);

  const nameId = useId();
  const emailId = useId();
  const passwordId = useId();

  const [showPassword, setShowPassword] = useState(false);
  const [serverError, setServerError] = useState(null);

  useEffect(() => () => dispatch(resetAuthError()), [dispatch]);

  useEffect(() => {
    if (error) {
      setServerError(error);
    }
  }, [error]);

  const validationSchema = Yup.object({
    name: Yup.string()
      .min(2, 'Name must be at least 2 characters')
      .required('Name is required'),
    email: Yup.string()
      .email('Invalid email address')
      .required('Email is required'),
    password: Yup.string()
      .min(6, 'Password must be at least 6 characters')
      .required('Password is required'),
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      setServerError(null);
      await dispatch(registerUser(values)).unwrap();
      toast.success('You have successfully signed up!');
      setTimeout(() => onSuccess(), 1000);
    } catch (error) {
      setServerError(error || 'Something went wrong');
      toast.error(serverError);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Formik
      initialValues={{ name: '', email: '', password: '' }}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting, isValid, dirty, errors, touched }) => (
        <Form className={styles.form}>
          <div className={styles.inputWithError}>
            <Field
              id={nameId}
              name="name"
              required
              placeholder="Name*"
              className={`${styles.input} ${
                touched.name && errors.name ? styles.inputError : ''
              }`}
            />
            <ErrorMessage
              name="name"
              component="div"
              className={styles.error}
            />
          </div>

          <div className={styles.inputWithError}>
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
            <ErrorMessage
              name="email"
              component="div"
              className={styles.error}
            />
          </div>

          <div className={styles.inputWithError}>
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

          {serverError && (
            <div className={styles.serverError}>{serverError}</div>
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
              {isSubmitting || loading ? 'Signing up…' : 'Sign Up'}
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  );
}
