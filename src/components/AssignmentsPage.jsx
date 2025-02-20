import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import SignedInNavbar from './SignedInNavbar';
import { 
  Calendar,
  Clock,
  BookOpen,
  Filter,
  Eye,
  EyeOff,
  FileText,
  AlertCircle,
  CheckSquare,
  ArrowUpRight
} from 'lucide-react';

const AssignmentsPage = () => {
  const navigate = useNavigate();
  const [focusMode, setFocusMode] = useState(false);
  const [hoveredAssignment, setHoveredAssignment] = useState(null);
  const [filterVisible, setFilterVisible] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState('all');

  const assignments = [
    {
      id: 1,
      title: "Assignment 2 is Due",
      dueDate: "Sunday, 8 September",
      time: "11:59 PM",
      courseCode: "IS4108",
      courseName: "Natural Language Processing",
      daysRemaining: 4
    },
    {
      id: 2,
      title: "Assignment 3 is Due",
      dueDate: "Sunday, 8 September",
      time: "11:59 PM",
      courseCode: "IS4109",
      courseName: "Cognitive Robotics",
      daysRemaining: 2
    },
    {
      id: 3,
      title: "Assignment 4 is Due",
      dueDate: "Sunday, 8 September",
      time: "11:59 PM",
      courseCode: "IS4102",
      courseName: "Advanced Software Quality Assurance",
      daysRemaining: 7
    }
  ];

  const courses = [...new Set(assignments.map(a => a.courseCode))];

  const filteredAssignments = selectedCourse === 'all' 
    ? assignments 
    : assignments.filter(a => a.courseCode === selectedCourse);

  const getBackgroundColor = () => {
    return focusMode ? 'bg-gray-100' : 'bg-white';
  };

  const getPriorityIndicator = (daysRemaining) => {
    if (daysRemaining <= 2) return { color: 'border-red-500', status: 'Urgent', bgColor: 'bg-red-100', textColor: 'text-red-800' };
    if (daysRemaining <= 5) return { color: 'border-yellow-500', status: 'Soon', bgColor: 'bg-yellow-100', textColor: 'text-yellow-800' };
    return { color: 'border-blue-500', status: 'Upcoming', bgColor: 'bg-blue-100', textColor: 'text-blue-800' };
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${getBackgroundColor()}`}>
      <SignedInNavbar />
      <div className="container mx-auto px-6 py-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 space-y-4 md:space-y-0">
          <h1 className="text-3xl font-bold">Assignments</h1>
          
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
              const priority = getPriorityIndicator(assignment.daysRemaining);
              
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
                  <div className={`bg-white p-6 rounded-lg shadow-lg flex flex-col md:flex-row justify-between border-l-4 ${priority.color}`}>
                    <div className="flex-1">
                      <div className="flex items-start">
                        <FileText className="text-blue-500 mt-1 mr-2" size={20} />
                        <div>
                          <h2 className="text-xl font-bold">{assignment.title}</h2>
                          <div className="flex items-center">
                            <BookOpen size={16} className="text-gray-500 mr-1" />
                            <p className="text-gray-600 text-sm">{assignment.courseCode} - {assignment.courseName}</p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="mt-4 space-y-2">
                        <div className="flex items-center text-gray-700">
                          <Calendar size={16} className="mr-2" />
                          <span className="font-semibold mr-1">Due Date:</span>
                          {assignment.dueDate}, <Clock size={16} className="mx-2" /> {assignment.time}
                        </div>
                        
                        <div className="flex items-center text-gray-700">
                          <AlertCircle size={16} className="mr-2" />
                          <span className="font-semibold mr-1">Status:</span>
                          <span className={`ml-1 text-sm rounded-full px-2 py-0.5 ${priority.bgColor} ${priority.textColor}`}>
                            {priority.status} ({assignment.daysRemaining} days left)
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-4 md:mt-0 flex items-center">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => navigate('/assignments/submit-assignment')}
                        className="bg-blue-500 text-white py-2 px-6 rounded-full hover:bg-blue-600 transition-colors flex items-center space-x-2"
                      >
                        <ArrowUpRight size={16} />
                        <span>Submit</span>
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
            href="/submitted-assignments" 
            className="inline-flex items-center space-x-2 text-blue-500 hover:text-blue-600 transition-colors"
          >
            <CheckSquare size={20} />
            <span>See Submitted Assignments</span>
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
            Break down each assignment into smaller tasks. Which one can you start on today?
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default AssignmentsPage;