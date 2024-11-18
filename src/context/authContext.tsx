// // src/context/AuthContext.tsx
// import React, { createContext, useContext, useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';

// interface AuthContextType {
//   isAuthenticated: boolean;
//   login: (username: string, password: string) => Promise<Boolean>;
//   logout: () => void;
// }

// const AuthContext = createContext<AuthContextType | undefined>(undefined);

// export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
//   const [isAuthenticated, setIsAuthenticated] = useState(false);
//   const navigate = useNavigate();
//   useEffect(() => {
//     // Check for the authentication cookie on load
//     const checkAuth = async () => {
//       const authCookie = document.cookie.includes('authorization-token');
//       setIsAuthenticated(authCookie);
//     };
//   }, []);

//   const logout = () => {
//     document.cookie = 'authorization-token=; Max-Age=0'; // Clears the cookie
//     setIsAuthenticated(false);
//   };

//   return (
//     <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => {
//   const context = useContext(AuthContext);
//   if (!context) {
//     throw new Error('useAuth must be used within an AuthProvider');
//   }
//   return context;
// };
