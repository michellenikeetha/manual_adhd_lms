// components/InputField.js
import React, { useState } from 'react';
import { motion } from 'framer-motion';

const InputField = ({ type, placeholder, icon, value, onChange, error }) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <motion.div
      className={`relative rounded-lg border-2 transition-colors duration-200 ${
        error ? 'border-red-400' : isFocused ? 'border-blue-400' : 'border-gray-200'
      }`}
      whileTap={{ scale: 0.995 }}
    >
      <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
        {icon}
      </div>
      <input
        type={type}
        className="w-full py-3 px-10 rounded-lg bg-transparent focus:outline-none"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />
      {error && (
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-red-500 text-sm mt-1"
        >
          {error}
        </motion.p>
      )}
    </motion.div>
  );
};

export default InputField;