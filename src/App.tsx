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

export default function App() {

  const api = new Api()
  
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const [show, setShow] = useState(false);
  const [showModal, setShowModal] = useState(false);
  console.log('showModal = ', showModal)
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
      console.log('showModal = ', showModal)
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
    <Modal show={showModal} className="login-modal">
        <Modal.Header className='d-flex justify-content-between'>
          <Modal.Title>Войти</Modal.Title>
          <button onClick={()=> closeModal()} className="btn">
            <Icon path={mdiClose} size={1} color={"#e0ac59"}></Icon>
          </button>
        </Modal.Header>
        <Modal.Body>
        <Form onSubmit={handleSubmit} className="w-100 p-2">
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Логин</Form.Label>
            <Form.Control 
              type="text" 
              placeholder="12345"
              value={username} 
              onChange={handleUsernameChange} 
             />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Label>Пароль</Form.Label>
            <Form.Control 
              type="password" 
              placeholder="Пароль"
              value={password} 
              onChange={handlePasswordChange} 
            />
          </Form.Group>
          <button type="submit" className="reg-btn">Войти</button>
        </Form>
        </Modal.Body>
      </Modal>

      <Offcanvas className="offcanvas" placement="end" show={show} onHide={handleClose}>
        <Offcanvas.Header className="bg-blue-900 text-amber-400 d-flex justify-content-end">
          <button onClick={handleClose} className="btn">
            <Icon path={mdiClose} size={1} color="#e0ac59" />
          </button>
        </Offcanvas.Header>
        <Offcanvas.Body className="bg-blue-900 text-white">
          {!isAuthenticated && (
            <button className="btn d-flex flex-row align-items-center" onClick={loginButtonClick}>
              <Icon path={mdiLogin} size={1.5} color="#e0ac59"></Icon>
              <div className='login-btn-text fs-2'>Войти</div>
            </button>
          )}
          {isAuthenticated && (
            <section>
              <button className="btn d-flex flex-row align-items-center" onClick={createGameButtonClick}>
                <Link to="/create-game" className="d-flex flex-row align-items-center">
                  <Icon path={mdiTabPlus} size={1.5} color="#e0ac59"></Icon>
                  <div className='login-btn-text fs-2'>Создать игру</div>
                </Link>
              </button>
              {/* <button className="btn d-flex flex-row align-items-center" onClick={logoutButtonClick}>
                <Icon path={mdiLogout} size={1.5} color="#e0ac59"></Icon>
                <div className='login-btn-text fs-2'>Выйти</div>
              </button> */}
            </section>
            
            
          )}
          
        </Offcanvas.Body>
      </Offcanvas>
    
    <div className='w-100'>
      <Header onOpenDrawer={handleShow}/>
      <div className="app d-flex flex-col items-center">

        {/* Routes */}
        <div className="app-content mt-6 w-100">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/registration" element={<Registration />} />
            <Route path="/participants" element={
              <ProtectedRoute openModal={openModal}>
                <Participants />
              </ProtectedRoute>
            } />
            <Route path="/create-game" element={
              <ProtectedRoute openModal={openModal}>
                <CreateGame />
              </ProtectedRoute>
            } />
            {/* <Route path="/create-game" element={<CreateGame />} /> */}
          </Routes>
        </div>

        <Footer />
      </div>
    </div>
    </>
  );
};
