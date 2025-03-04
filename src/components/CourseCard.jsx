// components/CourseCard.js
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, X, Clock } from 'lucide-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell, faComment, faCheckCircle, faPlus, faUser } from '@fortawesome/free-solid-svg-icons';

const CourseCard = ({ course, isEnrolled }) => {
  const [showConfirm, setShowConfirm] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();

  const handleEnroll = (e) => {
    e.stopPropagation(); 
    setShowConfirm(false);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  const handleCardClick = () => {
    navigate('/my-learning');
  };

  const handleEnrollClick = (e) => {
    e.stopPropagation();
    setShowConfirm(true);
  };

  return (
    <motion.div
      className="bg-white p-6 rounded-2xl shadow-md relative overflow-hidden hover:shadow-lg transition-shadow duration-300 cursor-pointer flex flex-col h-[350px]"
      whileHover={{ scale: 1.03, y: -3 }}
      whileTap={{ scale: 0.97 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      transition={{ type: "spring", stiffness: 300, damping: 15 }}
      onClick={handleCardClick}
    >
      <motion.div
        className="absolute top-2 right-2 bg-indigo-100 rounded-full p-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: isHovered ? 1 : 0 }}
      >
        <Clock className="w-4 h-4 text-indigo-600" />
      </motion.div>

      <div
        className="h-36 bg-gradient-to-r from-blue-200 to-indigo-200 rounded-xl mb-4 bg-cover bg-center transform hover:scale-105 transition-transform duration-300"
        style={{ backgroundImage: `url(${course.imageUrl})` }}
      />

      <motion.h3 
        className="text-xl font-semibold text-gray-900 mb-2"
        animate={{ color: isHovered ? '#4F46E5' : '#1E293B' }}
      >
        {course.title}
      </motion.h3>
      
      <p className="text-sm text-gray-500 font-medium mb-4">{course.semester}</p>

      <div className="mt-auto">
        {isEnrolled ? (
          <motion.div 
            className="mt-4 space-y-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <div className="flex justify-between items-center">
              <p className="text-sm text-indigo-600 font-medium">{course.progress}% Complete</p>
              {course.progress === 100 && (
                <CheckCircle className="w-5 h-5 text-green-500" />
              )}
            </div>
            <div className="relative w-full h-3 bg-gray-300 rounded-full overflow-hidden">
              <motion.div
                className="absolute left-0 top-0 h-full bg-indigo-600 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${course.progress}%` }}
                transition={{ duration: 1, ease: "easeOut" }}
              />
            </div>
          </motion.div>
        ) : (
          <motion.button
            className="mt-4 w-full bg-indigo-600 text-white py-3 px-4 rounded-xl hover:bg-indigo-700 transition-colors flex items-center justify-center gap-2 focus:ring focus:ring-indigo-400 focus:ring-opacity-50"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleEnrollClick}
          >
            <span>Enroll Now</span>
            <motion.div
              animate={{ x: [0, 5, 0] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
            >
              →
            </motion.div>
          </motion.button>
        )}
      </div>

      <AnimatePresence>
        {showConfirm && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={(e) => {
              e.stopPropagation(); // Prevent clicks from reaching the card
              setShowConfirm(false);
            }}
          >
            <motion.div
              className="bg-white p-6 rounded-2xl shadow-xl w-80"
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()} // Prevent clicks from closing the modal
            >
              <div className="flex justify-between items-center mb-4">
                <h4 className="text-lg font-semibold">Confirm Enrollment</h4>
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowConfirm(false);
                  }}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <p className="text-sm text-gray-600 mb-6">
                Are you sure you want to enroll in {course.title}?
              </p>
              <div className="flex justify-end space-x-4">
                <motion.button
                  className="bg-gray-300 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-400 focus:outline-none focus:ring focus:ring-gray-400"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowConfirm(false);
                  }}
                >
                  Cancel
                </motion.button>
                <motion.button
                  className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 focus:ring focus:ring-indigo-400"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleEnroll(e);
                  }}
                >
                  Confirm
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showSuccess && (
          <motion.div
            className="fixed top-20 right-4 bg-green-600 text-white px-6 py-3 rounded-xl shadow-lg flex items-center gap-2 z-20"
            initial={{ opacity: 0, y: -50, x: 50 }}
            animate={{ opacity: 1, y: 0, x: 0 }}
            exit={{ opacity: 0, y: -50, x: 50 }}
          >
            <CheckCircle className="w-5 h-5" />
            Enrollment Successful!
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default CourseCard;