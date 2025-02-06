// components/LoginPage.js
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import InputField from './InputField';
import { FaEnvelope, FaLock, FaCheckCircle } from 'react-icons/fa';
import logo from '../assets/logo.png';
import { useLocation, useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};
    if (!formData.email) newErrors.email = 'Email is required';
    if (!formData.password) newErrors.password = 'Password is required';
    
    setErrors(newErrors);
    if (Object.keys(newErrors).length === 0) {
      navigate('/courses');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-gray-100 p-4"
    >
      {location.state?.message && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute top-20 w-[90%] max-w-md bg-green-100 border border-green-200 text-green-800 rounded-lg p-4 shadow-lg flex items-center gap-2"
        >
          <FaCheckCircle className="text-green-600 text-lg" />
          <span>{location.state.message}</span>
        </motion.div>
      )}

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="w-full max-w-md bg-white/80 backdrop-blur-sm p-8 rounded-xl shadow-xl"
      >
        <motion.div
          className="flex justify-center mb-6"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <img src={logo} alt="Logo" className="w-20 h-20" />
        </motion.div>

        <motion.h2
          className="text-3xl font-bold text-center mb-8 bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          Welcome Back!
        </motion.h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <InputField
              type="email"
              placeholder="example@mail.com"
              icon={<FaEnvelope />}
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              error={errors.email}
            />
          </div>

          <div>
            <InputField
              type="password"
              placeholder="********"
              icon={<FaLock />}
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              error={errors.password}
            />
          </div>

          <div className="flex justify-between items-center">
            <motion.label
              className="flex items-center space-x-2 cursor-pointer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <input type="checkbox" className="w-4 h-4 rounded text-blue-500" />
              <span className="text-gray-600">Remember me</span>
            </motion.label>

            <motion.span
              onClick={() => navigate('/forgot-password')}
              className="text-blue-500 cursor-pointer hover:underline"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Forgot Password?
            </motion.span>
          </div>

          <motion.button
            type="submit"
            className="w-full h-12 bg-blue-600 text-white text-lg font-semibold rounded-lg flex items-center justify-center transition-colors duration-200 hover:bg-blue-700"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Sign in
          </motion.button>
        </form>

        <motion.div
          className="text-center mt-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <p className="text-gray-600">
            Don't have an account?{' '}
            <motion.span
              onClick={() => navigate('/sign-up')}
              className="text-blue-500 cursor-pointer hover:underline"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Sign Up
            </motion.span>
          </p>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default LoginPage;