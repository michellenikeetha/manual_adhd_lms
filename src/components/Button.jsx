// components/Button.js
import React from 'react';
import { motion } from 'framer-motion';

const Button = ({ text, onClick }) => {
  return (
    <motion.button
      onClick={onClick}
      className="group relative flex w-[200px] h-[50px] justify-center items-center bg-blue-600 rounded-full shadow-lg text-white text-lg overflow-hidden transition-colors duration-300 hover:bg-blue-700"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <motion.div
        className="absolute inset-0 bg-blue-400 origin-left"
        initial={{ scaleX: 0 }}
        whileHover={{ scaleX: 1 }}
        transition={{ duration: 0.3 }}
      />
      <span className="relative z-10 flex items-center gap-2">
        {text}
        <motion.img
          src={require('../assets/arrow.png')}
          alt=""
          className="w-4 h-4"
          whileHover={{ x: 5 }}
          transition={{ duration: 0.2 }}
        />
      </span>
    </motion.button>
  );
};

export default Button;