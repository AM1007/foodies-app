import { useEffect, useId, useState } from 'react';
import { Field, Form, Formik, ErrorMessage } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser, resetAuthError } from '../../redux/users/authSlice';
import { fetchCurrentUser } from '../../redux/users/userSlice';  
import icons from '../../icons/sprite.svg';
import * as Yup from 'yup';
import Button from '../Button/Button';
import styles from './SignInForm.module.css';
import { toast } from 'react-toastify';

const SignInForm = ({ onSuccess }) => {
  const emailId = useId();
  const passwordId = useId();
  const dispatch = useDispatch();
  const { error, loading } = useSelector(state => state.auth);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => () => dispatch(resetAuthError()), [dispatch]);

  const validationSchema = Yup.object({
    email: Yup.string()
      .email('Invalid email address')
      .required('Email is required'),
    password: Yup.string().required('Password is required'),
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    try {

      await dispatch(loginUser(values)).unwrap();

      const currentUser = await dispatch(fetchCurrentUser()).unwrap();

      if (currentUser) {
        toast.success('You have successfully signed in!');
      } else {
        toast.error('Could not fetch user data.');
      }

      if (onSuccess) setTimeout(onSuccess, 1000);
    } catch (error) {
      toast.error(error.message || 'Something went wrong');
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
      {({ isSubmitting }) => (
        <Form className={styles.form}>
          <div className={styles.formGroup}>
            <label htmlFor={emailId} className={styles.visuallyHidden}></label>
            <div className={styles.inputWrapper}>
              <Field
                id={emailId}
                name="email"
                type="email"
                required
                placeholder="Email*"
                className={styles.input}
              />
            </div>
            <ErrorMessage name="email" component="div" className={styles.error} />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor={passwordId} className={styles.visuallyHidden}></label>
            <div className={styles.inputWrapper}>
              <Field
                id={passwordId}
                name="password"
                type={showPassword ? 'text' : 'password'}
                required
                placeholder="Password*"
                className={styles.input}
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
            <ErrorMessage name="password" component="div" className={styles.error} />
          </div>

          {error && <div className={styles.error}>{error}</div>}

          <Button
            type="submit"
            className={styles.submitButton}
            disabled={loading || isSubmitting}
          >
            {loading || isSubmitting ? 'Signing in...' : 'SIGN IN'}
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default SignInForm;
