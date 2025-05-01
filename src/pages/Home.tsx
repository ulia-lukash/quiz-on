import React from 'react';
import GameCard, { Game } from '../components/GameCard';
import '../styles/games-list.css'
import { Link } from 'react-router-dom';
import { Api } from '../api/api';
import FinishedGameCard from '../components/FinishedGameCard';
import { Row, Col } from 'react-bootstrap';
import GameFiltersCard from '../components/GameFiltersCard';
import AdminFiltersCard from '../components/AdminFiltersCard';
import { Button, Container, Nav, Navbar, Image, ButtonGroup, Badge } from 'react-bootstrap';
import MainPageCard from '../components/MainPageCard';
import GameCounter from '../components/GameCounter';
import OurRounds from '../components/OurRounds';

// import { useAuth } from '../context/authContext';
const date = new Date("2024-06-04T18:00:00+03:00")

// - Стартовая страница
export default function  Home() {
  const api = new Api()

  const [games, setGames] = React.useState<Game[]>([]);
  const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";

  const gameFinished = (date: any) => {
    // return new Date(date) < new Date();
    return false
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
    <Col>
      <MainPageCard />
      <GameCounter />
      <OurRounds />
    </Col>
  );
};