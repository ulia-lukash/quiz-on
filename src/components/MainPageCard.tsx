import React, { useState } from 'react';
import '../styles/main-page-card.css';
import { Button, Container, Nav, Navbar, Image, ButtonGroup, Badge } from 'react-bootstrap';


export default function MainPageCard() {
    return (
        <div className="main-page">
            <div className='main-page__text turn-on-label'>включай</div>
            <div className='main-page__text brains-label'>мозги!</div>
            <Image className='main-page__logo-image' src="assets/icons/Main-Page-Logo.svg" />
            <div className='main-page__labels-container'>
            <div className='main-page__label int-label'>Интеллектуальная</div>
            <div className='main-page__label ent-label'>Развлекательная</div>
            </div>
        </div>
    )
}