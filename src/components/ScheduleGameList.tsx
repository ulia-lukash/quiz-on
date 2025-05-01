import React, { useState, useEffect } from 'react';
import { Button, Container, Nav, Navbar, Image, ButtonGroup, Badge, Modal, Form, Col } from 'react-bootstrap';
import '../styles/schedule-game-list.css'
import GameFiltersCard from './GameFiltersCard';
import AdminFiltersCard from './AdminFiltersCard';
import { Api } from '../api/api';
import GameCard, { Game } from './GameCard';
import FinishedGameCard from './FinishedGameCard';
export default function ScheduleGameList() {
    const api = new Api()
    
      const [games, setGames] = React.useState<Game[]>([]);
      const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";
    
      const gameFinished = (date: any) => {
        return new Date(date) < new Date();
      }
    
      React.useEffect(() => {
        const fetchGames = async () => {
          try {
            const games = await api.game.getAll();
            setGames(games);
          } catch (error) {
            console.error("Failed to fetch games:", error);
          }
        };
        fetchGames();
      }, []);
    return (
        <div className='schedule-game-list'>
            <Col>
                <GameFiltersCard />
                <AdminFiltersCard />
            </Col>
            <div className='game-cards-container'>
                {games.length === 0 && !isAuthenticated && (
                    <div className="no-games-card">
                    Нет игр
                    </div>
                )}
                {games.length > 0 && games.map((game: Game) => (
                    gameFinished(game.start_time) ?
                    <GameCard game={game} key={game.id} /> :
                    <FinishedGameCard game={game} key={game.id} />
                    
                ))}
            </div>
            
        </div>
    )
}