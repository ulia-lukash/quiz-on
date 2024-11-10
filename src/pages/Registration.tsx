import React, { useState } from 'react';
import '../styles/registration.css'
import { useLocation } from 'react-router-dom';
import { mdiClockTimeThree, mdiMapMarker, mdiAlert } from '@mdi/js'; // Import icons
import Icon from '@mdi/react'; // Import Icon component
import { Api } from '../api/api';

// - Регистрация на игру
const Registration: React.FC= () => {

  const api = new Api()
  
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
    game_id: nidNumber,
    telegram: '',
    captain_name: '',
    group_name: '',
    phone: '',
    team_name: '',
    team_id: '',
    players_amount: 0,
  });

  // State to handle errors (you can use a more complex validation object)
  const [formErrors, setFormErrors] = useState({
    telegram: false,
    captain_name: false,
    phone: false,
    team_name: false,
    players_amount: false,
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
      telegram: form.telegram.trim() === '',
      captain_name: form.captain_name.trim() === '',
      phone: form.phone.trim() === '',
      team_name: form.team_name.trim() === '',
      players_amount: form.players_amount === null,
    };

    setFormErrors(errors);
    return !Object.values(errors).includes(true);
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate the form before submitting
    if (validateForm()) {

      const playersAmount = Number(form.players_amount);
      const formData = { ...form, players_amount: playersAmount };
      console.log('Form submitted:', formData);
      await api.game.register(formData);
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
        { name: 'telegram', title:'TELEGRAM', placeholder: '@quizonmsk' },
        { name: 'team_name', title:'НАЗВАНИЕ КОМАНДЫ', placeholder: 'КвизON' },
        { name: 'team_id', title:'ID КОМАНДЫ', placeholder: '123456' },
        { name: 'players_amount', title:'КОЛИЧЕСТВО ЧЕЛОВЕК', placeholder: '6' },
      ].map(field => (
        <div key={field.name} className='block-input'>
          <div className="block-text">
            {field.title} <span className="star">*</span>
          </div>
          <input
            name={field.name}  // Dynamically set the field name
            value={form[field.name as keyof typeof form] ?? ''}  // Bind the field value to the form state
            onChange={handleInputChange}  // Use the generic change handler
            required={!['team_id', 'group_name'].includes(field.name)}
            className={`input ${(formErrors as Record<string, boolean>)[field.name] ? 'error' : ''}`}  // Conditionally apply error class
            type={field.name === 'players_amount' ? 'number' : 'text'}
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