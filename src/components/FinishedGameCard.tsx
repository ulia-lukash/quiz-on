import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/finished-game-card.css';
import { mdiEye, mdiMapCheckOutline } from '@mdi/js'; // Import icons
import Icon from '@mdi/react'; // Import Icon component
// import { useAuth } from '../context/authContext';
import Countdown from './Countdown';
import { Badge, Button, Card, Col, Row, Stack, Image } from 'react-bootstrap';
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


const FinishedGameCard: React.FC<GameCardProps> = ({game}) => {

  const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";

  const dateOptions: Intl.DateTimeFormatOptions = { day: "numeric", month: "long" };
  const dayOptions: Intl.DateTimeFormatOptions = { weekday: "long" };
  const timeOptions: Intl.DateTimeFormatOptions = { hour: "2-digit", minute: "2-digit", hour12: false };

  const start_time = new Date(game.start_time)
  const registration_open_time = new Date(game.registration_open_time)

  const formattedDate = new Intl.DateTimeFormat("ru-RU", dateOptions).format(start_time);
  const weekday = new Intl.DateTimeFormat("ru-RU", dayOptions).format(start_time);
  const time = new Intl.DateTimeFormat("ru-RU", timeOptions).format(start_time);

  const [registration_open, setRegistrationOpen] = useState(start_time > new Date(Date.now()) && registration_open_time < new Date(Date.now()));
  const registrationAvailable = !registration_open

  useEffect(() => {

  })
  
  return (
  <Card className="finished-game-card" style={{display: 'flex', flexDirection: 'row', width: '908px' }}>
    {isAuthenticated && (
      <div className="finished-card__admin-controls">
      <Row style={{width: '196px'}}>
        <Col style={{padding: 0}}>
          <Button className="players-button" variant="unknown">
            <Image src="assets/icons/Players.svg" style={{width: '20px', height: '20px'}}/>
          </Button>
        </Col>
        <Col style={{padding: 0}}>
          <Button className="finished-game__edit-game-button" variant="unknown">
            <Image src="assets/icons/Edit.svg" style={{width: '20px', height: '20px'}}/>
          </Button>
        </Col>
        <Col style={{padding: 0}}>
          <Button className="finished-game__delete-game-button" variant="unknown">
            <Image src="assets/icons/Trash.svg" style={{width: '20px', height: '20px'}}/>
          </Button>
        </Col>
      </Row>
      </div>
    )}
   
    <div className="game-card__img" style={{width: '248px', position: 'relative', borderRadius: '30px 0 0 30px' }}>
      <Image 
        src="assets/icons/Past Game Cover.svg" 
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          zIndex: 1
        }}
      />
      <Badge bg="unknown" className="theme-badge" style={{
          display: 'flex',
          alignItems: 'center',
        }}>Новогодняя</Badge>
      
      <Image src="assets/icons/Decoration 1.svg" style={{position:'absolute', right: '0', top: '0'}} />
      <Image src="assets/icons/Decoration 2.svg" style={{position:'absolute', left: '0', bottom: '0'}} />
      <Image src="assets/icons/Logo.svg" roundedCircle />
    </div>
    <Stack direction="vertical" style={{width: '660px'}}>
      <Card.Body className="finished-game-card__date-header">
        <Card.Title style={{height: '100%'}}>
          <Stack direction="horizontal" style={{height: '100%', verticalAlign: 'center', gap: '12px'}}>
            <div className="finished-game-card__date-header__date">{formattedDate}</div>
            <div className="finished-game-card__date-header__day">{weekday}</div>
            <div className="finished-game-card__date-header__time ms-auto">{time}</div>
          </Stack>
        </Card.Title>
      </Card.Body>
      <Card.Body className="finished-game-card__main">
        <Stack className="finished-game-card__main-stack" direction="vertical">
          <Badge bg="unknown" className="finished-game-card__season-badge" style={{
            display: 'flex',
            alignItems: 'center'
          }}>Сезон 2024/2025</Badge>
          <Card className='finished-game-card__game-description' style={{gap: '14px'}}>
            <Card.Title style={{margin: 0}}>IV игра Бауманской Лиги</Card.Title>
            <Card.Body style={{padding: 0}}>
              <div className='desc-text-large'>Игра Прошла</div>
              <Row style={{height: '44px', marginTop: '14px'}}>
                <Col>
                  <Card className="finished-game-card__desc-card" style={{
                    display: 'flex',
                    flexDirection: 'row',
                    gap: '12px',
                    height: '44px',
                    padding: 0,
                    alignItems: 'center'  }}>
                    <Card.Img src="/assets/icons/Location.svg" style={{height: '32px', width: '32px', color: '#869EBA'}}/>
                    <Stack direction="vertical">
                      <Card.Body style={{padding: 0}}>
                        <Card.Title className="desc-card__title">Аудитория 345</Card.Title>
                        <Card.Text className="desc-card__caption">ГЗ МГТУ им. Н.Э. Баумана</Card.Text>
                      </Card.Body>
                    </Stack>
                  </Card>
                </Col>
                <Col>
                  <Card className="finished-game-card__desc-card" style={{
                    display: 'flex',
                    flexDirection: 'row',
                    gap: '12px',
                    height: '44px',
                    padding: 0,
                    alignItems: 'center'  }}>
                    <Card.Img src="/assets/icons/Wallet.svg" style={{height: '32px', width: '32px', color: '#869EBA'}}/>
                    <Stack direction="vertical">
                      <Card.Body style={{padding: 0}}>
                        <Card.Title className="finished-game-card__desc-card__title">Бесплатно</Card.Title>
                        <Card.Text className="finished-game-card__desc-card__caption">с человека</Card.Text>
                      </Card.Body>
                    </Stack>
                  </Card>
                </Col>
              </Row>
            </Card.Body>
          </Card>
          <Row>
            <Col>
              <Button variant="unknown" className='game-finished-button'>Результаты</Button>
            </Col>
            <Col>
              <Button variant="unknown" className='game-finished-button'>Фотоальбом</Button>
            </Col>
          </Row>
        </Stack>
      </Card.Body>
    </Stack>
  </Card>
  );
};

export default FinishedGameCard;