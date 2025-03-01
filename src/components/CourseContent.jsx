import React, { useState } from "react";
import SignedInNavbar from "./SignedInNavbar";
import programmingLanguagesImage from "../assets/langs.png";
import flowchartImage from "../assets/flowchart.png";
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Timer, 
  Bookmark, 
  PlayCircle, 
  PauseCircle, 
  ChevronDown, 
  ChevronUp, 
  CheckSquare,
  Eye,
  EyeOff
} from 'lucide-react';

const CourseContent = () => {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState("intro");
  const [expandedSections, setExpandedSections] = useState({
    intro: true,
    languages: false,
    algorithms: false,
    compiling: false,
    binary: false,
    summary: false
  });
  const [focusMode, setFocusMode] = useState(false);
  const [progress, setProgress] = useState(0);
  const [completedSections, setCompletedSections] = useState([]);
  const [hoveredSection, setHoveredSection] = useState(null);

  const toggleSection = (section) => {
    setExpandedSections({
      ...expandedSections,
      [section]: !expandedSections[section]
    });
    if (!expandedSections[section]) {
      setActiveSection(section);
    }
  };

  const markAsComplete = (section) => {
    if (!completedSections.includes(section)) {
      const newCompleted = [...completedSections, section];
      setCompletedSections(newCompleted);
      setProgress(Math.floor((newCompleted.length / 6) * 100));
    } else {
      const newCompleted = completedSections.filter(s => s !== section);
      setCompletedSections(newCompleted);
      setProgress(Math.floor((newCompleted.length / 6) * 100));
    }
  };

  const toggleFocusMode = () => {
    setFocusMode(!focusMode);
  };

  const getBackgroundColor = () => {
    return focusMode ? 'bg-gray-100' : 'bg-gray-50';
  };

  return (
    <div className={`${getBackgroundColor()} min-h-screen transition-colors duration-300`}>
      <SignedInNavbar />

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-5xl mx-auto bg-white p-6 rounded-lg shadow-lg mb-4">
          <div className="flex flex-wrap justify-between items-center">
            <h1 className="text-3xl font-bold text-blue-600">
              Unit 1: Introduction to Programming
            </h1>
            <div className="flex space-x-4 mt-4 md:mt-0">
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={toggleFocusMode}
                className={`flex items-center px-4 py-2 rounded-lg text-sm transition-colors ${
                  focusMode 
                    ? 'bg-blue-500 text-white' 
                    : 'bg-blue-100 text-blue-500'
                }`}
              >
                {focusMode ? (
                  <>
                    <EyeOff className="mr-2 h-4 w-4" />
                    <span>Focus Mode</span>
                  </>
                ) : (
                  <>
                    <Eye className="mr-2 h-4 w-4" />
                    <span>Normal Mode</span>
                  </>
                )}
              </motion.button>
            </div>
          </div>

          <div className="mt-6">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-gray-700">Your progress</span>
              <span className="text-sm font-medium text-blue-600">{progress}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <motion.div 
                className="bg-blue-600 h-2.5 rounded-full" 
                style={{ width: `${progress}%` }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.5 }}
              ></motion.div>
            </div>
          </div>
        </div>

        <div className="max-w-5xl mx-auto flex flex-col md:flex-row gap-4">
          <div className="w-full md:w-1/4">
            <div className="bg-white p-4 rounded-lg shadow-lg sticky top-4">
              <h2 className="font-bold text-lg mb-4 text-gray-800">Jump to Section</h2>
              <ul className="space-y-2">
                <li>
                  <button 
                    onClick={() => setActiveSection("intro")}
                    className={`w-full text-left px-3 py-2 rounded-md text-sm transition ${activeSection === "intro" ? "bg-blue-100 text-blue-700 font-medium" : "hover:bg-gray-100"}`}
                  >
                    What is Programming?
                    {completedSections.includes("intro") && <CheckSquare className="inline ml-2 h-4 w-4 text-green-500" />}
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => setActiveSection("languages")}
                    className={`w-full text-left px-3 py-2 rounded-md text-sm transition ${activeSection === "languages" ? "bg-blue-100 text-blue-700 font-medium" : "hover:bg-gray-100"}`}
                  >
                    Programming Languages
                    {completedSections.includes("languages") && <CheckSquare className="inline ml-2 h-4 w-4 text-green-500" />}
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => setActiveSection("algorithms")}
                    className={`w-full text-left px-3 py-2 rounded-md text-sm transition ${activeSection === "algorithms" ? "bg-blue-100 text-blue-700 font-medium" : "hover:bg-gray-100"}`}
                  >
                    Algorithms & Flowcharts
                    {completedSections.includes("algorithms") && <CheckSquare className="inline ml-2 h-4 w-4 text-green-500" />}
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => setActiveSection("compiling")}
                    className={`w-full text-left px-3 py-2 rounded-md text-sm transition ${activeSection === "compiling" ? "bg-blue-100 text-blue-700 font-medium" : "hover:bg-gray-100"}`}
                  >
                    Compiling
                    {completedSections.includes("compiling") && <CheckSquare className="inline ml-2 h-4 w-4 text-green-500" />}
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => setActiveSection("binary")}
                    className={`w-full text-left px-3 py-2 rounded-md text-sm transition ${activeSection === "binary" ? "bg-blue-100 text-blue-700 font-medium" : "hover:bg-gray-100"}`}
                  >
                    Binary Code
                    {completedSections.includes("binary") && <CheckSquare className="inline ml-2 h-4 w-4 text-green-500" />}
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => setActiveSection("summary")}
                    className={`w-full text-left px-3 py-2 rounded-md text-sm transition ${activeSection === "summary" ? "bg-blue-100 text-blue-700 font-medium" : "hover:bg-gray-100"}`}
                  >
                    Summary
                    {completedSections.includes("summary") && <CheckSquare className="inline ml-2 h-4 w-4 text-green-500" />}
                  </button>
                </li>
              </ul>
              <div className="mt-6">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => navigate("/quiz")}
                  className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition flex items-center justify-center"
                >
                  Take Quiz
                </motion.button>
              </div>
            </div>
          </div>

          <div className="w-full md:w-3/4">
            <div className="bg-white p-8 rounded-lg shadow-lg">
              
              <motion.div 
                className={`mb-8 transition-all duration-300 ${
                  activeSection === "intro" 
                    ? "" 
                    : focusMode && hoveredSection !== "intro" 
                      ? "opacity-50" 
                      : "opacity-60"
                }`}
                animate={{ 
                  scale: hoveredSection === "intro" ? 1.02 : 1,
                }}
                onHoverStart={() => setHoveredSection("intro")}
                onHoverEnd={() => setHoveredSection(null)}
              >
                <div 
                  className="flex justify-between items-center cursor-pointer"
                  onClick={() => toggleSection("intro")}
                >
                  <h2 className="text-xl font-bold text-blue-600">What is Programming?</h2>
                  <button className="p-1">
                    {expandedSections.intro ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
                  </button>
                </div>

                <AnimatePresence>
                  {expandedSections.intro && (
                    <motion.div 
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="mt-4"
                    >
                      <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-4">
                        <div className="flex">
                          <div className="ml-3">
                            <p className="text-sm text-yellow-700">
                              <strong>Key Takeaway:</strong> Programming is how we tell computers what to do using special languages. It's like giving instructions that a computer can understand and follow.
                            </p>
                          </div>
                        </div>
                      </div>
                      
                      <p className="text-gray-700 text-md leading-relaxed">
                        Programming is the process of designing, writing, testing, and maintaining a set of instructions 
                        (called code) that a computer can execute.
                      </p>
                      
                      <div className="bg-blue-50 rounded-lg p-4 my-4">
                        <p className="text-blue-700 font-medium">Programming allows us to:</p>
                        <ul className="list-disc pl-6 text-gray-700 text-md mt-2 space-y-2">
                          <li>Solve real-world problems through automation.</li>
                          <li>Create interactive user experiences in apps and websites.</li>
                          <li>Process large volumes of data efficiently.</li>
                          <li>Develop artificial intelligence and machine learning systems.</li>
                        </ul>
                      </div>
                      
                      <div className="flex justify-between items-center mt-6">
                        <motion.button 
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className={`flex items-center ${completedSections.includes("intro") ? "text-green-600" : "text-blue-600"}`}
                          onClick={() => markAsComplete("intro")}
                        >
                          <CheckSquare className="mr-2 h-5 w-5" />
                          {completedSections.includes("intro") ? "Completed" : "Mark as complete"}
                        </motion.button>
                        <motion.button 
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="text-blue-600 hover:text-blue-800"
                          onClick={() => setActiveSection("languages")}
                        >
                          Next: Programming Languages →
                        </motion.button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>

              <motion.div 
                className={`mb-8 transition-all duration-300 ${
                  activeSection === "languages" 
                    ? "" 
                    : focusMode && hoveredSection !== "languages" 
                      ? "opacity-50" 
                      : "opacity-60"
                }`}
                animate={{ 
                  scale: hoveredSection === "languages" ? 1.02 : 1,
                }}
                onHoverStart={() => setHoveredSection("languages")}
                onHoverEnd={() => setHoveredSection(null)}
              >
                <div 
                  className="flex justify-between items-center cursor-pointer"
                  onClick={() => toggleSection("languages")}
                >
                  <h2 className="text-xl font-bold text-blue-600">Programming Languages</h2>
                  <button className="p-1">
                    {expandedSections.languages ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
                  </button>
                </div>

                <AnimatePresence>
                  {expandedSections.languages && (
                    <motion.div 
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="mt-4"
                    >
                      <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-4">
                        <div className="flex">
                          <div className="ml-3">
                            <p className="text-sm text-yellow-700">
                              <strong>Key Takeaway:</strong> Different programming languages are like different tools in a toolbox. Each language is designed for specific tasks, and programmers choose the right one for their project.
                            </p>
                          </div>
                        </div>
                      </div>

                      <p className="text-gray-700 text-md leading-relaxed">
                        Programming languages are tools that allow us to write code in a way that computers can interpret. Each 
                        language has its own syntax, structure, and purpose.
                      </p>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
                        <div className="bg-indigo-50 p-4 rounded-lg border border-indigo-100">
                          <p className="font-medium text-indigo-700">Python</p>
                          <p className="text-sm text-gray-700 mt-1">Known for its simplicity. Used in data science, AI, and web development.</p>
                        </div>
                        <div className="bg-red-50 p-4 rounded-lg border border-red-100">
                          <p className="font-medium text-red-700">Java</p>
                          <p className="text-sm text-gray-700 mt-1">Portable and used in enterprise applications and Android app development.</p>
                        </div>
                        <div className="bg-green-50 p-4 rounded-lg border border-green-100">
                          <p className="font-medium text-green-700">C++</p>
                          <p className="text-sm text-gray-700 mt-1">Ideal for system programming, game development, and high-performance applications.</p>
                        </div>
                        <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-100">
                          <p className="font-medium text-yellow-700">JavaScript</p>
                          <p className="text-sm text-gray-700 mt-1">Essential for creating interactive web applications and front-end development.</p>
                        </div>
                      </div>

                      <div className="mt-4 flex justify-center">
                        <img
                          src={programmingLanguagesImage}
                          width={400}
                          alt="Programming Languages"
                          className="rounded-lg shadow-lg"
                        />
                      </div>
                      <p className="text-center text-gray-500 text-sm mt-2">
                        Common programming languages and their logos
                      </p>
                      
                      <div className="flex justify-between items-center mt-6">
                        <motion.button 
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className={`flex items-center ${completedSections.includes("languages") ? "text-green-600" : "text-blue-600"}`}
                          onClick={() => markAsComplete("languages")}
                        >
                          <CheckSquare className="mr-2 h-5 w-5" />
                          {completedSections.includes("languages") ? "Completed" : "Mark as complete"}
                        </motion.button>
                        <div>
                          <motion.button 
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="text-blue-600 hover:text-blue-800 mr-4"
                            onClick={() => setActiveSection("intro")}
                          >
                            ← Previous
                          </motion.button>
                          <motion.button 
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="text-blue-600 hover:text-blue-800"
                            onClick={() => setActiveSection("algorithms")}
                          >
                            Next →
                          </motion.button>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>

              <motion.div 
                className={`mb-8 transition-all duration-300 ${
                  activeSection === "algorithms" 
                    ? "" 
                    : focusMode && hoveredSection !== "algorithms" 
                      ? "opacity-50" 
                      : "opacity-60"
                }`}
                animate={{ 
                  scale: hoveredSection === "algorithms" ? 1.02 : 1,
                }}
                onHoverStart={() => setHoveredSection("algorithms")}
                onHoverEnd={() => setHoveredSection(null)}
              >
                <div 
                  className="flex justify-between items-center cursor-pointer"
                  onClick={() => toggleSection("algorithms")}
                >
                  <h2 className="text-xl font-bold text-blue-600">Algorithms and Flowcharts</h2>
                  <button className="p-1">
                    {expandedSections.algorithms ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
                  </button>
                </div>

                <AnimatePresence>
                  {expandedSections.algorithms && (
                    <motion.div 
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="mt-4"
                    >
                      <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-4">
                        <div className="flex">
                          <div className="ml-3">
                            <p className="text-sm text-yellow-700">
                              <strong>Key Takeaway:</strong> Algorithms are step-by-step instructions for solving problems. Flowcharts are visual maps that help us see how these steps connect together.
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="bg-green-50 p-4 rounded-lg border border-green-100 mb-6">
                        <h3 className="font-bold text-green-700 text-lg">Algorithms</h3>
                        <p className="text-gray-700 mt-2 leading-relaxed">
                          Algorithms are step-by-step instructions designed to solve a problem or perform a specific task. 
                          They serve as the backbone of programming by providing a clear set of rules to follow.
                        </p>
                        
                        <div className="mt-4">
                          <p className="font-medium text-gray-700">Real-world example: Making a cup of tea</p>
                          <div className="border rounded-lg p-4 bg-white mt-2">
                            <ol className="list-decimal pl-6 text-gray-700 text-md space-y-1">
                              <li>Boil water.</li>
                              <li>Put a tea bag in a cup.</li>
                              <li>Pour hot water into the cup.</li>
                              <li>Add sugar or milk (optional).</li>
                              <li>Stir and serve.</li>
                            </ol>
                          </div>
                        </div>
                      </div>

                      <div className="bg-blue-50 p-4 rounded-lg border border-blue-100 mb-6">
                        <h3 className="font-bold text-blue-700 text-lg">Flowcharts</h3>
                        <p className="text-gray-700 mt-2 leading-relaxed">
                          Flowcharts visually represent algorithms. They use shapes like rectangles (process), 
                          diamonds (decisions), and arrows (flow) to illustrate steps clearly.
                        </p>
                        
                        <div className="mt-4 flex justify-center">
                          <img
                            src={flowchartImage}
                            width={400}
                            alt="Flowchart Example"
                            className="rounded-lg shadow-lg"
                          />
                        </div>
                        <p className="text-center text-gray-500 text-sm mt-2">
                          Flowchart for checking if a number is positive or negative
                        </p>
                      </div>
                      
                      <div className="flex justify-between items-center mt-6">
                        <motion.button 
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className={`flex items-center ${completedSections.includes("algorithms") ? "text-green-600" : "text-blue-600"}`}
                          onClick={() => markAsComplete("algorithms")}
                        >
                          <CheckSquare className="mr-2 h-5 w-5" />
                          {completedSections.includes("algorithms") ? "Completed" : "Mark as complete"}
                        </motion.button>
                        <div>
                          <motion.button 
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="text-blue-600 hover:text-blue-800 mr-4"
                            onClick={() => setActiveSection("languages")}
                          >
                            ← Previous
                          </motion.button>
                          <motion.button 
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="text-blue-600 hover:text-blue-800"
                            onClick={() => setActiveSection("compiling")}
                          >
                            Next →
                          </motion.button>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>

              <motion.div 
                className={`mb-8 transition-all duration-300 ${
                  activeSection === "compiling" 
                    ? "" 
                    : focusMode && hoveredSection !== "compiling" 
                      ? "opacity-50" 
                      : "opacity-60"
                }`}
                animate={{ 
                  scale: hoveredSection === "compiling" ? 1.02 : 1,
                }}
                onHoverStart={() => setHoveredSection("compiling")}
                onHoverEnd={() => setHoveredSection(null)}
              >
                <div 
                  className="flex justify-between items-center cursor-pointer"
                  onClick={() => toggleSection("compiling")}
                >
                  <h2 className="text-xl font-bold text-blue-600">Compiling: From Code to Machine Instructions</h2>
                  <button className="p-1">
                    {expandedSections.compiling ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
                  </button>
                </div>

                <AnimatePresence>
                  {expandedSections.compiling && (
                    <motion.div 
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="mt-4"
                    >
                      <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-4">
                        <div className="flex">
                          <div className="ml-3">
                            <p className="text-sm text-yellow-700">
                              <strong>Key Takeaway:</strong> Compiling is like translating our human-friendly code into a language that computers can understand (machine code).
                            </p>
                          </div>
                        </div>
                      </div>

                      <p className="text-gray-700 text-md leading-relaxed">
                        <strong>Compiling</strong> is the process of converting source code, written by developers in a high-level 
                        programming language like Python or C++, into machine code (also known as binary code).
                      </p>

                      <div className="mt-6">
                        <div className="relative overflow-hidden p-6 rounded-lg bg-gradient-to-r from-purple-100 to-blue-100">
                          <h3 className="text-lg font-bold text-purple-700 mb-4">The Compilation Process</h3>
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="bg-white p-4 rounded-lg shadow-sm">
                              <p className="font-medium text-purple-700">1. Lexical Analysis</p>
                              <p className="text-sm text-gray-600 mt-1">Breaking code into tokens (keywords, variables, symbols)</p>
                            </div>
                            
                            <div className="bg-white p-4 rounded-lg shadow-sm">
                              <p className="font-medium text-purple-700">2. Syntax Analysis</p>
                              <p className="text-sm text-gray-600 mt-1">Checking if code structure follows language rules</p>
                            </div>
                            
                            <div className="bg-white p-4 rounded-lg shadow-sm">
                              <p className="font-medium text-purple-700">3. Code Optimization</p>
                              <p className="text-sm text-gray-600 mt-1">Making the code faster and more efficient</p>
                            </div>
                            
                            <div className="bg-white p-4 rounded-lg shadow-sm">
                              <p className="font-medium text-purple-700">4. Code Generation</p>
                              <p className="text-sm text-gray-600 mt-1">Creating the final machine code the computer can run</p>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex justify-between items-center mt-6">
                        <motion.button 
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className={`flex items-center ${completedSections.includes("compiling") ? "text-green-600" : "text-blue-600"}`}
                          onClick={() => markAsComplete("compiling")}
                        >
                          <CheckSquare className="mr-2 h-5 w-5" />
                          {completedSections.includes("compiling") ? "Completed" : "Mark as complete"}
                        </motion.button>
                        <div>
                          <motion.button 
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="text-blue-600 hover:text-blue-800 mr-4"
                            onClick={() => setActiveSection("algorithms")}
                          >
                            ← Previous
                          </motion.button>
                          <motion.button 
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="text-blue-600 hover:text-blue-800"
                            onClick={() => setActiveSection("binary")}
                          >
                            Next →
                          </motion.button>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>

              <motion.div 
                className={`mb-8 transition-all duration-300 ${
                  activeSection === "binary" 
                    ? "" 
                    : focusMode && hoveredSection !== "binary" 
                      ? "opacity-50" 
                      : "opacity-60"
                }`}
                animate={{ 
                  scale: hoveredSection === "binary" ? 1.02 : 1,
                }}
                onHoverStart={() => setHoveredSection("binary")}
                onHoverEnd={() => setHoveredSection(null)}
              >
                <div 
                  className="flex justify-between items-center cursor-pointer"
                  onClick={() => toggleSection("binary")}
                >
                  <h2 className="text-xl font-bold text-blue-600">Binary Code: The Language of Computers</h2>
                  <button className="p-1">
                    {expandedSections.binary ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
                  </button>
                </div>

                <AnimatePresence>
                  {expandedSections.binary && (
                    <motion.div 
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="mt-4"
                    >
                      <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-4">
                        <div className="flex">
                          <div className="ml-3">
                            <p className="text-sm text-yellow-700">
                              <strong>Key Takeaway:</strong> Binary code (1s and 0s) is the fundamental language that computers understand. It represents all data and instructions that a computer processes.
                            </p>
                          </div>
                        </div>
                      </div>

                      <p className="text-gray-700 text-md leading-relaxed">
                        <strong>Binary code</strong> is a system that uses only two digits: 0 and 1. These binary digits, 
                        or "bits," are the smallest units of data in computing. They represent the on/off or true/false 
                        states that computers can understand.
                      </p>

                      <div className="mt-6 bg-gray-50 p-6 rounded-lg border border-gray-200">
                        <h3 className="text-lg font-bold text-gray-700 mb-4">Binary to Text Example</h3>
                        
                        <div className="overflow-x-auto">
                          <table className="min-w-full bg-white">
                            <thead>
                              <tr>
                                <th className="py-2 px-4 border-b border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase">Letter</th>
                                <th className="py-2 px-4 border-b border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase">ASCII Value</th>
                                <th className="py-2 px-4 border-b border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase">Binary Code</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr>
                                <td className="py-2 px-4 border-b border-gray-200">H</td>
                                <td className="py-2 px-4 border-b border-gray-200">72</td>
                                <td className="py-2 px-4 border-b border-gray-200 font-mono">01001000</td>
                              </tr>
                              <tr>
                                <td className="py-2 px-4 border-b border-gray-200">e</td>
                                <td className="py-2 px-4 border-b border-gray-200">101</td>
                                <td className="py-2 px-4 border-b border-gray-200 font-mono">01100101</td>
                              </tr>
                              <tr>
                                <td className="py-2 px-4 border-b border-gray-200">l</td>
                                <td className="py-2 px-4 border-b border-gray-200">108</td>
                                <td className="py-2 px-4 border-b border-gray-200 font-mono">01101100</td>
                              </tr>
                              <tr>
                                <td className="py-2 px-4 border-b border-gray-200">l</td>
                                <td className="py-2 px-4 border-b border-gray-200">108</td>
                                <td className="py-2 px-4 border-b border-gray-200 font-mono">01101100</td>
                              </tr>
                              <tr>
                                <td className="py-2 px-4 border-b border-gray-200">o</td>
                                <td className="py-2 px-4 border-b border-gray-200">111</td>
                                <td className="py-2 px-4 border-b border-gray-200 font-mono">01101111</td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>

                      <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                        <p className="text-gray-700">
                          Binary code is the foundation of all computing operations. Everything you see on a computer, 
                          from text to images to videos, is ultimately represented and processed as sequences of 1s and 0s.
                        </p>
                      </div>
                      
                      <div className="flex justify-between items-center mt-6">
                        <motion.button 
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className={`flex items-center ${completedSections.includes("binary") ? "text-green-600" : "text-blue-600"}`}
                          onClick={() => markAsComplete("binary")}
                        >
                          <CheckSquare className="mr-2 h-5 w-5" />
                          {completedSections.includes("binary") ? "Completed" : "Mark as complete"}
                        </motion.button>
                        <div>
                          <motion.button 
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="text-blue-600 hover:text-blue-800 mr-4"
                            onClick={() => setActiveSection("compiling")}
                          >
                            ← Previous
                          </motion.button>
                          <motion.button 
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="text-blue-600 hover:text-blue-800"
                            onClick={() => setActiveSection("summary")}
                          >
                            Next →
                          </motion.button>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>

              <motion.div 
                className={`mb-8 transition-all duration-300 ${
                  activeSection === "summary" 
                    ? "" 
                    : focusMode && hoveredSection !== "summary" 
                      ? "opacity-50" 
                      : "opacity-60"
                }`}
                animate={{ 
                  scale: hoveredSection === "summary" ? 1.02 : 1,
                }}
                onHoverStart={() => setHoveredSection("summary")}
                onHoverEnd={() => setHoveredSection(null)}
              >
                <div 
                  className="flex justify-between items-center cursor-pointer"
                  onClick={() => toggleSection("summary")}
                >
                  <h2 className="text-xl font-bold text-blue-600">Unit Summary</h2>
                  <button className="p-1">
                    {expandedSections.summary ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
                  </button>
                </div>

                <AnimatePresence>
                  {expandedSections.summary && (
                    <motion.div 
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="mt-4"
                    >
                      <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mb-4">
                        <div className="flex">
                          <div className="ml-3">
                            <p className="text-sm text-blue-700">
                              <strong>Unit Overview:</strong> In this unit, we explored the fundamental concepts of programming, including what programming is, the various programming languages available, algorithms and flowcharts, the compilation process, and binary code.
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="bg-white border border-gray-200 rounded-lg p-6 mt-4">
                        <h3 className="text-lg font-bold text-blue-600 mb-4">Key Concepts Covered</h3>
                        
                        <ul className="space-y-4">
                          <li className="flex">
                            <div className="bg-blue-100 rounded-full h-6 w-6 flex items-center justify-center mr-3 mt-0.5">
                              <span className="text-blue-600 font-bold text-sm">1</span>
                            </div>
                            <div>
                              <p className="font-medium text-gray-800">What is Programming?</p>
                              <p className="text-gray-600 text-sm mt-1">The process of designing and building an executable computer program to accomplish specific tasks.</p>
                            </div>
                          </li>
                          
                          <li className="flex">
                            <div className="bg-blue-100 rounded-full h-6 w-6 flex items-center justify-center mr-3 mt-0.5">
                              <span className="text-blue-600 font-bold text-sm">2</span>
                            </div>
                            <div>
                              <p className="font-medium text-gray-800">Programming Languages</p>
                              <p className="text-gray-600 text-sm mt-1">Different tools for writing code, each with its own syntax and purpose (Python, Java, C++, JavaScript).</p>
                            </div>
                          </li>
                          
                          <li className="flex">
                            <div className="bg-blue-100 rounded-full h-6 w-6 flex items-center justify-center mr-3 mt-0.5">
                              <span className="text-blue-600 font-bold text-sm">3</span>
                            </div>
                            <div>
                              <p className="font-medium text-gray-800">Algorithms & Flowcharts</p>
                              <p className="text-gray-600 text-sm mt-1">Step-by-step procedures for solving problems and their visual representations.</p>
                            </div>
                          </li>
                          
                          <li className="flex">
                            <div className="bg-blue-100 rounded-full h-6 w-6 flex items-center justify-center mr-3 mt-0.5">
                              <span className="text-blue-600 font-bold text-sm">4</span>
                            </div>
                            <div>
                              <p className="font-medium text-gray-800">Compiling</p>
                              <p className="text-gray-600 text-sm mt-1">The process of translating human-readable code into machine code that computers can execute.</p>
                            </div>
                          </li>
                          
                          <li className="flex">
                            <div className="bg-blue-100 rounded-full h-6 w-6 flex items-center justify-center mr-3 mt-0.5">
                              <span className="text-blue-600 font-bold text-sm">5</span>
                            </div>
                            <div>
                              <p className="font-medium text-gray-800">Binary Code</p>
                              <p className="text-gray-600 text-sm mt-1">The fundamental language of computing using only 1s and 0s.</p>
                            </div>
                          </li>
                        </ul>
                      </div>

                      <div className="mt-6 bg-green-50 p-4 rounded-lg border border-green-100">
                        <h3 className="font-bold text-green-700">Next Steps</h3>
                        <p className="text-gray-700 mt-2">
                          Now that you understand the basics of programming, you're ready to move on to our next unit: "Variables and Data Types." 
                          But first, take the quiz to test your understanding of the concepts covered in this unit.
                        </p>
                      </div>
                      
                      <div className="flex justify-between items-center mt-6">
                        <motion.button 
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className={`flex items-center ${completedSections.includes("summary") ? "text-green-600" : "text-blue-600"}`}
                          onClick={() => markAsComplete("summary")}
                        >
                          <CheckSquare className="mr-2 h-5 w-5" />
                          {completedSections.includes("summary") ? "Completed" : "Mark as complete"}
                        </motion.button>
                        <div>
                          <motion.button 
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="text-blue-600 hover:text-blue-800 mr-4"
                            onClick={() => setActiveSection("binary")}
                          >
                            ← Previous
                          </motion.button>
                          <motion.button 
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
                            onClick={() => navigate("/quiz")}
                          >
                            Take Quiz
                          </motion.button>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>

              <div className="mt-12 pt-6 border-t border-gray-200">
                <div className="flex flex-wrap justify-between items-center">
                  <div className="mb-4 md:mb-0">
                    <p className="font-medium text-gray-700">Your progress</p>
                    <div className="flex items-center mt-2">
                      <div className="w-48 bg-gray-200 rounded-full h-2.5 mr-3">
                        <motion.div 
                          className="bg-blue-600 h-2.5 rounded-full" 
                          style={{ width: `${progress}%` }}
                          animate={{ width: `${progress}%` }}
                          transition={{ duration: 0.5 }}
                        ></motion.div>
                      </div>
                      <span className="text-sm font-medium text-blue-600">{progress}% Complete</span>
                    </div>
                  </div>
                  <div className="flex space-x-4">
                    <motion.button 
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="bg-blue-600 text-white py-2 px-6 rounded-lg hover:bg-blue-700 transition"
                      onClick={() => navigate("/quiz")}
                    >
                      Take Quiz
                    </motion.button>
                    <motion.button 
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="border border-blue-600 text-blue-600 py-2 px-6 rounded-lg hover:bg-blue-50 transition"
                      onClick={() => navigate("/my-learning/my-course")}
                    >
                      Next Unit
                    </motion.button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CourseContent;