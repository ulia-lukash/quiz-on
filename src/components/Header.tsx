import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { mdiViewHeadline, mdiLogin, mdiTabPlus, mdiClose } from '@mdi/js'; // Import icons
import Icon from '@mdi/react'; // Import Icon component
import '../styles/header.css';
export default function Header() {
  const isAuthenticated = sessionStorage.getItem("isAuthenticated") === "true";

  const [showModal, setShowModal] = useState(false);

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  return (
    <header className="bg-dark w-full p-4 flex items-center justify-between header">
      {showModal && (
        <div className="header__modal flex flex-col justify-around p-3">
          <div className="w-full inline-flex items-center justify-center">
            <Link to="/auth" className="flex">
              <Icon path={mdiLogin} size={2} color="#e0ac59" />
              <div className='flex items-center text-2xl font-bold ml-2'>Войти</div>
            </Link>
          </div>
          {isAuthenticated && (
            <div className="w-full inline-flex items-center justify-center">
            <Link to="/auth" className="flex">
              <Icon path={mdiTabPlus} size={2} color="#e0ac59" />
              <div className='flex items-center text-2xl font-bold ml-2'>Создать игру</div>
            </Link>
          </div>
          )}
          <button className='modal-close-button'>
            <Icon path={mdiClose} size={2} color="#e0ac59" />
          </button>
        </div>
      )}
      <Link to="/">
        <img
          src="/assets/images/new-logo.png"
          alt="Logo"
          className="header__logo-image"
        />
      </Link>
      
      <button onClick={() => toggleModal()} className="header__account-icon">
        <Icon path={mdiViewHeadline}  color="#e0ac59" />
      </button>

    </header>
  );
};