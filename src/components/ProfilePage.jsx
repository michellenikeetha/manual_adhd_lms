import React, { useState } from 'react';
import SignedInNavbar from './SignedInNavbar';
import ImageUploader from './ImageUploader';
import user from '../assets/user.jpg';
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Save, Eye, EyeOff, ArrowLeft, ArrowRight, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const ProfilePage = () => {
  const [currentSection, setCurrentSection] = useState(0);
  const [focusMode, setFocusMode] = useState(false);
  const [completedSections, setCompletedSections] = useState([false, false, false]);
  const [confetti, setConfetti] = useState(false);

  const sections = [
    { id: "basic", title: "Basic Information", emoji: "😊" },
    { id: "socials", title: "Social Media Links", emoji: "🔗" },
    { id: "details", title: "Bio & Additional Details", emoji: "📝" }
  ];

  const markCurrentSectionComplete = () => {
    const newCompletedSections = [...completedSections];
    newCompletedSections[currentSection] = true;
    setCompletedSections(newCompletedSections);

    // Show confetti if this was the last section
    if (currentSection === sections.length - 1 && !newCompletedSections.includes(false)) {
      setConfetti(true);
      setTimeout(() => setConfetti(false), 3000);
    }
  };

  const nextSection = () => {
    if (currentSection < sections.length - 1) {
      setCurrentSection(currentSection + 1);
    }
  };

  const prevSection = () => {
    if (currentSection > 0) {
      setCurrentSection(currentSection - 1);
    }
  };

  const getBackgroundColor = () => {
    return focusMode ? 'bg-gray-100' : 'bg-white';
  };

  const getProgressPercentage = () => {
    const completedCount = completedSections.filter(Boolean).length;
    return (completedCount / sections.length) * 100;
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${getBackgroundColor()}`}>
      <SignedInNavbar />
      
      {confetti && (
        <div className="fixed inset-0 pointer-events-none z-50 flex items-center justify-center">
          <div className="absolute inset-0">
            {Array.from({ length: 100 }).map((_, i) => (
              <motion.div
                key={i}
                initial={{ 
                  top: "-10%",
                  left: `${Math.random() * 100}%`,
                  scale: 0
                }}
                animate={{ 
                  top: "100%", 
                  scale: [0, 1, 0.5],
                  rotate: [0, 180, 360]
                }}
                transition={{ 
                  duration: 3 + Math.random() * 2,
                  ease: "easeOut"
                }}
                className="absolute w-3 h-3 rounded-full"
                style={{
                  backgroundColor: ['#FF5733', '#33FF57', '#3357FF', '#F3FF33', '#FF33F3'][Math.floor(Math.random() * 5)]
                }}
              />
            ))}
          </div>
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            className="bg-white rounded-lg p-6 shadow-xl z-10"
          >
            <h2 className="text-2xl font-bold text-center mb-2">Profile Complete! 🎉</h2>
            <p className="text-gray-600">All sections have been filled out.</p>
          </motion.div>
        </div>
      )}

      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div className="flex items-center gap-4">
            <img 
              src={user} 
              alt="Profile" 
              className="rounded-full w-20 h-20 object-cover border-4 border-blue-500" 
            />
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Edit Your Profile</h1>
              <p className="text-gray-600">Complete one section at a time</p>
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setFocusMode(!focusMode)}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors mt-4 md:mt-0
              ${focusMode ? 'bg-blue-500 text-white' : 'bg-blue-100 text-blue-500'}`}
          >
            {focusMode ? (
              <>
                <EyeOff size={20} />
                <span>Focus Mode</span>
              </>
            ) : (
              <>
                <Eye size={20} />
                <span>Normal Mode</span>
              </>
            )}
          </motion.button>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between mb-2">
            {sections.map((section, index) => (
              <div 
                key={index}
                className={`flex items-center ${index === currentSection ? 'text-blue-600 font-medium' : 'text-gray-500'}`}
              >
                <span className={`inline-flex items-center justify-center w-8 h-8 rounded-full mr-2 ${
                  completedSections[index] 
                    ? 'bg-green-500 text-white' 
                    : index === currentSection 
                    ? 'bg-blue-100 text-blue-600' 
                    : 'bg-gray-200 text-gray-600'
                }`}>
                  {completedSections[index] ? <Check size={16} /> : index + 1}
                </span>
                <span className="hidden sm:inline">{section.title}</span>
                <span className="inline sm:hidden">{section.emoji}</span>
              </div>
            ))}
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <motion.div 
              className="bg-blue-600 h-2.5 rounded-full"
              initial={{ width: `${getProgressPercentage()}%` }}
              animate={{ width: `${getProgressPercentage()}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </div>

        {/* Section Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSection}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3 }}
          >
            <Card>
              <CardHeader>
                <CardTitle>{sections[currentSection].emoji} {sections[currentSection].title}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {currentSection === 0 && (
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <label className="block text-lg font-medium text-gray-700">First Name</label>
                      <input 
                        type="text" 
                        placeholder="Enter your first name" 
                        className="w-full p-3 text-lg border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="block text-lg font-medium text-gray-700">Last Name</label>
                      <input 
                        type="text" 
                        placeholder="Enter your last name" 
                        className="w-full p-3 text-lg border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                )}

                {currentSection === 1 && (
                  <div className="space-y-4">
                    {[
                      { name: 'Website', icon: '🌐' },
                      { name: 'X/Twitter', icon: '🐦' },
                      { name: 'LinkedIn', icon: '💼' },
                      { name: 'YouTube', icon: '📺' },
                      { name: 'Facebook', icon: '👥' }
                    ].map((social) => (
                      <div key={social.name} className="space-y-2">
                        <label className="flex items-center gap-2 text-lg font-medium text-gray-700">
                          {social.icon} {social.name}
                        </label>
                        <input 
                          type="text" 
                          placeholder={`Your ${social.name} profile`} 
                          className="w-full p-3 text-lg border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                    ))}
                  </div>
                )}

                {currentSection === 2 && (
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <label className="block text-lg font-medium text-gray-700">Short Bio</label>
                      <p className="text-sm text-gray-500">Brief introduction about yourself (max 150 characters)</p>
                      <textarea 
                        placeholder="I'm a creative developer who loves building user-friendly interfaces..." 
                        className="w-full p-3 text-lg border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent h-24"
                      />
                    </div>

                    <div className="space-y-4">
                      <h3 className="text-lg font-medium text-gray-700">Profile Picture</h3>
                      <ImageUploader />
                    </div>
                  </div>
                )}

                <div className="flex justify-between mt-8">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={prevSection}
                    disabled={currentSection === 0}
                    className={`flex items-center justify-center gap-2 py-2 px-4 rounded-lg text-lg font-medium transition-colors
                      ${currentSection === 0 
                        ? 'bg-gray-200 text-gray-400 cursor-not-allowed' 
                        : 'bg-gray-200 hover:bg-gray-300 text-gray-700'}`}
                  >
                    <ArrowLeft className="w-5 h-5" />
                    Previous
                  </motion.button>
                  
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      markCurrentSectionComplete();
                      if (currentSection < sections.length - 1) {
                        nextSection();
                      }
                    }}
                    className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white py-2 px-6 rounded-lg text-lg font-medium transition-colors"
                  >
                    <Save className="w-5 h-5" />
                    {currentSection === sections.length - 1 ? 'Save & Complete' : 'Save & Continue'}
                    {currentSection < sections.length - 1 && <ArrowRight className="w-5 h-5" />}
                  </motion.button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </AnimatePresence>

        {/* Navigation Pills */}
        <div className="flex justify-center mt-6 gap-2">
          {sections.map((section, index) => (
            <motion.button
              key={index}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setCurrentSection(index)}
              className={`w-3 h-3 rounded-full transition-colors ${
                index === currentSection 
                  ? 'bg-blue-600' 
                  : completedSections[index] 
                  ? 'bg-green-500' 
                  : 'bg-gray-300'
              }`}
              aria-label={`Go to ${section.title}`}
            />
          ))}
        </div>
      </div>

      {focusMode && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ 
            opacity: [0.7, 1, 0.7],
            transition: { repeat: Infinity, duration: 4 }
          }}
          className="fixed bottom-6 left-6 bg-white p-3 rounded-lg shadow-lg max-w-xs"
        >
          <div className="text-sm text-gray-600">
            <span className="font-medium block mb-1">Focus Tip:</span>
            Take your time with each section. There's no rush - complete one part at a time.
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default ProfilePage;