// components/AnnouncementDetail.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Calendar, 
  Clock, 
  Users, 
  BookOpen, 
  Target, 
  Layout, 
  Phone,
  ChevronUp,
  ChevronDown,
  CheckCircle,
  ArrowLeft,
  Star,
  Eye,
  EyeOff,
  Check,
  AlertCircle
} from 'lucide-react';
import SignedInNavbar from './SignedInNavbar';

const AnnouncementDetail = () => {
  const [readSections, setReadSections] = useState(new Set());
  const [expandedSection, setExpandedSection] = useState('overview');
  const [focusMode, setFocusMode] = useState(false);
  const [enrolled, setEnrolled] = useState(false);
  const [enrolling, setEnrolling] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  const markAsRead = (section) => {
    setReadSections(prev => new Set([...prev, section]));
  };

  const handleEnroll = () => {
    if (enrolled) return;
    
    setEnrolling(true);
    
    // Simulate enrollment process
    setTimeout(() => {
      setEnrolling(false);
      setEnrolled(true);
      setShowConfetti(true);
      
      // Hide confetti after 5 seconds
      setTimeout(() => {
        setShowConfetti(false);
      }, 5000);
    }, 1500);
  };

  const Section = ({ id, title, children }) => {
    const isExpanded = expandedSection === id;
    const isRead = readSections.has(id);

    return (
      <div 
        className={`mb-6 bg-white rounded-lg shadow-sm transition-all duration-200
          ${isExpanded ? 'ring-2 ring-blue-400 shadow-lg' : 'hover:shadow-md'}
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
      <div className="rounded-full bg-blue-50 p-2 mt-1">
        <Icon className="text-blue-500" size={20} />
      </div>
      <div>
        <h4 className="font-semibold mb-1">{title}</h4>
        {children}
      </div>
    </div>
  );

  // Confetti component
  const Confetti = () => {
    const confettiColors = ['#FFC700', '#FF0055', '#2BD1FC', '#F19CFF', '#00C2A8'];
    const confettiCount = 150;
    
    return (
      <div className="fixed inset-0 pointer-events-none z-50">
        {[...Array(confettiCount)].map((_, i) => {
          const size = Math.random() * 12 + 4;
          const left = Math.random() * 100;
          const animDuration = Math.random() * 3 + 2;
          const animDelay = Math.random() * 0.5;
          const color = confettiColors[Math.floor(Math.random() * confettiColors.length)];
          
          return (
            <motion.div
              key={i}
              initial={{ 
                top: "-10%", 
                left: `${left}%`, 
                width: size, 
                height: size * 3, 
                opacity: 1, 
                rotate: Math.random() * 360 
              }}
              animate={{ 
                top: "100%", 
                opacity: 0,
                rotate: Math.random() * 360 + 180 
              }}
              transition={{ 
                duration: animDuration, 
                delay: animDelay,
                ease: "linear" 
              }}
              style={{ 
                position: 'absolute', 
                backgroundColor: color,
                borderRadius: '2px' 
              }}
            />
          );
        })}
      </div>
    );
  };

  return (
    <div className={`min-h-screen ${focusMode ? 'bg-gray-100' : 'bg-gray-50'}`}>
      <SignedInNavbar />
      
      {showConfetti && <Confetti />}
      
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
            <h1 className="text-3xl font-bold">New Course: AI for Everyone</h1>
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
            <Section id="overview" title="Course Overview">
              <p className="text-lg leading-relaxed">
                The "AI for Everyone" course is designed to demystify Artificial Intelligence 
                and make it accessible to beginners with no prior experience. This course will 
                cover the basics of AI, including key concepts, applications, and the potential 
                impact of AI in various industries.
              </p>
            </Section>

            <Section id="learning" title="What You Will Learn">
              <div className="space-y-4">
                <KeyPoint icon={BookOpen} title="Core Concepts">
                  <p>Introduction to AI and its importance in today's world</p>
                </KeyPoint>
                <KeyPoint icon={Target} title="Practical Knowledge">
                  <p>Understanding how AI works through real-world examples</p>
                </KeyPoint>
                <KeyPoint icon={Layout} title="Key Areas">
                  <ul className="list-disc list-inside ml-4 space-y-2">
                    <li>Machine learning fundamentals</li>
                    <li>Natural language processing</li>
                    <li>Computer vision applications</li>
                  </ul>
                </KeyPoint>
              </div>
            </Section>

            <Section id="audience" title="Who Should Attend">
              <div className="space-y-4">
                <KeyPoint icon={Users} title="Target Audience">
                  <ul className="list-disc list-inside ml-4 space-y-2">
                    <li>Beginners with no prior knowledge of AI</li>
                    <li>Professionals looking to understand AI fundamentals</li>
                    <li>Students interested in exploring AI as a career option</li>
                    <li>Anyone curious about the impact of AI on the future</li>
                  </ul>
                </KeyPoint>
              </div>
            </Section>

            <Section id="format" title="Course Format">
              <KeyPoint icon={Layout} title="Delivery Method">
                <p>
                  The course will be delivered online through a series of:
                  <ul className="list-disc list-inside ml-4 mt-2 space-y-2">
                    <li>Interactive video lectures</li>
                    <li>Hands-on exercises</li>
                    <li>Real-time quizzes</li>
                    <li>Community discussions</li>
                  </ul>
                </p>
              </KeyPoint>
            </Section>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-6">
              <h3 className="text-xl font-bold mb-4">Quick Information</h3>
              
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Calendar className="text-blue-500" size={20} />
                  <div>
                    <p className="font-semibold">Start Date</p>
                    <p>January 11, 2024</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <Clock className="text-blue-500" size={20} />
                  <div>
                    <p className="font-semibold">Duration</p>
                    <p>8 weeks</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <Star className="text-blue-500" size={20} />
                  <div>
                    <p className="font-semibold">Fee</p>
                    <p>Free</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <Phone className="text-blue-500" size={20} />
                  <div>
                    <p className="font-semibold">Contact</p>
                    <p>+94 71-234-5678</p>
                    <p>+94 77-123-4567</p>
                  </div>
                </div>

                <motion.button
                  onClick={handleEnroll}
                  disabled={enrolling || enrolled}
                  whileHover={!enrolled && !enrolling ? { scale: 1.05 } : {}}
                  whileTap={!enrolled && !enrolling ? { scale: 0.95 } : {}}
                  className={`w-full py-3 px-4 rounded-lg flex items-center justify-center transition-all duration-300 ${
                    enrolled 
                      ? 'bg-green-500 text-white' 
                      : enrolling 
                        ? 'bg-blue-300 text-white cursor-wait' 
                        : 'bg-blue-500 text-white hover:bg-blue-600'
                  }`}
                >
                  {enrolled ? (
                    <>
                      <Check className="mr-2" size={20} />
                      Enrolled Successfully
                    </>
                  ) : enrolling ? (
                    <>
                      <div className="animate-spin h-5 w-5 mr-2 border-2 border-white border-t-transparent rounded-full"></div>
                      Enrolling...
                    </>
                  ) : (
                    'Enroll Now'
                  )}
                </motion.button>
              </div>
            </div>
          </div>
        </div>
        
        <AnimatePresence>
          {enrolled && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="fixed bottom-6 right-6 bg-white p-4 rounded-lg shadow-lg max-w-md border-l-4 border-green-500"
            >
              <div className="flex items-start">
                <div className="bg-green-100 rounded-full p-2 mr-3">
                  <CheckCircle className="text-green-500" size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-1">Successfully Enrolled!</h3>
                  <p className="text-gray-600 mb-2">
                    You have successfully enrolled in "AI for Everyone". The course will begin on January 11, 2024.
                  </p>
                  <div className="flex items-center text-blue-500">
                    <AlertCircle size={16} className="mr-1" />
                    <p className="text-sm">You will receive a confirmation email shortly.</p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
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
            Break down each section and take notes on the most important concepts.
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default AnnouncementDetail;