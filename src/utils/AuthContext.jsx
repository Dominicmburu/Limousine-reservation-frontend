import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    try {
      const storedUser = localStorage.getItem('user');
      return storedUser ? JSON.parse(storedUser) : null;
    } catch (error) {
      console.error('Failed to parse user data from localStorage', error);
      return null;
    }
  });

  const login = (userData, token) => {
    try {
      localStorage.setItem('user', JSON.stringify(userData));
      localStorage.setItem('token', token);
      setUser(userData);
    } catch (error) {
      console.error('Failed to store user data in localStorage', error);
    }
  };

  const logout = () => {
    try {
      localStorage.removeItem('user');
      setUser(null);
    } catch (error) {
      console.error('Failed to remove user data from localStorage', error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
