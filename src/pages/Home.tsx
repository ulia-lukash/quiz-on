import React from 'react';
import GameCard from '../components/GameCard';
import '../styles/games-list.css'
const date = new Date("2024-06-04T18:00:00+03:00")

const games = [
  { id: 1, date: date},
  { id: 2, date: date },
  { id: 3, date: date },
];

// - Стартовая страница
const Home: React.FC = () => {
  return (
    <div className="games-list bg-primary">
      {games.map((game) => (
        <GameCard key={game.id} game={game} />
      ))}
    </div>
  );
};

export default Home;