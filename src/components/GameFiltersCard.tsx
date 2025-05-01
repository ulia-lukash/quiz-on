import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/game-filters-card.css';
import { mdiEye, mdiMapCheckOutline } from '@mdi/js'; // Import icons
import Icon from '@mdi/react'; // Import Icon component
// import { useAuth } from '../context/authContext';
import Countdown from './Countdown';
import { Badge, Button, Card, Col, Row, Stack, Image, Form } from 'react-bootstrap';
import { Navigate } from 'react-router-dom';
import { filter } from 'vue/types/umd';

type FilterState = {
  parent: boolean;
  registrationOpen: boolean;
  registrationReserve: boolean;
  registrationFull: boolean;
  pastGames: boolean;
  classicGames: boolean;
  themeGames: boolean;
  games2025: boolean;
  games2024: boolean
};


const GameFiltersCard: React.FC = () => {

  const [filters, setFilters] = useState<FilterState>({
    parent: false,
    registrationOpen: false,
    registrationReserve: false,
    registrationFull: false,
    pastGames: false,
    classicGames: false,
    themeGames: false,
    games2025: false,
    games2024: false
  });

  const handleParentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const isChecked = e.target.checked;
    setFilters({
      ...filters,
      parent: isChecked,
      registrationOpen: isChecked,
      registrationReserve: isChecked,
      registrationFull: isChecked,
      
    });
  };

  const handleChildChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    
    setFilters(prev => {
      const newFilters = {
        ...prev,
        [name]: checked
      };
      
      newFilters.parent = (
        newFilters.registrationOpen &&
        newFilters.registrationReserve &&
        newFilters.registrationFull
      );
      
      return newFilters;
    });
  };

  const handlePastGamesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters({
      ...filters,
      pastGames: e.target.checked
    });
  };

  const handleClassicGamesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters({
      ...filters,
      classicGames: e.target.checked
    });
  };
  const handleThemeGamesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters({
      ...filters,
      themeGames: e.target.checked
    });
  };

  const handleGames2024Change = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters({
      ...filters,
      games2024: e.target.checked
    });
  };

  const handleGames2025Change = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters({
      ...filters,
      games2025: e.target.checked
    });
  };

  return (
    <Form className="game-filters-card">
      <Form.Label>По дате</Form.Label>
      <Form.Group className="mb-3">
        <Form.Check 
          type="checkbox"
          id="parent-filter"
          label='Предстоящие игры'
          checked={filters.parent}
          onChange={handleParentChange}
        />
        
        <div className="ms-4 mt-2">
          <Form.Check
            type="checkbox"
            id="reg-open"
            label="Открыта регистрация"
            name="registrationOpen"
            checked={filters.registrationOpen}
            onChange={handleChildChange}
            className="mb-2"
          />
          
          <Form.Check
            type="checkbox"
            id="reg-reserve"
            label="Запись в резерв"
            name="registrationReserve"
            checked={filters.registrationReserve}
            onChange={handleChildChange}
            className="mb-2"
          />
          
          <Form.Check
            type="checkbox"
            id="reg-full"
            label="Нет мест"
            name="registrationFull"
            checked={filters.registrationFull}
            onChange={handleChildChange}
          />
        </div>
        <Form.Check 
          type="checkbox"
          id="past-games"
          label='Прошедшие игры'
          checked={filters.pastGames}
          onChange={handlePastGamesChange}
        />
      </Form.Group>
      <Form.Label>Тип игры</Form.Label>
      <Form.Group className="mb-3">
        <Form.Check
          type="checkbox"
          id="classic-games"
          label="Классические"
          name="classicGames"
          checked={filters.classicGames}
          onChange={handleClassicGamesChange}
          className="mb-2"
        />
        
        <Form.Check
          type="checkbox"
          id="theme-games"
          label="Тематические"
          name="themeGames"
          checked={filters.themeGames}
          onChange={handleThemeGamesChange}
        />
      </Form.Group>

      <Form.Label>Сезон</Form.Label>
      <Form.Group>
        <Form.Check
          type="checkbox"
          id="games-2025"
          label="2024/2025"
          name="games2025"
          checked={filters.games2025}
          onChange={handleGames2025Change}
          className="mb-2"
        />
        
        <Form.Check
          type="checkbox"
          id="games-2024"
          label="2023/2024"
          name="games2024"
          checked={filters.games2024}
          onChange={handleGames2024Change}
        />
      </Form.Group>
    </Form>
  );
};

export default GameFiltersCard;