import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
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
  EyeOff,
  X,
  Mail,
  Check
} from 'lucide-react';
import SignedInNavbar from './SignedInNavbar';

const WebinarDetail = () => {
  const [readSections, setReadSections] = useState(new Set());
  const [expandedSection, setExpandedSection] = useState('overview');
  const [focusMode, setFocusMode] = useState(false);
  const [showRegistrationForm, setShowRegistrationForm] = useState(false);
  const [registrationStatus, setRegistrationStatus] = useState('idle'); // idle, submitting, success
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    organization: '',
    interests: []
  });
  
  const formRef = useRef(null);

  const markAsRead = (section) => {
    setReadSections(prev => new Set([...prev, section]));
  };

  const handleRegisterClick = () => {
    setShowRegistrationForm(true);
    setTimeout(() => {
      if (formRef.current) {
        formRef.current.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  const handleCloseForm = () => {
    setShowRegistrationForm(false);
    setRegistrationStatus('idle');
    setFormData({
      name: '',
      email: '',
      organization: '',
      interests: []
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCheckboxChange = (topic) => {
    setFormData(prev => {
      const newInterests = [...prev.interests];
      if (newInterests.includes(topic)) {
        return {
          ...prev,
          interests: newInterests.filter(item => item !== topic)
        };
      } else {
        return {
          ...prev,
          interests: [...newInterests, topic]
        };
      }
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setRegistrationStatus('submitting');
    
    // Simulate API call
    setTimeout(() => {
      setRegistrationStatus('success');
    }, 1500);
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

  const RegistrationForm = () => (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      ref={formRef}
      className="bg-white rounded-lg shadow-md p-6 mb-6 border-2 border-purple-200"
    >
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-bold">Register for Webinar</h3>
        <button 
          onClick={handleCloseForm}
          className="p-2 hover:bg-gray-100 rounded-full"
        >
          <X size={20} />
        </button>
      </div>

      {registrationStatus === 'success' ? (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-8"
        >
          <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
            <Check className="text-green-500" size={32} />
          </div>
          <h4 className="text-xl font-bold mb-2">Registration Successful!</h4>
          <p className="text-gray-600 mb-4">You're all set for the Future of Tech webinar.</p>
          <p className="text-gray-600">A confirmation email has been sent to your inbox with connection details.</p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleCloseForm}
            className="mt-6 px-6 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600"
          >
            Close
          </motion.button>
        </motion.div>
      ) : (
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-400 focus:border-transparent"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-400 focus:border-transparent"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">Topics of Interest (select all that apply)</label>
              <div className="space-y-2">
                {[
                  'AI in Education',
                  'Digital Transformation',
                  'EdTech Technologies',
                  'Digital Education Challenges'
                ].map(topic => (
                  <div key={topic} className="flex items-center">
                    <input
                      type="checkbox"
                      id={topic.replace(/\s+/g, '')}
                      checked={formData.interests.includes(topic)}
                      onChange={() => handleCheckboxChange(topic)}
                      className="w-4 h-4 text-purple-600 rounded focus:ring-purple-500"
                    />
                    <label htmlFor={topic.replace(/\s+/g, '')} className="ml-2 text-sm">{topic}</label>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="pt-2">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                disabled={registrationStatus === 'submitting'}
                type="submit"
                className={`w-full py-2 bg-purple-500 text-white rounded-md hover:bg-purple-600 flex justify-center items-center
                  ${registrationStatus === 'submitting' ? 'opacity-70 cursor-not-allowed' : ''}`}
              >
                {registrationStatus === 'submitting' ? (
                  <div className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Submitting...
                  </div>
                ) : (
                  'Complete Registration'
                )}
              </motion.button>
            </div>
          </div>
        </form>
      )}
    </motion.div>
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

        {showRegistrationForm && <RegistrationForm />}

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
                  onClick={handleRegisterClick}
                  className="block w-full bg-purple-500 text-white text-center py-3 rounded-lg hover:bg-purple-600 transition-colors mt-6"
                >
                  Register Now
                </motion.button>

                {registrationStatus === 'success' && (
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