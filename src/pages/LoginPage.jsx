import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useAuth } from '../utils/AuthContext';
import { BASE_API } from '../utils/Api';
import ReCAPTCHA from "react-google-recaptcha";  // Import reCAPTCHA component

const LoginPage = () => {
  const { login } = useAuth();
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const [message, setMessage] = useState({ text: '', type: '' });
  const [captchaToken, setCaptchaToken] = useState(''); // To store CAPTCHA token
  const [otp, setOtp] = useState('');  // To store OTP after it is sent
  const [isOtpSent, setIsOtpSent] = useState(false);  // To check if OTP is sent
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleCaptchaChange = (value) => {
    setCaptchaToken(value); // Set the reCAPTCHA token if the user completes it
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage({ text: '', type: '' });
    setLoading(true);

    try {
      const response = await fetch(`${BASE_API}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...credentials, captchaToken }),  // Include CAPTCHA token if available
        credentials: 'include',
      });

      const data = await response.json();

      console.log('login adata:', data);

      if (response.ok) {
        localStorage.setItem('token', data.token);

        setIsOtpSent(true);  // If login is successful, OTP is sent
        setMessage({ text: 'Login successful! Please check your email for OTP.', type: 'success' });
      } else {
        throw new Error(data.message || 'Login failed');
      }
    } catch (err) {
      setMessage({ text: err.message, type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch(`${BASE_API}/auth/verify-otp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: credentials.email, otp }),  // Send OTP to verify
        credentials: 'include',
      });

      const data = await response.json();
      if (response.ok) {
        login(data.user, data.token);
        console.log('Logged in user:', data);
        setMessage({ text: 'OTP verified successfully! Redirecting...', type: 'success' });
        setTimeout(() => {
          navigate('/');  // Redirect after successful login
        }, 2000);
      } else {
        throw new Error(data.message || 'OTP verification failed');
      }
    } catch (err) {
      setMessage({ text: err.message, type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Navbar />
      <section className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-50 to-blue-500">
        <form onSubmit={isOtpSent ? handleOtpSubmit : handleSubmit} className="bg-white p-8 rounded shadow-lg max-w-sm w-full">
          <h2 className="text-3xl font-bold mb-6 text-center">{isOtpSent ? 'Verify OTP' : 'Login'}</h2>
          {message.text && (
            <p
              className={`text-center mb-4 ${message.type === 'success' ? 'text-green-500' : 'text-red-500'}`}
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
          {/* CAPTCHA Component (Optional) */}
          <div className="mb-4">
            <ReCAPTCHA
              // sitekey="6Le29AcrAAAAAICMMJssg7LHf3SdhFna0x7T3awp"
              sitekey="6LcFHRQrAAAAABOLVJAtT2MsKfnnadPDBHqacWkN"
              onChange={handleCaptchaChange}
            />
            <p className="text-sm text-gray-600">Complete CAPTCHA to verify you're human</p>
          </div>

          {/* OTP Input */}
          {isOtpSent && (
            <input
              type="text"
              name="otp"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="block w-full p-2 border border-cyan-700 rounded mb-4"
              required
            />
          )}

          <button type="submit" className="bg-primary text-white p-2 rounded w-full" disabled={loading}>
            {loading ? 'Processing...' : isOtpSent ? 'Verify OTP' : 'Login'}
          </button>

          <p className="mt-4 text-center">
            Don't have an account?{' '}
            <span
              className="text-primary cursor-pointer underline"
              onClick={() => navigate('/signup')}
            >
              Sign Up
            </span>
          </p>


        </form>
      </section>
      <Footer />
    </div>
  );
};

export default LoginPage;
