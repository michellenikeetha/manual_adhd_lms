// components/Navbar.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import logo from '../assets/logo.png';

const Navbar = ({ activeSection }) => {
  const [hoveredLink, setHoveredLink] = useState(null);

  const navLinks = [
    { to: '/', text: 'Home', section: 'hero' },
    { to: '/courses', text: 'Courses', section: 'courses' },
    { to: '#why-choose', text: 'About', section: 'why-choose' },
    { to: '#contact', text: 'Contact', section: 'contact' }
  ];

  return (
    <motion.nav 
      className="bg-white/90 backdrop-blur-sm shadow-sm py-4 sticky top-0 z-50"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 100 }}
    >
      <div className="container mx-auto flex justify-between items-center px-6">
        <motion.div 
          className="flex items-center space-x-2"
          whileHover={{ scale: 1.05 }}
        >
          <img src={logo} alt="Logo" className="w-8 h-8" />
          <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
            EduLearn
          </span>
        </motion.div>

        <div className="flex space-x-8">
          {navLinks.map((link) => (
            <motion.div
              key={link.text}
              onHoverStart={() => setHoveredLink(link.text)}
              onHoverEnd={() => setHoveredLink(null)}
              className="relative"
            >
              <Link 
                to={link.to}
                className={`text-gray-700 hover:text-blue-600 transition-colors duration-200 py-2 px-1
                  ${activeSection === link.section ? 'text-blue-600' : ''}`}
              >
                {link.text}
              </Link>
              {hoveredLink === link.text && (
                <motion.div
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600"
                  layoutId="underline"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                />
              )}
            </motion.div>
          ))}
        </div>

        <div className="flex space-x-4">
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link to="/sign-up" className="bg-white border-2 border-blue-600 text-blue-600 py-2 px-6 rounded-full hover:bg-blue-50 transition-colors duration-200">
              Sign up
            </Link>
          </motion.div>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link to="/login" className="bg-blue-600 text-white py-2 px-6 rounded-full hover:bg-blue-700 transition-colors duration-200">
              Login
            </Link>
          </motion.div>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;