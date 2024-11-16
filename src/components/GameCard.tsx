import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/game-card.css';
import { mdiEye } from '@mdi/js'; // Import icons
import Icon from '@mdi/react'; // Import Icon component
import { useAuth } from '../context/authContext';
import Countdown from './Countdown';
import { Button, Card, Col, Row } from 'react-bootstrap';

export type GameCardProps = {
    game: Game
};

export type Game = {
  start_time: Date,
  location: string,
  name: string,
  main_amount: number,
  reserve_amount: number,
  registartion_open_time: Date,
  id?: number;
}


const GameCard: React.FC<GameCardProps> = ({game}) => {

  const isAuthenticated = sessionStorage.getItem("isAuthenticated") === "true";

  const dateOptions: Intl.DateTimeFormatOptions = { day: "numeric", month: "long" };
  const dayOptions: Intl.DateTimeFormatOptions = { weekday: "long" };
  const timeOptions: Intl.DateTimeFormatOptions = { hour: "2-digit", minute: "2-digit", hour12: false };

  const start_time = new Date(game.start_time)
  const registration_open_time = new Date(game.registartion_open_time)

  const formattedDate = new Intl.DateTimeFormat("ru-RU", dateOptions).format(start_time);
  const weekday = new Intl.DateTimeFormat("ru-RU", dayOptions).format(start_time);
  const time = new Intl.DateTimeFormat("ru-RU", timeOptions).format(start_time);

  const registration_open = start_time > new Date(Date.now()) && registration_open_time < new Date(Date.now())

  const [registrationAvailable, setRegistrationAvailable] = useState(!registration_open);

  return (
    <div>
      <div id="game-card" className={`game-card__outer-container ${registrationAvailable ? "" : "registration-closed"}`}>
          <div className='countdown'>
            <Countdown targetDate={registration_open_time.toISOString()} />
          </div>
          <div className="top-border d-flex justify-content-center align-items-center">            
            <Col className="text-center text-uppercase fw-bold text-xl">
              {formattedDate}
            </Col>
            <Col className="text-center text-uppercase fw-bold text-xl">
              {weekday}
            </Col>
          </div>
          <div className="inner-container p-1">
            <div className="content full-width h-100">
                <div className='inner-content p-4 w-100'>
                    <div className='bold text-uppercase text-start fs-5 text-white'>бауманская лига</div>
                    <div className='bold text-uppercase text-start fs-4 mt-3 pt-2 card-separator'>квизон №{game.id}</div>
                </div>
                <div className='w-100 d-flex justify-content-between align-items-center mt-3 gap-2'>
                    <div className='time-content p-3'>
                        <div className='text-uppercase fw-bold text-start text-white'>{time}</div>
                        <div className='time-title text-uppercase fw-bold text-nowrap text-start yellow-text'>начало игры</div>
                    </div>
                    <div className='time-content p-3'>
                      <div className='uppercase fw-bold text-start text-white'>FREE</div>
                      <div className='time-title text-uppercase fw-bold text-nowrap text-start yellow-text'>с команды</div>
                    </div>
                    
                    
                </div>
                {isAuthenticated && (
                  <Link to={`/participants?game_id=${game.id}`} className='full-width'>
                    <button className='reg-button full-width rounded-pill text-uppercase text-white fw-bold mt-3 text-lg px-3 py-1'>список участников</button>
                  </Link>
                )}
                {!isAuthenticated && (
                  <Link to={`/registration?game_id=${game.id}`} className='full-width'>
                    <button 
                    className='reg-button full-width rounded-pill text-uppercase text-white fw-bold mt-3 text-lg px-3 py-1'
                    disabled={!registration_open}
                    >регистрация</button>
                  </Link>
                )}
                
              </div>
          </div>
      </div>

    </div>
  );
};

export default GameCard;