import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import certificate from '../assets/certificate.webp';
import SignedInNavbar from './SignedInNavbar';
import { 
  Check, 
  Eye, 
  EyeOff, 
  Download, 
  ArrowLeft 
} from 'lucide-react';

const ViewCertificate = () => {
  const navigate = useNavigate();
  const [isDownloaded, setIsDownloaded] = useState(false);
  const [focusMode, setFocusMode] = useState(false);
  const [hoveredSection, setHoveredSection] = useState(null);

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = certificate;
    link.download = 'Course_Certificate.png';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setIsDownloaded(true);

    setTimeout(() => {
      setIsDownloaded(false);
    }, 5000);
  };

  const getBackgroundColor = () => {
    return focusMode ? 'bg-gray-100' : 'bg-gray-50';
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${getBackgroundColor()}`}>
      <SignedInNavbar />

      {/* <div className="bg-blue-600 text-white py-2">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center space-x-2">
            <span className="bg-white text-blue-600 rounded-full h-6 w-6 flex items-center justify-center text-sm font-bold">3</span>
            <span>of 3 steps complete - Final Achievement!</span>
          </div>
        </div>
      </div> */}

      <div className="container mx-auto px-4 py-6">
        <div className="flex justify-end mb-4">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setFocusMode(!focusMode)}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors
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

        <div className="flex flex-col md:flex-row space-y-6 md:space-y-0 md:space-x-6">
          <motion.div 
            className={`bg-white shadow rounded-lg p-6 w-full md:w-1/3 transition-all duration-300 ${
              focusMode && hoveredSection !== 'next-steps' ? 'opacity-30' : 'opacity-100'
            }`}
            onHoverStart={() => setHoveredSection('next-steps')}
            onHoverEnd={() => setHoveredSection(null)}
            animate={{ 
              scale: focusMode && hoveredSection === 'next-steps' ? 1.02 : 1 
            }}
          >
            <h2 className="text-2xl font-bold mb-4 text-gray-800">What's Next?</h2>
            <ul className="space-y-4">
              <li className="flex items-start">
                <div className="bg-blue-100 text-blue-800 p-2 rounded-full mr-3 mt-1">1</div>
                <div>
                  <p className="font-medium">Share your achievement on LinkedIn</p>
                  <p className="text-gray-600">Let your network know about your new skills and accomplishments.</p>
                </div>
              </li>
              <li className="flex items-start">
                <div className="bg-blue-100 text-blue-800 p-2 rounded-full mr-3 mt-1">2</div>
                <div>
                  <p className="font-medium">Explore related courses</p>
                  <p className="text-gray-600">Continue building your skills with our recommended courses and advanced learning paths.</p>
                </div>
              </li>
              <li className="flex items-start">
                <div className="bg-blue-100 text-blue-800 p-2 rounded-full mr-3 mt-1">3</div>
                <div>
                  <p className="font-medium">Apply your skills in real-world projects</p>
                  <p className="text-gray-600">Put your knowledge to the test by applying it to hands-on projects or in your professional life.</p>
                </div>
              </li>
              <li className="flex items-start">
                <div className="bg-blue-100 text-blue-800 p-2 rounded-full mr-3 mt-1">4</div>
                <div>
                  <p className="font-medium">Join the community</p>
                  <p className="text-gray-600">Connect with fellow learners, ask questions, and share experiences on our platform.</p>
                </div>
              </li>
            </ul>
          </motion.div>

          <motion.div 
            className={`bg-white shadow-lg rounded-lg p-8 w-full md:w-2/3 transition-all duration-300 ${
              focusMode && hoveredSection !== 'certificate' ? 'opacity-30' : 'opacity-100'
            }`}
            onHoverStart={() => setHoveredSection('certificate')}
            onHoverEnd={() => setHoveredSection(null)}
            animate={{ 
              scale: focusMode && hoveredSection === 'certificate' ? 1.02 : 1 
            }}
          >
            <AnimatePresence>
              {isDownloaded && (
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="fixed top-20 right-4 bg-green-100 border-l-4 border-green-500 text-green-700 p-4 rounded shadow-lg flex items-center mb-4"
                >
                  <Check className="mr-2" size={20} />
                  <span>Certificate downloaded successfully!</span>
                </motion.div>
              )}
            </AnimatePresence>

            <motion.h1 
              className="text-3xl font-bold text-center mb-4 text-blue-700"
              animate={{ 
                scale: focusMode && hoveredSection === 'certificate' ? [1, 1.05, 1] : 1,
                transition: { 
                  repeat: focusMode && hoveredSection === 'certificate' ? Infinity : 0,
                  duration: 2
                }
              }}
            >
              🎉 Your Certificate 🎉
            </motion.h1>

            <motion.div 
              className="text-center mb-6 bg-blue-50 p-4 rounded-lg border-l-4 border-blue-500"
            >
              <p className="text-gray-700 font-medium">
                <span className="text-xl">Congratulations!</span> You've completed the course!
              </p>
            </motion.div>

            <motion.div 
              className="border-4 border-blue-300 rounded-lg overflow-hidden mb-6 hover:border-blue-500 transition-all duration-300"
              whileHover={{ borderColor: '#2563eb' }}
            >
              <img
                src={certificate}
                alt="Certificate of Completion"
                className="w-full h-auto"
              />
            </motion.div>

            <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 transition-colors duration-300 flex items-center justify-center text-lg font-bold shadow-md"
                onClick={handleDownload}
              >
                <Download className="mr-2" size={20} />
                Download Certificate
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gray-500 text-white px-6 py-3 rounded-lg hover:bg-gray-600 transition-colors duration-300 flex items-center justify-center text-lg shadow-md"
                onClick={() => navigate('/my-learning')}
              >
                <ArrowLeft className="mr-2" size={20} />
                Back to My Courses
              </motion.button>
            </div>
          </motion.div>
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
            <span className="font-medium block mb-1">Achievement Tip:</span>
            Take a moment to reflect on what you've learned. What was your favorite part of the course?
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default ViewCertificate;