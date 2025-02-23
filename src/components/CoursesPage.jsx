import React, { useState } from 'react';
import SignedInNavbar from './SignedInNavbar';
import AvailableCoursesSection from './AvailableCoursesSection';
import EnrolledCoursesSection from './EnrolledCoursesSection';
import { motion } from 'framer-motion';
import { Eye, EyeOff } from 'lucide-react';
import course1Image from '../assets/c1.jfif';
import course2Image from '../assets/c2.jfif';
import course3Image from '../assets/c3.jfif';
import course4Image from '../assets/c4.jfif';
import course5Image from '../assets/c5.jpg';
import course6Image from '../assets/c6.jfif';
import course7Image from '../assets/c7.jfif';
import course8Image from '../assets/c8.jfif';
import course9Image from '../assets/c9.jfif';

const CoursesPage = () => {
  const [focusMode, setFocusMode] = useState(false);
  const [hoveredCourse, setHoveredCourse] = useState(null);

  const availableCourses = [
    { id: 1, title: 'IS4101 Final Year Project in Information Systems', semester: 'Semester I', imageUrl: course1Image }, 
    { id: 2, title: 'IS4102 Advanced Software Quality Assurance', semester: 'Semester I', imageUrl: course2Image },
    { id: 3, title: 'IS4103 Research Seminar', semester: 'Semester I', imageUrl: course3Image },
    { id: 4, title: 'IS4109 Cognitive Robotics', semester: 'Semester I', imageUrl: course9Image }
  ];

  const enrolledCourses = [
    { id: 5, title: 'IS4104 Natural Language Processing', semester: 'Semester I', progress: 66, imageUrl: course4Image },
    { id: 6, title: 'IS4107 Computational Biology', semester: 'Semester I', progress: 100, imageUrl: course7Image },
    { id: 7, title: 'IS4108 Business Information Systems', semester: 'Semester I', progress: 71, imageUrl: course8Image },
    { id: 8, title: 'IS4105 Advanced Concepts in Software Design', semester: 'Semester I', progress: 60, imageUrl: course5Image },
    { id: 9, title: 'IS4106 Data Analytics', semester: 'Semester I', progress: 43, imageUrl: course6Image }
  ];

  const getBackgroundColor = () => {
    return focusMode ? 'bg-gray-100' : 'bg-white';
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${getBackgroundColor()}`}>
      <SignedInNavbar />
      <div className="container mx-auto px-6 py-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 space-y-4 md:space-y-0">
          <h1 className="text-3xl font-bold">Courses</h1>
          
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

        <div className={`space-y-8 transition-opacity duration-300 ${
          focusMode && hoveredCourse === null ? 'opacity-50' : 'opacity-100'
        }`}>
          <motion.div
            onHoverStart={() => setHoveredCourse('available')}
            onHoverEnd={() => setHoveredCourse(null)}
          >
            <AvailableCoursesSection availableCourses={availableCourses} />
          </motion.div>

          <motion.div
            onHoverStart={() => setHoveredCourse('enrolled')}
            onHoverEnd={() => setHoveredCourse(null)}
          >
            <EnrolledCoursesSection enrolledCourses={enrolledCourses} />
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
              Consider your learning goals and prioritize courses that align with your career aspirations.
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default CoursesPage;
