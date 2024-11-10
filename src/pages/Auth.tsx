import React, { useState } from 'react';
import '../styles/auth.css';
import { Api } from '../api/api';
// - Авторизация
const Auth: React.FC = () => {

  const api = new Api()
   // Initialize form state
   const [form, setForm] = useState({
    login: '',
    password: '',
  });

  // State to handle errors (you can use a more complex validation object)
  const [formErrors, setFormErrors] = useState({
    login: false,
    password: false,
  });

  // Generic handler to update form fields dynamically
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    // Update the form state
    setForm(prevState => ({
        ...prevState,
        [name]: value,
    }));

    // Clear the error for the field once the user modifies it
    setFormErrors(prevState => ({
        ...prevState,
        [name]: false,
    }));
  };

  // Optional: Simple validation for required fields (you can extend this)
  const validateForm = () => {
    const errors = {
      login: form.login.trim() === '',
      password: form.password.trim() === '',
    };

    setFormErrors(errors);
    return !Object.values(errors).includes(true);
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate the form before submitting
    if (validateForm()) {
      // Handle form submission logic (e.g., send data to backend)
      console.log('Form submitted:', form);

      await api.login(form)
    }
  };


  return (
    <div className="auth-card items-center py-4">
      <div className="auth-header text-white font-bold">ВОЙТИ</div>
      <form onSubmit={handleSubmit} className="">
        <input
            name="login"  // Dynamically set the field name
            value={form.login}  // Bind the field value to the form state
            onChange={handleInputChange}  // Use the generic change handler
            required
            className={`input ${formErrors.login ? 'error' : ''}`}  // Conditionally apply error class
            type="text"
            placeholder="Логин"
          />
          {(formErrors.login) && (
            <div className="error-message">This field is required.</div>
          )}
          <input
            name="password"  // Dynamically set the field name
            value={form.password}  // Bind the field value to the form state
            onChange={handleInputChange}  // Use the generic change handler
            required
            
            className={`input ${formErrors.password ? 'error' : ''}`}  // Conditionally apply error class
            type="text"
            placeholder="Пароль"
          />
          {(formErrors.password) && (
            <div className="error-message">This field is required.</div>
          )}

          <button type="submit" className="reg-btn my-5">
            Войти
          </button>
      </form>
    </div>
  );
};

export default Auth;