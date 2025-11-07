import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import AuthService from '../services/authService';

const Login = () => {
  const navigate = useNavigate();
  const initialValues = { email: '', password: '' };
  const validationSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email format.').required('Email is required!'),
    password: Yup.string().required('Password is required!'),
  });

  const handleLogin = (formValue, { setSubmitting, setFieldError }) => {
    const { email, password } = formValue;
    AuthService.login(email, password).then(
      (data) => {
        if (data.role === 'SELLER') navigate('/seller-portal');
        else navigate('/products');
        window.location.reload();
      },
      (error) => {
        setFieldError('password', 'Invalid credentials. Please try again.');
        setSubmitting(false);
      }
    );
  };

  return (
    <div className="form-container">
      <h2>Login</h2>
      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleLogin}>
        {({ isSubmitting }) => (
          <Form>
            <label>Email</label>
            <Field name="email" type="email" className="input" />
            <ErrorMessage name="email" component="div" className="small" />
            <label>Password</label>
            <Field name="password" type="password" className="input" />
            <ErrorMessage name="password" component="div" className="small" />
            <div style={{marginTop:12}}>
              <button type="submit" className="btn" disabled={isSubmitting}>{isSubmitting?'Logging...':'Login'}</button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Login;
