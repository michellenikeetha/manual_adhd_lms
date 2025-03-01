import React, { useState, useEffect } from "react";
import SignedInNavbar from "./SignedInNavbar";

const ProgrammingQuiz = () => {
  const [answers, setAnswers] = useState({});
  const [score, setScore] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [timeRemaining, setTimeRemaining] = useState(null);
  const [breakMode, setBreakMode] = useState(false);
  const [breakTimeLeft, setBreakTimeLeft] = useState(60);
  const [progress, setProgress] = useState(0);
  const [showFeedback, setShowFeedback] = useState({});
  const [quizCompleted, setQuizCompleted] = useState(false);

  const totalQuestions = 10;

  useEffect(() => {
    const answeredQuestions = Object.keys(answers).length;
    setProgress((answeredQuestions / totalQuestions) * 100);
  }, [answers]);

  useEffect(() => {
    if (breakMode && breakTimeLeft > 0) {
      const timer = setTimeout(() => {
        setBreakTimeLeft(breakTimeLeft - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else if (breakMode && breakTimeLeft === 0) {
      setBreakMode(false);
    }
  }, [breakMode, breakTimeLeft]);

  const handleChange = (e, questionId) => {
    setAnswers({ ...answers, [questionId]: e.target.value });
    
    if (e.target.type === "radio") {
      checkAnswer(questionId, e.target.value);
    }
  };

  const handleTextInputBlur = (e, questionId) => {
    if (e.target.value.trim() !== "") {
      checkAnswer(questionId, e.target.value);
    }
  };

  const checkAnswer = (questionId, answer) => {
    const correctAnswers = {
      q1: "Python",
      q2: "Flowchart",
      q3: "True",
      q4: "Compile",
      q5: "Binary",
      q6: "False",
      q7: "Syntax Error Execution",
      q8: "Lexical Analysis",
      q9: "JavaScript",
      q10: "True",
    };

    const isCorrect = answer.trim().toLowerCase() === correctAnswers[questionId].toLowerCase();
    setShowFeedback({
      ...showFeedback,
      [questionId]: {
        correct: isCorrect,
        correctAnswer: correctAnswers[questionId]
      }
    });
  };

  const handleSubmit = () => {
    const correctAnswers = {
      q1: "Python",
      q2: "Flowchart",
      q3: "True",
      q4: "Compile",
      q5: "Binary",
      q6: "False",
      q7: "Syntax Error Execution",
      q8: "Lexical Analysis",
      q9: "JavaScript",
      q10: "True",
    };

    let points = 0;
    for (let questionId in correctAnswers) {
      if (
        answers[questionId] &&
        answers[questionId].trim().toLowerCase() === correctAnswers[questionId].toLowerCase()
      ) {
        points++;
      }
    }

    setScore(points);
    setQuizCompleted(true);
  };

  const takeBreak = () => {
    setBreakMode(true);
    setBreakTimeLeft(60);
  };

  const navigateQuestion = (direction) => {
    if (direction === "next" && currentQuestion < totalQuestions) {
      setCurrentQuestion(currentQuestion + 1);
    } else if (direction === "prev" && currentQuestion > 1) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const renderQuestion = (questionNumber) => {
    switch (questionNumber) {
      case 1:
        return (
          <div className="mb-6 animate-fade-in">
            <h3 className="font-semibold text-lg mb-3">1. Which of the following is a popular programming language?</h3>
            <div className="space-y-2">
              <div className={`p-3 rounded-lg border ${answers.q1 === "Python" ? 'border-blue-500 bg-blue-50' : 'border-gray-300'} transition-all hover:border-blue-300`}>
                <label className="flex items-center cursor-pointer w-full">
                  <input
                    type="radio"
                    name="q1"
                    value="Python"
                    checked={answers.q1 === "Python"}
                    onChange={(e) => handleChange(e, "q1")}
                    className="mr-3 h-5 w-5 text-blue-600"
                  />
                  <span>Python</span>
                </label>
              </div>
              <div className={`p-3 rounded-lg border ${answers.q1 === "HTML" ? 'border-blue-500 bg-blue-50' : 'border-gray-300'} transition-all hover:border-blue-300`}>
                <label className="flex items-center cursor-pointer w-full">
                  <input
                    type="radio"
                    name="q1"
                    value="HTML"
                    checked={answers.q1 === "HTML"}
                    onChange={(e) => handleChange(e, "q1")}
                    className="mr-3 h-5 w-5 text-blue-600"
                  />
                  <span>HTML</span>
                </label>
              </div>
              <div className={`p-3 rounded-lg border ${answers.q1 === "CSS" ? 'border-blue-500 bg-blue-50' : 'border-gray-300'} transition-all hover:border-blue-300`}>
                <label className="flex items-center cursor-pointer w-full">
                  <input
                    type="radio"
                    name="q1"
                    value="CSS"
                    checked={answers.q1 === "CSS"}
                    onChange={(e) => handleChange(e, "q1")}
                    className="mr-3 h-5 w-5 text-blue-600"
                  />
                  <span>CSS</span>
                </label>
              </div>
            </div>
            {showFeedback.q1 && (
              <div className={`mt-3 p-3 rounded-lg ${showFeedback.q1.correct ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                {showFeedback.q1.correct ? (
                  <p>✅ Correct! Python is indeed a programming language.</p>
                ) : (
                  <p>❌ That's not right. Python is a programming language, while HTML and CSS are markup and styling languages.</p>
                )}
              </div>
            )}
          </div>
        );
      case 2:
        return (
          <div className="mb-6 animate-fade-in">
            <h3 className="font-semibold text-lg mb-3">2. A ________ is a diagram that visually represents an algorithm.</h3>
            <div className="relative">
              <input
                type="text"
                name="q2"
                value={answers.q2 || ""}
                onChange={(e) => handleChange(e, "q2")}
                onBlur={(e) => handleTextInputBlur(e, "q2")}
                className="border-2 border-gray-300 focus:border-blue-500 rounded-lg px-4 py-3 mt-2 w-full text-lg transition-all"
                placeholder="Type your answer here"
              />
              <div className="text-sm text-gray-500 mt-2">Hint: It starts with "Flow"</div>
            </div>
            {showFeedback.q2 && (
              <div className={`mt-3 p-3 rounded-lg ${showFeedback.q2.correct ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                {showFeedback.q2.correct ? (
                  <p>✅ Correct! A flowchart is a visual representation of an algorithm.</p>
                ) : (
                  <p>❌ Not quite. The correct answer is "Flowchart" - a diagram used to represent the steps in an algorithm.</p>
                )}
              </div>
            )}
          </div>
        );
      case 3:
        return (
          <div className="mb-6 animate-fade-in">
            <h3 className="font-semibold text-lg mb-3">3. Algorithms are step-by-step instructions to solve a problem. (True/False)</h3>
            <div className="flex space-x-4 mt-2">
              <div className={`flex-1 p-3 rounded-lg border ${answers.q3 === "True" ? 'border-blue-500 bg-blue-50' : 'border-gray-300'} transition-all hover:border-blue-300`}>
                <label className="flex items-center justify-center cursor-pointer w-full">
                  <input
                    type="radio"
                    name="q3"
                    value="True"
                    checked={answers.q3 === "True"}
                    onChange={(e) => handleChange(e, "q3")}
                    className="mr-2 h-5 w-5 text-blue-600"
                  />
                  <span className="text-lg">True</span>
                </label>
              </div>
              <div className={`flex-1 p-3 rounded-lg border ${answers.q3 === "False" ? 'border-blue-500 bg-blue-50' : 'border-gray-300'} transition-all hover:border-blue-300`}>
                <label className="flex items-center justify-center cursor-pointer w-full">
                  <input
                    type="radio"
                    name="q3"
                    value="False"
                    checked={answers.q3 === "False"}
                    onChange={(e) => handleChange(e, "q3")}
                    className="mr-2 h-5 w-5 text-blue-600"
                  />
                  <span className="text-lg">False</span>
                </label>
              </div>
            </div>
            {showFeedback.q3 && (
              <div className={`mt-3 p-3 rounded-lg ${showFeedback.q3.correct ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                {showFeedback.q3.correct ? (
                  <p>✅ Correct! Algorithms are indeed step-by-step instructions to solve problems.</p>
                ) : (
                  <p>❌ That's not right. Algorithms are defined as step-by-step instructions to solve problems.</p>
                )}
              </div>
            )}
          </div>
        );
      case 4:
        return (
          <div className="mb-6 animate-fade-in">
            <h3 className="font-semibold text-lg mb-3">4. The process of converting source code into machine code is called ________.</h3>
            <div className="relative">
              <input
                type="text"
                name="q4"
                value={answers.q4 || ""}
                onChange={(e) => handleChange(e, "q4")}
                onBlur={(e) => handleTextInputBlur(e, "q4")}
                className="border-2 border-gray-300 focus:border-blue-500 rounded-lg px-4 py-3 mt-2 w-full text-lg transition-all"
                placeholder="Type your answer here"
              />
              <div className="text-sm text-gray-500 mt-2">Hint: It starts with "C"</div>
            </div>
            {showFeedback.q4 && (
              <div className={`mt-3 p-3 rounded-lg ${showFeedback.q4.correct ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                {showFeedback.q4.correct ? (
                  <p>✅ Correct! Compilation is the process of converting source code to machine code.</p>
                ) : (
                  <p>❌ Not quite. The correct answer is "Compile" - the process that transforms human-readable code into machine instructions.</p>
                )}
              </div>
            )}
          </div>
        );
      case 5:
        return (
          <div className="mb-6 animate-fade-in">
            <h3 className="font-semibold text-lg mb-3">5. Computers understand code written in ________ form.</h3>
            <div className="relative">
              <input
                type="text"
                name="q5"
                value={answers.q5 || ""}
                onChange={(e) => handleChange(e, "q5")}
                onBlur={(e) => handleTextInputBlur(e, "q5")}
                className="border-2 border-gray-300 focus:border-blue-500 rounded-lg px-4 py-3 mt-2 w-full text-lg transition-all"
                placeholder="Type your answer here"
              />
              <div className="text-sm text-gray-500 mt-2">Hint: It's a number system with only two digits (0 and 1)</div>
            </div>
            {showFeedback.q5 && (
              <div className={`mt-3 p-3 rounded-lg ${showFeedback.q5.correct ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                {showFeedback.q5.correct ? (
                  <p>✅ Correct! Computers understand code in binary form (0s and 1s).</p>
                ) : (
                  <p>❌ Not quite. The correct answer is "Binary" - computers ultimately process all instructions as sequences of 0s and 1s.</p>
                )}
              </div>
            )}
          </div>
        );
      case 6:
        return (
          <div className="mb-6 animate-fade-in">
            <h3 className="font-semibold text-lg mb-3">6. Java is a low-level programming language. (True/False)</h3>
            <div className="flex space-x-4 mt-2">
              <div className={`flex-1 p-3 rounded-lg border ${answers.q6 === "True" ? 'border-blue-500 bg-blue-50' : 'border-gray-300'} transition-all hover:border-blue-300`}>
                <label className="flex items-center justify-center cursor-pointer w-full">
                  <input
                    type="radio"
                    name="q6"
                    value="True"
                    checked={answers.q6 === "True"}
                    onChange={(e) => handleChange(e, "q6")}
                    className="mr-2 h-5 w-5 text-blue-600"
                  />
                  <span className="text-lg">True</span>
                </label>
              </div>
              <div className={`flex-1 p-3 rounded-lg border ${answers.q6 === "False" ? 'border-blue-500 bg-blue-50' : 'border-gray-300'} transition-all hover:border-blue-300`}>
                <label className="flex items-center justify-center cursor-pointer w-full">
                  <input
                    type="radio"
                    name="q6"
                    value="False"
                    checked={answers.q6 === "False"}
                    onChange={(e) => handleChange(e, "q6")}
                    className="mr-2 h-5 w-5 text-blue-600"
                  />
                  <span className="text-lg">False</span>
                </label>
              </div>
            </div>
            {showFeedback.q6 && (
              <div className={`mt-3 p-3 rounded-lg ${showFeedback.q6.correct ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                {showFeedback.q6.correct ? (
                  <p>✅ Correct! Java is a high-level programming language, not a low-level one.</p>
                ) : (
                  <p>❌ That's not right. Java is considered a high-level programming language because it has strong abstractions from the computer's hardware.</p>
                )}
              </div>
            )}
          </div>
        );
      case 7:
        return (
          <div className="mb-6 animate-fade-in">
            <h3 className="font-semibold text-lg mb-3">7. Which of the following is NOT a step in the process of compiling code?</h3>
            <div className="space-y-2">
              <div className={`p-3 rounded-lg border ${answers.q7 === "Lexical Analysis" ? 'border-blue-500 bg-blue-50' : 'border-gray-300'} transition-all hover:border-blue-300`}>
                <label className="flex items-center cursor-pointer w-full">
                  <input
                    type="radio"
                    name="q7"
                    value="Lexical Analysis"
                    checked={answers.q7 === "Lexical Analysis"}
                    onChange={(e) => handleChange(e, "q7")}
                    className="mr-3 h-5 w-5 text-blue-600"
                  />
                  <span>Lexical Analysis</span>
                </label>
              </div>
              <div className={`p-3 rounded-lg border ${answers.q7 === "Code Optimization" ? 'border-blue-500 bg-blue-50' : 'border-gray-300'} transition-all hover:border-blue-300`}>
                <label className="flex items-center cursor-pointer w-full">
                  <input
                    type="radio"
                    name="q7"
                    value="Code Optimization"
                    checked={answers.q7 === "Code Optimization"}
                    onChange={(e) => handleChange(e, "q7")}
                    className="mr-3 h-5 w-5 text-blue-600"
                  />
                  <span>Code Optimization</span>
                </label>
              </div>
              <div className={`p-3 rounded-lg border ${answers.q7 === "Syntax Error Execution" ? 'border-blue-500 bg-blue-50' : 'border-gray-300'} transition-all hover:border-blue-300`}>
                <label className="flex items-center cursor-pointer w-full">
                  <input
                    type="radio"
                    name="q7"
                    value="Syntax Error Execution"
                    checked={answers.q7 === "Syntax Error Execution"}
                    onChange={(e) => handleChange(e, "q7")}
                    className="mr-3 h-5 w-5 text-blue-600"
                  />
                  <span>Syntax Error Execution</span>
                </label>
              </div>
              <div className={`p-3 rounded-lg border ${answers.q7 === "Code Generation" ? 'border-blue-500 bg-blue-50' : 'border-gray-300'} transition-all hover:border-blue-300`}>
                <label className="flex items-center cursor-pointer w-full">
                  <input
                    type="radio"
                    name="q7"
                    value="Code Generation"
                    checked={answers.q7 === "Code Generation"}
                    onChange={(e) => handleChange(e, "q7")}
                    className="mr-3 h-5 w-5 text-blue-600"
                  />
                  <span>Code Generation</span>
                </label>
              </div>
            </div>
            {showFeedback.q7 && (
              <div className={`mt-3 p-3 rounded-lg ${showFeedback.q7.correct ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                {showFeedback.q7.correct ? (
                  <p>✅ Correct! "Syntax Error Execution" is not a compilation step - errors are identified during compilation but not "executed".</p>
                ) : (
                  <p>❌ That's not right. "Syntax Error Execution" is not a step in compilation. Lexical Analysis, Code Optimization, and Code Generation are all real steps in the compilation process.</p>
                )}
              </div>
            )}
          </div>
        );
      case 8:
        return (
          <div className="mb-6 animate-fade-in">
            <h3 className="font-semibold text-lg mb-3">8. The first step in the compilation process, where code is broken into tokens, is called ________.</h3>
            <div className="relative">
              <input
                type="text"
                name="q8"
                value={answers.q8 || ""}
                onChange={(e) => handleChange(e, "q8")}
                onBlur={(e) => handleTextInputBlur(e, "q8")}
                className="border-2 border-gray-300 focus:border-blue-500 rounded-lg px-4 py-3 mt-2 w-full text-lg transition-all"
                placeholder="Type your answer here"
              />
              <div className="text-sm text-gray-500 mt-2">Hint: It contains the word "Analysis"</div>
            </div>
            {showFeedback.q8 && (
              <div className={`mt-3 p-3 rounded-lg ${showFeedback.q8.correct ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                {showFeedback.q8.correct ? (
                  <p>✅ Correct! Lexical Analysis is the first step where code is broken into tokens.</p>
                ) : (
                  <p>❌ Not quite. The correct answer is "Lexical Analysis" - the process of converting code into meaningful tokens.</p>
                )}
              </div>
            )}
          </div>
        );
      case 9:
        return (
          <div className="mb-6 animate-fade-in">
            <h3 className="font-semibold text-lg mb-3">9. ________ is a language commonly used for front-end web development.</h3>
            <div className="relative">
              <input
                type="text"
                name="q9"
                value={answers.q9 || ""}
                onChange={(e) => handleChange(e, "q9")}
                onBlur={(e) => handleTextInputBlur(e, "q9")}
                className="border-2 border-gray-300 focus:border-blue-500 rounded-lg px-4 py-3 mt-2 w-full text-lg transition-all"
                placeholder="Type your answer here"
              />
              <div className="text-sm text-gray-500 mt-2">Hint: It starts with "J" and is used to create interactive websites</div>
            </div>
            {showFeedback.q9 && (
              <div className={`mt-3 p-3 rounded-lg ${showFeedback.q9.correct ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                {showFeedback.q9.correct ? (
                  <p>✅ Correct! JavaScript is indeed commonly used for front-end web development.</p>
                ) : (
                  <p>❌ Not quite. The correct answer is "JavaScript" - the primary language used to add interactivity to web pages.</p>
                )}
              </div>
            )}
          </div>
        );
      case 10:
        return (
          <div className="mb-6 animate-fade-in">
            <h3 className="font-semibold text-lg mb-3">10. Compiling ensures that the code is error-free and optimized. (True/False)</h3>
            <div className="flex space-x-4 mt-2">
              <div className={`flex-1 p-3 rounded-lg border ${answers.q10 === "True" ? 'border-blue-500 bg-blue-50' : 'border-gray-300'} transition-all hover:border-blue-300`}>
                <label className="flex items-center justify-center cursor-pointer w-full">
                  <input
                    type="radio"
                    name="q10"
                    value="True"
                    checked={answers.q10 === "True"}
                    onChange={(e) => handleChange(e, "q10")}
                    className="mr-2 h-5 w-5 text-blue-600"
                  />
                  <span className="text-lg">True</span>
                </label>
              </div>
              <div className={`flex-1 p-3 rounded-lg border ${answers.q10 === "False" ? 'border-blue-500 bg-blue-50' : 'border-gray-300'} transition-all hover:border-blue-300`}>
                <label className="flex items-center justify-center cursor-pointer w-full">
                  <input
                    type="radio"
                    name="q10"
                    value="False"
                    checked={answers.q10 === "False"}
                    onChange={(e) => handleChange(e, "q10")}
                    className="mr-2 h-5 w-5 text-blue-600"
                  />
                  <span className="text-lg">False</span>
                </label>
              </div>
            </div>
            {showFeedback.q10 && (
              <div className={`mt-3 p-3 rounded-lg ${showFeedback.q10.correct ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                {showFeedback.q10.correct ? (
                  <p>✅ Correct! Compiling does check for errors and can optimize code.</p>
                ) : (
                  <p>❌ That's not right. Compiling does ensure the code is checked for errors and often includes optimization steps.</p>
                )}
              </div>
            )}
          </div>
        );
      default:
        return <div>Question {questionNumber} not available</div>;
    }
  };

  if (breakMode) {
    return (
      <div className="bg-blue-50 min-h-screen">
        <SignedInNavbar />
        <main className="container mx-auto px-4 py-8">
          <div className="min-h-screen flex flex-col items-center justify-center p-6">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md text-center">
              <h2 className="text-2xl font-bold text-blue-600 mb-4">Break Time!</h2>
              <p className="text-lg mb-4">Take a moment to relax and reset your focus.</p>
              <div className="mb-6">
                <div className="text-4xl font-bold text-blue-500 mb-2">{breakTimeLeft}</div>
                <div className="w-full bg-gray-200 rounded-full h-4">
                  <div
                    className="bg-blue-500 h-4 rounded-full transition-all duration-1000"
                    style={{ width: `${(breakTimeLeft / 60) * 100}%` }}
                  ></div>
                </div>
              </div>
              <p className="text-gray-600 mb-4">Try a quick stretch or take a few deep breaths.</p>
              <button
                onClick={() => setBreakMode(false)}
                className="bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition w-full"
              >
                Resume Quiz Early
              </button>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      <SignedInNavbar />

      <main className="container mx-auto px-4 py-8">
        <div className="min-h-screen bg-gray-50 flex flex-col items-center p-6">
          <div className="w-full max-w-3xl mb-4">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-bold">Quiz: Introduction to Programming</h1>
              <button
                onClick={takeBreak}
                className="bg-blue-100 text-blue-600 py-2 px-4 rounded-lg hover:bg-blue-200 transition flex items-center"
              >
                <span className="mr-2">🧠</span> Take a 1-minute break
              </button>
            </div>
            
            {/* Progress bar */}
            <div className="mt-4 mb-6">
              <div className="flex justify-between text-sm text-gray-600 mb-1">
                <span>Question {currentQuestion} of {totalQuestions}</span>
                <span>{Math.round(progress)}% Complete</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div
                  className="bg-blue-500 h-3 rounded-full transition-all duration-500"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-3xl">
            {!quizCompleted ? (
              <form>
                {renderQuestion(currentQuestion)}

                <div className="flex justify-between mt-8">
                  <button
                    type="button"
                    onClick={() => navigateQuestion("prev")}
                    disabled={currentQuestion === 1}
                    className={`py-2 px-4 rounded-lg ${
                      currentQuestion === 1
                        ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                        : "bg-gray-600 text-white hover:bg-gray-700"
                    } transition`}
                  >
                    Previous
                  </button>
                  {currentQuestion < totalQuestions ? (
                    <button
                      type="button"
                      onClick={() => navigateQuestion("next")}
                      className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition"
                    >
                      Next
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={handleSubmit}
                      className="bg-green-600 text-white py-2 px-6 rounded-lg hover:bg-green-700 transition"
                    >
                      Submit Quiz
                    </button>
                  )}
                </div>

                <div className="flex justify-center space-x-2 mt-6">
                  {Array.from({ length: totalQuestions }).map((_, index) => (
                    <button
                      key={index}
                      type="button"
                      onClick={() => setCurrentQuestion(index + 1)}
                      className={`h-3 w-3 rounded-full transition-all ${
                        currentQuestion === index + 1
                          ? "bg-blue-600 transform scale-125"
                          : answers[`q${index + 1}`]
                          ? "bg-blue-300"
                          : "bg-gray-300"
                      }`}
                      aria-label={`Go to question ${index + 1}`}
                    ></button>
                  ))}
                </div>
              </form>
            ) : (
              <div className="p-6">
                <h2 className="text-2xl font-bold text-center mb-6">Quiz Results</h2>
                <div className="mb-6 text-center">
                  <div className="text-5xl font-bold text-blue-600 mb-2">{score} / 10</div>
                  <div className="text-lg text-gray-700">
                    {score >= 8
                      ? "Excellent work! 🎉"
                      : score >= 6
                      ? "Good job! 👍"
                      : "Keep practicing! 💪"}
                  </div>
                </div>

                <div className="p-4 bg-blue-50 rounded-lg mb-6">
                  <h3 className="font-semibold mb-2">Review Your Answers</h3>
                  <p>Take time to review the questions you missed to reinforce your learning.</p>
                </div>

                <div className="flex justify-center mt-6">
                  <button
                    onClick={() => {
                      setQuizCompleted(false);
                      setCurrentQuestion(1);
                    }}
                    className="bg-blue-600 text-white py-2 px-6 rounded-lg hover:bg-blue-700 transition mr-4"
                  >
                    Review Questions
                  </button>
                  <button
                    onClick={() => {
                      setAnswers({});
                      setScore(null);
                      setQuizCompleted(false);
                      setCurrentQuestion(1);
                      setShowFeedback({});
                      setProgress(0);
                    }}
                    className="bg-green-600 text-white py-2 px-6 rounded-lg hover:bg-green-700 transition"
                  >
                    Retake Quiz
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default ProgrammingQuiz;