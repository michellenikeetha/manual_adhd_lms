// components/HeroSection.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Button from './Button';

const HeroSection = ({ setActiveSection }) => {
  const navigate = useNavigate();

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setActiveSection('hero');
        }
      },
      { threshold: 0.5 }
    );

    observer.observe(document.querySelector('#hero'));
    return () => observer.disconnect();
  }, [setActiveSection]);

  return (
    <motion.section
      id="hero"
      className="bg-cover bg-center h-[70vh] flex items-center justify-center relative overflow-hidden"
      style={{ backgroundImage: `url(${require('../assets/heroimg.webp')})` }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />
      
      <motion.div
        className="text-center text-white flex flex-col items-center justify-center z-10 max-w-4xl px-4"
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.8 }}
      >
        <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
          Empower Your Learning Journey
        </h1>
        <p className="text-xl md:text-2xl mb-8 leading-relaxed">
          Join Thousands of Students in Achieving their Educational Goals
        </p>
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Button 
            text="Get Started" 
            onClick={() => navigate('/login')}
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-full text-lg font-medium transition-colors duration-200"
          />
        </motion.div>
      </motion.div>
    </motion.section>
  );
};

export default HeroSection;