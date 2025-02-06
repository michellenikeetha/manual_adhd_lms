// components/LandingPage.js
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Navbar from './Navbar';
import HeroSection from './HeroSection';
import WhyChooseSection from './WhyChooseSection';
import ContactInfo from './ContactInfo';

const LandingPage = () => {
  const [activeSection, setActiveSection] = useState('hero');

  return (
    <div className="bg-neutral-50">
      <Navbar activeSection={activeSection} />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <HeroSection setActiveSection={setActiveSection} />
        <WhyChooseSection setActiveSection={setActiveSection} />
        <ContactInfo setActiveSection={setActiveSection} />
      </motion.div>
    </div>
  );
};

export default LandingPage;