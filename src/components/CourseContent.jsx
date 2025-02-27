import React, { useState } from "react";
import SignedInNavbar from "./SignedInNavbar";
import programmingLanguagesImage from "../assets/langs.png";
import flowchartImage from "../assets/flowchart.png";
import { useNavigate } from 'react-router-dom';
import { Timer, Bookmark, PlayCircle, PauseCircle, ChevronDown, ChevronUp, CheckSquare } from 'lucide-react';

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

  return (
    <div className={`${focusMode ? 'bg-gray-100' : 'bg-gray-50'} min-h-screen transition-colors duration-300`}>
      <SignedInNavbar />

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-5xl mx-auto bg-white p-6 rounded-lg shadow-lg mb-4">
          <div className="flex flex-wrap justify-between items-center">
            <h1 className="text-3xl font-bold text-blue-600">
              Unit 1: Introduction to Programming
            </h1>
            <div className="flex space-x-4 mt-4 md:mt-0">
              <button 
                onClick={toggleFocusMode}
                className={`flex items-center px-4 py-2 rounded-lg text-sm transition ${focusMode ? 'bg-yellow-500 text-white' : 'bg-gray-200 text-gray-700'}`}
              >
                {focusMode ? <PauseCircle className="mr-2 h-4 w-4" /> : <PlayCircle className="mr-2 h-4 w-4" />}
                {focusMode ? 'Exit Focus Mode' : 'Focus Mode'}
              </button>
            </div>
          </div>

          <div className="mt-6">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-gray-700">Your progress</span>
              <span className="text-sm font-medium text-blue-600">{progress}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div 
                className="bg-blue-600 h-2.5 rounded-full transition-all duration-500" 
                style={{ width: `${progress}%` }}
              ></div>
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
                <button
                  onClick={() => navigate("/quiz")}
                  className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition flex items-center justify-center"
                >
                  Take Quiz
                </button>
              </div>
            </div>
          </div>

          <div className="w-full md:w-3/4">
            <div className="bg-white p-8 rounded-lg shadow-lg">
              
              <div className={`mb-8 ${activeSection === "intro" ? "" : "opacity-60"}`}>
                <div 
                  className="flex justify-between items-center cursor-pointer"
                  onClick={() => toggleSection("intro")}
                >
                  <h2 className="text-xl font-bold text-blue-600">What is Programming?</h2>
                  <button className="p-1">
                    {expandedSections.intro ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
                  </button>
                </div>

                {expandedSections.intro && (
                  <div className="mt-4 animate-fade-in">
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
                      <button 
                        className={`flex items-center ${completedSections.includes("intro") ? "text-green-600" : "text-blue-600"}`}
                        onClick={() => markAsComplete("intro")}
                      >
                        <CheckSquare className="mr-2 h-5 w-5" />
                        {completedSections.includes("intro") ? "Completed" : "Mark as complete"}
                      </button>
                      <button 
                        className="text-blue-600 hover:text-blue-800"
                        onClick={() => setActiveSection("languages")}
                      >
                        Next: Programming Languages →
                      </button>
                    </div>
                  </div>
                )}
              </div>

              <div className={`mb-8 ${activeSection === "languages" ? "" : "opacity-60"}`}>
                <div 
                  className="flex justify-between items-center cursor-pointer"
                  onClick={() => toggleSection("languages")}
                >
                  <h2 className="text-xl font-bold text-blue-600">Programming Languages</h2>
                  <button className="p-1">
                    {expandedSections.languages ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
                  </button>
                </div>

                {expandedSections.languages && (
                  <div className="mt-4 animate-fade-in">
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
                      <button 
                        className={`flex items-center ${completedSections.includes("languages") ? "text-green-600" : "text-blue-600"}`}
                        onClick={() => markAsComplete("languages")}
                      >
                        <CheckSquare className="mr-2 h-5 w-5" />
                        {completedSections.includes("languages") ? "Completed" : "Mark as complete"}
                      </button>
                      <div>
                        <button 
                          className="text-blue-600 hover:text-blue-800 mr-4"
                          onClick={() => setActiveSection("intro")}
                        >
                          ← Previous
                        </button>
                        <button 
                          className="text-blue-600 hover:text-blue-800"
                          onClick={() => setActiveSection("algorithms")}
                        >
                          Next →
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div className={`mb-8 ${activeSection === "algorithms" ? "" : "opacity-60"}`}>
                <div 
                  className="flex justify-between items-center cursor-pointer"
                  onClick={() => toggleSection("algorithms")}
                >
                  <h2 className="text-xl font-bold text-blue-600">Algorithms and Flowcharts</h2>
                  <button className="p-1">
                    {expandedSections.algorithms ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
                  </button>
                </div>

                {expandedSections.algorithms && (
                  <div className="mt-4 animate-fade-in">
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
                      <button 
                        className={`flex items-center ${completedSections.includes("algorithms") ? "text-green-600" : "text-blue-600"}`}
                        onClick={() => markAsComplete("algorithms")}
                      >
                        <CheckSquare className="mr-2 h-5 w-5" />
                        {completedSections.includes("algorithms") ? "Completed" : "Mark as complete"}
                      </button>
                      <div>
                        <button 
                          className="text-blue-600 hover:text-blue-800 mr-4"
                          onClick={() => setActiveSection("languages")}
                        >
                          ← Previous
                        </button>
                        <button 
                          className="text-blue-600 hover:text-blue-800"
                          onClick={() => setActiveSection("compiling")}
                        >
                          Next →
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div className={`mb-8 ${activeSection === "compiling" ? "" : "opacity-60"}`}>
                <div 
                  className="flex justify-between items-center cursor-pointer"
                  onClick={() => toggleSection("compiling")}
                >
                  <h2 className="text-xl font-bold text-blue-600">Compiling: From Code to Machine Instructions</h2>
                  <button className="p-1">
                    {expandedSections.compiling ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
                  </button>
                </div>

                {expandedSections.compiling && (
                  <div className="mt-4 animate-fade-in">
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
                      <button 
                        className={`flex items-center ${completedSections.includes("compiling") ? "text-green-600" : "text-blue-600"}`}
                        onClick={() => markAsComplete("compiling")}
                      >
                        <CheckSquare className="mr-2 h-5 w-5" />
                        {completedSections.includes("compiling") ? "Completed" : "Mark as complete"}
                      </button>
                      <div>
                        <button 
                          className="text-blue-600 hover:text-blue-800 mr-4"
                          onClick={() => setActiveSection("algorithms")}
                        >
                          ← Previous
                        </button>
                        <button 
                          className="text-blue-600 hover:text-blue-800"
                          onClick={() => setActiveSection("binary")}
                        >
                          Next →
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div className={`mb-8 ${activeSection === "binary" ? "" : "opacity-60"}`}>
                <div 
                  className="flex justify-between items-center cursor-pointer"
                  onClick={() => toggleSection("binary")}
                >
                  <h2 className="text-xl font-bold text-blue-600">Understanding Binary Code</h2>
                  <button className="p-1">
                    {expandedSections.binary ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
                  </button>
                </div>

                {expandedSections.binary && (
                  <div className="mt-4 animate-fade-in">
                    <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-4">
                      <div className="flex">
                        <div className="ml-3">
                          <p className="text-sm text-yellow-700">
                            <strong>Key Takeaway:</strong> Binary code is the computer's native language, using only 0s and 1s. Every instruction and piece of data is represented in this format.
                          </p>
                        </div>
                      </div>
                    </div>

                    <p className="text-gray-700 text-md leading-relaxed">
                      Computers operate on binary code, which is a sequence of 0s and 1s that represent instructions and data. 
                      This is because modern computers use digital circuits that can be in one of two states: on (1) or off (0).
                    </p>

                    <div className="bg-gray-50 p-6 rounded-lg mt-6 border border-gray-200">
                      <h3 className="font-bold text-gray-700 mb-3">Binary Examples</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="bg-white p-4 rounded-lg shadow-sm flex items-center">
                          <div className="bg-blue-100 text-blue-800 font-mono p-2 rounded mr-4">
                            01000001
                          </div>
                          <div>
                            <p className="text-lg font-bold">A</p>
                            <p className="text-xs text-gray-500">Letter A in ASCII</p>
                          </div>
                        </div>
                        
                        <div className="bg-white p-4 rounded-lg shadow-sm flex items-center">
                          <div className="bg-green-100 text-green-800 font-mono p-2 rounded mr-4">
                            00111110
                          </div>
                          <div>
                            <p className="text-sm">Machine instruction</p>
                            <p className="text-xs text-gray-500">Specific operation code</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex justify-between items-center mt-6">
                      <button 
                        className={`flex items-center ${completedSections.includes("binary") ? "text-green-600" : "text-blue-600"}`}
                        onClick={() => markAsComplete("binary")}
                      >
                        <CheckSquare className="mr-2 h-5 w-5" />
                        {completedSections.includes("binary") ? "Completed" : "Mark as complete"}
                      </button>
                      <div>
                        <button 
                          className="text-blue-600 hover:text-blue-800 mr-4"
                          onClick={() => setActiveSection("compiling")}
                        >
                          ← Previous
                        </button>
                        <button 
                          className="text-blue-600 hover:text-blue-800"
                          onClick={() => setActiveSection("summary")}
                        >
                          Next →
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div className={`mb-8 ${activeSection === "summary" ? "" : "opacity-60"}`}>
                <div 
                  className="flex justify-between items-center cursor-pointer"
                  onClick={() => toggleSection("summary")}
                >
                  <h2 className="text-xl font-bold text-blue-600">Summary</h2>
                  <button className="p-1">
                    {expandedSections.summary ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
                  </button>
                </div>

                {expandedSections.summary && (
                  <div className="mt-4 animate-fade-in">
                    <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-4">
                      <div className="flex">
                        <div className="ml-3">
                          <p className="text-sm text-yellow-700">
                            <strong>Key Takeaway:</strong> Programming is about creating instructions for computers using special languages, algorithms, and understanding how computers translate human code into binary.
                          </p>
                        </div>
                      </div>
                    </div>

                    <p className="text-gray-700 text-md leading-relaxed">
                      In this unit, you explored these key concepts:
                    </p>

                    <div className="mt-4 space-y-4">
                      <div className="bg-blue-50 p-4 rounded-lg">
                        <h3 className="font-bold text-blue-700">Programming Languages</h3>
                        <p className="text-gray-700 text-sm mt-1">
                          Different languages serve different purposes, with popular options including Python, Java, JavaScript, and C++.
                        </p>
                      </div>
                      
                      <div className="bg-green-50 p-4 rounded-lg">
                        <h3 className="font-bold text-green-700">Algorithms & Flowcharts</h3>
                        <p className="text-gray-700 text-sm mt-1">
                          Step-by-step instructions to solve problems, often visualized through flowcharts that map the logical progression.
                        </p>
                      </div>
                      
                      <div className="bg-purple-50 p-4 rounded-lg">
                        <h3 className="font-bold text-purple-700">Compiling</h3>
                        <p className="text-gray-700 text-sm mt-1">
                          The process of translating high-level code into machine-readable instructions through multiple stages.
                        </p>
                      </div>
                      
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <h3 className="font-bold text-gray-700">Binary Code</h3>
                        <p className="text-gray-700 text-sm mt-1">
                          The fundamental language of computers, using only 0s and 1s to represent all data and instructions.
                        </p>
                      </div>
                    </div>

                    <div className="mt-6 bg-indigo-50 p-6 rounded-lg border border-indigo-100">
                      <h3 className="font-bold text-indigo-700 mb-2">Ready for the Quiz?</h3>
                      <p className="text-gray-700 mb-4">
                        Test your understanding of these fundamental programming concepts with a quick quiz.
                      </p>
                      <button
                        onClick={() => navigate("/quiz")}
                        className="bg-indigo-600 text-white py-2 px-6 rounded-lg hover:bg-indigo-700 transition"
                      >
                        Take Quiz Now
                      </button>
                    </div>
                    
                    <div className="flex justify-between items-center mt-6">
                      <button 
                        className={`flex items-center ${completedSections.includes("summary") ? "text-green-600" : "text-blue-600"}`}
                        onClick={() => markAsComplete("summary")}
                      >
                        <CheckSquare className="mr-2 h-5 w-5" />
                        {completedSections.includes("summary") ? "Completed" : "Mark as complete"}
                      </button>
                      <button 
                        className="text-blue-600 hover:text-blue-800"
                        onClick={() => setActiveSection("binary")}
                      >
                        ← Previous
                      </button>
                    </div>
                  </div>
                )}
              </div>

            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CourseContent;