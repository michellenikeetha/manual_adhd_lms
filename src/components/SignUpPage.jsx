// components/SignUpPage.js
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import InputField from './InputField';
import { FaEnvelope, FaLock, FaIdBadge, FaCheckCircle } from 'react-icons/fa';
import logo from '../assets/logo.png';
import { useNavigate } from 'react-router-dom';

const SignUpPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    regNumber: '',
    password: ''
  });
  const [errors, setErrors] = useState({});

  const handleSignUp = (e) => {
    e.preventDefault();
    const newErrors = {};
    if (!formData.email) newErrors.email = 'Email is required';
    if (!formData.regNumber) newErrors.regNumber = 'Registration number is required';
    if (!formData.password) newErrors.password = 'Password is required';

    setErrors(newErrors);
    if (Object.keys(newErrors).length === 0) {
      navigate('/login', { 
        state: { message: 'Sign Up Successful! Please Sign in to Continue.' }
      });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-gray-100 p-4"
    >
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
          Join EduLearn
        </motion.h2>

        <form onSubmit={handleSignUp} className="space-y-6">
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
              type="text"
              placeholder="2020/IS/123"
              icon={<FaIdBadge />}
              value={formData.regNumber}
              onChange={(e) => setFormData({ ...formData, regNumber: e.target.value })}
              error={errors.regNumber}
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

          <motion.button
            type="submit"
            className="w-full h-12 bg-blue-600 text-white text-lg font-semibold rounded-lg flex items-center justify-center transition-colors duration-200 hover:bg-blue-700"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Sign up
          </motion.button>
        </form>

        <motion.div
          className="text-center mt-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <p className="text-gray-600">
            Already have an account?{' '}
            <motion.span
              onClick={() => navigate('/login')}
              className="text-blue-500 cursor-pointer hover:underline"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Sign In
            </motion.span>
          </p>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default SignUpPage;