import React, { useState } from 'react';
import '../styles/registration.css'
import { useLocation } from 'react-router-dom';
import { mdiClockTimeThree, mdiMapMarker, mdiAlert } from '@mdi/js'; // Import icons
import Icon from '@mdi/react'; // Import Icon component

// - Регистрация на игру
const Registration: React.FC= () => {

  const location = useLocation();
  // Access query parameters
  const queryParams = new URLSearchParams(location.search);
  const nid = queryParams.get('game_id'); // Get 'nid' from the query param
  const nidNumber = parseInt(nid ?? "", 10);
  const ordinalMap: { [key: number]: string } = {
    1: 'Первая',
    2: 'Вторая',
    3: 'Третья',
    4: 'Четвертая',
    5: 'Пятая',
    6: 'Шестая',
    7: 'Седьмая',
    8: 'Восьмая',
    9: 'Девятая',
    10: 'Десятая',
    11: 'Одиннадцатая',
    12: 'Двенадцатая',
    // Add more if needed
  };
  
  const getOrdinal = (num: number) => {
    return ordinalMap[num] || 'неизвестная'; // Default for unknown numbers
  };

  // Initialize form state
  const [form, setForm] = useState({
    tg_contact: '',
    captain_name: '',
    group_name: '',
    phone: '',
    team_name: '',
    amount: null,
  });

  // State to handle errors (you can use a more complex validation object)
  const [formErrors, setFormErrors] = useState({
    tg_contact: false,
    captain_name: false,
    group_name: false,
    phone: false,
    team_name: false,
    amount: false,
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
      tg_contact: form.tg_contact.trim() === '',
      captain_name: form.captain_name.trim() === '',
      group_name: form.group_name.trim() === '',
      phone: form.phone.trim() === '',
      team_name: form.team_name.trim() === '',
      amount: form.amount === null || form.amount === '',
    };

    setFormErrors(errors);
    return !Object.values(errors).includes(true);
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validate the form before submitting
    if (validateForm()) {
      // Handle form submission logic (e.g., send data to backend)
      console.log('Form submitted:', form);
    }
  };

  return (
    <div className="registration-card items-center py-4">
      <div className="register-header text-white font-bold">РЕГИСТРАЦИЯ НА ИГРУ</div>
      <div className="game-num font-bold">{getOrdinal(nidNumber)} игра Бауманской лиги 24/25</div>
      <div className='info-container'>
        <div className="flex items-center my-1">
          <Icon path={mdiClockTimeThree} size={1} color="#e0ac59" />
          <div className="info-text">23 октября, СР 19:00</div>
        </div>
        <div className="flex items-center my-1">
          <Icon path={mdiMapMarker} size={1} color="#e0ac59" />
          <div className="info-text">345 аудитория (ГУК МГТУ им. Н.Э. Баумана)</div>
        </div>
        <div className="flex items-center my-1">
          <Icon path={mdiAlert} size={1} color="#e0ac59" />
          <div className="info-text">Регистрируется только капитан команды</div>
        </div>
      </div>
      <form onSubmit={handleSubmit} className="">

      {[
        { name: 'captain_name', title:'ИМЯ КАПИТАНА', placeholder: 'Николай Эрнестович Бауман' },
        { name: 'group_name', title:'УЧЕБНАЯ ГРУППА КАПИТАНА', placeholder: 'СМ1-11' },
        { name: 'phone', title:'НОМЕР ТЕЛЕФОНА', placeholder: '8(999)888-77-66' },
        { name: 'tg_contact', title:'TELEGRAM', placeholder: '@quizonmsk' },
        { name: 'team_name', title:'НАЗВАНИЕ КОМАНДЫ', placeholder: 'КвизON' },
        { name: 'amount', title:'КОЛИЧЕСТВО ЧЕЛОВЕК', placeholder: '6' },
      ].map(field => (
        <div key={field.name} className='block-input'>
          <div className="block-text">
            {field.title} <span className="star">*</span>
          </div>
          <input
            name={field.name}  // Dynamically set the field name
            value={form[field.name as keyof typeof form] ?? ''}  // Bind the field value to the form state
            onChange={handleInputChange}  // Use the generic change handler
            required
            className={`input ${(formErrors as Record<string, boolean>)[field.name] ? 'error' : ''}`}  // Conditionally apply error class
            type="text"
            placeholder={field.placeholder}
          />
          {((formErrors as Record<string, boolean>)[field.name]) && (
            <div className="error-message">This field is required.</div>
          )}
        </div>
      ))}
      
        <button type="submit" className="reg-btn my-5">
          Зарегистрироваться
        </button>

        <div className="agreement">
          Отправляя свои данные, вы соглашаетесь на{" "}
          <a className="agreement-link" href="https://bmstu.ru/about/obrabotka-dannyh" target="_blank" rel="noopener noreferrer">обработку персональных данных</a>
        </div>
      </form>
    </div>
  );
};

export default Registration;