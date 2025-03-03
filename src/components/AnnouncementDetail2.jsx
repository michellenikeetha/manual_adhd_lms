import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Calendar,
  Clock,
  AlertTriangle,
  Server,
  CheckSquare,
  Settings,
  ChevronUp,
  ChevronDown,
  CheckCircle,
  ArrowLeft,
  Globe,
  Eye,
  EyeOff
} from 'lucide-react';
import SignedInNavbar from './SignedInNavbar';

const MaintenanceDetail = () => {
  const [readSections, setReadSections] = useState(new Set());
  const [expandedSection, setExpandedSection] = useState('overview');
  const [focusMode, setFocusMode] = useState(false);
  const [showCompletionBadge, setShowCompletionBadge] = useState(false);
  const checklistRef = useRef(null);

  const markAsRead = (section) => {
    setReadSections(prev => new Set([...prev, section]));
  };

  const handleViewChecklist = () => {
    // Expand the checklist section
    setExpandedSection('checklist');
    markAsRead('checklist');
    
    // Scroll to the checklist section with smooth scrolling
    if (checklistRef.current) {
      checklistRef.current.scrollIntoView({ behavior: 'smooth' });
      
      // Add a flash effect
      checklistRef.current.classList.add('flash-highlight');
      setTimeout(() => {
        if (checklistRef.current) {
          checklistRef.current.classList.remove('flash-highlight');
        }
      }, 1500);
    }
  };

  const completeChecklistItem = (index) => {
    const updatedChecklist = [...checkedItems];
    updatedChecklist[index] = !updatedChecklist[index];
    setCheckedItems(updatedChecklist);
    
    // Show completion badge if all items are checked
    if (updatedChecklist.every(item => item)) {
      setShowCompletionBadge(true);
    } else {
      setShowCompletionBadge(false);
    }
  };

  // Track which checklist items are completed
  const [checkedItems, setCheckedItems] = useState([false, false, false, false]);

  const Section = ({ id, title, children, reference }) => {
    const isExpanded = expandedSection === id;
    const isRead = readSections.has(id);

    return (
      <div 
        ref={reference}
        className={`mb-6 bg-white rounded-lg shadow-sm transition-all duration-200
          ${isExpanded ? 'ring-2 ring-yellow-400 shadow-lg' : 'hover:shadow-md'}
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
      <div className="rounded-full bg-yellow-50 p-2 mt-1">
        <Icon className="text-yellow-600" size={20} />
      </div>
      <div>
        <h4 className="font-semibold mb-1">{title}</h4>
        {children}
      </div>
    </div>
  );

  const InteractiveChecklistItem = ({ text, index }) => (
    <li className="flex items-center space-x-2 py-1">
      <button 
        onClick={() => completeChecklistItem(index)}
        className={`w-5 h-5 rounded-md border transition-colors flex items-center justify-center
          ${checkedItems[index] ? 'bg-green-500 border-green-500' : 'bg-white border-gray-300'}`}
      >
        {checkedItems[index] && <CheckCircle className="text-white" size={14} />}
      </button>
      <span className={checkedItems[index] ? 'line-through text-gray-500' : ''}>{text}</span>
    </li>
  );

  return (
    <div className={`min-h-screen ${focusMode ? 'bg-gray-100' : 'bg-gray-50'}`}>
      <style jsx>{`
        .flash-highlight {
          animation: flash 1.5s;
        }
        
        @keyframes flash {
          0% { background-color: #fff; }
          25% { background-color: #fef3c7; }
          50% { background-color: #fff; }
          75% { background-color: #fef3c7; }
          100% { background-color: #fff; }
        }
        
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
            <h1 className="text-3xl font-bold">Platform Maintenance</h1>
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
            <Section id="overview" title="Maintenance Overview">
              <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-4">
                <div className="flex items-center">
                  <AlertTriangle className="text-yellow-600 mr-2" size={20} />
                  <p className="font-semibold">Important Notice</p>
                </div>
                <p className="mt-2">Please save all work and complete ongoing tasks before the maintenance window.</p>
              </div>
              <p className="text-lg leading-relaxed">
                We will be performing scheduled maintenance to improve platform stability 
                and performance. During this time, the platform will be unavailable.
              </p>
            </Section>

            <Section id="impact" title="Service Impact">
              <div className="space-y-4">
                <KeyPoint icon={Server} title="Affected Services">
                  <ul className="list-disc list-inside ml-4 space-y-2">
                    <li>Learning Management System</li>
                    <li>User Dashboard</li>
                    <li>Course Content Access</li>
                    <li>Assessment Platform</li>
                  </ul>
                </KeyPoint>
                <KeyPoint icon={Globe} title="Geographic Impact">
                  <p>This maintenance will affect all regions and users globally.</p>
                </KeyPoint>
              </div>
            </Section>

            <Section id="checklist" title="Preparation Checklist" reference={checklistRef}>
              <div className="space-y-4">
                <KeyPoint icon={CheckSquare} title="Before Maintenance">
                  <ul className="space-y-2 ml-4">
                    <InteractiveChecklistItem text="Save all in-progress work" index={0} />
                    <InteractiveChecklistItem text="Complete any ongoing assessments" index={1} />
                    <InteractiveChecklistItem text="Download necessary materials" index={2} />
                    <InteractiveChecklistItem text="Log out of the platform" index={3} />
                  </ul>
                </KeyPoint>
                
                {showCompletionBadge && (
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-4 bg-green-50 border border-green-200 rounded-lg p-4 flex items-center"
                  >
                    <CheckCircle className="text-green-500 mr-3" size={24} />
                    <div>
                      <p className="font-semibold text-green-800">Great job!</p>
                      <p className="text-green-700">You've completed all preparation steps.</p>
                    </div>
                  </motion.div>
                )}
              </div>
            </Section>

            <Section id="updates" title="System Updates">
              <KeyPoint icon={Settings} title="Improvements">
                <p>
                  The maintenance will include:
                  <ul className="list-disc list-inside ml-4 mt-2 space-y-2">
                    <li>Performance optimizations</li>
                    <li>Security updates</li>
                    <li>Database maintenance</li>
                    <li>System stability improvements</li>
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
                  <Calendar className="text-yellow-500" size={20} />
                  <div>
                    <p className="font-semibold">Maintenance Date</p>
                    <p>August 12th, 2024</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <Clock className="text-yellow-500" size={20} />
                  <div>
                    <p className="font-semibold">Duration</p>
                    <p>2 AM - 4 AM EST</p>
                  </div>
                </div>

                <div className="mt-6 p-4 bg-yellow-50 rounded-lg">
                  <p className="text-sm text-yellow-800">
                    The platform will automatically save your progress every 5 minutes until maintenance begins.
                  </p>
                </div>

                <button
                  onClick={handleViewChecklist}
                  className="block w-full bg-yellow-500 text-white text-center py-3 rounded-lg hover:bg-yellow-600 transition-colors mt-6"
                >
                  View Preparation Checklist
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MaintenanceDetail;