import React from 'react';
import GameCard, { Game } from '../components/GameCard';
import '../styles/games-list.css'
import { Link } from 'react-router-dom';
import { Api } from '../api/api';
// import { useAuth } from '../context/authContext';
const date = new Date("2024-06-04T18:00:00+03:00")

// - Стартовая страница
export default function  Home() {
  const api = new Api()

  const [games, setGames] = React.useState<Game[]>([]);
  const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";

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
    <div className="games-list d-flex flex-column align-items-center">
       {games.length === 0 && !isAuthenticated && (
         <div className="no-games-card">
           Нет игр
         </div>
       )}
       {games.length > 0 && games.map((game: Game) => (
         <GameCard game={game} />
       ))}
    </div>
  );

};