import React, { useState } from 'react';
import '../styles/registration.css'
import { useLocation } from 'react-router-dom';
import { mdiClockTimeThree, mdiMapMarker, mdiAlert, mdiClose } from '@mdi/js';
import Icon from '@mdi/react';
import { Api } from '../api/api';
// @ts-ignore
import InputMask from 'react-input-mask';
import { Modal } from 'react-bootstrap';
import { Game } from '../components/GameCard';

// - Регистрация на игру

type RegistrationProps = {
  game: Game
};
export default function Registration() {

  const api = new Api()
  
  const location = useLocation();
  // Access query parameters
  const game = location.state?.game;
  
  const dateOptions: Intl.DateTimeFormatOptions = { day: "numeric", month: "long", weekday: "short", hour: "2-digit", minute: "2-digit", hour12: false };
  const formattedDate = new Intl.DateTimeFormat("ru-RU", dateOptions).format(new Date(game.start_time));
  const nidNumber = game?.id
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

  const dialogMap: { [key: number]: string } = {
    1: 'первой',
    2: 'второй',
    3: 'третьей',
    4: 'четвёртой',
    5: 'пятой',
    6: 'шестой',
    7: 'седьмой',
    8: 'восьмой',
    9: 'девятой',
    10: 'десятой',
    11: 'одиннадцатой',
    12: 'двенадцатой',
    // Add more if needed
  };
  
  const getOrdinal = (num: number) => {
    return ordinalMap[num] || 'неизвестная'; // Default for unknown numbers
  };

  const getDialogMap = (num: number) => {
    return dialogMap[num] || 'очередной';
  }

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
      const result = await api.game.register(formData);
      switch (result.status) {
        case "ok":
          setShowSuccessModal(true)
          break
        case "reserve":
          setShowReserveModal(true)
          break
        case "closed":
          setShowTooLateModal(true)
          break
        default:
          break
      }
      setForm({
        game_id: nidNumber,
        telegram: '',
        captain_name: '',
        group_name: '',
        phone: '',
        team_name: '',
        team_id: '',
        players_amount: 0,
      })
    }
  };

  const [showSuccessModal, setShowSuccessModal] = useState(false)
  const [showReserveModal, setShowReserveModal] = useState(false)
  const [showTooLateModal, setShowTooLateModal] = useState(false)

  return (
    <div className="registration-card align-items-center py-4">
      <Modal show={showSuccessModal} className="login-modal" centered>
        <Modal.Header className='d-flex justify-content-between'>
          <Modal.Title>Поздравляем!</Modal.Title>
          <button onClick={()=> setShowSuccessModal(false)} className="btn">
            <Icon path={mdiClose} size={1} color={"#e0ac59"}></Icon>
          </button>
        </Modal.Header>
        <Modal.Body className="text-white">
          Первые задания от КвизON успешно выполнены — твоя команда зарегистрирована! 
          <br />
          Посмотрим, как ты справишься с другими вопросами на {getDialogMap(nidNumber)} игре Бауманской лиги КвизON. 
          <br />
          Напомним, что игра пройдет: 23 октября, 19:00
          <br />
          До встречи на игре!
        </Modal.Body>
      </Modal>
      <Modal show={showReserveModal} className="login-modal" centered>
        <Modal.Header className='d-flex justify-content-between'>
          <Modal.Title>Ой 🙈! </Modal.Title>
          <button onClick={()=> setShowReserveModal(false)} className="btn">
            <Icon path={mdiClose} size={1} color={"#e0ac59"}></Icon>
          </button>
        </Modal.Header>
        <Modal.Body className="text-white">
          <div>
          Кажется, места в основном составе закончились.
          <br />
          Вашу команду зарегистрировали в резерв.
          <br />
          Скоро с тобой обязательно свяжутся, а если места освободятся – сообщат и предложат место на игре в порядке очереди.
          </div>
          
        </Modal.Body>
      </Modal>
      <Modal show={showTooLateModal} className="login-modal" centered>
        <Modal.Header className='d-flex justify-content-between'>
          <Modal.Title>Извини 🙈!</Modal.Title>
          <button onClick={()=> setShowTooLateModal(false)} className="btn">
            <Icon path={mdiClose} size={1} color={"#e0ac59"}></Icon>
          </button>
        </Modal.Header>
        <Modal.Body className="text-white">
          Кажется, места на игру закончились.
          <br />
          Не расстраивайся, в следующий раз обязательно получится!
        </Modal.Body>
      </Modal>
      <div className="register-header text-white fw-bold">РЕГИСТРАЦИЯ НА ИГРУ</div>
      <div className="game-num fw-bold">{getOrdinal(nidNumber)} игра Бауманской лиги 24/25</div>
      <div className='info-container'>
        <div className="d-flex align-items-center my-1">
          <Icon path={mdiClockTimeThree} size={1} color="#e0ac59" />
          <div className="info-text">{formattedDate}</div>
        </div>
        <div className="d-flex align-items-center my-1">
          <Icon path={mdiMapMarker} size={1} color="#e0ac59" />
          <div className="info-text">{game.location}</div>
        </div>
        <div className="d-flex align-items-center my-1">
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
          {field.name === 'phone' ? (
            <InputMask
              mask="8(999)999-99-99"
              value={form[field.name as keyof typeof form] ?? ''}
              onChange={handleInputChange}
            >
              {(inputProps: any) => (
                <input
                  {...inputProps}
                  name={field.name}
                  id={field.name}
                  required={!['team_id', 'group_name'].includes(field.name)}
                  className={`input ${(formErrors as Record<string, boolean>)[field.name] ? 'error' : ''}`}
                  type="text"
                  placeholder={field.placeholder}
                />
              )}
            </InputMask>
          ) : (
            <input
              name={field.name}
              value={form[field.name as keyof typeof form] ?? ''}
              onChange={handleInputChange}
              id={field.name}
              required={!['team_id', 'group_name'].includes(field.name)}
              className={`input ${(formErrors as Record<string, boolean>)[field.name] ? 'error' : ''}`}
              type={['players_amount', 'phone'].includes(field.name) ? 'number' : 'text'}
              placeholder={field.placeholder}
            />
          )}
          {((formErrors as Record<string, boolean>)[field.name]) && (
            <div className="error-message">This field is required.</div>
          )}
        </div>
      ))}
      
        <button type="submit" className="reg-btn my-5 uppercase">
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