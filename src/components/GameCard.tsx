import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/game-card.css';

interface GameCardProps {
    game: {
        date: Date;
        id: number;
    };
  }

const GameCard: React.FC<GameCardProps> = ({ game }) => {
    // Format the date in Russian locale
  const dateOptions: Intl.DateTimeFormatOptions = {
    day: "numeric",
    month: "long",
    
    // weekday: "long",
  };
  const dayOptions: Intl.DateTimeFormatOptions = {
    // day: "numeric",
    // month: "long",
    weekday: "long",
  };

  const timeOptions: Intl.DateTimeFormatOptions = {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false, // Use 24-hour format (set to true for 12-hour format)
  };

  const formattedDate = new Intl.DateTimeFormat("ru-RU", dateOptions).format(game.date);
  const weekday = new Intl.DateTimeFormat("ru-RU", dayOptions).format(game.date);
  const time = new Intl.DateTimeFormat("ru-RU", timeOptions).format(game.date);

  return (
    <div className="outer-container my-4 mx-2">
        <div className="top-border flex justify-between items-center">            
            <div className='left-side w-1/2 text-center uppercase font-bold text-xl'><p>{formattedDate}</p></div>
            <div className='right-side w-1/2  text-center uppercase font-bold text-xl'><p>{weekday}</p></div>
        </div>
        <div className="inner-container bg-primary">
          <div className="content bg-primary">
              <div className='inner-content p-5'>
                  <div className='uppercase font-bold text-start text-xl text-white'>бауманская лига</div>
                  <div className='uppercase font-bold text-start text-2xl text-secondary border-t border-t-2 border-secondary mt-3'>квизон №{game.id}</div>
              </div>
              <div className='full-width flex justify-between gap-5 items-center mt-3'>
                  <div className='time-content left-side w-1/2 p-5'>
                      <div className='uppercase font-bold text-start text-3xl text-white'>{time}</div>
                      <div className='time-title uppercase font-bold text-nowrap text-start text-secondary'>начало игры</div>
                  </div>
                  <div className='time-content right-side w-1/2 p-5'>
                      <div className='uppercase font-bold text-start text-3xl text-white'>FREE</div>
                      <div className='time-title uppercase font-bold text-nowrap text-start text-secondary'>с команды</div>
                  </div>
              </div>
              <Link to={`/registration?game_id=${game.id}`} className='full-width'>
                <button className='bg-dark full-width border border-2 border-secondary rounded-full uppercase text-white font-bold mt-3 text-lg px-3 py-1'>регистрация</button>
              </Link>
            </div>
        </div>
    </div>
  );
};

export default GameCard;