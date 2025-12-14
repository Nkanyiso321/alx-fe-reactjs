import React from 'react';
import RegistrationForm from './components/RegistrationForm';
import FormikForm from './components/FormikForm';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>React Form Comparison</h1>
        <p>Comparing Controlled Components vs Formik</p>
      </header>
      
      <div className="forms-container">
        <div className="form-section">
          <RegistrationForm />
        </div>
        
        <div className="form-section">
          <FormikForm />
        </div>
      </div>
      
      <div className="comparison">
        <h3>Comparison Summary</h3>
        <div className="comparison-grid">
          <div className="comparison-item">
            <h4>Controlled Components</h4>
            <ul>
              <li>Manual state management</li>
              <li>Custom validation logic</li>
              <li>More boilerplate code</li>
              <li>Direct React state handling</li>
            </ul>
          </div>
          <div className="comparison-item">
            <h4>Formik + Yup</h4>
            <ul>
              <li>Built-in state management</li>
              <li>Declarative validation schema</li>
              <li>Less boilerplate</li>
              <li>Built-in form utilities</li>
              <li>Better error handling</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;