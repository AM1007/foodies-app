import { useEffect, useId } from 'react';
import { Field, Form, Formik, ErrorMessage } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser, resetAuthError } from '../../redux/users/authSlice';
import * as Yup from 'yup';
import Button from '../Button/Button';
import styles from './SignInForm.module.css';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SignInForm = ({ onSuccess }) => {
  const emailId = useId();
  const passwordId = useId();
  const dispatch = useDispatch();
  const { loading, error, isAuthenticated } = useSelector(state => state.auth);

  useEffect(() => () => dispatch(resetAuthError()), [dispatch]);

  useEffect(() => {
    if (isAuthenticated && onSuccess) {
      toast.success('You have successfully signed in!');
      setTimeout(() => onSuccess(), 1000);
    }
  }, [isAuthenticated, onSuccess]);

  const validationSchema = Yup.object({
    email: Yup.string()
      .email('Invalid email address')
      .required('Email is required'),
    password: Yup.string().required('Password is required'),
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      await dispatch(loginUser(values)).unwrap();
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
            <ErrorMessage
              name="email"
              component="div"
              className={styles.error}
            />
          </div>
          <div className={styles.formGroup}>
            <label
              htmlFor={passwordId}
              className={styles.visuallyHidden}
            ></label>
            <div className={styles.inputWrapper}>
              <Field
                id={passwordId}
                name="password"
                type="password"
                required
                placeholder="Password*"
                className={styles.input}
              />
            </div>
            <ErrorMessage
              name="password"
              component="div"
              className={styles.error}
            />
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
