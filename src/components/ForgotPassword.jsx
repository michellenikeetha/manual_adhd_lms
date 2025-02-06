// components/ForgotPassword.js
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import InputField from './InputField';
import { FaEnvelope, FaCheckCircle, FaArrowLeft } from 'react-icons/fa';
import logo from '../assets/logo.png';
import { useNavigate } from 'react-router-dom';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) {
      setError('Please enter a valid email address');
      return;
    }
    setError('');
    setIsSubmitted(true);
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
        className="w-full max-w-md bg-white/80 backdrop-blur-sm p-8 rounded-xl shadow-xl relative"
      >
        <motion.button
          onClick={() => navigate('/login')}
          className="absolute left-4 top-4 text-gray-600 hover:text-blue-600 flex items-center gap-2"
          whileHover={{ x: -2 }}
          whileTap={{ scale: 0.95 }}
        >
          <FaArrowLeft />
          <span>Back</span>
        </motion.button>

        <motion.div
          className="flex justify-center mb-6"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <img src={logo} alt="Logo" className="w-20 h-20" />
        </motion.div>

        <motion.div
          className="text-center mb-8"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <h1 className="text-3xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
            Forgot Password?
          </h1>
          <p className="text-gray-600">
            Don't worry! Enter your email and we'll send you a reset link.
          </p>
        </motion.div>

        {!isSubmitted ? (
          <motion.form
            onSubmit={handleSubmit}
            className="space-y-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <InputField
              type="email"
              placeholder="example@mail.com"
              icon={<FaEnvelope />}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              error={error}
            />

            <motion.button
              type="submit"
              className="w-full h-12 bg-blue-600 text-white text-lg font-semibold rounded-lg flex items-center justify-center transition-colors duration-200 hover:bg-blue-700"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Send Reset Link
            </motion.button>
          </motion.form>
        ) : (
          <motion.div
            className="text-center space-y-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <motion.div
              className="w-16 h-16 mx-auto bg-green-100 rounded-full flex items-center justify-center"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
            >
              <FaCheckCircle className="text-green-500 text-3xl" />
            </motion.div>
            
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-gray-800">
                Reset Link Sent!
              </h2>
              <p className="text-gray-600">
                We've sent a password reset link to:
              </p>
              <p className="font-medium text-blue-600">{email}</p>
              <p className="text-gray-600 text-sm">
                Please check your inbox and follow the instructions to reset your password.
              </p>
            </div>

            <motion.button
              onClick={() => navigate('/login')}
              className="text-blue-600 hover:text-blue-700 font-medium"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Return to Login
            </motion.button>
          </motion.div>
        )}
      </motion.div>
    </motion.div>
  );
};

export default ForgotPassword;