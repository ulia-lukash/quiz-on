import React, { SetStateAction, useState } from 'react';
import '../styles/header.css';
import { Button, Container, Nav, Navbar, Image, ButtonGroup, Badge, Modal, Form } from 'react-bootstrap';
import { Api } from '../api/api';
import Cookies from 'js-cookie';


export default function Header() {

  const api = new Api()
  const [isAuthenticated, setIsAuthenticated] = useState(localStorage.getItem("isAuthenticated") === "true");
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [formData, setFormData] = useState({
    login: '',
    password: ''
  });

  
  const handleClose = () => setShowLoginModal(false);
  const handleShow = () => setShowLoginModal(true);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const result = await api.login(formData.login, formData.password);
    setIsAuthenticated(result as SetStateAction<boolean>)

    if (result) {
      handleClose();
    } else {
      // TODO - нотификашка, что не получилось войти
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated')
    Cookies.remove('authorization-token');
    setIsAuthenticated(false)
  }
  
  return (
    <Navbar className="header">
      <Modal className='login-modal' show={showLoginModal} onHide={handleClose}>
        <Button variant='unknown' className="close-modal-btn">
          <Image src="/assets/icons/close-button.svg" />
        </Button>
        <Modal.Title>Добро пожаловать!</Modal.Title>
        <Modal.Body>
          <Form onSubmit={handleSubmit} className='w-100'>
            <Form.Group className="" controlId="formBasiclogin">
              <Form.Label>Логин</Form.Label>
              <Form.Control className="modal-input-field" type="text" name="login" placeholder="Введите логин" value={formData.login} onChange={handleChange} />
            </Form.Group>

            <Form.Group className="" controlId="formBasicPassword">
              <Form.Label>Пароль</Form.Label>
              <Form.Control className="modal-input-field" type="password" name="password" placeholder="Введите пароль" value={formData.password} onChange={handleChange}/>
            </Form.Group>
            <div className="login-btn__container">
            <Button className="modal-login-btn" variant="unknown" type="submit">
              Войти
            </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
      <Container className='w-full'>
          <div style={{width: '146px', display: 'flex', justifyContent: 'space-between'}}>
            <Navbar.Brand href="/">
              <img
                alt=""
                src="/assets/icons/Logo-cropped.svg"
                width="72"
                height="44"
                className="d-inline-block align-top"
              />{' '}
            </Navbar.Brand>
            {isAuthenticated && (
              <Badge bg="unknown" className="admin-badge">admin</Badge>
            )}
            
          </div>
          
          <Nav className="justify-content-between">
            <Nav.Link href="/schedule">Расписание</Nav.Link>
            <Nav.Link href="">Рейтинг</Nav.Link>
            <Nav.Link href="">Заказать игру</Nav.Link>
            {isAuthenticated ? (
              <ButtonGroup>
                {/* <Button variant='unknown' className='account-btn'>ЩЩ</Button> */}
                <Button variant='unknown' onClick={handleLogout} className='logout-btn'>
                  <Image src="/assets/icons/Exit.svg" />
                </Button>
              </ButtonGroup>
              ) : (
              <Button variant='unknown' onClick={handleShow} className="login-button">Войти</Button>
              )
            }
            
            
            
          </Nav>
        </Container>
    </Navbar>
  );
};