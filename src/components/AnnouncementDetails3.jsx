import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Calendar, 
  Clock, 
  Users, 
  Video,
  Target,
  MessageSquare,
  User,
  ChevronUp,
  ChevronDown,
  CheckCircle,
  ArrowLeft,
  Star,
  Eye,
  EyeOff
} from 'lucide-react';
import SignedInNavbar from './SignedInNavbar';
import RegistrationPopup from './RegistrationPopup'; // Import the new popup component

const WebinarDetail = () => {
  const [readSections, setReadSections] = useState(new Set());
  const [expandedSection, setExpandedSection] = useState('overview');
  const [focusMode, setFocusMode] = useState(false);
  const [isRegistrationPopupOpen, setIsRegistrationPopupOpen] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false);

  const markAsRead = (section) => {
    setReadSections(prev => new Set([...prev, section]));
  };

  const handleRegistrationSuccess = () => {
    setIsRegistered(true);
  };

  const Section = ({ id, title, children }) => {
    const isExpanded = expandedSection === id;
    const isRead = readSections.has(id);

    return (
      <div 
        id={id}
        className={`mb-6 bg-white rounded-lg shadow-sm transition-all duration-200
          ${isExpanded ? 'ring-2 ring-purple-400 shadow-lg' : 'hover:shadow-md'}
          ${focusMode && !isExpanded ? 'opacity-50' : 'opacity-100'}
        `}
      >
        <button
          onClick={() => {
            setExpandedSection(isExpanded ? null : id);
            if (!isRead) markAsRead(id);
          }}
          className="w-full px-6 py-4 flex items-center justify-between text-left"
        >
          <div className="flex items-center space-x-3">
            <h3 className="text-xl font-bold">{title}</h3>
            {isRead && <CheckCircle className="text-green-500" size={20} />}
          </div>
          {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </button>
        
        {isExpanded && (
          <div className="px-6 pb-4 animate-fadeIn">
            {children}
          </div>
        )}
      </div>
    );
  };

  const KeyPoint = ({ icon: Icon, title, children }) => (
    <div className="flex items-start space-x-3 mb-4">
      <div className="rounded-full bg-purple-50 p-2 mt-1">
        <Icon className="text-purple-500" size={20} />
      </div>
      <div>
        <h4 className="font-semibold mb-1">{title}</h4>
        {children}
      </div>
    </div>
  );

  return (
    <div className={`min-h-screen ${focusMode ? 'bg-gray-100' : 'bg-gray-50'}`}>
      <style jsx>{`
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-in;
        }
        
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `}</style>
      
      <SignedInNavbar />
      
      <RegistrationPopup 
        isOpen={isRegistrationPopupOpen} 
        onClose={() => setIsRegistrationPopupOpen(false)}
        onSuccess={handleRegistrationSuccess}
      />
      
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <Link 
              to="/announcements"
              className="flex items-center text-gray-600 hover:text-gray-800"
            >
              <ArrowLeft className="mr-2" size={20} />
              Back to Announcements
            </Link>
            <h1 className="text-3xl font-bold">Webinar: Future of Tech</h1>
          </div>
          
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

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <Section id="overview" title="Webinar Overview">
              <p className="text-lg leading-relaxed">
                Join us for an insightful discussion on the future of technology 
                and its transformative impact on education. Our panel of experts 
                will explore emerging trends, challenges, and opportunities in 
                the rapidly evolving EdTech landscape.
              </p>
            </Section>

            <Section id="speakers" title="Featured Speakers">
              <div className="space-y-4">
                <KeyPoint icon={User} title="Dr. Sarah Chen">
                  <p>Chief AI Officer at EdTech Solutions</p>
                  <p className="text-sm text-gray-600">Expert in AI applications in education</p>
                </KeyPoint>
                <KeyPoint icon={User} title="Prof. Michael Rodriguez">
                  <p>Director of Digital Transformation, Tech University</p>
                  <p className="text-sm text-gray-600">Specialist in educational technology integration</p>
                </KeyPoint>
                <KeyPoint icon={User} title="Ms. Emily Watson">
                  <p>Founder, Future Learning Initiative</p>
                  <p className="text-sm text-gray-600">Pioneer in digital learning solutions</p>
                </KeyPoint>
              </div>
            </Section>

            <Section id="topics" title="Key Topics">
              <div className="space-y-4">
                <KeyPoint icon={Target} title="Discussion Areas">
                  <ul className="list-disc list-inside ml-4 space-y-2">
                    <li>AI in Education: Current Trends and Future Possibilities</li>
                    <li>Digital Transformation of Learning Environments</li>
                    <li>Emerging EdTech Technologies</li>
                    <li>Challenges and Opportunities in Digital Education</li>
                  </ul>
                </KeyPoint>
              </div>
            </Section>

            <Section id="format" title="Webinar Format">
              <div className="space-y-4">
                <KeyPoint icon={Video} title="Session Structure">
                  <ul className="list-disc list-inside ml-4 space-y-2">
                    <li>Expert presentations (45 minutes)</li>
                    <li>Panel discussion (30 minutes)</li>
                    <li>Q&A session (15 minutes)</li>
                  </ul>
                </KeyPoint>
                <KeyPoint icon={MessageSquare} title="Interactive Elements">
                  <p>Live polling, chat functionality, and direct Q&A opportunities with speakers</p>
                </KeyPoint>
              </div>
            </Section>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-6">
              <h3 className="text-xl font-bold mb-4">Quick Information</h3>
              
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Calendar className="text-purple-500" size={20} />
                  <div>
                    <p className="font-semibold">Date</p>
                    <p>August 20, 2024</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <Clock className="text-purple-500" size={20} />
                  <div>
                    <p className="font-semibold">Duration</p>
                    <p>90 minutes</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <Users className="text-purple-500" size={20} />
                  <div>
                    <p className="font-semibold">Capacity</p>
                    <p>Limited to 500 participants</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <Star className="text-purple-500" size={20} />
                  <div>
                    <p className="font-semibold">Certificate</p>
                    <p>Attendance certificate provided</p>
                  </div>
                </div>

                <div className="mt-6 p-4 bg-purple-50 rounded-lg">
                  <p className="text-sm text-purple-800">
                    Registration is required. Secure your spot early as spaces are limited.
                  </p>
                </div>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setIsRegistrationPopupOpen(true)}
                  className="block w-full bg-purple-500 text-white text-center py-3 rounded-lg hover:bg-purple-600 transition-colors mt-6"
                >
                  Register Now
                </motion.button>

                {isRegistered && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg flex items-center"
                  >
                    <CheckCircle className="text-green-500 mr-2 flex-shrink-0" size={16} />
                    <p className="text-sm text-green-700">You're registered!</p>
                  </motion.div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WebinarDetail;