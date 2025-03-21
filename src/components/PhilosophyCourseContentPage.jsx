import React, { useState, useEffect } from 'react';
import SignedInNavbar from "./SignedInNavbar";
import { useNavigate } from 'react-router-dom';
import { 
  ArrowRight, BookOpen, FileText, HelpCircle, CheckCircle, AlertTriangle, Globe, TrendingUp, Trees,
  Eye, EyeOff, Brain, Zap, Award, Timer, MousePointer, Search, Clock, Quote, User,
  ArrowUp, Target, Book, BarChart2, Lightbulb, Lock, Unlock, MessageSquare,
  ClipboardCheck, Edit3, ChevronLeft, Shield, Users, XCircle, Key, AlertCircle, X, 
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { motion, AnimatePresence } from 'framer-motion';

const PhilosophyCourseContentPage = () => {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState(null);
  const [showTooltip, setShowTooltip] = useState(false);
  const [tooltipContent, setTooltipContent] = useState("");
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
  const [progress, setProgress] = useState(0);
  const [showCelebration, setShowCelebration] = useState(false);
  const [completedSections, setCompletedSections] = useState([]);
  const [focusMode, setFocusMode] = useState(false);
  const [timerActive, setTimerActive] = useState(false);
  const [studyTime, setStudyTime] = useState(0);

  const getBackgroundColor = () => {
    return focusMode ? 'bg-gray-100' : 'bg-white';
  };

  // Function to trigger confetti celebration
  const triggerCelebration = () => {
    setShowCelebration(true);
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });
    setTimeout(() => setShowCelebration(false), 3000);
  };

  // Mark section as completed when user reaches the end of it
  const markSectionComplete = (sectionId) => {
    if (!completedSections.includes(sectionId)) {
      setCompletedSections([...completedSections, sectionId]);
      triggerCelebration();
    }
  };

  // Toggle focus mode
  const toggleFocusMode = () => {
    setFocusMode(!focusMode);
  };

  // Toggle study timer
  const toggleTimer = () => {
    setTimerActive(!timerActive);
  };

  // Update timer
  useEffect(() => {
    let interval;
    if (timerActive) {
      interval = setInterval(() => {
        setStudyTime(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [timerActive]);

  // Format study time
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Handle tooltip display
  const handleShowTooltip = (content, e) => {
    setTooltipContent(content);
    setTooltipPosition({ x: e.clientX, y: e.clientY });
    setShowTooltip(true);
  };

  // Handle tooltip hide
  const handleHideTooltip = () => {
    setShowTooltip(false);
  };

  // Automatic scrolling animation when section becomes active
  useEffect(() => {
    if (activeSection) {
      const element = document.getElementById(activeSection);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  }, [activeSection]);

  const navigateToQuiz = () => {
    navigate('/quiz');
  };

   const goBack = () => {
    navigate('/my-learning/my-course');
  };

  // Section data
  const sections = [
    {id: "distinguishing", name: "Distinguishing Science", icon: <Target className="h-4 w-4 mr-1" />},
    {id: "influences", name: "Influences", icon: <Brain className="h-4 w-4 mr-1" />},
    {id: "problem", name: "Unfalsifiable Theories", icon: <AlertTriangle className="h-4 w-4 mr-1" />},
    {id: "einstein", name: "Einstein's Model", icon: <Lightbulb className="h-4 w-4 mr-1" />},
    {id: "principles", name: "Key Principles", icon: <CheckCircle className="h-4 w-4 mr-1" />},
    {id: "falsifiability", name: "Falsifiability", icon: <Lock className="h-4 w-4 mr-1" />},
    {id: "criticism", name: "Criticisms and Responses", icon: <BarChart2 className="h-4 w-4 mr-1" />},
    {id: "legacy", name: "Legacy and Influence", icon: <AlertTriangle className="h-4 w-4 mr-1" />},
    {id: "practice", name: "Conclusion", icon: <HelpCircle className="h-4 w-4 mr-1" />}
  ];

  return (
    <div className={`min-h-screen transition-colors duration-300 ${getBackgroundColor()}`}>
      <style jsx>{`
        .focus-mode .distraction {
          opacity: 0.3;
          transition: opacity 0.3s ease;
        }
        .focus-mode .distraction:hover {
          opacity: 1;
        }
        .content-highlight {
          background-color: rgba(255, 255, 0, 0.1);
          animation: pulse 2s infinite;
        }
        @keyframes pulse {
          0% { background-color: rgba(255, 255, 0, 0.1); }
          50% { background-color: rgba(255, 255, 0, 0.3); }
          100% { background-color: rgba(255, 255, 0, 0.1); }
        }
        .rotate-animation {
          animation: rotate 20s linear infinite;
        }
        @keyframes rotate {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .bounce-animation {
          animation: bounce 2s ease infinite;
        }
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        .theory-comparison {
          transition: all 0.3s ease;
        }
        .theory-comparison:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
        }
      `}</style>

      <SignedInNavbar />

      <div className="container mx-auto px-6 py-8">
        <div className="flex justify-between"> 

          <button 
            onClick={goBack}
            className="mb-4 flex items-center text-gray-600 hover:text-blue-600 transition-colors font-medium"
          >
            <ChevronLeft className="h-5 w-5 mr-1" />
            Back to Course Overview
          </button>

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
          </div>

        </div>

        {/* Tooltip */}
        {showTooltip && (
          <div 
            className="fixed bg-black text-white p-2 rounded-md text-sm z-50 max-w-xs"
            style={{ 
              left: tooltipPosition.x + 10, 
              top: tooltipPosition.y + 10 
            }}
          >
            {tooltipContent}
          </div>
        )}

        {/* Quick navigation panel - fixed on the left */}
        <div className="fixed left-4 top-1/2 transform -translate-y-1/2 bg-white p-3 rounded-lg shadow-lg z-40">
          <div className="flex flex-col space-y-3">
            <button 
              onClick={toggleFocusMode}
              className="p-2 rounded-full bg-blue-100 hover:bg-blue-200 transition-colors"
              onMouseEnter={(e) => handleShowTooltip("Toggle Focus Mode", e)}
              onMouseLeave={handleHideTooltip}
            >
              {focusMode ? <EyeOff className="h-5 w-5 text-blue-600" /> : <Eye className="h-5 w-5 text-blue-600" />}
            </button>
            
            <button 
              onClick={toggleTimer}
              className="p-2 rounded-full bg-purple-100 hover:bg-purple-200 transition-colors"
              onMouseEnter={(e) => handleShowTooltip("Study Timer", e)}
              onMouseLeave={handleHideTooltip}
            >
              <Timer className="h-5 w-5 text-purple-600" />
            </button>
            
            <button 
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
              onMouseEnter={(e) => handleShowTooltip("Back to Top", e)}
              onMouseLeave={handleHideTooltip}
            >
              <ArrowUp className="h-5 w-5 text-gray-600" />
            </button>
          </div>
        </div>

        {/* Study Timer Display */}
        {timerActive && (
          <div className="fixed top-20 left-4 bg-purple-100 px-3 py-2 rounded-lg z-40 shadow-md">
            <div className="text-purple-800 font-bold">{formatTime(studyTime)}</div>
          </div>
        )}

        <div className="flex relative" >
          {/* Side Navigation Panel - Table of Contents */}
          <aside className="w-64 bg-white shadow-md sidebar overflow-y-auto sticky top-8 self-start">
            <div className="p-4 border-b border-gray-200">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-medium text-gray-700">Your Progress</h3>
                <span className="text-xs text-blue-600">{Math.round((completedSections.length / sections.length) * 100)}% Complete</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div 
                  className="bg-blue-600 h-2.5 rounded-full transition-all duration-500 ease-out" 
                  style={{ width: `${(completedSections.length / sections.length) * 100}%` }}
                ></div>
              </div>
            </div>

            <div className="p-4">
              <h2 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
                <MousePointer className="h-5 w-5 text-blue-600 mr-2" />
                Quick Navigation
              </h2>
              <div className="flex flex-col space-y-2">
                {sections.map((section) => (
                  <button 
                    key={section.id}
                    onClick={() => setActiveSection(section.id)}
                    className={`p-2 text-sm rounded-md transition-colors text-left flex items-center
                      ${completedSections.includes(section.id) && 'border-l-4 border-green-500 pl-1'}
                      ${activeSection === section.id ? 'bg-blue-100 text-blue-800' : 'hover:bg-gray-100 text-gray-700'}`}
                  >
                    {section.icon}
                    <span className="truncate">{section.name}</span>
                    {completedSections.includes(section.id) && <CheckCircle className="h-4 w-4 text-green-500 ml-auto" />}
                  </button>
                ))}
              </div>
            </div>

            {/* Quiz Navigation Section */}
            <div className="p-4 border-t border-gray-200">
              <h2 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
                <ClipboardCheck className="h-5 w-5 text-green-600 mr-2" />
                Assessment
              </h2>
              <div className="flex flex-col space-y-2">
                <button 
                  onClick={navigateToQuiz}
                  className="p-3 text-sm rounded-md transition-colors text-left flex items-center
                    bg-green-50 hover:bg-green-100 text-green-800 border border-green-200"
                >
                  <Edit3 className="h-4 w-4 mr-2 text-green-600" />
                  <span>Take Chapter Quiz</span>
                  <ArrowRight className="h-4 w-4 ml-auto text-green-600" />
                </button>
                
                <button 
                  onClick={() => navigate('/philosophy-discussion')}
                  className="p-3 text-sm rounded-md transition-colors text-left flex items-center
                    bg-blue-50 hover:bg-blue-100 text-blue-800 border border-blue-200"
                >
                  <MessageSquare className="h-4 w-4 mr-2 text-blue-600" />
                  <span>Join Discussion</span>
                  <ArrowRight className="h-4 w-4 ml-auto text-blue-600" />
                </button>
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1 p-6">

            <div className="max-w-4xl mx-auto p-6 bg-white min-h-screen rounded-lg shadow-md">
              {/* Header with visual cues */}
              <header className="mb-8 relative">
                <div className="absolute -left-2 top-0 bottom-0 w-1 bg-blue-500 rounded-full animate-pulse"></div>
                <h1 className="text-3xl font-bold text-gray-800 flex items-center">
                  <Brain className="h-8 w-8 text-blue-600 mr-3 bounce-animation" />
                  Unit 1: Karl Popper: Science, Conjectures, and Refutations
                </h1>
                <div className="flex items-center mt-2">
                  <BookOpen className="h-5 w-5 text-blue-600 mr-2" />
                  <span className="text-sm text-gray-600">Philosophy of Science Module</span>
                  <div className="ml-auto flex space-x-2">
                    <span className="text-sm bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full flex items-center">
                      <Timer className="h-4 w-4 mr-1" /> 15 min read
                    </span>
                    <span className="text-sm bg-green-100 text-green-800 px-2 py-1 rounded-full flex items-center">
                      <Award className="h-4 w-4 mr-1" /> XP: 500
                    </span>
                  </div>
                </div>
              </header>

              <main>

                {/* Section 1 */}
                <section id="distinguishing" className="mb-8 bg-blue-50 p-6 rounded-lg border border-blue-100 transition-all duration-300 hover:shadow-md relative">
                  <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                    <Zap className="h-6 w-6 text-blue-600 mr-2" />
                    Distinguishing Science from Pseudo-Science
                  </h2>
                  
                  <div className="mb-6 relative h-20 bg-gray-100 rounded-lg overflow-hidden">
                    <div className="absolute inset-0 flex items-center">
                      <div className="h-1 bg-blue-400 w-full"></div>
                      <div className="absolute left-1/4 top-1/2 transform -translate-y-1/2 -translate-x-1/2 h-4 w-4 bg-blue-600 rounded-full z-10"></div>
                      <div className="absolute left-2/4 top-1/2 transform -translate-y-1/2 -translate-x-1/2 h-4 w-4 bg-blue-600 rounded-full z-10"></div>
                      <div className="absolute left-3/4 top-1/2 transform -translate-y-1/2 -translate-x-1/2 h-4 w-4 bg-blue-600 rounded-full z-10"></div>
                    </div>
                    <div className="absolute top-0 left-1/4 transform -translate-x-1/2 mt-2 text-xs text-gray-600">1902-1994</div>
                    <div className="absolute top-0 left-2/4 transform -translate-x-1/2 mt-2 text-xs text-gray-600">Science & Pseudo-science</div>
                    <div className="absolute top-0 left-3/4 transform -translate-x-1/2 mt-2 text-xs text-gray-600">Falsifiability</div>
                    <div className="absolute bottom-1 left-1/4 transform -translate-x-1/2 text-xs text-gray-600 w-32 text-center">Popper's Life</div>
                    <div className="absolute bottom-1 left-2/4 transform -translate-x-1/2 text-xs text-gray-600 w-32 text-center">Core Problem</div>
                    <div className="absolute bottom-1 left-3/4 transform -translate-x-1/2 text-xs text-gray-600 w-32 text-center">Solution</div>
                  </div>
                  
                  <p className="text-gray-700 mb-4">
                    Karl Popper's central contribution to philosophy of science was a solution to the <span className="font-semibold text-blue-800">demarcation problem</span>: how to distinguish scientific theories from non-scientific ones.
                  </p>
                  
                  <p className="text-gray-700 mb-4">
                    Unlike previous philosophers who believed science was characterized by its <span className="font-semibold text-blue-800">inductive method</span> or empirical verifiability, Popper proposed that truly scientific theories shared a different feature—they make <span className="font-semibold text-blue-800">falsifiable predictions</span>.
                  </p>
                  
                  <div className="bg-white p-4 rounded-lg shadow-sm mb-4 border-l-4 border-yellow-500">
                    <p className="italic text-gray-600">
                      "I realized that such [scientific] theories are described better as hypotheses or conjectures."
                      <span className="block text-right text-sm mt-1">— Karl Popper</span>
                    </p>
                  </div>
                  
                  <button 
                    className="text-blue-600 hover:text-blue-800 text-sm flex items-center mt-4 group bg-white px-4 py-2 rounded-full shadow-sm transform transition-transform hover:scale-105"
                    onClick={() => markSectionComplete("distinguishing")}
                  >
                    <CheckCircle className="h-4 w-4 mr-2 group-hover:text-green-600 transition-colors" />
                    <span className="group-hover:text-green-600 transition-colors">Mark as complete</span>
                  </button>
                </section>

                {/* Section 2 */}
                <section id="influences" className="mb-8 bg-gray-50 p-6 rounded-lg border border-gray-100 transition-all duration-300 hover:shadow-md relative overflow-hidden">
                  {/* Background decorative elements */}
                  <div className="absolute -right-16 -top-16 h-48 w-48 bg-blue-50 rounded-full opacity-50"></div>
                  <div className="absolute -left-16 -bottom-16 h-48 w-48 bg-yellow-50 rounded-full opacity-50"></div>
                  
                  <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                    <Book className="h-6 w-6 text-gray-600 mr-2 animate-pulse" />
                    Influences and Context
                  </h2>
                  
                  {/* Interactive timeline */}
                  <div className="relative h-24 mb-6 bg-white rounded-lg shadow-sm overflow-hidden">
                    <div className="absolute inset-0 flex items-center">
                      <div className="h-2 bg-gradient-to-r from-blue-300 to-purple-500 w-full"></div>
                      
                      {/* Timeline dots with hover effects */}
                      <div className="absolute left-1/4 top-1/2 transform -translate-y-1/2 group cursor-pointer">
                        <div className="h-6 w-6 bg-blue-500 rounded-full z-10 transform transition-transform group-hover:scale-125 flex items-center justify-center">
                          <span className="text-xs text-white font-bold">LP</span>
                        </div>
                        <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-blue-100 p-1 rounded text-xs w-20 text-center opacity-0 group-hover:opacity-100 transition-opacity">
                          Logical Positivism
                        </div>
                      </div>
                      
                      <div className="absolute left-1/2 top-1/2 transform -translate-y-1/2 group cursor-pointer">
                        <div className="h-6 w-6 bg-yellow-500 rounded-full z-10 transform transition-transform group-hover:scale-125 flex items-center justify-center">
                          <span className="text-xs text-white font-bold">E</span>
                        </div>
                        <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-yellow-100 p-1 rounded text-xs w-20 text-center opacity-0 group-hover:opacity-100 transition-opacity">
                          Einstein
                        </div>
                      </div>
                      
                      <div className="absolute left-3/4 top-1/2 transform -translate-y-1/2 group cursor-pointer">
                        <div className="h-6 w-6 bg-purple-500 rounded-full z-10 transform transition-transform group-hover:scale-125 flex items-center justify-center">
                          <span className="text-xs text-white font-bold">P</span>
                        </div>
                        <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-purple-100 p-1 rounded text-xs w-20 text-center opacity-0 group-hover:opacity-100 transition-opacity">
                          Popper
                        </div>
                      </div>
                    </div>
                    
                    <div className="absolute top-2 left-0 w-full text-center text-xs text-gray-500">
                      Early 20th Century
                    </div>
                  </div>
                  
                  {/* Visual comparison cards with icons */}
                  <div className="grid md:grid-cols-2 gap-4 mb-6">
                    <div className="theory-comparison bg-gradient-to-br from-blue-50 to-white p-4 rounded-lg shadow-sm transform transition-all duration-300 hover:shadow-md hover:-translate-y-1">
                      <div className="flex items-center mb-2">
                        <div className="flex-shrink-0 h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                          <Search className="h-5 w-5 text-blue-600" />
                        </div>
                        <h3 className="text-lg font-medium text-gray-800">Logical Positivism</h3>
                      </div>
                      <div className="ml-12">
                        <div className="text-sm text-gray-700 bg-white p-2 rounded border-l-2 border-blue-400">
                          All meaningful statements must be <span className="font-semibold text-blue-800 animate-pulse">verifiable</span> by observation
                        </div>
                      </div>
                    </div>
                    
                    <div className="theory-comparison bg-gradient-to-br from-yellow-50 to-white p-4 rounded-lg shadow-sm transform transition-all duration-300 hover:shadow-md hover:-translate-y-1">
                      <div className="flex items-center mb-2">
                        <div className="flex-shrink-0 h-10 w-10 bg-yellow-100 rounded-full flex items-center justify-center mr-3">
                          <Zap className="h-5 w-5 text-yellow-600" />
                        </div>
                        <h3 className="text-lg font-medium text-gray-800">Key Thinkers</h3>
                      </div>
                      <div className="flex justify-between ml-12">
                        <div className="flex flex-col items-center">
                          <div className="h-10 w-10 bg-green-100 rounded-full flex items-center justify-center mb-1">
                            <CheckCircle className="h-5 w-5 text-green-600" />
                          </div>
                          <span className="text-xs font-bold">Einstein</span>
                          <span className="text-xs">Testable</span>
                        </div>
                        <span className="text-xl self-center">vs</span>
                        <div className="flex flex-col items-center">
                          <div className="h-10 w-10 bg-red-100 rounded-full flex items-center justify-center mb-1">
                            <X className="h-5 w-5 text-red-600" />
                          </div>
                          <span className="text-xs font-bold">Marx/Freud</span>
                          <span className="text-xs">Unfalsifiable</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Historical context with visual elements */}
                  <div className="relative bg-white p-4 rounded-lg shadow-sm mb-4 overflow-hidden">
                    <div className="absolute right-0 top-0 h-24 w-24 bg-gray-50 rounded-full opacity-50 -mr-10 -mt-10"></div>
                    
                    <h3 className="text-md font-medium text-gray-800 mb-2 flex items-center">
                      <Clock className="h-5 w-5 text-gray-600 mr-2" />
                      Historical Context
                    </h3>
                    
                    <div className="flex items-start space-x-4">
                      <div className="flex-shrink-0 mt-1">
                        <div className="h-6 w-6 bg-purple-100 rounded-full flex items-center justify-center">
                          <ArrowRight className="h-3 w-3 text-purple-600" />
                        </div>
                      </div>
                      <p className="text-sm text-gray-700">
                        Early 20th century: Different theories competed for 
                        <span className="inline-block bg-blue-100 text-blue-800 px-2 py-1 rounded mx-1 transform transition-transform hover:scale-110">scientific legitimacy</span>
                      </p>
                    </div>
                  </div>
                  
                  {/* Quote with visual enhancements */}
                  <div className="bg-gradient-to-r from-purple-50 to-white p-4 rounded-lg shadow-sm mb-4 border-l-4 border-purple-500 transform transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
                    <div className="relative">
                      <Quote className="h-8 w-8 text-purple-200 absolute -top-4 -left-4 opacity-50" />
                      <p className="italic text-gray-600 pl-2">
                        "Einstein's theory, as I saw it, was not a source of dogmatic certainty, but rather a hypothesis that might be falsified."
                      </p>
                      <div className="flex items-center mt-2 justify-end">
                        <div className="h-6 w-6 bg-purple-100 rounded-full flex items-center justify-center mr-2">
                          <User className="h-3 w-3 text-purple-600" />
                        </div>
                        <span className="text-sm font-medium text-gray-700">Karl Popper</span>
                      </div>
                    </div>
                  </div>
                  
                  <button 
                    className="text-blue-600 hover:text-blue-800 text-sm flex items-center mt-4 group bg-white px-4 py-2 rounded-full shadow-sm transform transition-transform hover:scale-105"
                    onClick={() => markSectionComplete("influences")}
                  >
                    <CheckCircle className="h-4 w-4 mr-2 group-hover:text-green-600 transition-colors" />
                    <span className="group-hover:text-green-600 transition-colors">Mark as complete</span>
                  </button>
                </section>

                {/* Section 3 */}
                <section id="problem" className="mb-8 bg-red-50 p-6 rounded-lg border border-red-100 transition-all duration-300 hover:shadow-md">
                  <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                    <AlertTriangle className="h-6 w-6 text-red-600 mr-2" />
                    The Problem with Unfalsifiable Theories
                  </h2>

                  <div className="bg-white p-4 rounded-lg shadow-sm mb-4">
                    <h3 className="text-md font-medium text-gray-800 mb-2 flex items-center">
                      <AlertTriangle className="h-5 w-5 text-yellow-600 mr-2" />
                      Characteristics of Pseudo-Scientific Theories
                    </h3>
                    <ul className="list-disc pl-5 text-gray-700 space-y-2">
                      <li>Can explain everything within their domain</li>
                      <li>Find confirming evidence everywhere</li>
                      <li>Reject or reinterpret contradicting evidence</li>
                      <li>Resist modification or revision</li>
                    </ul>
                  </div>
                  
                  <p className="text-gray-700 mb-4">
                    Popper argued that theories like Marxism and Freudian psychoanalysis had a problematic feature: <span className="font-semibold text-red-800">they could not be proven wrong</span>. No matter what evidence was presented, adherents could always adjust their interpretations to accommodate it.
                  </p>
                  
                  <div className="bg-white p-4 rounded-lg shadow-sm mb-4 border-l-4 border-red-500">
                    <p className="italic text-gray-600">
                      "A theory that explains everything explains nothing."
                      <span className="block text-right text-sm mt-1">— Karl Popper</span>
                    </p>
                  </div>

                  <button 
                    className="text-blue-600 hover:text-blue-800 text-sm flex items-center mt-4 group bg-white px-4 py-2 rounded-full shadow-sm transform transition-transform hover:scale-105"
                    onClick={() => markSectionComplete("problem")}
                  >
                    <CheckCircle className="h-4 w-4 mr-2 group-hover:text-green-600 transition-colors" />
                    <span className="group-hover:text-green-600 transition-colors">Mark as complete</span>
                  </button>
                </section>

                {/* Section 4 */}
                <section id="einstein" className="mb-8 bg-yellow-50 p-6 rounded-lg border border-yellow-100 transition-all duration-300 hover:shadow-md">
                  <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                    <Lightbulb className="h-6 w-6 text-yellow-600 mr-2" />
                    Einstein's Theory as a Model of Science
                  </h2>
                  
                  <div className="mb-4 p-4 bg-white rounded-lg shadow-sm">
                    <h3 className="text-lg font-medium text-gray-800 mb-2">Einstein's Predictions</h3>
                    <p className="text-gray-700 mb-2">
                      Einstein's General Theory of Relativity predicted that:
                    </p>
                    <ul className="list-disc pl-5 text-gray-700 space-y-1">
                      <li>Light would bend around massive objects like the sun</li>
                      <li>This bending could be observed during a solar eclipse</li>
                      <li>If observations showed no bending, the theory would be falsified</li>
                    </ul>
                  </div>
                  
                  <p className="text-gray-700 mb-4">
                    What impressed Popper about Einstein's theory wasn't just its explanatory power but its <span className="font-semibold text-yellow-800">willingness to risk falsification</span>. Einstein specifically outlined observations that would disprove his theory if they were made.
                  </p>
                  
                  <div className="bg-white p-4 rounded-lg shadow-sm mb-4 border-l-4 border-green-500">
                    <p className="italic text-gray-600">
                      "Einstein's theory is compatible with certain possible experiences and incompatible with others. It puts our world of experience under constraints."
                      <span className="block text-right text-sm mt-1">— Karl Popper</span>
                    </p>
                  </div>
                  
                  <button 
                    className="text-blue-600 hover:text-blue-800 text-sm flex items-center mt-4 group bg-white px-4 py-2 rounded-full shadow-sm transform transition-transform hover:scale-105"
                    onClick={() => markSectionComplete("einstein")}
                  >
                    <CheckCircle className="h-4 w-4 mr-2 group-hover:text-green-600 transition-colors" />
                    <span className="group-hover:text-green-600 transition-colors">Mark as complete</span>
                  </button>
                </section>

                {/* Section 5 */}
                <section id="principles" className="mb-8 bg-green-50 p-6 rounded-lg border border-green-100 transition-all duration-300 hover:shadow-md">
                  <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                    <CheckCircle className="h-6 w-6 text-green-600 mr-2" />
                    Key Principles of Popper's Philosophy
                  </h2>
                  
                  <div className="grid md:grid-cols-2 gap-4 mb-4">
                    <div className="theory-comparison bg-white p-4 rounded-lg shadow-sm">
                      <h3 className="text-lg font-medium text-gray-800 mb-2">Asymmetry of Falsification</h3>
                      <p className="text-gray-700 text-sm">
                        While no number of observations can conclusively prove a universal theory true, a single valid contrary observation can prove it false.
                      </p>
                    </div>
                    
                    <div className="theory-comparison bg-white p-4 rounded-lg shadow-sm">
                      <h3 className="text-lg font-medium text-gray-800 mb-2">Conjectures and Refutations</h3>
                      <p className="text-gray-700 text-sm">
                        Scientific knowledge advances through bold conjectures followed by rigorous attempts at refutation.
                      </p>
                    </div>
                  </div>
                  
                  <p className="text-gray-700 mb-4">
                    Popper rejected induction as the primary scientific method. Instead, he proposed that science advances through a process of <span className="font-semibold text-green-800">problem-solving</span>: we form theories as creative solutions to problems, then subject these theories to severe testing.
                  </p>
                  
                  <div className="bg-white p-4 rounded-lg shadow-sm mb-4">
                    <h3 className="text-md font-medium text-gray-800 mb-2">Scientific Method According to Popper:</h3>
                    <ol className="list-decimal pl-5 text-gray-700 space-y-2">
                      <li>Identify a problem or question</li>
                      <li>Propose a bold, testable theory</li>
                      <li>Deduce falsifiable predictions</li>
                      <li>Test these predictions rigorously</li>
                      <li>Eliminate theories that fail tests</li>
                      <li>Retain theories that survive testing (provisionally)</li>
                    </ol>
                  </div>
                  
                  <button 
                    className="text-blue-600 hover:text-blue-800 text-sm flex items-center mt-4 group bg-white px-4 py-2 rounded-full shadow-sm transform transition-transform hover:scale-105"
                    onClick={() => markSectionComplete("principles")}
                  >
                    <CheckCircle className="h-4 w-4 mr-2 group-hover:text-green-600 transition-colors" />
                    <span className="group-hover:text-green-600 transition-colors">Mark as complete</span>
                  </button>
                </section>

                {/* Section 6 */}
                <section id="falsifiability" className="mb-8 bg-purple-50 p-6 rounded-lg border border-purple-100 transition-all duration-300 hover:shadow-md">
                  <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                    <Lock className="h-6 w-6 text-purple-600 mr-2 animate-bounce" />
                    Understanding Falsifiability
                  </h2>
                  
                  {/* Visual metaphor */}
                  <div className="relative h-40 mb-6 bg-white rounded-lg shadow-sm overflow-hidden">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-full flex justify-around items-center px-8">
                        {/* Left side - unfalsifiable */}
                        <div className="text-center">
                          <div className="mx-auto h-20 w-20 bg-red-100 rounded-full flex items-center justify-center mb-2 relative overflow-hidden">
                            <Shield className="h-10 w-10 text-red-400" />
                            <div className="absolute inset-0 bg-red-200 opacity-50 animate-pulse"></div>
                          </div>
                          <p className="text-sm font-medium text-red-500">Unfalsifiable</p>
                          <p className="text-xs text-gray-500">"Explains everything"</p>
                        </div>
                        
                        {/* Arrow */}
                        <ArrowRight className="h-8 w-8 text-gray-400" />
                        
                        {/* Right side - falsifiable */}
                        <div className="text-center">
                          <div className="mx-auto h-20 w-20 bg-green-100 rounded-full flex items-center justify-center mb-2 relative">
                            <Target className="h-10 w-10 text-green-500" />
                            <div className="absolute top-6 left-14 h-2 w-2 bg-red-500 rounded-full animate-ping"></div>
                          </div>
                          <p className="text-sm font-medium text-green-500">Falsifiable</p>
                          <p className="text-xs text-gray-500">"Makes testable predictions"</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Interactive comparison cards */}
                  <div className="grid md:grid-cols-2 gap-4 mb-6">
                    <div className="theory-comparison bg-white p-4 rounded-lg shadow-sm border-l-4 border-green-500 transform transition-transform hover:scale-105">
                      <h3 className="text-lg font-medium text-gray-800 mb-2 flex items-center">
                        <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                        Falsifiable
                      </h3>
                      <div className="flex items-center">
                        <div className="mr-3 bg-green-100 p-2 rounded-full">
                          <Users className="h-5 w-5 text-green-600" />
                        </div>
                        <p className="text-gray-700 text-sm">
                          "All swans are white"
                        </p>
                      </div>
                      <div className="mt-2 text-xs bg-green-50 p-2 rounded-lg">
                        <span className="font-bold">Why? </span> 
                        Finding just ONE black swan proves it wrong!
                      </div>
                    </div>
                    
                    <div className="theory-comparison bg-white p-4 rounded-lg shadow-sm border-l-4 border-red-500 transform transition-transform hover:scale-105">
                      <h3 className="text-lg font-medium text-gray-800 mb-2 flex items-center">
                        <XCircle className="h-5 w-5 text-red-500 mr-2" />
                        Unfalsifiable
                      </h3>
                      <div className="flex items-center">
                        <div className="mr-3 bg-red-100 p-2 rounded-full">
                          <Users className="h-5 w-5 text-red-600" />
                        </div>
                        <p className="text-gray-700 text-sm">
                          "At least one white swan exists"
                        </p>
                      </div>
                      <div className="mt-2 text-xs bg-red-50 p-2 rounded-lg">
                        <span className="font-bold">Why? </span> 
                        No matter how many non-white swans we find, we can't disprove this!
                      </div>
                    </div>
                  </div>
                  
                  {/* Key points as icons */}
                  <div className="bg-white p-4 rounded-lg shadow-sm mb-4">
                    <h3 className="text-md font-medium text-gray-800 mb-3 flex items-center">
                      <Key className="h-5 w-5 text-purple-600 mr-2 animate-pulse" />
                      Key Points to Remember:
                    </h3>
                    <div className="grid grid-cols-3 gap-2">
                      <div className="flex flex-col items-center text-center p-2 bg-purple-50 rounded-lg">
                        <AlertCircle className="h-8 w-8 text-purple-500 mb-2" />
                        <p className="text-xs text-gray-700">Makes specific predictions</p>
                      </div>
                      <div className="flex flex-col items-center text-center p-2 bg-purple-50 rounded-lg">
                        <X className="h-8 w-8 text-purple-500 mb-2" />
                        <p className="text-xs text-gray-700">Rules out certain observations</p>
                      </div>
                      <div className="flex flex-col items-center text-center p-2 bg-purple-50 rounded-lg">
                        <Zap className="h-8 w-8 text-purple-500 mb-2" />
                        <p className="text-xs text-gray-700">Can be proven wrong</p>
                      </div>
                    </div>
                  </div>
                  
                  {/* Interactive element */}
                  <div className="bg-indigo-50 p-4 rounded-lg shadow-sm mb-4 relative overflow-hidden">
                    <div className="absolute right-0 top-0 h-20 w-20">
                      <div className="absolute right-0 top-0 h-40 w-40 bg-indigo-100 rounded-full -mr-20 -mt-20"></div>
                    </div>
                    <h3 className="text-md font-medium text-gray-800 mb-2 relative z-10">Try This:</h3>
                    <p className="text-sm text-gray-700 mb-3 relative z-10">For each theory, ask yourself:</p>
                    <div className="bg-white p-3 rounded-lg text-sm relative z-10">
                      <p className="font-bold text-indigo-700">"What observation would prove this wrong?"</p>
                    </div>
                    <div className="mt-2 text-xs text-gray-600 italic relative z-10">If you can't think of any, it might not be scientific!</div>
                  </div>
                  
                  <button 
                    className="text-blue-600 hover:text-blue-800 text-sm flex items-center mt-4 group bg-white px-4 py-2 rounded-full shadow-sm transform transition-transform hover:scale-105"
                    onClick={() => markSectionComplete("falsifiability")}
                  >
                    <CheckCircle className="h-4 w-4 mr-2 group-hover:text-green-600 transition-colors" />
                    <span className="group-hover:text-green-600 transition-colors">Mark as complete</span>
                  </button>
                </section>

                {/* Section 7 */}
                <section id="criticism" className="mb-8 bg-blue-50 p-6 rounded-lg border border-blue-100 transition-all duration-300 hover:shadow-md">
                  <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                    <MessageSquare className="h-6 w-6 text-blue-600 mr-2" />
                    Criticisms and Responses
                  </h2>
                  
                  <div className="grid md:grid-cols-2 gap-4 mb-4">
                    <div className="theory-comparison bg-white p-4 rounded-lg shadow-sm">
                      <h3 className="text-lg font-medium text-gray-800 mb-2">Kuhn's Challenge</h3>
                      <p className="text-gray-700 text-sm">
                        Thomas Kuhn argued that science works through paradigm shifts rather than continuous falsification, with scientists often holding onto theories despite contradictory evidence.
                      </p>
                    </div>
                    
                    <div className="theory-comparison bg-white p-4 rounded-lg shadow-sm">
                      <h3 className="text-lg font-medium text-gray-800 mb-2">Duhem-Quine Thesis</h3>
                      <p className="text-gray-700 text-sm">
                        Theories are never tested in isolation but as part of a network of auxiliary hypotheses, making it difficult to determine exactly what has been falsified.
                      </p>
                    </div>
                  </div>
                  
                  <p className="text-gray-700 mb-4">
                    While Popper's falsificationism remains influential, philosophers of science have identified several limitations. In practice, scientists rarely abandon theories based on a single contradictory result, and the history of science shows a more complex relationship between theory and evidence.
                  </p>
                  
                  <div className="bg-white p-4 rounded-lg shadow-sm mb-4 border-l-4 border-blue-500">
                    <p className="italic text-gray-600">
                      "No conclusive disproof of a theory can ever be produced; for it is always possible to say that the experimental results are not reliable."
                      <span className="block text-right text-sm mt-1">— Karl Popper</span>
                    </p>
                  </div>

                  <button 
                    className="text-blue-600 hover:text-blue-800 text-sm flex items-center mt-4 group bg-white px-4 py-2 rounded-full shadow-sm transform transition-transform hover:scale-105"
                    onClick={() => markSectionComplete("criticism")}
                  >
                    <CheckCircle className="h-4 w-4 mr-2 group-hover:text-green-600 transition-colors" />
                    <span className="group-hover:text-green-600 transition-colors">Mark as complete</span>
                  </button>
                </section>

                {/* Section 8 - ADHD Friendly Version */}
                <section id="legacy" className="mb-8 bg-orange-50 p-6 rounded-lg border border-orange-100 transition-all duration-300 hover:shadow-md">
                  <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                    <Award className="h-6 w-6 text-orange-600 mr-2" />
                    Legacy and Influence
                  </h2>
                  
                  {/* Visual representation replacing long paragraph */}
                  <div className="flex flex-col md:flex-row items-center justify-center gap-4 mb-6">
                    <div className="bg-white p-4 rounded-lg shadow-sm flex items-center">
                      <div className="h-16 w-16 bg-indigo-100 rounded-full flex items-center justify-center mr-3">
                        <Target className="h-8 w-8 text-indigo-600" />
                      </div>
                      <div>
                        <h3 className="font-medium">Falsifiability</h3>
                        <p className="text-sm text-gray-600">Powerful tool to identify science</p>
                      </div>
                    </div>
                    
                    <div className="bg-white p-4 rounded-lg shadow-sm flex items-center">
                      <div className="h-16 w-16 bg-orange-100 rounded-full flex items-center justify-center mr-3">
                        <Brain className="h-8 w-8 text-orange-600" />
                      </div>
                      <div>
                        <h3 className="font-medium">Critical Rationalism</h3>
                        <p className="text-sm text-gray-600">Influenced multiple fields</p>
                      </div>
                    </div>
                  </div>
                  
                  {/* Interactive areas of influence cards */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-6">
                    <div className="bg-white p-3 rounded-lg shadow-sm border-l-4 border-blue-500 hover:shadow-md transition-all duration-200">
                      <div className="flex items-center mb-2">
                        <Globe className="h-5 w-5 text-blue-500 mr-2" />
                        <h3 className="font-medium">Political Philosophy</h3>
                      </div>
                      <p className="text-xs text-gray-600">Open society & critique of historicism</p>
                    </div>
                    
                    <div className="bg-white p-3 rounded-lg shadow-sm border-l-4 border-green-500 hover:shadow-md transition-all duration-200">
                      <div className="flex items-center mb-2">
                        <FileText className="h-5 w-5 text-green-500 mr-2" />
                        <h3 className="font-medium">Scientific Method</h3>
                      </div>
                      <p className="text-xs text-gray-600">Research design & methodology</p>
                    </div>
                    
                    <div className="bg-white p-3 rounded-lg shadow-sm border-l-4 border-purple-500 hover:shadow-md transition-all duration-200">
                      <div className="flex items-center mb-2">
                        <BookOpen className="h-5 w-5 text-purple-500 mr-2" />
                        <h3 className="font-medium">Educational Theory</h3>
                      </div>
                      <p className="text-xs text-gray-600">Learning through critical thinking</p>
                    </div>
                    
                    <div className="bg-white p-3 rounded-lg shadow-sm border-l-4 border-yellow-500 hover:shadow-md transition-all duration-200">
                      <div className="flex items-center mb-2">
                        <TrendingUp className="h-5 w-5 text-yellow-500 mr-2" />
                        <h3 className="font-medium">Economic Theory</h3>
                      </div>
                      <p className="text-xs text-gray-600">Markets & knowledge distribution</p>
                    </div>
                    
                    <div className="bg-white p-3 rounded-lg shadow-sm border-l-4 border-red-500 hover:shadow-md transition-all duration-200">
                      <div className="flex items-center mb-2">
                        <Trees className="h-5 w-5 text-red-500 mr-2" />
                        <h3 className="font-medium">Evolutionary Ideas</h3>
                      </div>
                      <p className="text-xs text-gray-600">Epistemology & natural selection</p>
                    </div>
                  </div>
                  
                  {/* Animated quote */}
                  <div className="bg-white p-4 rounded-lg shadow-sm mb-4 border-l-4 border-indigo-500 relative overflow-hidden group">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 to-purple-500 transform transition-transform duration-3000 -translate-x-full group-hover:translate-x-0"></div>
                    <p className="italic text-gray-600 font-medium text-center">
                      "True ignorance is not the absence of knowledge, but the refusal to acquire it."
                      <span className="block text-right text-sm mt-2">— Karl Popper</span>
                    </p>
                    <div className="absolute bottom-0 right-0 w-full h-1 bg-gradient-to-r from-purple-500 to-indigo-500 transform transition-transform duration-3000 translate-x-full group-hover:translate-x-0"></div>
                  </div>
                  
                  <button 
                    className="text-blue-600 hover:text-blue-800 text-sm flex items-center mt-4 group bg-white px-4 py-2 rounded-full shadow-sm transform transition-transform hover:scale-105"
                    onClick={() => markSectionComplete("legacy")}
                  >
                    <CheckCircle className="h-4 w-4 mr-2 group-hover:text-green-600 transition-colors" />
                    <span className="group-hover:text-green-600 transition-colors">Mark as complete</span>
                  </button>
                </section>

                {/* Practice Questions*/}
                <section id="practice" className="mb-8 bg-gray-50 p-6 rounded-lg border border-gray-200 transition-all duration-300 hover:shadow-md">
                  <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                    <FileText className="h-6 w-6 text-gray-600 mr-2" />
                    Conclusion
                  </h2>
                  
                  <div className="bg-white p-4 rounded-lg shadow-sm mb-4">
                    <h3 className="text-lg font-medium text-gray-800 mb-2">Key Takeaways</h3>
                    <ul className="list-disc pl-5 text-gray-700 space-y-2">
                      <li>Science is distinguished by falsifiability, not verifiability</li>
                      <li>Truly scientific theories make risky predictions</li>
                      <li>Knowledge advances through conjecture and refutation</li>
                      <li>We can never prove theories true, only provisionally accept them</li>
                      <li>Critical testing is the hallmark of rational inquiry</li>
                    </ul>
                  </div>
                  
                  <button 
                    className="text-blue-600 hover:text-blue-800 text-sm flex items-center mt-4 group bg-white px-4 py-2 rounded-full shadow-sm transform transition-transform hover:scale-105"
                    onClick={() => markSectionComplete("practice")}
                  >
                    <CheckCircle className="h-4 w-4 mr-2 group-hover:text-green-600 transition-colors" />
                    <span className="group-hover:text-green-600 transition-colors">Mark as complete</span>
                  </button>
                </section>

              </main>

            </div>

          </main>

        </div>

      </div>

    </div>
  );
}

export default PhilosophyCourseContentPage;