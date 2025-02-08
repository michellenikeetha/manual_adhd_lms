// components/CourseCard.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, Bell, Search, X, AlertCircle, Clock } from 'lucide-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell, faComment, faCheckCircle, faFlag, faPlus, faUser } from '@fortawesome/free-solid-svg-icons';

// Enhanced CourseCard Component
const CourseCard = ({ course, isEnrolled }) => {
  const [showConfirm, setShowConfirm] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handleEnroll = () => {
    setShowConfirm(false);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  return (
    <motion.div
      className="bg-white p-6 rounded-lg shadow-lg relative overflow-hidden"
      whileHover={{ scale: 1.02, y: -5 }}
      whileTap={{ scale: 0.98 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
    >
      <motion.div
        className="absolute top-2 right-2 bg-blue-100 rounded-full p-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: isHovered ? 1 : 0 }}
      >
        <Clock className="w-4 h-4 text-blue-600" />
      </motion.div>

      <div
        className="h-32 bg-gray-200 rounded-lg mb-4 bg-cover bg-center transform transition-transform duration-300"
        style={{ backgroundImage: `url(${course.imageUrl})` }}
      />

      <motion.h3 
        className="text-lg font-bold mb-2"
        animate={{ color: isHovered ? '#2563EB' : '#1F2937' }}
      >
        {course.title}
      </motion.h3>
      
      <p className="text-sm text-gray-600">{course.semester}</p>

      {isEnrolled ? (
        <motion.div 
          className="mt-4 space-y-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <div className="flex justify-between items-center">
            <p className="text-sm text-blue-600 font-medium">{course.progress}% Complete</p>
            {course.progress === 100 && (
              <CheckCircle className="w-5 h-5 text-green-500" />
            )}
          </div>
          <div className="relative w-full h-3 bg-gray-200 rounded-full overflow-hidden">
            <motion.div
              className="absolute left-0 top-0 h-full bg-blue-600 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${course.progress}%` }}
              transition={{ duration: 1, ease: "easeOut" }}
            />
          </div>
        </motion.div>
      ) : (
        <motion.button
          className="mt-4 w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowConfirm(true)}
        >
          <span>Enroll now</span>
          <motion.div
            animate={{ x: [0, 5, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
          >
            →
          </motion.div>
        </motion.button>
      )}

      <AnimatePresence>
        {showConfirm && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white p-6 rounded-lg shadow-lg w-80"
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
            >
              <div className="flex justify-between items-center mb-4">
                <h4 className="text-lg font-bold">Confirm Enrollment</h4>
                <button 
                  onClick={() => setShowConfirm(false)}
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
                  className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowConfirm(false)}
                >
                  Cancel
                </motion.button>
                <motion.button
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleEnroll}
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
            className="fixed top-20 right-4 bg-green-500 text-white px-6 py-3 rounded-xl shadow-lg flex items-center gap-2 z-20"
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