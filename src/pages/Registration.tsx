import React from 'react';
import '../styles/registration.css'
import { useLocation } from 'react-router-dom';

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
  return (
    <div className="registration-card items-center">
      <div className="register-header text-white font-bold">РЕГИСТРАЦИЯ НА ИГРУ</div>
      <div className="game-num font-bold">{getOrdinal(nidNumber)} игра Бауманской лиги 24/25</div>
    </div>
  );
};

export default Registration;