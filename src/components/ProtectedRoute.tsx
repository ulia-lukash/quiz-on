import React, { SetStateAction, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
// import { useAuth } from '../context/authContext';
import { Api } from '../api/api';
interface ProtectedRouteProps {
  children: React.ReactElement;
  openModal: Function
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, openModal }) => {

  const api = new Api()
  const [isAuthenticated, setIsAuthenticated] = React.useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const check = await api.auth();
      setIsAuthenticated(check as SetStateAction<boolean>)
    }
    checkAuth()
  }, [api])

  if (!isAuthenticated) {
    openModal()
  }
  return children;
};

export default ProtectedRoute;
