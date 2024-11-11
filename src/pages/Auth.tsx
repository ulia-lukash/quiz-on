import React, { useState } from 'react';
import '../styles/auth.css';
import { Api } from '../api/api';
import { useAuth } from '../context/authContext';

// - Авторизация
export default function Auth() {


  const { login } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await login(username, password);
  };

  return (
    <div className="auth-card items-center py-4">
      <div className="auth-header text-white font-bold">ВОЙТИ</div>
      <form onSubmit={handleSubmit} className="">
        <input
            name="login"
            value={username} 
            onChange={(e) => setUsername(e.target.value)}
            required
            className="input py-5" 
            type="text"
            placeholder="Логин"
          />

          <input
            name="password"  
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="input py-5" 
            type="text"
            placeholder="Пароль"
          />
          

          <button type="submit" className="reg-btn my-5 uppercase">
            Войти
          </button>
      </form>
    </div>
  );
};