import React, { SetStateAction, useState } from 'react';
import { HashRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import CreateGame from './pages/CreateGame';
import Registration from './pages/Registration';
import './styles/app.css'
import Participants from './pages/Participants';

import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';

import ProtectedRoute from './components/ProtectedRoute';
import Offcanvas from 'react-bootstrap/Offcanvas';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import { mdiClose, mdiLogin, mdiTabPlus, mdiLogout } from '@mdi/js';
import Icon from '@mdi/react';
// import { useAuth } from './context/authContext';
import { Api } from './api/api';
import Schedule from './pages/Schedule';

export default function App() {

  const api = new Api()
  
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const [show, setShow] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const closeModal = () => setShowModal(false);
  const openModal = () => setShowModal(true);

  const location = useLocation();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  
  const handleUsernameChange = (e: any) => setUsername(e.target.value);
  const handlePasswordChange = (e: any) => setPassword(e.target.value);

  useEffect(() => {
    const fetchData = async () => {
      const checkAuth = await api.auth();
      setIsAuthenticated(checkAuth as SetStateAction<boolean>);
      if (location.pathname === '/participants') {
        document.body.classList.add('full-width-body');
      } else {
        document.body.classList.remove('full-width-body');
      }
    };
  
    fetchData();
  }, [location]);

  const loginButtonClick = () => {
    handleClose();
    openModal();
  }

  // const logoutButtonClick = () => {
  //   document.cookie = '';
  //   setIsAuthenticated(false);
  //   localStorage.removeItem('isAuthenticated');
  // }

  const createGameButtonClick = () => {
    handleClose();
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const result = await api.login(username, password);
    setIsAuthenticated(result as SetStateAction<boolean>)
    closeModal()
  }


  return (
    <>
    <div className='app-main'>
      <Header />
      <div className="app">

        {/* Routes */}
        <div className="app-content w-100">
          <Routes>
            <Route path="/schedule" element={<Schedule />} />
            <Route index element={<Home />} />
            
            {/* <Route path="/registration" element={<Registration />} />
            <Route path="/participants" element={
              <ProtectedRoute openModal={openModal}>
                <Participants />
              </ProtectedRoute>
            } />
            <Route path="/create-game" element={
              <ProtectedRoute openModal={openModal}>
                <CreateGame />
              </ProtectedRoute>
            } /> */}
            {/* <Route path="/create-game" element={<CreateGame />} /> */}
          </Routes>
        </div>

        {/* <Footer /> */}
      </div>
    </div>
    </>
  );
};
