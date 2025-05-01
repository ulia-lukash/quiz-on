import React, { useState } from 'react';
import '../styles/our-rounds.css';
import { Button, Container, Nav, Navbar, Image, ButtonGroup, Badge, TabContainer, Tab, Stack } from 'react-bootstrap';


export default function OurRounds() {
    return (
        <div className="our-rounds_container">
            <div className="our-rounds_header">
                <Image src="/assets/icons/Left Pattern.svg"/>
                <div className="our-rounds__header-label">Наши раунды</div>
                <Image src="/assets/icons/Right Pattern.svg"/>
            </div>
            <div className='legend__container'>
                <div className='legend-item__container'>
                    <div className="legend-item">
                        <div className='legend-circle classic-game-circle'></div>
                        <div className="legend-label">Классическая игра</div>
                    </div>
                    <div className="legend-item">
                        <div className='legend-circle short-game-circle'></div>
                        <div className="legend-label">Короткая игра</div>
                    </div>
                    <div className="legend-item">
                        <div className='legend-circle archive-game-circle'></div>
                        <div className="legend-label">Архивные раунды</div>
                    </div>
                </div>
            </div>
            <div  className="horizontal-scroll">
                <div className="scroll-content">
                    <div className="scroll-item active-item">
                        <div className="scroll-item__label-container">
                            <div className="scroll-item__font scroll-item__num">01</div>
                            <div className="scroll-item__font scroll-item__dot">·</div>
                            <div className="scroll-item__font scroll-item__title">Слово за слово</div>
                        </div>
                        <div className="scroll-item__circles-container">
                            <div className='legend-circle classic-game-circle'></div>
                            <div className='legend-circle short-game-circle'></div>
                        </div>
                    </div>
                    <div className="scroll-item">
                        <div className="scroll-item__label-container">
                            <div className="scroll-item__font scroll-item__num">02</div>
                            <div className="scroll-item__font scroll-item__dot">·</div>
                            <div className="scroll-item__font scroll-item__title">где логика?</div>
                        </div>
                        <div className="scroll-item__circles-container">
                            <div className='legend-circle classic-game-circle'></div>
                            <div className='legend-circle short-game-circle'></div>
                        </div>
                    </div>
                    <div className="scroll-item">
                        <div className="scroll-item__label-container">
                            <div className="scroll-item__font scroll-item__num">03</div>
                            <div className="scroll-item__font scroll-item__dot">·</div>
                            <div className="scroll-item__font scroll-item__title">инкогнито</div>
                        </div>
                        <div className="scroll-item__circles-container">
                            <div className='legend-circle classic-game-circle'></div>
                            <div className='legend-circle short-game-circle'></div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="round-rules">
            <Stack className='number-area'>
                <div className="number-area__item">
                    <div className="number-area__num">8</div>
                    <div className="number-area__caption">вопросов в раунде</div>
                </div>
                <div className="number-area__item">
                    <div className="number-area__num">30</div>
                    <div className="number-area__caption">секунд на вопрос</div>
                </div>
                <div className="number-area__item">
                    <div className="number-area__num">0.5</div>
                    <div className="number-area__caption">балла за верный ответ</div>
                </div>
            </Stack>
            <div className="rules-card">
                <div className="rules-card__title">Правила раунда</div>
                <div className="rules-card__caption">Все ответы в раунде связаны между собой с помощью граничных букв по принципу игры в слова. </div>
            </div>
            <Stack className='question-area'>
                <div className="question-area__item">
                    <div className="question-area__label">ПРИМЕР ВОПРОСА</div>
                    <div className="question-area__question">Славянский и балтийский напиток, который тёзка Теслы предлагал пить вместо колы</div>
                    <div className="correct-ans-badge">+ квас</div>
                </div>
                <div className="question-area__item">
                    <div className="question-area__label">ПРИМЕР ВОПРОСА</div>
                    <div className="question-area__question">В Древнем Египте ОН использовался в качестве лекарственного средства</div>
                    <div className="correct-ans-badge">+ суп</div>
                </div>
                <div className="question-area__item">
                    <div className="question-area__label">ПРИМЕР ВОПРОСА</div>
                    <div className="question-area__question">Большое скопление воды от ливней или таяния снега, иногда влекущее за собой наводнение</div>
                    <div className="correct-ans-badge">+ паводок</div>
                </div>
            </Stack>
            </div>
        </div>
    )
}