import React from 'react';
import GameCard, { GameCardProps } from '../components/GameCard';
import '../styles/games-list.css'
import { Link } from 'react-router-dom';
import { Api } from '../api/api';
import { useAuth } from '../context/authContext';
const date = new Date("2024-06-04T18:00:00+03:00")

// - Стартовая страница
export default function  Home() {
  const api = new Api()

  const [games, setGames] = React.useState<GameCardProps[]>([]);
  const isAuthenticated = sessionStorage.getItem("isAuthenticated") === "true";

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
    <div className="games-list bg-primary">
      {isAuthenticated && (
        <Link to="/create-game" className="create-button">
          <button className="w-full bg-dark border border-2 border-secondary rounded-full uppercase text-white font-bold mt-3 text-lg px-3 py-1">Создать игру</button>
        </Link>
      )}
      {games.map((game) => (
        <GameCard key={game.id} {...game} />
      ))}
    </div>
  );

};