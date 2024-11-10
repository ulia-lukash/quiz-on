import React from 'react';
import GameCard from '../components/GameCard';
import '../styles/games-list.css'
import { Link } from 'react-router-dom';
const date = new Date("2024-06-04T18:00:00+03:00")

const games = [
  { id: 1, date: date},
  { id: 2, date: date },
  { id: 3, date: date },
];

// - Стартовая страница
const Home: React.FC = () => {

  const isAuthenticated = true
  return (
    <div className="games-list bg-primary">
      {isAuthenticated && (
        <Link to="/create-game" className="create-button">
          <button className="w-full bg-dark border border-2 border-secondary rounded-full uppercase text-white font-bold mt-3 text-lg px-3 py-1">Создать игру</button>
        </Link>
      )}
      {games.map((game) => (
        <GameCard key={game.id} game={game} />
      ))}
    </div>
  );
};

export default Home;