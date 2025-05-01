import React, { useState, useEffect } from 'react';
import { Button, Container, Nav, Navbar, Image, ButtonGroup, Badge, Modal, Form } from 'react-bootstrap';
import '../styles/schedule-header.css'
export default function ScheduleHeader() {
    const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";
    return (
        <div className='schedule-main'>
            <Image className='schedule-main-img' src="/assets/images/Cover.svg" />
            <div className="schedule-main__cap-container">
                <div className="schedule-main-title">Бауманская лига</div>
                <div className="schedule-main-badge">Только для студентов и сотрудников МГТУ им. Н.Э. Баумана</div>
                <div className="schedule-main-caption">Играем в стенах МГТУ им. Н.Э. Баумана стабильно каждый месяц, кроме летнего периода</div>
            </div>
            {isAuthenticated && (
                <Button variant='unknown' className='create-game-btn'>Создать игру</Button>
            )}
        </div>
    )
}