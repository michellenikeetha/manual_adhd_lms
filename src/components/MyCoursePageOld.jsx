import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FileText, 
  UploadCloud, 
  Clock, 
  Award, 
  BookOpen, 
  CheckCircle, 
  AlertCircle,
  Eye,
  EyeOff,
  Calendar,
  Filter
} from 'lucide-react';
import SignedInNavbar from './SignedInNavbar';
import { useNavigate } from 'react-router-dom';

const MyCoursePage = () => {
  const [assignmentUploaded, setAssignmentUploaded] = useState(false);
  const [activeUnit, setActiveUnit] = useState(0);
  const [focusMode, setFocusMode] = useState(false);
  const [hoveredUnit, setHoveredUnit] = useState(null);
  const [filterVisible, setFilterVisible] = useState(false);
  const [selectedDifficulty, setSelectedDifficulty] = useState('all');
  const navigate = useNavigate();

  const handleAssignmentUpload = () => {
    setAssignmentUploaded(true);
  };

  const units = [
    {
      title: "UNIT 1: Introduction to Programming",
      description: ["What is Programming?", "Programming languages", "Algorithms and Flow charts"],
      progress: 55,
      estimatedTime: "45 min",
      difficulty: "Beginner"
    },
    {
      title: "UNIT 2: Fundamentals of C",
      description: ["What is Programming?", "Programming languages"],
      progress: 0,
      estimatedTime: "60 min",
      difficulty: "Intermediate"
    },
    {
      title: "UNIT 3: Rapid Application Development",
      description: ["What is Programming?", "Programming languages", "Algorithms and Flow charts"],
      progress: 0,
      estimatedTime: "75 min",
      difficulty: "Intermediate"
    },
    {
      title: "UNIT 4: Introduction to Database Management Systems",
      description: ["What is Programming?", "Programming languages", "Algorithms and Flow charts"],
      progress: 0,
      estimatedTime: "90 min",
      difficulty: "Advanced"
    },
  ];

  const sidebarUnits = [
    "Introduction to Programming",
    "Fundamentals of C",
    "Rapid Application Development",
    "Introduction to Database Management Systems",
    "Basics of Python Programming",
  ];

  const difficulties = [...new Set(units.map(unit => unit.difficulty))];
  
  const filteredUnits = selectedDifficulty === 'all' 
    ? units 
    : units.filter(unit => unit.difficulty === selectedDifficulty);

  const renderProgressBar = (progress) => (
    <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4 dark:bg-gray-700">
      <div 
        className="bg-blue-600 h-2.5 rounded-full" 
        style={{ width: `${progress}%` }}
      ></div>
    </div>
  );

  const getBackgroundColor = () => {
    return focusMode ? 'bg-gray-100' : 'bg-white';
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${getBackgroundColor()}`}>
      <SignedInNavbar />

      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 space-y-4 md:space-y-0">
          <h1 className="text-3xl font-bold text-gray-800">Computer Science</h1>
          
          <div className="flex items-center space-x-4">
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
              onClick={() => setFilterVisible(!filterVisible)}
              className={`p-2 rounded-lg ${filterVisible ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
            >
              <Filter size={20} />
            </motion.button>
          </div>
        </div>

        <AnimatePresence>
          {filterVisible && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="mb-6"
            >
              <div className="p-4 bg-blue-50 rounded-lg">
                <h3 className="font-semibold mb-2">Filter by Difficulty</h3>
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => setSelectedDifficulty('all')}
                    className={`px-3 py-1 rounded-full text-sm transition-colors
                      ${selectedDifficulty === 'all' ? 'bg-blue-500 text-white' : 'bg-white'}`}
                  >
                    All
                  </button>
                  {difficulties.map(difficulty => (
                    <button
                      key={difficulty}
                      onClick={() => setSelectedDifficulty(difficulty)}
                      className={`px-3 py-1 rounded-full text-sm transition-colors
                        ${selectedDifficulty === difficulty ? 'bg-blue-500 text-white' : 'bg-white'}`}
                    >
                      {difficulty}
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="flex flex-col md:flex-row gap-6">
          <div className="md:w-1/4">
            <div className="bg-white shadow-md rounded-lg overflow-hidden sticky top-4">
              <h2 className="text-xl font-bold text-white bg-blue-600 px-4 py-3">Course Outline</h2>
              <ul className="py-2">
                {sidebarUnits.map((unit, index) => (
                  <motion.li
                    key={index}
                    whileHover={{ x: 5 }}
                    className={`
                      border-l-4 px-4 py-3 cursor-pointer transition-colors duration-200
                      ${activeUnit === index ? 
                        'border-blue-500 bg-blue-50 text-blue-700 font-medium' : 
                        'border-transparent text-gray-600 hover:bg-gray-50 hover:border-blue-200'}
                    `}
                    onClick={() => setActiveUnit(index)}
                  >
                    <div className="flex items-center">
                      {index === 0 && <CheckCircle size={16} className="text-green-500 mr-2" />}
                      {index === 1 && <AlertCircle size={16} className="text-orange-500 mr-2" />}
                      UNIT {index + 1}
                    </div>
                    <div className="ml-5">{unit}</div>
                  </motion.li>
                ))}
              </ul>
            </div>

            <div className="bg-white shadow-md rounded-lg mt-4 p-4">
              <h3 className="font-bold text-red-600 flex items-center mb-3">
                <Clock size={18} className="mr-2" />
                Upcoming Deadlines
              </h3>
              <ul className="space-y-2 text-sm">
                <motion.li 
                  whileHover={{ scale: 1.03 }}
                  className="p-2 bg-red-50 rounded-md border-l-4 border-red-500"
                >
                  <p className="font-medium">Assignment 1</p>
                  <p className="text-gray-600">Due in 3 days</p>
                </motion.li>
                <motion.li 
                  whileHover={{ scale: 1.03 }}
                  className="p-2 bg-yellow-50 rounded-md border-l-4 border-yellow-500"
                >
                  <p className="font-medium">Quiz: Introduction to Programming</p>
                  <p className="text-gray-600">Due in 7 days</p>
                </motion.li>
              </ul>
            </div>
          </div>

          <div className="md:flex-1">
            {/* <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-gradient-to-r from-blue-500 to-purple-600 shadow-md rounded-lg p-4 text-white mb-6"
            >
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-lg font-bold mb-1">Your Progress</h2>
                  <p>You're making steady progress! Keep going!</p>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold">14%</div>
                  <div className="text-sm">Course Completion</div>
                </div>
              </div>
            </motion.div> */}

            <AnimatePresence>
              {filteredUnits.map((unit, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ 
                    opacity: 1, 
                    y: 0,
                    scale: hoveredUnit === index ? 1.02 : 1
                  }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ 
                    delay: index * 0.1,
                    type: "spring",
                    stiffness: 100,
                    damping: 12
                  }}
                  onHoverStart={() => setHoveredUnit(index)}
                  onHoverEnd={() => setHoveredUnit(null)}
                  className={`transition-all duration-300 ${
                    focusMode && hoveredUnit !== index ? 'opacity-50' : 'opacity-100'
                  }`}
                >
                  <div
                    className={`
                      bg-white shadow-md rounded-lg overflow-hidden mb-6 border-l-4
                      ${unit.progress > 0 ? 'border-green-500' : 'border-blue-500'}
                      ${activeUnit === index ? 'ring-2 ring-blue-300' : ''}
                    `}
                  >
                    <div className="p-5">
                      <div className="flex items-center justify-between mb-3">
                        <h2 className="text-xl font-bold text-gray-800">{unit.title}</h2>
                        <div className="flex items-center">
                          <div className="flex items-center mr-4 text-sm bg-gray-100 px-2 py-1 rounded">
                            <Clock size={14} className="text-gray-500 mr-1" />
                            {unit.estimatedTime}
                          </div>
                          <div className="flex items-center text-sm bg-gray-100 px-2 py-1 rounded">
                            <Award size={14} className="text-gray-500 mr-1" />
                            {unit.difficulty}
                          </div>
                        </div>
                      </div>

                      {unit.progress > 0 && (
                        <div className="mb-4">
                          <div className="flex justify-between text-sm text-gray-600 mb-1">
                            <span>Progress</span>
                            <span>{unit.progress}%</span>
                          </div>
                          {renderProgressBar(unit.progress)}
                        </div>
                      )}

                      <div className="bg-gray-50 p-3 rounded-md mb-4">
                        <h3 className="font-medium text-gray-700 mb-2">Topics Covered:</h3>
                        <ul className="space-y-2">
                          {unit.description.map((desc, i) => (
                            <li key={i} className="flex items-start">
                              <div className="h-5 w-5 flex-shrink-0 rounded-full bg-blue-100 text-blue-500 flex items-center justify-center mr-2 mt-0.5">
                                {i + 1}
                              </div>
                              <span className="text-gray-600">{desc}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="flex flex-wrap space-x-3">
                        {unit.progress > 0 ? (
                          <motion.button 
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => navigate('/my-learning/my-course/course-content')}
                            className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors flex items-center"
                          >
                            <BookOpen size={18} className="mr-2" />
                            Resume
                          </motion.button>
                        ) : (
                          <motion.button 
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => navigate('/my-learning/my-course/course-content')}
                            className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 transition-colors flex items-center"
                          >
                            <BookOpen size={18} className="mr-2" />
                            Start Learning
                          </motion.button>
                        )}
                        
                        {/* <motion.button 
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="border border-gray-300 text-gray-600 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors"
                        >
                          View Details
                        </motion.button> */}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-white shadow-md rounded-lg overflow-hidden mb-6 border-l-4 border-orange-500"
            >
              <div className="p-5">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <div className="p-2 rounded-md bg-orange-100 text-orange-500 mr-4">
                      <UploadCloud size={24} />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-gray-800">Assignment 1</h3>
                      <p className="text-red-500 text-sm">Due in 3 days</p>
                    </div>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => navigate('/assignments/submit-assignment')}
                    className={`px-6 py-2 rounded-lg ${
                      assignmentUploaded
                        ? "bg-green-500 text-white"
                        : "bg-orange-500 text-white hover:bg-orange-600"
                    }`}
                  >
                    {assignmentUploaded ? "Submitted" : "Submit Now"}
                  </motion.button>
                </div>
                <div className="bg-orange-50 p-3 rounded-md">
                  <p className="text-gray-700">
                    Complete the Programming Fundamentals worksheet and submit your answers in a PDF file. 
                    This assignment is worth 15% of your final grade.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
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
            Try completing one section of the current unit before taking a short break. Small steps lead to big progress!
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default MyCoursePage;