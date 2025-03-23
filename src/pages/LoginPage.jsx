import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useAuth } from '../utils/AuthContext';
import { BASE_API } from '../utils/Api';

const LoginPage = () => {
  const { login } = useAuth();

  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const [message, setMessage] = useState({ text: '', type: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage({ text: '', type: '' });
    try {
      const response = await fetch(`${BASE_API}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials),
        credentials: 'include',
      });

      const data = await response.json();
      if (response.ok) {
        login(data.user, data.token);
        console.log('Logged in user:', data);
        setMessage({ text: 'Login successful! Redirecting...', type: 'success' });
        setTimeout(() => {
          navigate('/');
        }, 2000);
      } else {
        throw new Error(data.message || 'Login failed');
      }
    } catch (err) {
      setMessage({ text: err.message, type: 'error' });
    }
  };

  return (
    <div>
      <Navbar />
      <section className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-50 to-blue-500">
        <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow-lg max-w-sm w-full">
          <h2 className="text-3xl font-bold mb-6 text-center">Login</h2>
          {message.text && (
            <p
              className={`text-center mb-4 ${
                message.type === 'success' ? 'text-green-500' : 'text-red-500'
              }`}
            >
              {message.text}
            </p>
          )}
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={credentials.email}
            onChange={handleChange}
            className="block w-full p-2 border border-cyan-700 rounded mb-4"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={credentials.password}
            onChange={handleChange}
            className="block w-full p-2 border border-cyan-700 rounded mb-4"
            required
          />
          <button type="submit" className="bg-primary text-white p-2 rounded w-full">
            Login
          </button>
          <p className="mt-4 text-center">
            Don't have an account? <a href="/signup" className="text-primary">Sign Up</a>
          </p>
        </form>
      </section>
      <Footer />
    </div>
  );
};

export default LoginPage;
