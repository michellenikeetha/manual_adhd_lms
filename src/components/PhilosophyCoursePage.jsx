import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const PhilosophyCoursePage = () => {
  const [activeSection, setActiveSection] = useState(null);
  const [showDefinitions, setShowDefinitions] = useState(false);
  const [timeSpent, setTimeSpent] = useState(0);
  const [breakReminder, setBreakReminder] = useState(false);
  const [focusMode, setFocusMode] = useState(false);
  const [highlightedText, setHighlightedText] = useState("");
  const [hoveredSection, setHoveredSection] = useState(null);

  const keyDefinitions = [
    { term: "Falsifiability", definition: "The criterion that scientific theories must be capable of being proven false through observation or experiment." },
    { term: "Pseudo-science", definition: "Fields of study that claim to be scientific but do not adhere to scientific methodology and standards." },
    { term: "Inductive method", definition: "A method of reasoning that proceeds from specific observations to form general conclusions." },
    { term: "Empirical evidence", definition: "Information acquired through observation or experimentation." },
    { term: "Verification", definition: "Finding evidence that confirms a theory or hypothesis." },
    { term: "Refutation", definition: "Finding evidence that disproves a theory or hypothesis." }
  ];

  const examples = [
    {
      title: "Einstein's Theory of Relativity",
      description: "Predicted that light would be attracted by heavy bodies, which could be tested during an eclipse. The theory made specific, risky predictions that could have been proven false.",
      isScientific: true
    },
    {
      title: "Marxist Theory of History",
      description: "Adherents found confirming evidence everywhere. The theory could explain any historical event, making it impossible to refute.",
      isScientific: false
    },
    {
      title: "Freudian Psychoanalysis",
      description: "Could explain contradictory behaviors (like drowning a child or saving a child) with equal ease, making it compatible with any observation.",
      isScientific: false
    },
    {
      title: "Adlerian Psychology",
      description: "Could interpret any case to fit the theory of inferiority feelings, without the possibility of refutation.",
      isScientific: false
    }
  ];

  const totalSections = 4;
  const completedSections = activeSection ? 1 : 0;
  
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeSpent(prev => prev + 1);
    }, 60000); 
    
    return () => clearInterval(timer);
  }, []);
  
  useEffect(() => {
    if (timeSpent >= 20 && timeSpent % 20 === 0) {
      setBreakReminder(true);
      setTimeout(() => setBreakReminder(false), 10000);
    }
  }, [timeSpent]);

  const handleTextSelect = () => {
    const selection = window.getSelection();
    if (selection.toString()) {
      setHighlightedText(selection.toString());
    }
  };

  const getBackgroundColor = () => {
    return focusMode ? 'bg-gray-100' : 'bg-gray-50';
  };

  return (
    <div className={`min-h-screen ${getBackgroundColor()} p-6 transition-colors duration-300`} onMouseUp={handleTextSelect}>
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
        <motion.div 
          className="bg-indigo-700 px-6 py-4"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-2xl font-bold text-white">Science: Conjectures and Refutations</h1>
              <p className="text-indigo-100">From Karl Popper, Conjectures and Refutations (1963)</p>
              <p className="text-xs text-indigo-200 mt-2">Lecture notes for SCS4225/IS4119 Philosophy of Science</p>
            </div>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setFocusMode(!focusMode)}
              className={`mt-4 md:mt-0 flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors
                ${focusMode ? 'bg-blue-500 text-white' : 'bg-blue-100 text-blue-500'}`}
            >
              {focusMode ? (
                <>
                  <span className="text-lg">−</span>
                  <span>Focus Mode</span>
                </>
              ) : (
                <>
                  <span className="text-lg">+</span>
                  <span>Normal Mode</span>
                </>
              )}
            </motion.button>
          </div>
        </motion.div>

        <motion.div 
          className="bg-blue-50 p-3 flex justify-between items-center border-b border-blue-100"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <div className="flex space-x-2 items-center">
            <div className="px-3 py-1 bg-blue-100 text-blue-800 rounded-md text-sm flex items-center">
              <span className="mr-2">Progress:</span>
              <div className="w-24 h-3 bg-gray-200 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-green-500 transition-all duration-500" 
                  style={{ width: `${(completedSections / totalSections) * 100}%` }}
                ></div>
              </div>
            </div>
          </div>
          
          {highlightedText && (
            <div className="px-3 py-1 bg-indigo-100 text-indigo-800 rounded-md text-sm">
              Selected: {highlightedText.length > 30 ? highlightedText.substring(0, 30) + '...' : highlightedText}
            </div>
          )}
        </motion.div>

        {breakReminder && (
          <motion.div 
            className="fixed top-4 right-4 bg-green-100 text-green-800 p-4 rounded-lg shadow-lg z-50 max-w-xs"
            initial={{ opacity: 0, scale: 0.8, x: 100 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            exit={{ opacity: 0, scale: 0.8, x: 100 }}
          >
            <p className="font-bold">Time for a short break! 😊</p>
            <p className="text-sm mt-1">You've been studying for 20 minutes. Consider taking a 5-minute break to refresh your focus.</p>
            <button 
              className="mt-2 px-3 py-1 bg-green-500 text-white rounded-md text-sm"
              onClick={() => setBreakReminder(false)}
            >
              Got it
            </button>
          </motion.div>
        )}

        <div className="p-6">
          <motion.div 
            className="mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            <h2 className="text-xl font-semibold text-indigo-800 mb-4">The Central Problem</h2>
            <motion.div 
              className={`bg-indigo-50 p-4 rounded-lg border-l-4 border-indigo-500 transition-all duration-300 ${
                focusMode && hoveredSection !== 'intro' ? 'opacity-50' : 'opacity-100'
              }`}
              whileHover={{ scale: 1.02 }}
              onHoverStart={() => setHoveredSection('intro')}
              onHoverEnd={() => setHoveredSection(null)}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <p className="italic text-indigo-800">
                "When should a theory be ranked as scientific? Is there a criterion for the scientific character or status of a theory?"
              </p>
            </motion.div>
            <p className={`mt-4 text-gray-700 transition-all duration-300 ${
              focusMode && hoveredSection !== 'intro-text' ? 'opacity-50' : 'opacity-100'
            }`}
            onMouseEnter={() => setHoveredSection('intro-text')}
            onMouseLeave={() => setHoveredSection(null)}>
              Popper sought to distinguish between science and pseudo-science, recognizing that science sometimes errs, 
              and pseudo-science may occasionally find truth. His concern wasn't with determining when theories are true or acceptable, 
              but rather what makes a theory genuinely scientific.
            </p>
          </motion.div>

          <motion.button 
            onClick={() => setShowDefinitions(!showDefinitions)}
            className="mb-6 bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {showDefinitions ? "Hide Key Concepts" : "Show Key Concepts"}
          </motion.button>

          <AnimatePresence>
            {showDefinitions && (
              <motion.div 
                className="mb-8 grid grid-cols-1 md:grid-cols-2 gap-4"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
              >
                {keyDefinitions.map((item, index) => (
                  <motion.div 
                    key={index} 
                    className={`bg-gray-50 p-4 rounded-lg border border-gray-200 transition-all duration-300 ${
                      focusMode && hoveredSection !== `definition-${index}` ? 'opacity-50' : 'opacity-100'
                    }`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.3 }}
                    whileHover={{ scale: 1.03, boxShadow: "0 4px 6px rgba(0,0,0,0.1)" }}
                    onHoverStart={() => setHoveredSection(`definition-${index}`)}
                    onHoverEnd={() => setHoveredSection(null)}
                  >
                    <h3 className="font-bold text-indigo-600">{item.term}</h3>
                    <p className="text-gray-700">{item.definition}</p>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>

          <div className="space-y-4">
            <motion.div 
              className={`border border-gray-200 rounded-lg transition-all duration-300 ${
                focusMode && hoveredSection !== 'section-1' ? 'opacity-50' : 'opacity-100'
              }`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.3 }}
              onHoverStart={() => setHoveredSection('section-1')}
              onHoverEnd={() => setHoveredSection(null)}
            >
              <button 
                className="w-full text-left p-4 flex justify-between items-center bg-gray-50 hover:bg-gray-100 transition-colors rounded-t-lg"
                onClick={() => setActiveSection(activeSection === 1 ? null : 1)}
              >
                <h3 className="text-lg font-medium">The Context: Vienna, Post-WWI</h3>
                <motion.span
                  animate={{ rotate: activeSection === 1 ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {activeSection === 1 ? "−" : "+"}
                </motion.span>
              </button>
              <AnimatePresence>
                {activeSection === 1 && (
                  <motion.div 
                    className="p-4 bg-white"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <p className="text-gray-700">
                      After the collapse of the Austrian Empire, revolutionary ideas and new theories were abundant in Vienna. 
                      Among these were Einstein's theory of relativity, Marx's theory of history, Freud's psychoanalysis, and 
                      Alfred Adler's "individual psychology." Popper was particularly influenced by the 1919 confirmation of 
                      Einstein's theory of gravitation by Eddington's eclipse observations.
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>

            <motion.div 
              className={`border border-gray-200 rounded-lg transition-all duration-300 ${
                focusMode && hoveredSection !== 'section-2' ? 'opacity-50' : 'opacity-100'
              }`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.3 }}
              onHoverStart={() => setHoveredSection('section-2')}
              onHoverEnd={() => setHoveredSection(null)}
            >
              <button 
                className="w-full text-left p-4 flex justify-between items-center bg-gray-50 hover:bg-gray-100 transition-colors rounded-t-lg"
                onClick={() => setActiveSection(activeSection === 2 ? null : 2)}
              >
                <h3 className="text-lg font-medium">The Problem with Certain Theories</h3>
                <motion.span
                  animate={{ rotate: activeSection === 2 ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {activeSection === 2 ? "−" : "+"}
                </motion.span>
              </button>
              <AnimatePresence>
                {activeSection === 2 && (
                  <motion.div 
                    className="p-4 bg-white"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <p className="text-gray-700 mb-4">
                      Popper became increasingly dissatisfied with Marxism, psychoanalysis, and individual psychology. 
                      Despite their claims to scientific status, these theories seemed fundamentally different from physical theories like Newton's or Einstein's.
                    </p>
                    <p className="text-gray-700">
                      His concern wasn't about their truth or exactness, but rather that they resembled primitive myths more than science. 
                      They seemed more like astrology than astronomy.
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>

            <motion.div 
              className={`border border-gray-200 rounded-lg transition-all duration-300 ${
                focusMode && hoveredSection !== 'section-3' ? 'opacity-50' : 'opacity-100'
              }`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.3 }}
              onHoverStart={() => setHoveredSection('section-3')}
              onHoverEnd={() => setHoveredSection(null)}
            >
              <button 
                className="w-full text-left p-4 flex justify-between items-center bg-gray-50 hover:bg-gray-100 transition-colors rounded-t-lg"
                onClick={() => setActiveSection(activeSection === 3 ? null : 3)}
              >
                <h3 className="text-lg font-medium">The Problem of Confirmation</h3>
                <motion.span
                  animate={{ rotate: activeSection === 3 ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {activeSection === 3 ? "−" : "+"}
                </motion.span>
              </button>
              <AnimatePresence>
                {activeSection === 3 && (
                  <motion.div 
                    className="p-4 bg-white"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <p className="text-gray-700 mb-4">
                      Adherents of Marx, Freud, and Adler found "confirming instances" everywhere. The world seemed full of verifications of their theories.
                    </p>
                    <p className="text-gray-700 mb-4">
                      Popper's personal experience with Adler illustrated this problem. Adler confidently analyzed a case he hadn't even seen,
                      claiming his "thousandfold experience" as justification. When challenged, Popper realized that each new case
                      was interpreted in light of previous experience and counted as additional confirmation.
                    </p>
                    <motion.div 
                      className="bg-yellow-50 p-4 rounded-lg border-l-4 border-yellow-500 mb-4"
                      whileHover={{ scale: 1.02 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <p className="text-gray-700">
                        <strong>Critical insight:</strong> These theories could interpret <em>any</em> conceivable case, making them impossible to falsify.
                      </p>
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>

            <motion.div 
              className={`border border-gray-200 rounded-lg transition-all duration-300 ${
                focusMode && hoveredSection !== 'section-4' ? 'opacity-50' : 'opacity-100'
              }`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.3 }}
              onHoverStart={() => setHoveredSection('section-4')}
              onHoverEnd={() => setHoveredSection(null)}
            >
              <button 
                className="w-full text-left p-4 flex justify-between items-center bg-gray-50 hover:bg-gray-100 transition-colors rounded-t-lg"
                onClick={() => setActiveSection(activeSection === 4 ? null : 4)}
              >
                <h3 className="text-lg font-medium">Einstein's Theory: A Different Approach</h3>
                <motion.span
                  animate={{ rotate: activeSection === 4 ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {activeSection === 4 ? "−" : "+"}
                </motion.span>
              </button>
              <AnimatePresence>
                {activeSection === 4 && (
                  <motion.div 
                    className="p-4 bg-white"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <p className="text-gray-700 mb-4">
                      Einstein's theory presented a stark contrast. It made specific predictions about light bending around the sun,
                      which could be photographed during an eclipse.
                    </p>
                    <p className="text-gray-700 mb-4">
                      The crucial difference was the <strong>risk</strong> involved in such predictions. If observations had shown the predicted effect
                      was absent, the theory would have been refuted. The theory was incompatible with certain possible observations.
                    </p>
                    <motion.div 
                      className="bg-green-50 p-4 rounded-lg border-l-4 border-green-500"
                      whileHover={{ scale: 1.02 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <p className="text-gray-700">
                        <strong>Key conclusion:</strong> Scientific theories must prohibit certain observations;
                        they must be capable of being refuted by experience.
                      </p>
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>

          <motion.div 
            className={`mt-8 bg-blue-50 p-4 rounded-lg transition-all duration-300 ${
              focusMode && hoveredSection !== 'visualization' ? 'opacity-50' : 'opacity-100'
            }`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            onHoverStart={() => setHoveredSection('visualization')}
            onHoverEnd={() => setHoveredSection(null)}
          >
            <h2 className="text-xl font-semibold text-indigo-800 mb-4">Visual Concept Map</h2>
            <div className="flex justify-center">
              <div className="relative w-full max-w-xl h-64 bg-white rounded-lg p-4">
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-indigo-100 border-2 border-indigo-600 rounded-full w-32 h-32 flex items-center justify-center text-center p-2">
                  <div>
                    <div className="font-bold text-indigo-800">Falsifiability</div>
                    <div className="text-xs text-indigo-600">Scientific Criterion</div>
                  </div>
                </div>
                
                <motion.div
                  className="absolute top-1/4 left-1/4 bg-green-100 border border-green-500 rounded-lg w-24 h-16 flex items-center justify-center text-center"
                  initial={{ x: 0, y: 0 }}
                  animate={{ x: [0, -5, 0, 5, 0], y: [0, -5, 0, 5, 0] }}
                  transition={{ repeat: Infinity, duration: 5, repeatType: "reverse" }}
                >
                  <div className="text-sm text-green-700">Einstein's Theory</div>
                </motion.div>
                
                <motion.div
                  className="absolute bottom-1/4 right-1/4 bg-red-100 border border-red-500 rounded-lg w-24 h-16 flex items-center justify-center text-center"
                  initial={{ x: 0, y: 0 }}
                  animate={{ x: [0, 5, 0, -5, 0], y: [0, 5, 0, -5, 0] }}
                  transition={{ repeat: Infinity, duration: 5, repeatType: "reverse" }}
                >
                  <div className="text-sm text-red-700">Pseudo-science</div>
                </motion.div>
                
                <motion.div
                  className="absolute top-1/4 right-1/4 bg-yellow-100 border border-yellow-500 rounded-lg w-24 h-16 flex items-center justify-center text-center"
                  initial={{ x: 0, y: 0 }}
                  animate={{ x: [0, 5, 0, -5, 0], y: [0, -5, 0, 5, 0] }}
                  transition={{ repeat: Infinity, duration: 5, repeatType: "reverse" }}
                >
                  <div className="text-sm text-yellow-700">Confirmation Problem</div>
                </motion.div>
                
                <motion.div
                  className="absolute bottom-1/4 left-1/4 bg-blue-100 border border-blue-500 rounded-lg w-24 h-16 flex items-center justify-center text-center"
                  initial={{ x: 0, y: 0 }}
                  animate={{ x: [0, -5, 0, 5, 0], y: [0, 5, 0, -5, 0] }}
                  transition={{ repeat: Infinity, duration: 5, repeatType: "reverse" }}
                >
                  <div className="text-sm text-blue-700">Testable Predictions</div>
                </motion.div>
                
                <svg className="absolute inset-0 w-full h-full" style={{ zIndex: -1 }}>
                  <line x1="50%" y1="50%" x2="25%" y2="25%" stroke="#4F46E5" strokeWidth="2" />
                  <line x1="50%" y1="50%" x2="75%" y2="25%" stroke="#4F46E5" strokeWidth="2" />
                  <line x1="50%" y1="50%" x2="75%" y2="75%" stroke="#4F46E5" strokeWidth="2" />
                  <line x1="50%" y1="50%" x2="25%" y2="75%" stroke="#4F46E5" strokeWidth="2" />
                </svg>
              </div>
            </div>
          </motion.div>

          <motion.div 
            className={`mt-8 transition-all duration-300 ${
              focusMode && hoveredSection !== 'table' ? 'opacity-50' : 'opacity-100'
            }`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.5 }}
            onHoverStart={() => setHoveredSection('table')}
            onHoverEnd={() => setHoveredSection(null)}
          >
            <h2 className="text-xl font-semibold text-indigo-800 mb-4">Theories Compared</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white border border-gray-300">
                <thead>
                  <tr>
                    <th className="py-2 px-4 border-b border-gray-300 text-left">Theory</th>
                    <th className="py-2 px-4 border-b border-gray-300 text-left">Description</th>
                    <th className="py-2 px-4 border-b border-gray-300 text-center">Scientific?</th>
                  </tr>
                </thead>
                <tbody>
                  {examples.map((example, index) => (
                    <motion.tr 
                      key={index} 
                      className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.8 + (index * 0.1), duration: 0.3 }}
                      whileHover={{ scale: 1.01, backgroundColor: "#f0f4ff" }}
                    >
                      <td className="py-2 px-4 border-b border-gray-300 font-medium">{example.title}</td>
                      <td className="py-2 px-4 border-b border-gray-300">{example.description}</td>
                      <td className="py-2 px-4 border-b border-gray-300 text-center">
                        {example.isScientific ? 
                          <motion.span 
                            className="text-green-600 font-bold"
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{ duration: 1, repeat: Infinity, repeatDelay: 2 }}
                          >✓</motion.span> : 
                          <motion.span 
                            className="text-red-600 font-bold"
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{ duration: 1, repeat: Infinity, repeatDelay: 2 }}
                          >✗</motion.span>
                        }
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>

          <motion.div 
            className={`mt-8 bg-purple-50 p-6 rounded-lg transition-all duration-300 ${
              focusMode && hoveredSection !== 'quiz' ? 'opacity-50' : 'opacity-100'
            }`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9, duration: 0.5 }}
            onHoverStart={() => setHoveredSection('quiz')}
            onHoverEnd={() => setHoveredSection(null)}
          >
            <h2 className="text-xl font-semibold text-purple-800 mb-4">Quick Check: Test Your Understanding</h2>
            <div className="space-y-4">
              <div className="bg-white p-4 rounded-lg shadow-sm">
              <p className="font-medium text-purple-800">Which of these is a key characteristic of a scientific theory according to Popper?</p>
                <div className="mt-3 space-y-2">
                  <div className="flex items-center space-x-2 p-2 hover:bg-purple-100 rounded-md transition-colors">
                    <input type="radio" id="option1" name="quiz1" className="text-purple-600 focus:ring-purple-500" />
                    <label htmlFor="option1" className="text-gray-700">It explains all observable phenomena in its domain</label>
                  </div>
                  <div className="flex items-center space-x-2 p-2 hover:bg-purple-100 rounded-md transition-colors">
                    <input type="radio" id="option2" name="quiz1" className="text-purple-600 focus:ring-purple-500" />
                    <label htmlFor="option2" className="text-gray-700">It has been confirmed by numerous observations</label>
                  </div>
                  <div className="flex items-center space-x-2 p-2 hover:bg-purple-100 rounded-md transition-colors">
                    <input type="radio" id="option3" name="quiz1" className="text-purple-600 focus:ring-purple-500" />
                    <label htmlFor="option3" className="text-gray-700">It makes predictions that could potentially be falsified</label>
                  </div>
                  <div className="flex items-center space-x-2 p-2 hover:bg-purple-100 rounded-md transition-colors">
                    <input type="radio" id="option4" name="quiz1" className="text-purple-600 focus:ring-purple-500" />
                    <label htmlFor="option4" className="text-gray-700">It was developed using the scientific method</label>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-4 flex justify-end">
              <motion.button 
                className="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Check Answers
              </motion.button>
            </div>
          </motion.div>

          <motion.div 
            className={`mt-8 transition-all duration-300 ${
              focusMode && hoveredSection !== 'summary' ? 'opacity-50' : 'opacity-100'
            }`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.0, duration: 0.5 }}
            onHoverStart={() => setHoveredSection('summary')}
            onHoverEnd={() => setHoveredSection(null)}
          >
            <h2 className="text-xl font-semibold text-indigo-800 mb-4">Key Takeaways</h2>
            <div className="bg-indigo-50 p-4 rounded-lg">
              <ul className="space-y-2">
                <motion.li 
                  className="flex items-start"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1.1, duration: 0.3 }}
                >
                  <span className="text-indigo-600 mr-2">•</span>
                  <span className="text-gray-700">
                    Popper argues that <strong>falsifiability</strong>, not verification, is the criterion for scientific status.
                  </span>
                </motion.li>
                <motion.li 
                  className="flex items-start"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1.2, duration: 0.3 }}
                >
                  <span className="text-indigo-600 mr-2">•</span>
                  <span className="text-gray-700">
                    Scientific theories must prohibit certain observable events and make risky predictions.
                  </span>
                </motion.li>
                <motion.li 
                  className="flex items-start"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1.3, duration: 0.3 }}
                >
                  <span className="text-indigo-600 mr-2">•</span>
                  <span className="text-gray-700">
                    Theories that explain everything explain nothing; they are not testable or scientific.
                  </span>
                </motion.li>
                <motion.li 
                  className="flex items-start"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1.4, duration: 0.3 }}
                >
                  <span className="text-indigo-600 mr-2">•</span>
                  <span className="text-gray-700">
                    Einstein's theory exemplifies scientific theory by making specific, testable predictions.
                  </span>
                </motion.li>
              </ul>
            </div>
          </motion.div>

          <motion.div 
            className={`mt-8 mb-4 transition-all duration-300 ${
              focusMode && hoveredSection !== 'further-reading' ? 'opacity-50' : 'opacity-100'
            }`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.1, duration: 0.5 }}
            onHoverStart={() => setHoveredSection('further-reading')}
            onHoverEnd={() => setHoveredSection(null)}
          >
            <h2 className="text-xl font-semibold text-indigo-800 mb-4">Further Reading</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <motion.div 
                className="bg-white p-4 rounded-lg border border-gray-200 hover:border-indigo-300 hover:shadow-md transition-all duration-300"
                whileHover={{ scale: 1.03 }}
              >
                <h3 className="font-medium text-indigo-700">Karl Popper - The Logic of Scientific Discovery (1959)</h3>
                <p className="text-gray-600 text-sm mt-1">
                  Popper's most comprehensive work elaborating his philosophy of science and the concept of falsifiability.
                </p>
              </motion.div>
              <motion.div 
                className="bg-white p-4 rounded-lg border border-gray-200 hover:border-indigo-300 hover:shadow-md transition-all duration-300"
                whileHover={{ scale: 1.03 }}
              >
                <h3 className="font-medium text-indigo-700">Thomas Kuhn - The Structure of Scientific Revolutions (1962)</h3>
                <p className="text-gray-600 text-sm mt-1">
                  A contrasting perspective to Popper's views on how science progresses through paradigm shifts.
                </p>
              </motion.div>
            </div>
          </motion.div>
        </div>

        <motion.div 
          className="bg-gray-100 px-6 py-4 border-t border-gray-200"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.5 }}
        >
          <div className="flex flex-col md:flex-row md:justify-between md:items-center text-sm text-gray-600">
            <div className="mb-2 md:mb-0">
              <p>© 2025 University Philosophy Department</p>
            </div>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-indigo-600 transition-colors">Course Syllabus</a>
              <a href="#" className="hover:text-indigo-600 transition-colors">Next Lecture</a>
              <a href="#" className="hover:text-indigo-600 transition-colors">Contact</a>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default PhilosophyCoursePage;