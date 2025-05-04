import React, { useEffect } from 'react';
import { useId } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser, resetAuthError } from '../../redux/users/authSlice';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import Button from '../Button/Button.jsx';
import styles from './SignUpForm.module.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

export default function SignUpForm({ onSuccess }) {
  const dispatch = useDispatch();
  const { loading, error } = useSelector(state => state.auth);

  const nameId = useId();
  const emailId = useId();
  const passwordId = useId();

  useEffect(() => () => dispatch(resetAuthError()), [dispatch]);

  useEffect(() => {
    if (error) {
      iziToast.error({
        title: 'Error',
        message: error,
        position: 'topRight',
        class: 'custom-error-toast',
      });
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
      await dispatch(registerUser(values)).unwrap();
      iziToast.success({
        title: 'Success',
        message: 'You have successfully signed up!',
        position: 'topRight',
      });
      onSuccess();
    } catch {
      // Server error stored in state.auth.error
      iziToast.error({
        title: 'Error',
        message: error,
        position: 'topRight',
      });
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
      {({ isSubmitting }) => (
        <Form className={styles.form}>
          <label htmlFor={nameId} className={styles.label}>
            Name<sup>*</sup>
          </label>
          <Field id={nameId} name="name" className={styles.input} />
          <ErrorMessage name="name" component="div" className={styles.error} />

          <label htmlFor={emailId} className={styles.label}>
            Email<sup>*</sup>
          </label>
          <Field
            id={emailId}
            name="email"
            type="email"
            className={styles.input}
          />
          <ErrorMessage name="email" component="div" className={styles.error} />

          <label htmlFor={passwordId} className={styles.label}>
            Password<sup>*</sup>
          </label>
          <Field
            id={passwordId}
            name="password"
            type="password"
            className={styles.input}
          />
          <ErrorMessage
            name="password"
            component="div"
            className={styles.error}
          />

          {error && <div className={styles.error}>{error}</div>}

          <Button type="submit" disabled={loading || isSubmitting}>
            {loading || isSubmitting ? 'Signing up…' : 'Sign Up'}
          </Button>
        </Form>
      )}
    </Formik>
  );
}
