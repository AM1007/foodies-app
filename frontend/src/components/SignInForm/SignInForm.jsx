import { useEffect } from 'react';
import { Field, Form, Formik } from 'formik';
import { useId } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser, resetAuthError } from '../../redux/users/authSlice';
import * as Yup from 'yup';
import Button from '../Button/Button';
import styles from './SignInForm.module.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const SignInForm = ({ onSuccess }) => {
  console.log(12);
  const emailId = useId();
  const passwordId = useId();
  const dispatch = useDispatch();
  const { loading, error, isAuthenticated } = useSelector(state => state.auth);

  useEffect(() => () => dispatch(resetAuthError()), [dispatch]);

  useEffect(() => {
    if (isAuthenticated && onSuccess) {
      iziToast.success({
        title: 'Success',
        message: 'You have successfully signed in!',
        position: 'topRight',
      });
      setTimeout(() => {
        onSuccess();
      }, 1000); // 1 секунда
    }
  }, [isAuthenticated, onSuccess]);

  const validationSchema = Yup.object({
    email: Yup.string()
      .email('Invalid email address')
      .required('Email is required'),
    password: Yup.string().required('Password is required'),
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    console.log(1);
    console.log('⭐️ handleSubmit function called with values:', values);
    try {
      console.log('⏱️ Entering try block');

      console.log('🔄 Attempting to login with:', values.email);
      await dispatch(loginUser(values)).unwrap();
      console.log('✅ Login API call successful');
    } catch (error) {
      console.log('❌ Login failed:', error);
      iziToast.error({
        title: 'Login failed',
        message: error.message || 'Something went wrong',
        position: 'topRight',
      });
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
            <label htmlFor={emailId} className={styles.label}>
              Email<sup>*</sup>
            </label>
            <Field
              name="email"
              id={emailId}
              className={styles.input}
              type="email"
            />
            <div className={styles.error}>
              <Field
                name="email"
                component={({ form }) =>
                  form.errors.email && form.touched.email
                    ? form.errors.email
                    : null
                }
              />
            </div>
          </div>
          <div className={styles.formGroup}>
            <label htmlFor={passwordId} className={styles.label}>
              Password<sup>*</sup>
            </label>
            <Field
              name="password"
              id={passwordId}
              className={styles.input}
              type="password"
            />
            <div className={styles.error}>
              <Field
                name="password"
                component={({ form }) =>
                  form.errors.password && form.touched.password
                    ? form.errors.password
                    : null
                }
              />
            </div>
          </div>
          {error && <div className={styles.error}>{error}</div>}
          <Button
            type="submit"
            className={styles.submitButton}
            disabled={loading || isSubmitting}
            onClick={() => console.log('🖱 Submit button clicked')}
          >
            {loading || isSubmitting ? 'Signing in...' : 'SIGN IN'}
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default SignInForm;
