import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import logo from '../assets/logo.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faBell, 
  faComment, 
  faCheckCircle, 
  faFlag, 
  faPlus, 
  faUser,
  faHome,
  faBook,
  faGraduationCap,
  faCalendar,
  faClipboard,
  faBullhorn,
  faSignOutAlt
} from '@fortawesome/free-solid-svg-icons';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const navItems = [
    { path: '/', icon: faHome, label: 'Home' },
    { path: '/my-learning', icon: faBook, label: 'My Learning' },
    { path: '/courses', icon: faGraduationCap, label: 'Courses' },
    { path: '/calendar', icon: faCalendar, label: 'Calendar' },
    { path: '/assignments', icon: faClipboard, label: 'Assignments' },
    { path: '/announcements', icon: faBullhorn, label: 'Announcements' },
  ];

  const notifications = [
    { 
      id: 1, 
      icon: faComment, 
      text: "Selena comments on your posts about Algorithm tasks", 
      time: "20 minutes ago", 
      color: "text-blue-600",
      bgColor: "bg-blue-50" 
    },
    { 
      id: 2, 
      icon: faCheckCircle, 
      text: "Well done! You have submitted your tasks of JavaScript 1", 
      time: "Yesterday", 
      color: "text-green-600",
      bgColor: "bg-green-50"
    },
    { 
      id: 3, 
      icon: faFlag, 
      text: "Your task is overdue for 13 hours and 25 minutes", 
      time: "23 August 2024", 
      color: "text-red-600",
      bgColor: "bg-red-50"
    },
    { 
      id: 4, 
      icon: faPlus, 
      text: "Mr. Dika added a new quiz and tasks on the PHP course", 
      time: "28 September 2024", 
      color: "text-yellow-600",
      bgColor: "bg-yellow-50"
    },
  ];

  // Logout handler
  const handleLogout = () => {
    // Here you would typically:
    // 1. Clear authentication token
    // 2. Clear user session
    // 3. Reset any global state
    localStorage.removeItem('authToken'); // Example of removing auth token
    
    // Redirect to login page
    navigate('/login');
  };

  return (
    <nav className="bg-white shadow-lg py-4 sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center px-6">
        <motion.div 
          className="flex items-center space-x-3"
          whileHover={{ scale: 1.05 }}
        >
          <img src={logo} alt="Logo" className="w-10 h-10" /> 
          <span className="text-2xl font-bold text-blue-600">EduLearn</span>
        </motion.div>

        <div className="flex space-x-2">
          {navItems.map((item) => (
            <motion.div
              key={item.path}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                to={item.path}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors duration-200
                  ${location.pathname === item.path 
                    ? 'bg-blue-100 text-blue-700 font-medium' 
                    : 'text-gray-600 hover:bg-gray-100'}`}
              >
                <FontAwesomeIcon icon={item.icon} className="text-lg" />
                <span>{item.label}</span>
              </Link>
            </motion.div>
          ))}
        </div>

        <div className="flex space-x-4 items-center">
          <motion.button
            onClick={() => setShowDropdown(!showDropdown)}
            className={`relative p-2 rounded-lg transition-colors duration-200
              ${showDropdown ? 'bg-blue-100' : 'hover:bg-gray-100'}`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <FontAwesomeIcon icon={faBell} className="text-gray-700 text-lg" />
            <span className="absolute top-1 right-1 h-3 w-3 bg-red-500 rounded-full animate-pulse"></span>
          </motion.button>

          <AnimatePresence>
            {showDropdown && (
              <motion.div
                className="absolute right-4 top-full mt-2 w-96 bg-white rounded-lg shadow-xl border border-gray-100 overflow-hidden"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
              >
                <div className="p-2">
                  {notifications.map((notification) => (
                    <motion.div
                      key={notification.id}
                      className={`flex items-start space-x-4 p-3 rounded-lg mb-2 cursor-pointer
                        ${notification.bgColor} hover:brightness-95 transition-all`}
                      whileHover={{ scale: 1.02 }}
                    >
                      <div className={`${notification.color} p-2 rounded-full bg-white`}>
                        <FontAwesomeIcon
                          icon={notification.icon}
                          className="text-lg"
                        />
                      </div>
                      <div>
                        <p className="text-gray-700 text-sm font-medium">{notification.text}</p>
                        <p className="text-gray-500 text-xs mt-1">{notification.time}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="flex space-x-2">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link 
                to="/profile" 
                className="bg-blue-50 text-blue-700 py-2 px-4 rounded-lg flex items-center space-x-2 hover:bg-blue-100 transition-colors duration-200"
              >
                <FontAwesomeIcon icon={faUser} />
                <span className="font-medium">Profile</span>
              </Link>
            </motion.div>

            <motion.button
              onClick={handleLogout}
              className="bg-red-50 text-red-700 py-2 px-4 rounded-lg flex items-center space-x-2 hover:bg-red-100 transition-colors duration-200"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FontAwesomeIcon icon={faSignOutAlt} />
              <span className="font-medium">Logout</span>
            </motion.button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;