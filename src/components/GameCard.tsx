import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/game-card.css';
import { mdiEye, mdiMapCheckOutline } from '@mdi/js'; // Import icons
import Icon from '@mdi/react'; // Import Icon component
// import { useAuth } from '../context/authContext';
import Countdown from './Countdown';
import { Badge, Button, Card, Col, Row, Stack, Image, Modal } from 'react-bootstrap';
import { Navigate } from 'react-router-dom';

export type GameCardProps = {
    game: Game
};

export type Game = {
  start_time: Date,
  location: string,
  name: string,
  main_amount: number,
  reserve_amount: number,
  registration_open_time: Date,
  id?: number;
  registration_status?: string
}


const GameCard: React.FC<GameCardProps> = ({game}) => {

  const [showRegistrationModal, setShowRegistrationModal] = useState(false);
  const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";

  const dateOptions: Intl.DateTimeFormatOptions = { day: "numeric", month: "long" };
  const dayOptions: Intl.DateTimeFormatOptions = { weekday: "long" };
  const timeOptions: Intl.DateTimeFormatOptions = { hour: "2-digit", minute: "2-digit", hour12: false };

  const start_time = new Date(game.start_time)
  // const registration_open_time = new Date(game.registration_open_time)

  const formattedDate = new Intl.DateTimeFormat("ru-RU", dateOptions).format(start_time);
  const weekday = new Intl.DateTimeFormat("ru-RU", dayOptions).format(start_time);
  const time = new Intl.DateTimeFormat("ru-RU", timeOptions).format(start_time);

  // const [registration_open, setRegistrationOpen] = useState(start_time > new Date(Date.now()) && registration_open_time < new Date(Date.now()));
  // const registrationAvailable = !registration_open

  const handleClose = () => setShowRegistrationModal(false);
  const handleShow = () => setShowRegistrationModal(true);
  
  return (
  <Card className="game-card" style={{display: 'flex', flexDirection: 'row', width: '908px' }}>
    <Modal className='registration-modal' show={showRegistrationModal} onHide={handleClose}>
      <div className="registration-modal__title">
        <div className="registration-title-row">
          <div className="registration-title">Регистрация на игру</div>
          <Button variant='unknown' className='registration-modal__close-btn'>
            <Image src="assets/icons/Close.svg" />
          </Button>
        </div>
        <div className="information-area">
          <div className="card-information">
            <div className="card-information__title"></div>
            <div className="card-information__date"></div>
          </div>
          <div className="additional-info"></div>
          <div className="reserve-warning">
          Вы записываетесь в резерв. Если будут места, мы с вами свяжемся и позовем на игру.
          </div>
          <input type="checkbox" checked data-toggle="toggle" data-style="ios"></input>
        </div>
      </div>
    </Modal>
    {isAuthenticated && (
      <div className="admin-controls">
      <Row style={{width: '126px'}}>
        <Col style={{padding: 0}}>
          <Button className="edit-game-button" variant="unknown">
            <Image src="assets/icons/Edit.svg" style={{width: '20px', height: '20px'}}/>
          </Button>
        </Col>
        <Col style={{padding: 0}}>
          <Button className="delete-game-button" variant="unknown">
            <Image src="assets/icons/Trash.svg" style={{width: '20px', height: '20px'}}/>
          </Button>
        </Col>
      </Row>
    </div>
    )}
    <div className="game-card__img" style={{width: '248px', position: 'relative', borderRadius: '30px 0 0 30px', overflow: 'hidden' }}>
      <Badge bg="unknown" className="theme-badge" style={{
          display: 'flex',
          alignItems: 'center',
          zIndex: 1
        }}>Новогодняя</Badge>
      <Image src="assets/icons/Decoration 1.svg" style={{position:'absolute', right: '0', top: '0'}} />
      <Image src="assets/icons/Decoration 2.svg" style={{position:'absolute', left: '0', bottom: '0'}} />
      <Image src="assets/icons/Logo.svg" roundedCircle />
    </div>
    <Stack direction="vertical" style={{width: '660px'}}>
      <Card.Body className="date-header">
        <Card.Title style={{height: '100%'}}>
          <Stack direction="horizontal" style={{height: '100%', verticalAlign: 'center', gap: '12px'}}>
            <div className="date-header__date">{formattedDate}</div>
            <div className="date-header__day">{weekday}</div>
            <div className="date-header__time ms-auto">{time}</div>
          </Stack>
        </Card.Title>
      </Card.Body>
      <Card.Body className="game-card__main">
        <Stack className="game-card__main-stack" direction="vertical">
          <Badge bg="unknown" className="season-badge" style={{
            display: 'flex',
            alignItems: 'center'
          }}>Сезон 2024/2025</Badge>
          <Card className='game-description' style={{gap: '14px'}}>
            <Card.Title style={{margin: 0}}>IV игра Бауманской Лиги</Card.Title>
            <Card.Body style={{padding: 0}}>
              <div className='desc-text'>Что может быть долгожданнее Нового Года? Наряжайтесь в свои лучшие костюмы и приходите с праздничным настроением на завершающую игру этого года!</div>
              <Row style={{height: '44px', marginTop: '14px'}}>
                <Col>
                  <Card className="desc-card" style={{
                    display: 'flex',
                    flexDirection: 'row',
                    gap: '12px',
                    height: '44px',
                    padding: 0,
                    alignItems: 'center'  }}>
                    <Card.Img src="/assets/icons/Location.svg" style={{height: '32px', width: '32px'}}/>
                    <Stack direction="vertical">
                      <Card.Body style={{padding: 0}}>
                        <Card.Title className="desc-card__title">Аудитория 345</Card.Title>
                        <Card.Text className="desc-card__caption">ГЗ МГТУ им. Н.Э. Баумана</Card.Text>
                      </Card.Body>
                    </Stack>
                  </Card>
                </Col>
                <Col>
                  <Card className="desc-card" style={{
                    display: 'flex',
                    flexDirection: 'row',
                    gap: '12px',
                    height: '44px',
                    padding: 0,
                    alignItems: 'center'  }}>
                    <Card.Img src="/assets/icons/Wallet.svg" style={{height: '32px', width: '32px'}}/>
                    <Stack direction="vertical">
                      <Card.Body style={{padding: 0}}>
                        <Card.Title className="desc-card__title">Бесплатно</Card.Title>
                        <Card.Text className="desc-card__caption">с человека</Card.Text>
                      </Card.Body>
                    </Stack>
                  </Card>
                </Col>
              </Row>
            </Card.Body>
          </Card>
          <Row>
            <Col style={{width: '50%'}}>
            {isAuthenticated && (
                <Button variant="unknown" className='admin-players-button'>
                    <Image src="/assets/icons/Players-black.svg" style={{width: '20px', height: '20px', marginRight: '8p'}}/>
                    <span>список участников</span>
                </Button>
            )}
            {
              !isAuthenticated  && (
                <Button variant="unknown" onClick={()=> handleShow()} className='registration-button'>Регистрация</Button>
              )
            }
            </Col>
            <Col>
              {!isAuthenticated && (
                <div className='caption-text full-height'>Быстрее жми, пока есть места!</div>
              )}
            </Col>
          </Row>
          
        </Stack>
        
      </Card.Body>
    </Stack>
  </Card>
  );
};

export default GameCard;