import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell, faComment, faCheckCircle, faFlag, faPlus, faUser } from '@fortawesome/free-solid-svg-icons';
import { motion } from 'framer-motion';

const Navbar = () => {
  const [showDropdown, setShowDropdown] = useState(false);

  const notifications = [
    { id: 1, icon: faComment, text: "Selena comments on your posts about Algorithm tasks", time: "20 minutes ago", color: "text-blue-600" },
    { id: 2, icon: faCheckCircle, text: "Well done! You have submitted your tasks of JavaScript 1", time: "Yesterday", color: "text-green-600" },
    { id: 3, icon: faFlag, text: "Your task is overdue for 13 hours and 25 minutes", time: "23 August 2024", color: "text-red-600" },
    { id: 4, icon: faPlus, text: "Mr. Dika added a new quiz and tasks on the PHP course", time: "28 September 2024", color: "text-yellow-600" },
  ];

  return (
    <nav className="bg-white shadow-md py-4 relative">
      <div className="container mx-auto flex justify-between items-center px-6">
        <div className="flex items-center space-x-2">
          <img src={logo} alt="Logo" className="w-8 h-8" /> 
          <span className="text-2xl font-bold text-blue-600">EduLearn</span>
        </div>

        <div className="flex space-x-6">
          <Link to="/" className="text-gray-700 hover:text-blue-600">Home</Link>
          <Link to="/my-learning" className="text-gray-700 hover:text-blue-600">My Learning</Link>
          <Link to="/courses" className="text-gray-700 hover:text-blue-600">Courses</Link>
          <Link to="/calendar" className="text-gray-700 hover:text-blue-600">Calendar</Link>
          <Link to="/assignments" className="text-gray-700 hover:text-blue-600">Assignments</Link>
          <Link to="/announcements" className="text-gray-700 hover:text-blue-600">Announcements</Link>
        </div>

        <div className="flex space-x-6 items-center relative">
          <button
            onClick={() => setShowDropdown(!showDropdown)}
            className="relative z-10"
          >
            <FontAwesomeIcon icon={faBell} className="text-gray-700 text-lg" />
            <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full"></span>
          </button>

          {showDropdown && (
            <motion.div
              className="absolute right-0 top-full mt-2 w-80 bg-white shadow-lg rounded-lg z-50"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <div className="p-4">
                {notifications.map((notification) => (
                  <div key={notification.id} className="flex items-start space-x-4 mb-4">
                    <FontAwesomeIcon
                      icon={notification.icon}
                      className={`${notification.color} text-lg flex-shrink-0`}
                    />
                    <div>
                      <p className="text-gray-700 text-sm">{notification.text}</p>
                      <p className="text-gray-400 text-xs">{notification.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          <Link to="/profile" className="bg-gray-100 text-gray-700 py-2 px-4 rounded-lg flex items-center space-x-2">
            <FontAwesomeIcon icon={faUser} className="text-gray-700" />
            <span>Profile</span>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
