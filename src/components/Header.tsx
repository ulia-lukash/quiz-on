import React from 'react';
import { Link } from 'react-router-dom';
import { mdiAccountCogOutline } from '@mdi/js'; // Import icons
import Icon from '@mdi/react'; // Import Icon component
import '../styles/header.css';
const Header: React.FC = () => {
  return (
    <header className="bg-primary w-full p-4 flex items-center justify-between header">

      <Link to="/">
        <img
          src="/assets/images/new-logo.png"
          alt="Logo"
          className="h-10 w-auto"
        />
      </Link>

      <Link to="/auth">
        <Icon path={mdiAccountCogOutline} size={1.3} color="#e0ac59" />
      </Link>

    </header>
  );
};

export default Header;