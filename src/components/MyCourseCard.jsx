import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const MyCourseCard = ({ 
  id, 
  image, 
  title, 
  description, 
  progress, 
  lastAccessed, 
  completionDate,
  isFocused 
}) => {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    if (progress === 100) {
      navigate('/my-learning/view-certificate');
    } else if (progress !== undefined) {
      navigate('/my-learning/my-course');
    } else {
      navigate('/my-learning/my-course');
    }
  };

  const getProgressColor = () => {
    if (progress < 25) return 'bg-red-500';
    if (progress < 50) return 'bg-yellow-500';
    if (progress < 75) return 'bg-blue-500';
    return 'bg-green-500';
  };

  return (
    <div className={`flex flex-col md:flex-row items-center bg-white shadow-md rounded-lg p-4 transition-all duration-200 ${isFocused ? 'bg-blue-50' : ''}`}>
      <div className="relative">
        <img src={image} alt={title} className="w-full md:w-32 h-24 rounded-md object-cover" />
        {progress !== undefined && progress !== 100 && (
          <div className="absolute -top-2 -right-2 bg-white rounded-full p-1 shadow-md">
            <motion.div 
              className="w-10 h-10 rounded-full flex items-center justify-center border-4 border-gray-100"
              style={{ 
                background: `conic-gradient(${getProgressColor()} ${progress}%, #f3f4f6 0)`
              }}
              whileHover={{ scale: 1.1 }}
            >
              <span className="text-xs font-bold">{progress}%</span>
            </motion.div>
          </div>
        )}
      </div>
      
      <motion.div 
        className="flex-grow px-4 mt-3 md:mt-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
      >
        <div className="flex items-center">
          <h2 className="text-xl font-bold">{title}</h2>
          {lastAccessed === 'Today' && (
            <motion.span 
              className="ml-2 bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full"
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: 3, repeatType: "reverse" }}
            >
              Today
            </motion.span>
          )}
        </div>
        
        <p className="text-sm text-gray-600 mb-2">{description}</p>
        
        <div className="flex flex-wrap gap-2 items-center">
          {lastAccessed && (
            <span className="text-xs text-gray-500">Last visited: {lastAccessed}</span>
          )}
          {completionDate && (
            <span className="text-xs text-gray-500">Completed on: {completionDate}</span>
          )}
          
          {progress !== undefined && progress !== 100 && (
            <div className="w-full mt-2">
              <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
                <motion.div 
                  className={`h-full ${getProgressColor()}`}
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                />
              </div>
            </div>
          )}
        </div>
      </motion.div>
      
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className={`${
          progress === 100
            ? 'bg-green-500 hover:bg-green-600' 
            : progress !== undefined && progress > 50
            ? 'bg-black hover:bg-gray-800' 
            : progress !== undefined && progress <= 50
            ? 'bg-blue-600 hover:bg-blue-700'
            : 'bg-blue-500 hover:bg-blue-600'
        } text-white px-6 py-3 rounded-lg font-medium shadow-sm transition-all duration-200 mt-3 md:mt-0`}
        onClick={handleButtonClick}
      >
        <span className="flex items-center">
          {progress === 100 ? (
            <>
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              View Certificate
            </>
          ) : progress !== undefined ? (
            <>
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Resume
            </>
          ) : (
            <>
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              Get Started
            </>
          )}
        </span>
      </motion.button>
    </div>
  );
};

export default MyCourseCard;