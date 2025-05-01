import React, { useState } from 'react';
import '../styles/game-counter.css';
import { Button, Container, Nav, Navbar, Image, ButtonGroup, Badge } from 'react-bootstrap';


export default function GameCounter() {
    return (
        <div className="game-counter__container">
            <div className="game-name">
                <div className="game-number">IV</div>   
                <div className="game-name__container">
                    <div className='league-label'>Игра Бауманской Лиги</div>
                    <div className="years-label__container">
                        <div className='year-label'>2024</div>
                        <div className='year-label label-2025'>2025</div>
                    </div>
                </div>
            </div>
            <div className="registration-time">
                <div className="time-label__container">
                    <div className='fixed-label'>Регистрация на игру начнется через</div>
                    <div className="time-label">00:00:00:00</div>
                </div>
            </div>
        </div>
    )
}