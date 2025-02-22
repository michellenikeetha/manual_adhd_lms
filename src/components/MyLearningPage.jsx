import React, { useState, useEffect } from 'react';
import MyCourseCard from '../components/MyCourseCard';
import SignedInNavbar from './SignedInNavbar';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Eye, EyeOff } from 'lucide-react';
import course1 from '../assets/course1.png';
import course2 from '../assets/course2.png';
import course3 from '../assets/course3.png';
import course4 from '../assets/course4.png';
import course5 from '../assets/course5.png';
import course6 from '../assets/course6.png';
import course7 from '../assets/course7.png';

const MyLearning = () => {
  const [activeTab, setActiveTab] = useState('in-progress');
  const [focusedCourse, setFocusedCourse] = useState(null);
  const [focusMode, setFocusMode] = useState(false);
  const [hoveredCourse, setHoveredCourse] = useState(null);
  const navigate = useNavigate();

  const inProgressCourses = [
    {
      id: 1,
      image: course1,
      title: 'Computer Science',
      description: 'Are you newer to Programming? Start learning basics of Computer Science as a beginner',
      progress: 15,
      lastAccessed: '2 days ago',
    },
    {
      id: 2,
      image: course2,
      title: 'Algebra',
      description: 'Are you newer to Programming? Start learning basics of Algebra as a beginner',
      progress: 34,
      lastAccessed: 'Yesterday',
    },
    {
      id: 3,
      image: course3,
      title: 'Introduction to Biology',
      description: 'Are you newer to Programming? Start learning basics of Biology as a beginner',
      progress: 8,
      lastAccessed: '1 week ago',
    },
    {
      id: 4,
      image: course4,
      title: 'Introduction to AI',
      description: 'Are you newer to Programming? Start learning basics of AI as a beginner',
      progress: 67,
      lastAccessed: 'Today',
    },
  ];

  const completedCourses = [
    {
      id: 5,
      image: course5,
      title: 'Computer Ethics',
      description: 'Learn ethical practices and principles in computer science.',
      progress: 100,
      completionDate: 'Jan 15, 2025',
    },
    {
      id: 6,
      image: course6,
      title: 'Advanced Mathematics',
      description: 'Advanced math topics for STEM students.',
      progress: 100,
      completionDate: 'Dec 20, 2024',
    },
    {
      id: 7,
      image: course7,
      title: 'History of Science',
      description: 'Understand the milestones in the history of science.',
      progress: 100,
      completionDate: 'Feb 5, 2025',
    },
  ];

  useEffect(() => {
    if (activeTab === 'in-progress') {
      const recentCourse = inProgressCourses.find(c => c.lastAccessed === 'Today');
      if (recentCourse) {
        setFocusedCourse(recentCourse.id);
      }
    }
  }, [activeTab]);

  const getBackgroundColor = () => {
    return focusMode ? 'bg-gray-100' : 'bg-gray-50';
  };

  const tabContainerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        duration: 0.5,
        staggerChildren: 0.1
      }
    }
  };

  const courseCardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.4 }
    },
    hover: { 
      scale: 1.02,
      boxShadow: "0px 5px 15px rgba(0,0,0,0.1)",
      transition: { duration: 0.2 }
    }
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${getBackgroundColor()}`}>
      <SignedInNavbar />

      <main className="container mx-auto px-4 py-6">
        <div className="flex justify-between items-center mb-6">
          <div className="flex space-x-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
                activeTab === 'in-progress'
                  ? 'bg-blue-500 text-white shadow-md'
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
              onClick={() => setActiveTab('in-progress')}
            >
              In Progress
              {activeTab === 'in-progress' && (
                <motion.div 
                  className="h-1 bg-white mt-1 rounded-full" 
                  layoutId="underline"
                />
              )}
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
                activeTab === 'completed'
                  ? 'bg-green-500 text-white shadow-md'
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
              onClick={() => setActiveTab('completed')}
            >
              Completed
              {activeTab === 'completed' && (
                <motion.div 
                  className="h-1 bg-white mt-1 rounded-full" 
                  layoutId="underline"
                />
              )}
            </motion.button>
          </div>

          <div className="flex space-x-4">
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

            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/my-learning/grades')}
              className="px-6 py-3 rounded-lg bg-white text-gray-700 hover:bg-gray-100 font-medium shadow-sm"
            >
              <span className="flex items-center">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
                Grades
              </span>
            </motion.button>
          </div>
        </div>

        {activeTab === 'in-progress' && (
          <motion.div 
            className="flex flex-wrap gap-2 mb-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <button className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium hover:bg-blue-200">
              Recently Accessed
            </button>
            <button className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium hover:bg-gray-200">
              High Progress (&gt;50%)
            </button>
            <button className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium hover:bg-gray-200">
              Need Attention (&lt;10%)
            </button>
          </motion.div>
        )}

        <motion.div
          variants={tabContainerVariants}
          initial="hidden"
          animate="visible"
        >
          {activeTab === 'in-progress' &&
            inProgressCourses.map((course, index) => (
              <motion.div 
                key={course.id} 
                variants={courseCardVariants}
                whileHover="hover"
                className={`mb-4 rounded-lg transition-opacity duration-300 ${
                  focusMode && hoveredCourse !== course.id ? 'opacity-50' : 'opacity-100'
                } ${focusedCourse === course.id ? 'ring-2 ring-blue-400' : ''}`}
                onClick={() => setFocusedCourse(course.id)}
                onHoverStart={() => setHoveredCourse(course.id)}
                onHoverEnd={() => setHoveredCourse(null)}
              >
                <MyCourseCard 
                  {...course}
                  isFocused={focusedCourse === course.id} 
                />
              </motion.div>
            ))}

          {activeTab === 'completed' &&
            completedCourses.map((course, index) => (
              <motion.div 
                key={course.id} 
                variants={courseCardVariants}
                whileHover="hover"
                className={`mb-4 rounded-lg transition-opacity duration-300 ${
                  focusMode && hoveredCourse !== course.id ? 'opacity-50' : 'opacity-100'
                }`}
                onHoverStart={() => setHoveredCourse(course.id)}
                onHoverEnd={() => setHoveredCourse(null)}
              >
                <MyCourseCard 
                  {...course}
                  completionDate={course.completionDate}
                />
              </motion.div>
            ))}
        </motion.div>
      </main>

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
            Choose one course to focus on today. What's your learning goal for this session?
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default MyLearning;