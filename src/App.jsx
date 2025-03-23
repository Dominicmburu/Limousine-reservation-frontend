import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import BookingPage from './pages/BookingPage';
import ContactPage from './pages/ContactPage';
import ReviewsPage from './pages/ReviewsPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import './App.css';
import { AuthProvider } from './utils/AuthContext';
import ChatWidget from './components/ChatWidget';
import FleetPage from './pages/FleetPage';

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/booking" element={<BookingPage />} />
          <Route path="/fleet" element={<FleetPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/reviews" element={<ReviewsPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
        </Routes>
        <ChatWidget />
      </Router>
    </AuthProvider>
  );
};

export default App;
