import React, { useState, useEffect } from "react";
import SignedInNavbar from "./SignedInNavbar";
import { Eye, EyeOff } from "lucide-react";

const PhilosophyQuiz = () => {
  const [answers, setAnswers] = useState({});
  const [score, setScore] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [timeRemaining, setTimeRemaining] = useState(null);
  const [breakMode, setBreakMode] = useState(false);
  const [breakTimeLeft, setBreakTimeLeft] = useState(60);
  const [progress, setProgress] = useState(0);
  const [showFeedback, setShowFeedback] = useState({});
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [focusMode, setFocusMode] = useState(false);
  const [hoveredQuestion, setHoveredQuestion] = useState(null);

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
      q1: "c) The falsifiability criterion",
      q2: "b) It could explain everything but could not be falsified",
      q3: "c) They make testable predictions that could potentially be falsified",
      q4: "induction",
      q5: "specific, testable predictions",
      q6: "logical positivism",
      q7: "Einstein",
      q8: "conjectures",
      q9: "False",
      q10: "False",
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
      q1: "c) The falsifiability criterion",
      q2: "b) It could explain everything but could not be falsified",
      q3: "c) They make testable predictions that could potentially be falsified",
      q4: "induction",
      q5: "specific, testable predictions",
      q6: "logical positivism",
      q7: "Einstein",
      q8: "conjectures",
      q9: "False",
      q10: "False",
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

  const getBackgroundColor = () => {
    return focusMode ? "bg-gray-100" : "bg-gray-50";
  };

  const renderQuestion = (questionNumber) => {
    switch (questionNumber) {
      case 1:
        return (
          <div className="mb-6 animate-fade-in">
            <h3 className="font-semibold text-lg mb-3">1. What was Karl Popper's main contribution to the philosophy of science?</h3>
            <div className="space-y-2">
              <div className={`p-3 rounded-lg border ${answers.q1 === "a) The inductive method" ? 'border-blue-500 bg-blue-50' : 'border-gray-300'} transition-all hover:border-blue-300`}>
                <label className="flex items-center cursor-pointer w-full">
                  <input
                    type="radio"
                    name="q1"
                    value="a) The inductive method"
                    checked={answers.q1 === "a) The inductive method"}
                    onChange={(e) => handleChange(e, "q1")}
                    className="mr-3 h-5 w-5 text-blue-600"
                  />
                  <span>a) The inductive method</span>
                </label>
              </div>
              <div className={`p-3 rounded-lg border ${answers.q1 === "b) The principle of verifiability" ? 'border-blue-500 bg-blue-50' : 'border-gray-300'} transition-all hover:border-blue-300`}>
                <label className="flex items-center cursor-pointer w-full">
                  <input
                    type="radio"
                    name="q1"
                    value="b) The principle of verifiability"
                    checked={answers.q1 === "b) The principle of verifiability"}
                    onChange={(e) => handleChange(e, "q1")}
                    className="mr-3 h-5 w-5 text-blue-600"
                  />
                  <span>b) The principle of verifiability</span>
                </label>
              </div>
              <div className={`p-3 rounded-lg border ${answers.q1 === "c) The falsifiability criterion" ? 'border-blue-500 bg-blue-50' : 'border-gray-300'} transition-all hover:border-blue-300`}>
                <label className="flex items-center cursor-pointer w-full">
                  <input
                    type="radio"
                    name="q1"
                    value="c) The falsifiability criterion"
                    checked={answers.q1 === "c) The falsifiability criterion"}
                    onChange={(e) => handleChange(e, "q1")}
                    className="mr-3 h-5 w-5 text-blue-600"
                  />
                  <span>c) The falsifiability criterion</span>
                </label>
              </div>
              <div className={`p-3 rounded-lg border ${answers.q1 === "d) The theory of relativity" ? 'border-blue-500 bg-blue-50' : 'border-gray-300'} transition-all hover:border-blue-300`}>
                <label className="flex items-center cursor-pointer w-full">
                  <input
                    type="radio"
                    name="q1"
                    value="d) The theory of relativity"
                    checked={answers.q1 === "d) The theory of relativity"}
                    onChange={(e) => handleChange(e, "q1")}
                    className="mr-3 h-5 w-5 text-blue-600"
                  />
                  <span>d) The theory of relativity</span>
                </label>
              </div>
            </div>
            {showFeedback.q1 && (
              <div className={`mt-3 p-3 rounded-lg ${showFeedback.q1.correct ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                {showFeedback.q1.correct ? (
                  <p>✅ Correct! Karl Popper is best known for his falsifiability criterion, which states that a theory must be capable of being proven false to be considered scientific.</p>
                ) : (
                  <p>❌ That's not right. Popper's main contribution was the falsifiability criterion, which distinguishes scientific theories from non-scientific ones.</p>
                )}
              </div>
            )}
          </div>
        );
      case 2:
        return (
          <div className="mb-6 animate-fade-in">
            <h3 className="font-semibold text-lg mb-3">2. Why did Popper consider Freud's psychoanalysis to be pseudo-scientific?</h3>
            <div className="space-y-2">
              <div className={`p-3 rounded-lg border ${answers.q2 === "a) It was based on logical positivism" ? 'border-blue-500 bg-blue-50' : 'border-gray-300'} transition-all hover:border-blue-300`}>
                <label className="flex items-center cursor-pointer w-full">
                  <input
                    type="radio"
                    name="q2"
                    value="a) It was based on logical positivism"
                    checked={answers.q2 === "a) It was based on logical positivism"}
                    onChange={(e) => handleChange(e, "q2")}
                    className="mr-3 h-5 w-5 text-blue-600"
                  />
                  <span>a) It was based on logical positivism</span>
                </label>
              </div>
              <div className={`p-3 rounded-lg border ${answers.q2 === "b) It could explain everything but could not be falsified" ? 'border-blue-500 bg-blue-50' : 'border-gray-300'} transition-all hover:border-blue-300`}>
                <label className="flex items-center cursor-pointer w-full">
                  <input
                    type="radio"
                    name="q2"
                    value="b) It could explain everything but could not be falsified"
                    checked={answers.q2 === "b) It could explain everything but could not be falsified"}
                    onChange={(e) => handleChange(e, "q2")}
                    className="mr-3 h-5 w-5 text-blue-600"
                  />
                  <span>b) It could explain everything but could not be falsified</span>
                </label>
              </div>
              <div className={`p-3 rounded-lg border ${answers.q2 === "c) It relied on mathematical models" ? 'border-blue-500 bg-blue-50' : 'border-gray-300'} transition-all hover:border-blue-300`}>
                <label className="flex items-center cursor-pointer w-full">
                  <input
                    type="radio"
                    name="q2"
                    value="c) It relied on mathematical models"
                    checked={answers.q2 === "c) It relied on mathematical models"}
                    onChange={(e) => handleChange(e, "q2")}
                    className="mr-3 h-5 w-5 text-blue-600"
                  />
                  <span>c) It relied on mathematical models</span>
                </label>
              </div>
              <div className={`p-3 rounded-lg border ${answers.q2 === "d) It was tested against real-world observations" ? 'border-blue-500 bg-blue-50' : 'border-gray-300'} transition-all hover:border-blue-300`}>
                <label className="flex items-center cursor-pointer w-full">
                  <input
                    type="radio"
                    name="q2"
                    value="d) It was tested against real-world observations"
                    checked={answers.q2 === "d) It was tested against real-world observations"}
                    onChange={(e) => handleChange(e, "q2")}
                    className="mr-3 h-5 w-5 text-blue-600"
                  />
                  <span>d) It was tested against real-world observations</span>
                </label>
              </div>
            </div>
            {showFeedback.q2 && (
              <div className={`mt-3 p-3 rounded-lg ${showFeedback.q2.correct ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                {showFeedback.q2.correct ? (
                  <p>✅ Correct! Popper criticized Freud's theories because they seemed to explain everything without making specific predictions that could be falsified.</p>
                ) : (
                  <p>❌ Not quite. Popper considered psychoanalysis pseudo-scientific because it could seemingly explain any observation without making falsifiable predictions.</p>
                )}
              </div>
            )}
          </div>
        );
      case 3:
        return (
          <div className="mb-6 animate-fade-in">
            <h3 className="font-semibold text-lg mb-3">3. According to Popper, which of the following is a characteristic of scientific theories?</h3>
            <div className="space-y-2">
              <div className={`p-3 rounded-lg border ${answers.q3 === "a) They can explain all phenomena within their domain" ? 'border-blue-500 bg-blue-50' : 'border-gray-300'} transition-all hover:border-blue-300`}>
                <label className="flex items-center cursor-pointer w-full">
                  <input
                    type="radio"
                    name="q3"
                    value="a) They can explain all phenomena within their domain"
                    checked={answers.q3 === "a) They can explain all phenomena within their domain"}
                    onChange={(e) => handleChange(e, "q3")}
                    className="mr-3 h-5 w-5 text-blue-600"
                  />
                  <span>a) They can explain all phenomena within their domain</span>
                </label>
              </div>
              <div className={`p-3 rounded-lg border ${answers.q3 === "b) They rely solely on confirmation" ? 'border-blue-500 bg-blue-50' : 'border-gray-300'} transition-all hover:border-blue-300`}>
                <label className="flex items-center cursor-pointer w-full">
                  <input
                    type="radio"
                    name="q3"
                    value="b) They rely solely on confirmation"
                    checked={answers.q3 === "b) They rely solely on confirmation"}
                    onChange={(e) => handleChange(e, "q3")}
                    className="mr-3 h-5 w-5 text-blue-600"
                  />
                  <span>b) They rely solely on confirmation</span>
                </label>
              </div>
              <div className={`p-3 rounded-lg border ${answers.q3 === "c) They make testable predictions that could potentially be falsified" ? 'border-blue-500 bg-blue-50' : 'border-gray-300'} transition-all hover:border-blue-300`}>
                <label className="flex items-center cursor-pointer w-full">
                  <input
                    type="radio"
                    name="q3"
                    value="c) They make testable predictions that could potentially be falsified"
                    checked={answers.q3 === "c) They make testable predictions that could potentially be falsified"}
                    onChange={(e) => handleChange(e, "q3")}
                    className="mr-3 h-5 w-5 text-blue-600"
                  />
                  <span>c) They make testable predictions that could potentially be falsified</span>
                </label>
              </div>
              <div className={`p-3 rounded-lg border ${answers.q3 === "d) They are never questioned once accepted" ? 'border-blue-500 bg-blue-50' : 'border-gray-300'} transition-all hover:border-blue-300`}>
                <label className="flex items-center cursor-pointer w-full">
                  <input
                    type="radio"
                    name="q3"
                    value="d) They are never questioned once accepted"
                    checked={answers.q3 === "d) They are never questioned once accepted"}
                    onChange={(e) => handleChange(e, "q3")}
                    className="mr-3 h-5 w-5 text-blue-600"
                  />
                  <span>d) They are never questioned once accepted</span>
                </label>
              </div>
            </div>
            {showFeedback.q3 && (
              <div className={`mt-3 p-3 rounded-lg ${showFeedback.q3.correct ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                {showFeedback.q3.correct ? (
                  <p>✅ Correct! For Popper, the key characteristic of scientific theories is that they make predictions that could potentially be proven false.</p>
                ) : (
                  <p>❌ That's not right. According to Popper, scientific theories must make testable predictions that could be falsified if they are incorrect.</p>
                )}
              </div>
            )}
          </div>
        );
      case 4:
        return (
          <div className="mb-6 animate-fade-in">
            <h3 className="font-semibold text-lg mb-3">4. Popper rejected __________ as the primary scientific method and instead emphasized falsification.</h3>
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
              <div className="text-sm text-gray-500 mt-2">Hint: It's the process of deriving general principles from specific observations</div>
            </div>
            {showFeedback.q4 && (
              <div className={`mt-3 p-3 rounded-lg ${showFeedback.q4.correct ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                {showFeedback.q4.correct ? (
                  <p>✅ Correct! Popper rejected induction as the primary scientific method, arguing that we cannot logically derive universal statements from particular observations.</p>
                ) : (
                  <p>❌ Not quite. The correct answer is "induction" - Popper rejected the idea that science primarily works by accumulating confirming instances.</p>
                )}
              </div>
            )}
          </div>
        );
      case 5:
        return (
          <div className="mb-6 animate-fade-in">
            <h3 className="font-semibold text-lg mb-3">5. A theory is considered scientific if it makes __________ and prohibits certain observations.</h3>
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
              <div className="text-sm text-gray-500 mt-2">Hint: These predictions must be capable of being tested</div>
            </div>
            {showFeedback.q5 && (
              <div className={`mt-3 p-3 rounded-lg ${showFeedback.q5.correct ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                {showFeedback.q5.correct ? (
                  <p>✅ Correct! Scientific theories must make specific, testable predictions that could be proven false.</p>
                ) : (
                  <p>❌ Not quite. The correct answer is "specific, testable predictions" - a scientific theory must rule out certain possible observations.</p>
                )}
              </div>
            )}
          </div>
        );
      case 6:
        return (
          <div className="mb-6 animate-fade-in">
            <h3 className="font-semibold text-lg mb-3">6. The dominant philosophy of science in the early 20th century, which required meaningful statements to be empirically verifiable, was called __________.</h3>
            <div className="relative">
              <input
                type="text"
                name="q6"
                value={answers.q6 || ""}
                onChange={(e) => handleChange(e, "q6")}
                onBlur={(e) => handleTextInputBlur(e, "q6")}
                className="border-2 border-gray-300 focus:border-blue-500 rounded-lg px-4 py-3 mt-2 w-full text-lg transition-all"
                placeholder="Type your answer here"
              />
              <div className="text-sm text-gray-500 mt-2">Hint: A philosophical movement associated with the Vienna Circle</div>
            </div>
            {showFeedback.q6 && (
              <div className={`mt-3 p-3 rounded-lg ${showFeedback.q6.correct ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                {showFeedback.q6.correct ? (
                  <p>✅ Correct! Logical positivism was the dominant philosophy of science that Popper critiqued.</p>
                ) : (
                  <p>❌ Not quite. The correct answer is "logical positivism" - a movement that emphasized verification rather than falsification.</p>
                )}
              </div>
            )}
          </div>
        );
      case 7:
        return (
          <div className="mb-6 animate-fade-in">
            <h3 className="font-semibold text-lg mb-3">7. Popper admired __________'s theory of relativity because it made testable predictions that could be disproven.</h3>
            <div className="relative">
              <input
                type="text"
                name="q7"
                value={answers.q7 || ""}
                onChange={(e) => handleChange(e, "q7")}
                onBlur={(e) => handleTextInputBlur(e, "q7")}
                className="border-2 border-gray-300 focus:border-blue-500 rounded-lg px-4 py-3 mt-2 w-full text-lg transition-all"
                placeholder="Type your answer here"
              />
              <div className="text-sm text-gray-500 mt-2">Hint: A famous physicist known for E=mc²</div>
            </div>
            {showFeedback.q7 && (
              <div className={`mt-3 p-3 rounded-lg ${showFeedback.q7.correct ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                {showFeedback.q7.correct ? (
                  <p>✅ Correct! Popper greatly admired Einstein's theory because it made risky predictions that could be falsified.</p>
                ) : (
                  <p>❌ Not quite. The correct answer is "Einstein" - Popper contrasted Einstein's theories with those of Marx and Freud as an example of true science.</p>
                )}
              </div>
            )}
          </div>
        );
      case 8:
        return (
          <div className="mb-6 animate-fade-in">
            <h3 className="font-semibold text-lg mb-3">8. The process of forming theories and testing them rigorously, which Popper described as the foundation of scientific progress, is called __________ and refutations.</h3>
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
              <div className="text-sm text-gray-500 mt-2">Hint: It refers to educated guesses or hypotheses</div>
            </div>
            {showFeedback.q8 && (
              <div className={`mt-3 p-3 rounded-lg ${showFeedback.q8.correct ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                {showFeedback.q8.correct ? (
                  <p>✅ Correct! "Conjectures and Refutations" is the title of one of Popper's most famous works and describes his view of the scientific process.</p>
                ) : (
                  <p>❌ Not quite. The correct answer is "conjectures" - Popper's view of science was that it progresses through "conjectures and refutations."</p>
                )}
              </div>
            )}
          </div>
        );
      case 9:
        return (
          <div className="mb-6 animate-fade-in">
            <h3 className="font-semibold text-lg mb-3">9. According to Popper, a single contrary observation can conclusively disprove a universal scientific theory. (True/False)</h3>
            <div className="flex space-x-4 mt-2">
              <div className={`flex-1 p-3 rounded-lg border ${answers.q9 === "True" ? 'border-blue-500 bg-blue-50' : 'border-gray-300'} transition-all hover:border-blue-300`}>
                <label className="flex items-center justify-center cursor-pointer w-full">
                  <input
                    type="radio"
                    name="q9"
                    value="True"
                    checked={answers.q9 === "True"}
                    onChange={(e) => handleChange(e, "q9")}
                    className="mr-2 h-5 w-5 text-blue-600"
                  />
                  <span className="text-lg">True</span>
                </label>
              </div>
              <div className={`flex-1 p-3 rounded-lg border ${answers.q9 === "False" ? 'border-blue-500 bg-blue-50' : 'border-gray-300'} transition-all hover:border-blue-300`}>
                <label className="flex items-center justify-center cursor-pointer w-full">
                  <input
                    type="radio"
                    name="q9"
                    value="False"
                    checked={answers.q9 === "False"}
                    onChange={(e) => handleChange(e, "q9")}
                    className="mr-2 h-5 w-5 text-blue-600"
                  />
                  <span className="text-lg">False</span>
                </label>
              </div>
            </div>
            {showFeedback.q9 && (
              <div className={`mt-3 p-3 rounded-lg ${showFeedback.q9.correct ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                {showFeedback.q9.correct ? (
                  <p>✅ Correct! While Popper initially held this view, he later modified his position to acknowledge that in practice, falsification is more complex and influenced by various factors.</p>
                ) : (
                  <p>❌ That's not right. While falsification is central to Popper's philosophy, his mature view recognized that in practice, falsification is more complex than a single observation disproving a theory.</p>
                )}
              </div>
            )}
          </div>
        );
      case 10:
        return (
          <div className="mb-6 animate-fade-in">
            <h3 className="font-semibold text-lg mb-3">10. The Duhem-Quine thesis suggests that theories are always tested in isolation without the influence of auxiliary hypotheses. (True/False)</h3>
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
                  <p>✅ Correct! The Duhem-Quine thesis actually states the opposite - that theories are never tested in isolation but always with auxiliary hypotheses.</p>
                ) : (
<p>❌ That's not right. The Duhem-Quine thesis states that theories are tested as a network of beliefs, not in isolation, which complicates the process of falsification.</p>
                )}
              </div>
            )}
          </div>
        );
      default:
        return null;
    }
  };

  const renderResult = () => {
    if (!quizCompleted) return null;

    const percentage = (score / totalQuestions) * 100;
    let message = "";
    let color = "";

    if (percentage >= 90) {
      message = "Excellent! You have a strong understanding of Popper's philosophy of science.";
      color = "text-green-600";
    } else if (percentage >= 70) {
      message = "Good job! You have a solid grasp of the key concepts.";
      color = "text-blue-600";
    } else if (percentage >= 50) {
      message = "Not bad. You understood some important ideas but might want to review the material.";
      color = "text-yellow-600";
    } else {
      message = "You might want to spend more time studying Popper's ideas.";
      color = "text-red-600";
    }

    return (
      <div className="mt-6 p-6 bg-white rounded-xl shadow-md animate-fade-in">
        <h2 className="text-2xl font-bold mb-4">Quiz Results</h2>
        <div className="flex items-center justify-center mb-4">
          <div className="relative h-36 w-36">
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-3xl font-bold">{score}/{totalQuestions}</span>
            </div>
            <svg className="h-36 w-36" viewBox="0 0 36 36">
              <path
                d="M18 2.0845
                  a 15.9155 15.9155 0 0 1 0 31.831
                  a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                stroke="#eee"
                strokeWidth="3"
              />
              <path
                d="M18 2.0845
                  a 15.9155 15.9155 0 0 1 0 31.831
                  a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                stroke={percentage >= 70 ? "#48bb78" : percentage >= 50 ? "#3182ce" : "#e53e3e"}
                strokeWidth="3"
                strokeDasharray={`${percentage}, 100`}
              />
            </svg>
          </div>
        </div>
        <p className={`text-lg font-medium ${color} text-center mb-4`}>{message}</p>
        <div className="space-y-4 mt-6">
          <h3 className="font-semibold text-lg">Key Takeaways:</h3>
          <ul className="list-disc pl-5 space-y-2">
            <li>Karl Popper's falsifiability criterion distinguishes scientific theories from non-scientific ones.</li>
            <li>Scientific theories must make testable predictions that could potentially be proven false.</li>
            <li>Popper rejected induction in favor of his "conjectures and refutations" approach.</li>
            <li>Popper contrasted Einstein's theories (scientific) with those of Freud and Marx (pseudo-scientific).</li>
            <li>The Duhem-Quine thesis complicates the process of falsification, showing that theories are tested as networks of beliefs.</li>
          </ul>
        </div>
        <div className="mt-6 flex justify-center">
          <button
            onClick={() => {
              setQuizCompleted(false);
              setAnswers({});
              setShowFeedback({});
              setCurrentQuestion(1);
              setScore(null);
            }}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition-colors"
          >
            Retake Quiz
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className={`min-h-screen ${getBackgroundColor()} pb-12`}>
      <SignedInNavbar />
      
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-8 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-800">Karl Popper's Philosophy of Science Quiz</h1>
          <button
            onClick={() => setFocusMode(!focusMode)}
            className="flex items-center px-4 py-2 bg-white rounded-lg shadow-sm border border-gray-300 hover:bg-gray-50 transition-colors"
          >
            {focusMode ? <EyeOff size={18} className="mr-2" /> : <Eye size={18} className="mr-2" />}
            {focusMode ? "Exit Focus Mode" : "Focus Mode"}
          </button>
        </div>

        {!quizCompleted && (
          <>
            <div className="bg-white rounded-xl shadow-md p-6 mb-6">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h2 className="text-xl font-semibold">Question {currentQuestion} of {totalQuestions}</h2>
                  <p className="text-gray-600">Answer all questions to see your results</p>
                </div>
                <div className="flex items-center">
                  <button
                    onClick={takeBreak}
                    disabled={breakMode}
                    className={`px-4 py-2 rounded-lg mr-3 ${
                      breakMode
                        ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                        : "bg-blue-100 text-blue-700 hover:bg-blue-200 transition-colors"
                    }`}
                  >
                    {breakMode
                      ? `Break: ${Math.floor(breakTimeLeft / 60)}:${String(
                          breakTimeLeft % 60
                        ).padStart(2, "0")}`
                      : "Take a Break"}
                  </button>
                  <div className="w-24 bg-gray-200 rounded-full h-2.5">
                    <div
                      className="bg-blue-600 h-2.5 rounded-full"
                      style={{ width: `${progress}%` }}
                    ></div>
                  </div>
                </div>
              </div>
              
              {renderQuestion(currentQuestion)}
              
              <div className="flex justify-between mt-8">
                <button
                  onClick={() => navigateQuestion("prev")}
                  disabled={currentQuestion === 1}
                  className={`px-4 py-2 rounded-lg ${
                    currentQuestion === 1
                      ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                      : "bg-gray-800 text-white hover:bg-gray-700 transition-colors"
                  }`}
                >
                  Previous
                </button>
                {currentQuestion < totalQuestions ? (
                  <button
                    onClick={() => navigateQuestion("next")}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition-colors"
                  >
                    Next
                  </button>
                ) : (
                  <button
                    onClick={handleSubmit}
                    className="px-4 py-2 bg-green-600 text-white rounded-lg shadow hover:bg-green-700 transition-colors"
                  >
                    Submit Quiz
                  </button>
                )}
              </div>
            </div>
            
            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-xl font-semibold mb-4">Quiz Navigation</h2>
              <div className="grid grid-cols-5 gap-2 sm:grid-cols-10">
                {Array.from({ length: totalQuestions }).map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentQuestion(index + 1)}
                    onMouseEnter={() => setHoveredQuestion(index + 1)}
                    onMouseLeave={() => setHoveredQuestion(null)}
                    className={`w-full p-3 rounded-lg border relative ${
                      currentQuestion === index + 1
                        ? "bg-blue-600 text-white"
                        : answers[`q${index + 1}`]
                        ? "bg-blue-100 text-blue-700 border-blue-300"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors"
                    }`}
                  >
                    {index + 1}
                    {hoveredQuestion === index + 1 && (
                      <div className="absolute left-1/2 bottom-full mb-2 transform -translate-x-1/2 z-10 bg-gray-800 text-white text-xs rounded py-1 px-2 whitespace-nowrap">
                        {index === 0 && "Popper's contribution"}
                        {index === 1 && "Freud's psychoanalysis"}
                        {index === 2 && "Scientific theories"}
                        {index === 3 && "Scientific method"}
                        {index === 4 && "Theory requirements"}
                        {index === 5 && "Early 20th century philosophy"}
                        {index === 6 && "Popper's admiration"}
                        {index === 7 && "Scientific progress"}
                        {index === 8 && "Contrary observations"}
                        {index === 9 && "Duhem-Quine thesis"}
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>
          </>
        )}
        
        {renderResult()}
        
        {!quizCompleted && (
          <div className="fixed bottom-4 right-4">
            <button
              onClick={handleSubmit}
              className="px-4 py-2 bg-green-600 text-white rounded-lg shadow-lg hover:bg-green-700 transition-colors"
            >
              Finish Quiz
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PhilosophyQuiz;