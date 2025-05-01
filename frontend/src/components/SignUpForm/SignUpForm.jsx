import { Field, Form, Formik } from 'formik';
import { useId } from 'react';
import Button from '../Button/Button';

const SignUpForm = () => {
  const nameId = useId();
  const emailId = useId();
  const passwordId = useId();

  const handleSubmit = (values, actions) => {
    actions.resetForm();
  };

  return (
    <Formik
      initialValues={{ name: '', email: '', password: '' }}
      onSubmit={handleSubmit}
    >
      <Form>
        <label htmlFor={nameId}>
          Name<sup>*</sup>
        </label>
        <Field name="name" id={nameId} />
        <br />
        <label htmlFor={emailId}>
          Email<sup>*</sup>
        </label>
        <Field name="email" id={emailId} />
        <br />
        <label htmlFor={passwordId}>Password</label>
        <Field name="password" id={passwordId} />
        <br />
        <Button type="submit">SIGN UP</Button>
      </Form>
    </Formik>
  );
};

export default SignUpForm;
