import React, { useState } from 'react';
import '../styles/create-game.css'
import { Api } from '../api/api';

// - Создание игры
export default function CreateGame() {

  const api = new Api()
  // Initialize form state
  const [form, setForm] = useState({
    start_time: null,
    location: 'МГТУ им. Н.Э.Баумана каб. 345',
    name: '',
    main_amount: 0,
    reserve_amount: 0,
    registration_open_time: null,
  });

  // State to handle errors (you can use a more complex validation object)
  const [formErrors, setFormErrors] = useState({
    start_time: false,
    location: false,
    // name: false,
    main_amount: false,
    reserve_amount: false,
    registration_open_time: false,
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

      start_time: form.start_time === null,
      location: form.location.trim() === '',
      main_amount: form.main_amount === null,
      reserve_amount: form.reserve_amount === null,
      registration_open_time: form.registration_open_time === null,
    };

    setFormErrors(errors);
    return !Object.values(errors).includes(true);
  };

  const [showCreatedModal, setShowCreatedModal] = useState(false)

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate the form before submitting
    if (validateForm()) {
      const mainAmount = Number(form.main_amount);
      const reserve_amount = Number(form.reserve_amount);
      const formData = {
        ...form,
        start_time: new Date(form.start_time ?? Date.now()),
        registration_open_time: new Date(form.registration_open_time ?? Date.now()),
        main_amount: mainAmount,
        reserve_amount: reserve_amount,
        name: "idk"
      };
      console.log('Form submitted:', formData);
      const game = await api.game.create(formData)
      setForm({
        start_time: null,
        location: 'МГТУ им. Н.Э.Баумана каб. 345',
        name: '',
        main_amount: 0,
        reserve_amount: 0,
        registration_open_time: null,
      })
    }
  };

  return (
    <div className='d-flex flex-column justify-content-center align-items-center py-4 create-game-card'>
      <form onSubmit={handleSubmit} className="">
      {[
        { name: 'start_time', title:'ДАТА И ВРЕМЯ ИГРЫ', placeholder: '12.12.2023 12:00' },
        { name: 'location', title:'МЕСТО ПРОВЕДЕНИЯ', placeholder: 'МГТУ им. Н.Э.Баумана каб. 345' },
        { name: 'main_amount', title:'КОЛИЧЕСТВО УЧАСТНИКОВ', placeholder: '7' },
        { name: 'reserve_amount', title:'РЕЗЕРВ', placeholder: '7' },
        { name: 'registration_open_time', title:'ВРЕМЯ ОТКРЫТИЯ РЕГИСТРАЦИИ', placeholder: '12.12.2023 12:00' },
      ].map(field => (
        <div key={field.name} className='block-input'>
          <div className="block-text">
            {field.title}
          </div>
          {!['registration_open_time', 'start_time'].includes(field.name) && (
            <input
              name={field.name}  // Dynamically set the field name
              value={form[field.name as keyof typeof form] ?? ''}  // Bind the field value to the form state
              onChange={handleInputChange}  // Use the generic change handler
              required
              className={`input ${(formErrors as Record<string, boolean>)[field.name] ? 'error' : ''}`}  // Conditionally apply error class
              type={['main_amount', 'reserve_amount'].includes(field.name)  ? "number" : "text"}
              placeholder={field.placeholder}
            />
          )}
          {['registration_open_time', 'start_time'].includes(field.name) && (
            <input
              name={field.name}
              onChange={handleInputChange}
              required
              className={`input ${(formErrors as Record<string, boolean>)[field.name] ? 'error' : ''}`}
              type="datetime-local"
              value={form[field.name as keyof typeof form] ?? ''}
              placeholder={field.placeholder}
            />
          )}
          {((formErrors as Record<string, boolean>)[field.name]) && (
            <div className="error-message">This field is required.</div>
          )}
        </div>
      ))}
      
        <button type="submit" className="reg-btn my-5">
          Создать игру
        </button>
      </form>
    </div>
  );
};