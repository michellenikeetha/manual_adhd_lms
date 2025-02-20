import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import SignedInNavbar from './SignedInNavbar';
import { 
  Calendar,
  Clock,
  FileCheck,
  Filter,
  Eye,
  EyeOff,
  Edit,
  CheckCircle,
  BookOpen
} from 'lucide-react';

const SubmittedAssignments = () => {
  const navigate = useNavigate();
  const [focusMode, setFocusMode] = useState(false);
  const [hoveredAssignment, setHoveredAssignment] = useState(null);
  const [filterVisible, setFilterVisible] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState('all');

  const assignments = [
    {
      id: 1,
      title: 'Assignment 2 Submitted',
      dueDate: 'Sunday, 11 August',
      time: '11:59 PM',
      submittedDate: 'Friday, 9 August 2024',
      submittedTime: '12:39 PM',
      courseCode: 'IS4108',
      courseName: 'Natural Language Processing',
    },
    {
      id: 2,
      title: 'Assignment 3 Submitted',
      dueDate: 'Sunday, 18 August',
      time: '11:59 PM',
      submittedDate: 'Friday, 16 August 2024',
      submittedTime: '12:39 PM',
      courseCode: 'IS4109',
      courseName: 'Cognitive Robotics',
    },
    {
      id: 3,
      title: 'Assignment 4 Submitted',
      dueDate: 'Sunday, 25 August',
      time: '11:59 PM',
      submittedDate: 'Friday, 23 August 2024',
      submittedTime: '12:39 PM',
      courseCode: 'IS4102',
      courseName: 'Advanced Software Quality Assurance',
    },
  ];

  const courses = [...new Set(assignments.map(a => a.courseCode))];

  const filteredAssignments = selectedCourse === 'all' 
    ? assignments 
    : assignments.filter(a => a.courseCode === selectedCourse);

  const getBackgroundColor = () => {
    return focusMode ? 'bg-gray-100' : 'bg-white';
  };

  const calculateSubmissionTiming = (dueDate, submittedDate) => {
    if (dueDate.includes('11') && submittedDate.includes('9')) return 'early';
    if (dueDate.includes('18') && submittedDate.includes('16')) return 'early';
    if (dueDate.includes('25') && submittedDate.includes('23')) return 'early';
    return 'on-time';
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${getBackgroundColor()}`}>
      <SignedInNavbar />
      <div className="container mx-auto px-6 py-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 space-y-4 md:space-y-0">
          <h1 className="text-3xl font-bold">Submitted Assignments</h1>
          
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
                <h3 className="font-semibold mb-2">Filter by Course</h3>
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => setSelectedCourse('all')}
                    className={`px-3 py-1 rounded-full text-sm transition-colors
                      ${selectedCourse === 'all' ? 'bg-blue-500 text-white' : 'bg-white'}`}
                  >
                    All
                  </button>
                  {courses.map(course => (
                    <button
                      key={course}
                      onClick={() => setSelectedCourse(course)}
                      className={`px-3 py-1 rounded-full text-sm transition-colors
                        ${selectedCourse === course ? 'bg-blue-500 text-white' : 'bg-white'}`}
                    >
                      {course}
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="grid gap-6">
          <AnimatePresence>
            {filteredAssignments.map((assignment, index) => {
              const submissionTiming = calculateSubmissionTiming(
                assignment.dueDate,
                assignment.submittedDate
              );
              
              return (
                <motion.div
                  key={assignment.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ 
                    opacity: 1, 
                    y: 0,
                    scale: hoveredAssignment === index ? 1.02 : 1
                  }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ 
                    delay: index * 0.1,
                    type: "spring",
                    stiffness: 100,
                    damping: 12
                  }}
                  onHoverStart={() => setHoveredAssignment(index)}
                  onHoverEnd={() => setHoveredAssignment(null)}
                  className={`transition-all duration-300 ${
                    focusMode && hoveredAssignment !== index ? 'opacity-50' : 'opacity-100'
                  }`}
                >
                  <div className={`bg-green-100 p-6 rounded-lg shadow-lg flex flex-col md:flex-row justify-between ${
                    submissionTiming === 'early' ? 'border-l-4 border-green-500' : 'border-l-4 border-yellow-500'
                  }`}>
                    <div className="flex-1">
                      <div className="flex items-start">
                        <CheckCircle className="text-green-500 mt-1 mr-2" size={20} />
                        <div>
                          <h2 className="text-xl font-bold">{assignment.title}</h2>
                          <div className="flex items-center">
                            <BookOpen size={16} className="text-gray-500 mr-1" />
                            <p className="text-gray-600 text-sm">{assignment.courseCode} - {assignment.courseName}</p>
                          </div>                        </div>
                      </div>
                      
                      <div className="mt-4 space-y-2">
                        <div className="flex items-center text-gray-700">
                          <Calendar size={16} className="mr-2" />
                          <span className="font-semibold mr-1">Due Date:</span>
                          {assignment.dueDate}, <Clock size={16} className="mx-2" /> {assignment.time}
                        </div>
                        
                        <div className="flex items-center text-gray-700">
                          <FileCheck size={16} className="mr-2" />
                          <span className="font-semibold mr-1">Submitted:</span>
                          {assignment.submittedDate}, <Clock size={16} className="mx-2" /> {assignment.submittedTime}
                          <span className={`ml-2 text-sm rounded-full px-2 py-0.5 ${
                            submissionTiming === 'early' ? 'bg-green-200 text-green-800' : 'bg-yellow-200 text-yellow-800'
                          }`}>
                            {submissionTiming === 'early' ? 'Early' : 'On Time'}
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-4 md:mt-0 flex items-center">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => navigate('/submitted-assignments/edit-assignment')}
                        className="bg-blue-500 text-white py-2 px-6 rounded-full hover:bg-blue-600 transition-colors flex items-center space-x-2"
                      >
                        <Edit size={16} />
                        <span>Edit</span>
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-8 text-right"
        >
          <a 
            href="/assignments" 
            className="inline-flex items-center space-x-2 text-blue-500 hover:text-blue-600 transition-colors"
          >
            <Calendar size={20} />
            <span>See Pending Assignments</span>
          </a>
        </motion.div>
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
            Take a moment to celebrate your completed work. Each submission represents progress!
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default SubmittedAssignments;