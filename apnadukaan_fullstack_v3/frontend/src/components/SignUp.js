import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import AuthService from '../services/authService';

const SignUp = () => {
  const navigate = useNavigate();
  const initialValues = { name: '', email: '', password: '', role: 'CUSTOMER' };
  const validationSchema = Yup.object().shape({
    name: Yup.string().required('Name is required!'),
    email: Yup.string().email('Invalid email format.').required('Email is required!'),
    password: Yup.string().min(6,'Password must be at least 6 characters').required('Password is required!'),
    role: Yup.string().required('Role is required!'),
  });

  const handleSignup = (formValue, { setSubmitting, setFieldError }) => {
    const { name, email, password, role } = formValue;
    AuthService.register(name, email, password, role).then(
      () => {
        alert('Registration successful! Please log in.');
        navigate('/login');
      },
      (error) => {
        setFieldError('email', 'This email is already registered.');
        setSubmitting(false);
      }
    );
  };

  return (
    <div className="form-container">
      <h2>Sign up</h2>
      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSignup}>
        {({ isSubmitting }) => (
          <Form>
            <label>Full name</label>
            <Field name="name" type="text" className="input" />
            <ErrorMessage name="name" component="div" className="small" />
            <label>Email</label>
            <Field name="email" type="email" className="input" />
            <ErrorMessage name="email" component="div" className="small" />
            <label>Password</label>
            <Field name="password" type="password" className="input" />
            <ErrorMessage name="password" component="div" className="small" />
            <label>Register as</label>
            <Field as="select" name="role" className="input">
              <option value="CUSTOMER">Customer</option>
              <option value="SELLER">Seller</option>
            </Field>
            <div style={{marginTop:12}}>
              <button type="submit" className="btn" disabled={isSubmitting}>Sign up</button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default SignUp;
