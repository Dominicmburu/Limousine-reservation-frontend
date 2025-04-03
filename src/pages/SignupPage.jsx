import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import { BASE_API } from '../utils/Api';

const SignupPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone_number: '',
    address: '',
  });
  const [message, setMessage] = useState({ text: '', type: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage({ text: '', type: '' });
    try {
      const response = await fetch(`${BASE_API}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (response.ok) {
        setMessage({ text: 'Registration successful! You can now log in.', type: 'success' });
        setTimeout(() => {
          navigate('/login');
        }, 2000);
      } else {
        throw new Error(data.message || 'Registration failed');
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
          <h2 className="text-3xl font-bold mb-6 text-center">Sign Up</h2>
          {message.text && (
            <p
              className={`text-center mb-4 ${message.type === 'success' ? 'text-green-500' : 'text-red-500'
                }`}
            >
              {message.text}
            </p>
          )}
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
            className="block w-full p-2 border border-cyan-700 rounded mb-4"
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="block w-full p-2 border border-cyan-700 rounded mb-4"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="block w-full p-2 border border-cyan-700 rounded mb-4"
            required
          />
          <input
            type="text"
            name="phone_number"
            placeholder="Phone Number"
            value={formData.phone_number}
            onChange={handleChange}
            className="block w-full p-2 border border-cyan-700 rounded mb-4"
          />
          <input
            type="text"
            name="address"
            placeholder="Address"
            value={formData.address}
            onChange={handleChange}
            className="block w-full p-2 border border-cyan-700 rounded mb-4"
          />
          <button type="submit" className="bg-primary text-white p-2 rounded w-full">
            Sign Up
          </button>
          <p className="mt-4 text-center">
            Already have an account?{' '}
            <span
              className="text-primary cursor-pointer underline"
              onClick={() => navigate('/login')}
            >
              Login
            </span>
          </p>
        </form>
      </section>
      <Footer />
    </div>
  );
};

export default SignupPage;
