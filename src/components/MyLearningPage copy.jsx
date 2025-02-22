import React, { useState, useEffect } from 'react';
import MyCourseCard from '../components/MyCourseCard';
import SignedInNavbar from './SignedInNavbar';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import course1 from '../assets/course1.png';
import course2 from '../assets/course2.png';
import course3 from '../assets/course3.png';
import course4 from '../assets/course4.png';
import course5 from '../assets/course5.png';
import course6 from '../assets/course6.png';
import course7 from '../assets/course7.png';

const MyLearning = () => {
  const [activeTab, setActiveTab] = useState('in-progress');
  const [focusMode, setFocusMode] = useState(false);
  const [activeCourse, setActiveCourse] = useState(null);
  const [showConfetti, setShowConfetti] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Reset confetti after 3 seconds
    if (showConfetti) {
      const timer = setTimeout(() => setShowConfetti(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [showConfetti]);

  const inProgressCourses = [
    {
      id: 1,
      image: course1,
      title: 'Computer Science',
      description: 'Are you newer to Programming? Start learning basics of Computer Science as a beginner',
      progress: 25,
      color: '#4F46E5', // Indigo
    },
    {
      id: 2,
      image: course2,
      title: 'Algebra',
      description: 'Are you newer to Programming? Start learning basics of Algebra as a beginner',
      progress: 34,
      color: '#10B981', // Emerald
    },
    {
      id: 3,
      image: course3,
      title: 'Introduction to Biology',
      description: 'Are you newer to Programming? Start learning basics of Biology as a beginner',
      progress: 18,
      color: '#F59E0B', // Amber
    },
    {
      id: 4,
      image: course4,
      title: 'Introduction to AI',
      description: 'Are you newer to Programming? Start learning basics of AI as a beginner',
      progress: 67,
      color: '#EC4899', // Pink
    },
  ];

  const completedCourses = [
    {
      id: 5,
      image: course5,
      title: 'Computer Ethics',
      description: 'Learn ethical practices and principles in computer science.',
      progress: 100,
      color: '#8B5CF6', // Violet
    },
    {
      id: 6,
      image: course6,
      title: 'Advanced Mathematics',
      description: 'Advanced math topics for STEM students.',
      progress: 100,
      color: '#EF4444', // Red
    },
    {
      id: 7,
      image: course7,
      title: 'History of Science',
      description: 'Understand the milestones in the history of science.',
      progress: 100,
      color: '#06B6D4', // Cyan
    },
  ];

  const toggleFocusMode = () => {
    setFocusMode(!focusMode);
    setActiveCourse(null);
  };

  const focusOnCourse = (courseId) => {
    if (focusMode) {
      const allCourses = [...inProgressCourses, ...completedCourses];
      const course = allCourses.find(c => c.id === courseId);
      setActiveCourse(course);
    }
  };

  const onProgressUpdate = () => {
    setShowConfetti(true);
  };

  const ConfettiEffect = () => (
    <div className="fixed inset-0 pointer-events-none z-50">
      {Array.from({ length: 50 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-3 h-3 rounded-full"
          initial={{
            top: "-10%",
            left: `${Math.random() * 100}%`,
            backgroundColor: `hsl(${Math.random() * 360}, 80%, 60%)`,
          }}
          animate={{
            top: "110%",
            rotate: 360 * Math.round(Math.random() * 5),
          }}
          transition={{
            duration: 2.5 + Math.random() * 3,
            ease: "easeOut",
          }}
        />
      ))}
    </div>
  );
  
  return (
    <div className={`bg-gray-100 min-h-screen transition-all duration-300 ${focusMode ? 'bg-gray-900' : ''}`}>
      <SignedInNavbar />

      {showConfetti && <ConfettiEffect />}

      <main className={`container mx-auto px-4 py-6 transition-all duration-300 ${focusMode ? 'max-w-2xl' : ''}`}>
        <div className="flex flex-wrap items-center mb-6 gap-2">
          <motion.button
            whileTap={{ scale: 0.95 }}
            className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
              activeTab === 'in-progress'
                ? 'bg-blue-500 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
            onClick={() => setActiveTab('in-progress')}
          >
            <motion.div 
              animate={{ x: activeTab === 'in-progress' ? [0, 5, 0] : 0 }}
              transition={{ duration: 0.5 }}
              className="flex items-center gap-2"
            >
              <span>In Progress</span>
              {activeTab === 'in-progress' && (
                <span className="inline-block">🚀</span>
              )}
            </motion.div>
          </motion.button>

          <motion.button
            whileTap={{ scale: 0.95 }}
            className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
              activeTab === 'completed'
                ? 'bg-blue-500 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
            onClick={() => setActiveTab('completed')}
          >
            <motion.div 
              animate={{ x: activeTab === 'completed' ? [0, 5, 0] : 0 }}
              transition={{ duration: 0.5 }}
              className="flex items-center gap-2"
            >
              <span>Completed</span>
              {activeTab === 'completed' && (
                <span className="inline-block">🏆</span>
              )}
            </motion.div>
          </motion.button>
          
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={toggleFocusMode}
            className={`px-4 py-2 rounded-lg font-medium flex items-center gap-2 transition-all duration-300 ${
              focusMode 
                ? 'bg-yellow-500 text-white' 
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            <span>Focus Mode</span>
            <span className="text-lg">{focusMode ? '👁️' : '👀'}</span>
          </motion.button>
          
          <motion.button 
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/my-learning/grades')}
            className="ml-auto px-4 py-2 rounded-lg bg-gray-200 text-gray-700 hover:bg-gray-300 font-medium"
          >
            Grades 📊
          </motion.button>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="grid gap-4"
          >
            {activeTab === 'in-progress' && (
              focusMode && activeCourse ? (
                <FocusedCourseView 
                  course={activeCourse} 
                  onBack={() => setActiveCourse(null)} 
                  onProgressUpdate={onProgressUpdate}
                />
              ) : (
                inProgressCourses.map((course, index) => (
                  <motion.div
                    key={course.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.02 }}
                    onClick={() => focusOnCourse(course.id)}
                  >
                    <EnhancedCourseCard 
                      {...course} 
                      isFocusMode={focusMode} 
                      onProgressUpdate={onProgressUpdate}
                    />
                  </motion.div>
                ))
              )
            )}

            {activeTab === 'completed' && (
              focusMode && activeCourse ? (
                <FocusedCourseView 
                  course={activeCourse} 
                  onBack={() => setActiveCourse(null)} 
                />
              ) : (
                completedCourses.map((course, index) => (
                  <motion.div
                    key={course.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.02 }}
                    onClick={() => focusOnCourse(course.id)}
                  >
                    <EnhancedCourseCard 
                      {...course} 
                      isFocusMode={focusMode}
                    />
                  </motion.div>
                ))
              )
            )}
          </motion.div>
        </AnimatePresence>

        {focusMode && !activeCourse && (
          <div className="mt-8 text-center text-gray-400">
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-lg"
            >
              Click on a course to focus on it
            </motion.p>
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="mt-4 text-3xl"
            >
              ☝️
            </motion.div>
          </div>
        )}

        {!focusMode && activeTab === 'in-progress' && (
          <div className="mt-8">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="p-4 bg-blue-50 rounded-lg border border-blue-200"
            >
              <h3 className="font-medium text-blue-800 mb-2 flex items-center gap-2">
                <motion.span
                  animate={{ rotate: [0, 15, 0, -15, 0] }}
                  transition={{ repeat: Infinity, duration: 2, delay: 1 }}
                >
                  💡
                </motion.span>
                ADHD Study Tip
              </h3>
              <p className="text-blue-700">
                Try the Pomodoro Technique: 25 minutes of focused study, followed by a 5-minute break. 
                After 4 cycles, take a longer 15-30 minute break.
              </p>
            </motion.div>
          </div>
        )}
      </main>
    </div>
  );
};

// Enhanced Course Card with animations and visual cues
const EnhancedCourseCard = ({ title, description, image, progress, color, isFocusMode, onProgressUpdate }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <div 
      className={`relative rounded-xl overflow-hidden shadow-lg transition-all duration-300 ${
        isFocusMode ? 'bg-gray-800 text-white' : 'bg-white'
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Visual indicator for progress */}
      <div 
        className="absolute left-0 top-0 h-full w-1" 
        style={{ backgroundColor: color }}
      />
      
      <div className="flex flex-col md:flex-row">
        <div className="relative md:w-48 h-48 overflow-hidden">
          <img 
            src={image} 
            alt={title} 
            className="object-cover w-full h-full transition-transform duration-700"
            style={{
              transform: isHovered ? 'scale(1.05)' : 'scale(1)'
            }}
          />
          {progress < 100 && progress > 0 && (
            <motion.div 
              className="absolute bottom-0 left-0 right-0 h-6 bg-black bg-opacity-60 flex items-center px-2"
              initial={{ y: 30 }}
              animate={{ y: isHovered ? 0 : 30 }}
              transition={{ duration: 0.3 }}
            >
              <div className="w-full bg-gray-300 rounded-full h-2.5">
                <motion.div 
                  className="h-2.5 rounded-full" 
                  style={{ backgroundColor: color }}
                  initial={{ width: '0%' }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 1, delay: 0.2 }}
                />
              </div>
              <span className="ml-2 text-white text-xs font-medium">{progress}%</span>
            </motion.div>
          )}
        </div>
        
        <div className="p-5 flex-1">
          <div className="flex items-start justify-between">
            <h2 className={`text-xl font-bold mb-2 ${isFocusMode ? 'text-white' : 'text-gray-800'}`}>
              {title}
              {progress === 100 && 
                <motion.span 
                  className="ml-2 inline-block" 
                  animate={{ rotate: [0, 10, 0, -10, 0] }}
                  transition={{ repeat: Infinity, duration: 2, repeatDelay: 3 }}
                >
                  ✅
                </motion.span>
              }
            </h2>
            
            {progress < 100 && progress > 0 && (
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="bg-blue-500 text-white py-1 px-3 rounded-lg text-sm"
                onClick={(e) => {
                  e.stopPropagation();
                  onProgressUpdate && onProgressUpdate();
                }}
              >
                Resume
              </motion.button>
            )}
          </div>
          
          <p className={`${isFocusMode ? 'text-gray-300' : 'text-gray-600'} mb-4`}>
            {description}
          </p>
          
          {progress === 100 && (
            <div className={`inline-block ${isFocusMode ? 'bg-green-900' : 'bg-green-100'} rounded-full px-3 py-1 text-sm font-semibold ${isFocusMode ? 'text-green-300' : 'text-green-800'}`}>
              Completed
            </div>
          )}
          
          {progress === 0 && (
            <motion.div 
              className={`inline-block ${isFocusMode ? 'bg-blue-900' : 'bg-blue-100'} rounded-full px-3 py-1 text-sm font-semibold ${isFocusMode ? 'text-blue-300' : 'text-blue-800'}`}
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ repeat: Infinity, duration: 2 }}
            >
              Start Now
            </motion.div>
          )}
          
          {progress > 0 && progress < 100 && (
            <div className={`inline-block ${isFocusMode ? 'bg-yellow-900' : 'bg-yellow-100'} rounded-full px-3 py-1 text-sm font-semibold ${isFocusMode ? 'text-yellow-300' : 'text-yellow-800'}`}>
              In Progress
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Focused Course View component for Focus Mode
const FocusedCourseView = ({ course, onBack, onProgressUpdate }) => {
  const [showTip, setShowTip] = useState(false);
  
  useEffect(() => {
    // Show ADHD tip after 3 seconds in focus mode
    const timer = setTimeout(() => setShowTip(true), 3000);
    return () => clearTimeout(timer);
  }, []);
  
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="bg-gray-800 rounded-xl p-6 text-white"
    >
      <div className="flex items-center mb-6">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={onBack}
          className="mr-4 bg-gray-700 p-2 rounded-full"
        >
          ← Back
        </motion.button>
        <h1 className="text-2xl font-bold">{course.title}</h1>
      </div>
      
      <div className="grid md:grid-cols-3 gap-6">
        <div className="col-span-2">
          <div className="rounded-lg overflow-hidden mb-6">
            <img src={course.image} alt={course.title} className="w-full h-64 object-cover" />
          </div>
          
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-3">Course Overview</h2>
            <p className="text-gray-300 mb-4">{course.description}</p>
            <p className="text-gray-300">This focused view helps you concentrate on one course at a time, reducing distractions and helping you maintain focus.</p>
          </div>
          
          {course.progress < 100 && (
            <div className="bg-gray-700 p-4 rounded-lg mb-6">
              <h3 className="font-medium mb-2">Current Progress: {course.progress}%</h3>
              <div className="w-full bg-gray-600 rounded-full h-4 mb-4">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${course.progress}%` }}
                  transition={{ duration: 1 }}
                  className="h-4 rounded-full" 
                  style={{ backgroundColor: course.color }}
                />
              </div>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg"
                onClick={() => onProgressUpdate && onProgressUpdate()}
              >
                Continue Learning
              </motion.button>
            </div>
          )}
        </div>
        
        <div>
          <div className="bg-gray-700 p-4 rounded-lg mb-6">
            <h3 className="font-medium mb-3 flex items-center">
              <motion.span
                animate={{ rotate: [0, 15, -15, 0] }}
                transition={{ repeat: Infinity, duration: 2, repeatDelay: 3 }}
                className="mr-2"
              >
                ⏱️
              </motion.span>
              Study Timer
            </h3>
            <StudyTimer />
          </div>
          
          {showTip && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-gray-700 p-4 rounded-lg"
            >
              <h3 className="font-medium mb-3 flex items-center">
                <motion.span
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ repeat: Infinity, duration: 1, repeatDelay: 2 }}
                  className="mr-2"
                >
                  💡
                </motion.span>
                ADHD-Friendly Tips
              </h3>
              <ul className="text-gray-300 space-y-2 text-sm">
                <li>• Take short breaks every 25 minutes</li>
                <li>• Use headphones with white noise if needed</li>
                <li>• Keep a fidget toy nearby for restlessness</li>
                <li>• Break down learning into small chunks</li>
              </ul>
            </motion.div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

// Study Timer component with animations
const StudyTimer = () => {
  const [minutes, setMinutes] = useState(25);
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [showPulse, setShowPulse] = useState(false);
  
  useEffect(() => {
    let interval = null;
    
    if (isActive) {
      interval = setInterval(() => {
        if (seconds === 0) {
          if (minutes === 0) {
            clearInterval(interval);
            setIsActive(false);
            setShowPulse(true);
            setTimeout(() => setShowPulse(false), 3000);
          } else {
            setMinutes(minutes - 1);
            setSeconds(59);
          }
        } else {
          setSeconds(seconds - 1);
        }
      }, 1000);
    } else if (!isActive && seconds !== 0) {
      clearInterval(interval);
    }
    
    return () => clearInterval(interval);
  }, [isActive, minutes, seconds]);
  
  const resetTimer = () => {
    setMinutes(25);
    setSeconds(0);
    setIsActive(false);
  };
  
  return (
    <div className="text-center">
      <div className="relative mb-4">
        <div className="text-4xl font-bold">
          {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
        </div>
        
        {showPulse && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: [1, 1.5, 1], opacity: [0, 0.8, 0] }}
            transition={{ repeat: 3, duration: 1 }}
            className="absolute inset-0 bg-green-500 rounded-full z-0"
          />
        )}
      </div>
      
      <div className="flex justify-center space-x-2">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsActive(!isActive)}
          className={`py-2 px-4 rounded-lg ${
            isActive ? 'bg-red-500 hover:bg-red-600' : 'bg-green-500 hover:bg-green-600'
          }`}
        >
          {isActive ? 'Pause' : 'Start'}
        </motion.button>
        
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={resetTimer}
          className="py-2 px-4 bg-gray-600 hover:bg-gray-500 rounded-lg"
        >
          Reset
        </motion.button>
      </div>
      
      <p className="text-xs text-gray-400 mt-2">
        25-min work, 5-min break (Pomodoro)
      </p>
    </div>
  );
};

export default MyLearning;