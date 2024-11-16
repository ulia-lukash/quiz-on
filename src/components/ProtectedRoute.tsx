import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/authContext';

interface ProtectedRouteProps {
  children: React.ReactElement;
  openModal: Function
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, openModal }) => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    openModal()
  }
  return children;
};

export default ProtectedRoute;
