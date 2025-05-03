import { Field, Form, Formik } from 'formik';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { loginUser, resetAuthError } from '../../redux/users/authSlice';
import Button from '../Button/Button';
import styles from './SignInForm.module.css';

const SignInForm = ({ onSuccess }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector(state => state.auth);
  const [showPassword, setShowPassword] = useState(false);

  const validationSchema = Yup.object({
    email: Yup.string()
      .email('Invalid email address')
      .required('Email is required'),
    password: Yup.string()
      .min(6, 'Password must be at least 6 characters')
      .required('Password is required'),
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      await dispatch(loginUser(values)).unwrap();
      if (onSuccess) {
        onSuccess();
      }
      navigate('/');
    } catch (error) {
      console.error('Sign in error:', error);
    } finally {
      setSubmitting(false);
    }
  };

  useEffect(() => {
    return () => {
      dispatch(resetAuthError());
    };
  }, [dispatch]);

  return (
    <Formik
      initialValues={{ email: '', password: '' }}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting, errors, touched }) => (
        <Form className={styles.form}>
          <div className={styles.formGroup}>
            <label htmlFor="email" className={styles.label}>
              Email<sup>*</sup>
            </label>
            <Field
              name="email"
              id="email"
              type="email"
              className={`${styles.input} ${
                errors.email && touched.email ? styles.inputError : ''
              }`}
            />
            {errors.email && touched.email && (
              <div className={styles.error}>{errors.email}</div>
            )}
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="password" className={styles.label}>
              Password<sup>*</sup>
            </label>
            <div className={styles.passwordWrapper}>
              <Field
                name="password"
                id="password"
                type={showPassword ? 'text' : 'password'}
                className={`${styles.input} ${
                  errors.password && touched.password ? styles.inputError : ''
                }`}
              />
              <button
                type="button"
                className={styles.passwordToggle}
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {/* <svg className={styles.icon}>
                  <use xlinkHref={showPassword ? '#eye-off' : '#eye'} />
                </svg> */}
                {showPassword ? 'Hide' : 'Show'}
              </button>
            </div>
            {errors.password && touched.password && (
              <div className={styles.error}>{errors.password}</div>
            )}
          </div>

          {error && <div className={styles.formError}>{error}</div>}

          <Button
            type="submit"
            className={styles.submitButton}
            disabled={loading || isSubmitting}
          >
            {loading ? 'Signing in...' : 'SIGN IN'}
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default SignInForm;
