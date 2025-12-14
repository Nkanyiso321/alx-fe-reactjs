import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import './FormikForm.css';

// Validation schema using Yup
const validationSchema = Yup.object().shape({
  username: Yup.string()
    .required('Username is required')
    .min(3, 'Username must be at least 3 characters')
    .max(20, 'Username must not exceed 20 characters'),
  email: Yup.string()
    .required('Email is required')
    .email('Invalid email format'),
  password: Yup.string()
    .required('Password is required')
    .min(6, 'Password must be at least 6 characters')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
      'Password must contain at least one uppercase letter, one lowercase letter, and one number'
    )
});

const FormikForm = () => {
  // Initial form values
  const initialValues = {
    username: '',
    email: '',
    password: ''
  };

  // Handle form submission
  const handleSubmit = (values, { setSubmitting, resetForm }) => {
    console.log('Form submitted:', values);
    
    // Simulate API call
    setTimeout(() => {
      alert(`Registration successful!\n\nUsername: ${values.username}\nEmail: ${values.email}`);
      resetForm();
      setSubmitting(false);
    }, 1000);
  };

  return (
    <div className="formik-container">
      <h2>User Registration (Formik + Yup)</h2>
      
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, isValid, dirty }) => (
          <Form className="formik-form">
            <div className="form-group">
              <label htmlFor="username">Username:</label>
              <Field
                type="text"
                id="username"
                name="username"
                placeholder="Enter your username"
                className="formik-input"
              />
              <ErrorMessage name="username" component="div" className="error-message" />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email:</label>
              <Field
                type="email"
                id="email"
                name="email"
                placeholder="Enter your email"
                className="formik-input"
              />
              <ErrorMessage name="email" component="div" className="error-message" />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password:</label>
              <Field
                type="password"
                id="password"
                name="password"
                placeholder="Enter your password"
                className="formik-input"
              />
              <ErrorMessage name="password" component="div" className="error-message" />
              
              <div className="password-requirements">
                <p>Password must contain:</p>
                <ul>
                  <li>At least 6 characters</li>
                  <li>One uppercase letter</li>
                  <li>One lowercase letter</li>
                  <li>One number</li>
                </ul>
              </div>
            </div>

            <button 
              type="submit" 
              className="submit-btn"
              disabled={isSubmitting || !isValid || !dirty}
            >
              {isSubmitting ? 'Registering...' : 'Register'}
            </button>

            <div className="form-info">
              <p>
                <strong>Formik Features:</strong>
              </p>
              <ul>
                <li>Built-in form state management</li>
                <li>Yup validation integration</li>
                <li>Automatic error messages</li>
                <li>Touch state tracking</li>
                <li>Submission state handling</li>
              </ul>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default FormikForm;