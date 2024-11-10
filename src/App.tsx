import React from 'react';
import { HashRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Auth from './pages/Auth';
import CreateGame from './pages/CreateGame';
import GamesList from './pages/GamesList';
import Registration from './pages/Registration';
import './styles/app.css'
import Participants from './pages/Participants';

import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';

const App: React.FC = () => {

  const location = useLocation();

  useEffect(() => {
    if (location.pathname === '/participants') {
      document.body.classList.add('full-width-body');
    } else {
      document.body.classList.remove('full-width-body');
    }
  }, [location]);

  return (
    <div className='w-full'>
      <Header />
      <div className="app bg-primary flex flex-col items-center">

        {/* Routes */}
        <div className="mt-6 w-full">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/games-list" element={<GamesList />} />
            <Route path="/registration" element={<Registration />} />
            <Route path="/participants" element={<Participants />} />
            <Route path="/create-game" element={<CreateGame />} />
          </Routes>
        </div>

        <Footer />
      </div>
    </div>
  );
};

export default App;