import { useEffect, useId, useState } from 'react';
import { Field, Form, Formik, ErrorMessage } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser, resetAuthError } from '../../redux/users/authSlice';
import { fetchCurrentUser } from '../../redux/users/userSlice';
import icons from '../../icons/sprite.svg';
import * as Yup from 'yup';
import Button from '../Button/Button';
import styles from './SignInForm.module.css';

const SignInForm = ({ onSuccess }) => {
  const emailId = useId();
  const passwordId = useId();
  const dispatch = useDispatch();
  const { loading, error: reduxError } = useSelector(state => state.auth);
  const [showPassword, setShowPassword] = useState(false);
  const [serverError, setServerError] = useState(null);

  // Очищення помилок Redux при розмонтуванні компонента
  useEffect(() => {
    return () => dispatch(resetAuthError());
  }, [dispatch]);

  // Синхронізація помилок з Redux state
  useEffect(() => {
    if (reduxError) {
      setServerError(reduxError);
    }
  }, [reduxError]);

  const validationSchema = Yup.object({
    email: Yup.string()
      .email('Invalid email address')
      .required('Email is required'),
    password: Yup.string().required('Password is required'),
  });

  const handleSubmit = async (values, { setSubmitting, setFieldError }) => {
    try {
      // Очищення попередніх помилок
      setServerError(null);

      // Виклик дії логіну з Redux
      const result = await dispatch(loginUser(values)).unwrap();

      if (result && result.token) {
        // Отримання даних поточного користувача
        await dispatch(fetchCurrentUser()).unwrap();

        // Закриття модального вікна ТІЛЬКИ після успішного входу
        if (onSuccess) {
          setTimeout(onSuccess, 1000);
        }
      }
    } catch (error) {
      // Обробка спеціальних помилок валідації з бекенду
      if (error.includes('Password must be at least 6 characters')) {
        setFieldError('password', 'Password must be at least 6 characters');
      } else if (error.includes('Email or password is wrong')) {
        // Встановлюємо загальне повідомлення для невірних облікових даних
        setServerError('Email or password is incorrect');
      } else {
        // Встановлення помилки в локальний стан для інших типів помилок
        setServerError(error || 'Authentication failed. Please try again.');
      }
      console.error('Login error:', error);
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
          {/* Email Field */}
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
          <ErrorMessage name="email" component="div" className={styles.error} />

          {/* Password Field */}
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
            {/* Toggle Password Visibility */}
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

          {/* Server-side Error Display */}
          {serverError && <div className={styles.error}>{serverError}</div>}

          {/* Submit Button */}
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
