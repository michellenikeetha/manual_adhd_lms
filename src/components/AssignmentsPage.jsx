import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import AssignmentCard from './AssignmentCard';
import SignedInNavbar from './SignedInNavbar';
import { 
  Calendar,
  Clock,
  CheckSquare,
  Filter,
  Sun,
  Moon,
  Eye,
  EyeOff
} from 'lucide-react';

const assignments = [
  {
    title: "Assignment 2 is Due",
    dueDate: "Sunday, 8 September",
    time: "11:59 PM",
    courseCode: "IS4108",
    courseName: "Natural Language Processing"
  },
  {
    title: "Assignment 3 is Due",
    dueDate: "Sunday, 8 September",
    time: "11:59 PM",
    courseCode: "IS4109",
    courseName: "Cognitive Robotics"
  },
  {
    title: "Assignment 4 is Due",
    dueDate: "Sunday, 8 September",
    time: "11:59 PM",
    courseCode: "IS4102",
    courseName: "Advanced Software Quality Assurance"
  }
];

const AssignmentsPage = () => {
  const [focusMode, setFocusMode] = useState(false);
  const [colorMode, setColorMode] = useState('light');
  const [hoveredAssignment, setHoveredAssignment] = useState(null);
  const [filterVisible, setFilterVisible] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState('all');

  const courses = [...new Set(assignments.map(a => a.courseCode))];

  const filteredAssignments = selectedCourse === 'all' 
    ? assignments 
    : assignments.filter(a => a.courseCode === selectedCourse);

  const getBackgroundColor = () => {
    if (colorMode === 'light') return focusMode ? 'bg-gray-100' : 'bg-white';
    return focusMode ? 'bg-gray-900' : 'bg-gray-800';
  };

  const getTextColor = () => {
    return colorMode === 'light' ? 'text-gray-900' : 'text-white';
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${getBackgroundColor()} ${getTextColor()}`}>
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
              onClick={() => setColorMode(colorMode === 'light' ? 'dark' : 'light')}
              className="p-2 rounded-lg bg-gray-200 dark:bg-gray-700"
            >
              {colorMode === 'light' ? <Moon size={20} /> : <Sun size={20} />}
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
              <div className="p-4 bg-blue-50 dark:bg-gray-700 rounded-lg">
                <h3 className="font-semibold mb-2">Filter by Course</h3>
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => setSelectedCourse('all')}
                    className={`px-3 py-1 rounded-full text-sm transition-colors
                      ${selectedCourse === 'all' ? 'bg-blue-500 text-white' : 'bg-white dark:bg-gray-600'}`}
                  >
                    All
                  </button>
                  {courses.map(course => (
                    <button
                      key={course}
                      onClick={() => setSelectedCourse(course)}
                      className={`px-3 py-1 rounded-full text-sm transition-colors
                        ${selectedCourse === course ? 'bg-blue-500 text-white' : 'bg-white dark:bg-gray-600'}`}
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
            {filteredAssignments.map((assignment, index) => (
              <motion.div
                key={assignment.courseCode}
                initial={{ opacity: 0, y: 20 }}
                animate={{ 
                  opacity: 1, 
                  y: 0,
                  scale: hoveredAssignment === index ? 1.02 : 1
                }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ delay: index * 0.1 }}
                onHoverStart={() => setHoveredAssignment(index)}
                onHoverEnd={() => setHoveredAssignment(null)}
                className={`transition-all duration-300 ${
                  focusMode && hoveredAssignment !== index ? 'opacity-50' : 'opacity-100'
                }`}
              >
                <AssignmentCard 
                  assignment={assignment}
                  colorMode={colorMode}
                />
              </motion.div>
            ))}
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
    </div>
  );
};

export default AssignmentsPage;