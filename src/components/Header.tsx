import React from 'react';
import { Link } from 'react-router-dom';
import { mdiAccountCogOutline } from '@mdi/js'; // Import icons
import Icon from '@mdi/react'; // Import Icon component
import '../styles/header.css';
export default function Header() {
  return (
    <header className="bg-dark w-full p-4 flex items-center justify-between header">

      <Link to="/">
        <img
          src="/assets/images/new-logo.png"
          alt="Logo"
          className="header__logo-image"
        />
      </Link>

      <Link to="/auth">
        <Icon path={mdiAccountCogOutline} className="header__account-icon" color="#e0ac59" />
      </Link>

    </header>
  );
};