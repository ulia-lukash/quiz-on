import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { mdiViewHeadline, mdiLogin, mdiTabPlus, mdiClose } from '@mdi/js'; // Import icons
import Icon from '@mdi/react'; // Import Icon component
import '../styles/header.css';

interface HeaderProps {
  onOpenDrawer: () => void;
}

export default function Header({ onOpenDrawer }: HeaderProps) {

  const isAuthenticated = sessionStorage.getItem("isAuthenticated") === "true";

  return (
    <header className="w-100 p-3 d-flex align-items-center justify-content-between header">
      <button className="btn">
        <Link to="/">
          <img
            src="/assets/images/new-logo.png"
            alt="Logo"
            className="header__logo-image"
          />
        </Link>
      </button>
      
      
      <button onClick={onOpenDrawer} className="btn">
        <Icon path={mdiViewHeadline} size={1} color="#e0ac59"  className="burger-icon"/>
      </button>

    </header>
  );
};