import React, { useState, useEffect } from 'react';
import SignedInNavbar from "./SignedInNavbar";
import { useNavigate } from 'react-router-dom';
import { 
  ArrowRight, BookOpen, FileText, HelpCircle, CheckCircle, AlertTriangle,
  Eye, EyeOff, Brain, Zap, Award, Timer, MousePointer,
  ArrowUp, Target, Book, BarChart2, Lightbulb, Lock, Unlock, MessageSquare,
  ClipboardCheck, Edit3
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
        <div className="flex justify-end">

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

        <div className="flex" >
          {/* Side Navigation Panel - Table of Contents */}
          <aside className="w-64 bg-white shadow-md sidebar overflow-y-auto fixed top-1/2 left-40 transform -translate-y-1/2">
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

                {/* Section 1 with visual enhancement */}
                <section id="distinguishing" className="mb-8 bg-blue-50 p-6 rounded-lg border border-blue-100 transition-all duration-300 hover:shadow-md relative">
                  <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                    <Zap className="h-6 w-6 text-blue-600 mr-2" />
                    Distinguishing Science from Pseudo-Science
                  </h2>
                  
                  {/* Visual representation of Popper's timeline */}
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
                    className="text-blue-600 hover:text-blue-800 text-sm flex items-center mt-4 group"
                    onClick={() => markSectionComplete("distinguishing")}
                  >
                    <CheckCircle className="h-4 w-4 mr-1 group-active:text-green-600 transition-colors" />
                    <span className="group-active:text-green-600 transition-colors">Mark as complete</span>
                  </button>
                </section>

                {/* Section 2 */}
                <section id="influences" className="mb-8 bg-gray-50 p-6 rounded-lg border border-gray-100 transition-all duration-300 hover:shadow-md relative">
                  <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                    <Book className="h-6 w-6 text-gray-600 mr-2" />
                    Influences and Context
                  </h2>
                  
                  <div className="grid md:grid-cols-2 gap-4 mb-4">
                    <div className="theory-comparison bg-white p-4 rounded-lg shadow-sm">
                      <h3 className="text-lg font-medium text-gray-800 mb-2">Logical Positivism</h3>
                      <p className="text-gray-700 text-sm">
                        The dominant philosophy of science in early 20th century, which held that meaningful statements must be empirically <span className="font-semibold text-blue-800">verifiable</span>.
                      </p>
                    </div>
                    
                    <div className="theory-comparison bg-white p-4 rounded-lg shadow-sm">
                      <h3 className="text-lg font-medium text-gray-800 mb-2">Einstein vs. Marx/Freud</h3>
                      <p className="text-gray-700 text-sm">
                        Popper was impressed by Einstein's <span className="font-semibold text-blue-800">testable predictions</span> but skeptical of Marx and Freud whose theories seemed to explain everything without risking falsification.
                      </p>
                    </div>
                  </div>
                  
                  <p className="text-gray-700 mb-4">
                    Popper developed his ideas during the early 20th century when various intellectual movements, including Marxism, psychoanalysis, and Einstein's relativity theory, were competing for <span className="font-semibold text-blue-800">scientific legitimacy</span>.
                  </p>
                  
                  <div className="bg-white p-4 rounded-lg shadow-sm mb-4 border-l-4 border-purple-500">
                    <p className="italic text-gray-600">
                      "Einstein's theory, as I saw it, was not a source of dogmatic certainty, but rather a hypothesis that might be falsified."
                      <span className="block text-right text-sm mt-1">— Karl Popper</span>
                    </p>
                  </div>
                  
                  <button 
                    className="text-blue-600 hover:text-blue-800 text-sm flex items-center mt-4 group"
                    onClick={() => markSectionComplete("influences")}
                  >
                    <CheckCircle className="h-4 w-4 mr-1 group-active:text-green-600 transition-colors" />
                    <span className="group-active:text-green-600 transition-colors">Mark as complete</span>
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
                    className="text-blue-600 hover:text-blue-800 text-sm flex items-center mt-4 group"
                    onClick={() => markSectionComplete("problem")}
                  >
                    <CheckCircle className="h-4 w-4 mr-1 group-active:text-green-600 transition-colors" />
                    <span className="group-active:text-green-600 transition-colors">Mark as complete</span>
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
                    className="text-blue-600 hover:text-blue-800 text-sm flex items-center mt-4 group"
                    onClick={() => markSectionComplete("einstein")}
                  >
                    <CheckCircle className="h-4 w-4 mr-1 group-active:text-green-600 transition-colors" />
                    <span className="group-active:text-green-600 transition-colors">Mark as complete</span>
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
                    className="text-blue-600 hover:text-blue-800 text-sm flex items-center mt-4 group"
                    onClick={() => markSectionComplete("principles")}
                  >
                    <CheckCircle className="h-4 w-4 mr-1 group-active:text-green-600 transition-colors" />
                    <span className="group-active:text-green-600 transition-colors">Mark as complete</span>
                  </button>
                </section>

                {/* Section 6 */}
                <section id="falsifiability" className="mb-8 bg-purple-50 p-6 rounded-lg border border-purple-100 transition-all duration-300 hover:shadow-md">
                  <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                    <Lock className="h-6 w-6 text-purple-600 mr-2" />
                    Understanding Falsifiability
                  </h2>
                  
                  <div className="bg-white p-4 rounded-lg shadow-sm mb-4">
                    <h3 className="text-md font-medium text-gray-800 mb-2">What Makes a Theory Falsifiable?</h3>
                    <p className="text-gray-700 mb-2">
                      A theory is falsifiable if and only if:
                    </p>
                    <ul className="list-disc pl-5 text-gray-700 space-y-1">
                      <li>It makes specific, testable predictions</li>
                      <li>It prohibits certain observations or results</li>
                      <li>There exists at least one possible observation that would contradict it</li>
                    </ul>
                  </div>
                  
                  <p className="text-gray-700 mb-4">
                    Falsifiability is not about whether a theory is actually false, but whether it <span className="font-semibold text-purple-800">could be shown to be false</span> if contradictory evidence emerged. The more ways a theory could be falsified, the more scientific it is.
                  </p>
                  
                  <div className="grid md:grid-cols-2 gap-4 mb-4">
                    <div className="theory-comparison bg-white p-4 rounded-lg shadow-sm">
                      <h3 className="text-lg font-medium text-gray-800 mb-2">Falsifiable</h3>
                      <p className="text-gray-700 text-sm">
                        "All swans are white."<br/>
                        (Can be disproven by finding a single black swan)
                      </p>
                    </div>
                    
                    <div className="theory-comparison bg-white p-4 rounded-lg shadow-sm">
                      <h3 className="text-lg font-medium text-gray-800 mb-2">Unfalsifiable</h3>
                      <p className="text-gray-700 text-sm">
                        "There exists at least one white swan somewhere in the universe."<br/>
                        (Cannot be disproven no matter how many non-white swans are found)
                      </p>
                    </div>
                  </div>
                  
                  <button 
                    className="text-blue-600 hover:text-blue-800 text-sm flex items-center mt-4 group"
                    onClick={() => markSectionComplete("falsifiability")}
                  >
                    <CheckCircle className="h-4 w-4 mr-1 group-active:text-green-600 transition-colors" />
                    <span className="group-active:text-green-600 transition-colors">Mark as complete</span>
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
                    className="text-blue-600 hover:text-blue-800 text-sm flex items-center mt-4 group"
                    onClick={() => markSectionComplete("criticism")}
                  >
                    <CheckCircle className="h-4 w-4 mr-1 group-active:text-green-600 transition-colors" />
                    <span className="group-active:text-green-600 transition-colors">Mark as complete</span>
                  </button>
                </section>

                {/* Section 8 */}
                <section id="legacy" className="mb-8 bg-orange-50 p-6 rounded-lg border border-orange-100 transition-all duration-300 hover:shadow-md">
                  <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                    <Award className="h-6 w-6 text-orange-600 mr-2" />
                    Legacy and Influence
                  </h2>
                  
                  <p className="text-gray-700 mb-4">
                    Despite criticisms, Popper's falsifiability criterion remains a powerful tool for distinguishing between scientific and pseudo-scientific claims. His emphasis on <span className="font-semibold text-indigo-800">critical rationalism</span> has influenced fields beyond philosophy of science.
                  </p>
                  
                  <div className="bg-white p-4 rounded-lg shadow-sm mb-4">
                    <h3 className="text-md font-medium text-gray-800 mb-2">Areas Influenced by Popper:</h3>
                    <ul className="list-disc pl-5 text-gray-700 space-y-1">
                      <li>Political philosophy (critique of historicism and defense of the open society)</li>
                      <li>Evolutionary epistemology</li>
                      <li>Scientific methodology and research design</li>
                      <li>Economic theory</li>
                      <li>Educational theory</li>
                    </ul>
                  </div>
                  
                  <div className="bg-white p-4 rounded-lg shadow-sm mb-4 border-l-4 border-indigo-500">
                    <p className="italic text-gray-600">
                      "True ignorance is not the absence of knowledge, but the refusal to acquire it."
                      <span className="block text-right text-sm mt-1">— Karl Popper</span>
                    </p>
                  </div>
                  
                  <button 
                    className="text-blue-600 hover:text-blue-800 text-sm flex items-center mt-4 group"
                    onClick={() => markSectionComplete("legacy")}
                  >
                    <CheckCircle className="h-4 w-4 mr-1 group-active:text-green-600 transition-colors" />
                    <span className="group-active:text-green-600 transition-colors">Mark as complete</span>
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
                    className="text-blue-600 hover:text-blue-800 text-sm flex items-center mt-4 group"
                    onClick={() => markSectionComplete("practice")}
                  >
                    <CheckCircle className="h-4 w-4 mr-1 group-active:text-green-600 transition-colors" />
                    <span className="group-active:text-green-600 transition-colors">Mark as complete</span>
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