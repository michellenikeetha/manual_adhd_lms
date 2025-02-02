import React, { useState } from "react";
import SignedInNavbar from "./SignedInNavbar";

const ProgrammingQuiz = () => {
  const [answers, setAnswers] = useState({});
  const [score, setScore] = useState(null);

  const handleChange = (e, questionId) => {
    setAnswers({ ...answers, [questionId]: e.target.value });
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
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <SignedInNavbar />

      <main className="container mx-auto px-4 py-8">
        <div className="min-h-screen bg-gray-50 flex flex-col items-center p-6">
          <h1 className="text-2xl font-bold mb-6">Quiz: Introduction to Programming</h1>
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-3xl">
            <form>
              {/* Question 1 */}
              <div className="mb-6">
                <h3 className="font-semibold">1. Which of the following is a popular programming language?</h3>
                <div>
                  <label>
                    <input
                      type="radio"
                      name="q1"
                      value="Python"
                      onChange={(e) => handleChange(e, "q1")}
                      className="mr-2"
                    />
                    Python
                  </label>
                </div>
                <div>
                  <label>
                    <input
                      type="radio"
                      name="q1"
                      value="HTML"
                      onChange={(e) => handleChange(e, "q1")}
                      className="mr-2"
                    />
                    HTML
                  </label>
                </div>
                <div>
                  <label>
                    <input
                      type="radio"
                      name="q1"
                      value="CSS"
                      onChange={(e) => handleChange(e, "q1")}
                      className="mr-2"
                    />
                    CSS
                  </label>
                </div>
              </div>

              {/* Question 2 */}
              <div className="mb-6">
                <h3 className="font-semibold">2. A ________ is a diagram that visually represents an algorithm.</h3>
                <input
                  type="text"
                  name="q2"
                  onChange={(e) => handleChange(e, "q2")}
                  className="border border-gray-300 rounded-lg px-4 py-2 mt-2 w-full"
                  placeholder="Your answer here"
                />
              </div>

              {/* Question 3 */}
              <div className="mb-6">
                <h3 className="font-semibold">3. Algorithms are step-by-step instructions to solve a problem. (True/False)</h3>
                <input
                  type="text"
                  name="q3"
                  onChange={(e) => handleChange(e, "q3")}
                  className="border border-gray-300 rounded-lg px-4 py-2 mt-2 w-full"
                  placeholder="True or False"
                />
              </div>

              {/* Question 4 */}
              <div className="mb-6">
                <h3 className="font-semibold">4. The process of converting source code into machine code is called ________.</h3>
                <input
                  type="text"
                  name="q4"
                  onChange={(e) => handleChange(e, "q4")}
                  className="border border-gray-300 rounded-lg px-4 py-2 mt-2 w-full"
                  placeholder="Your answer here"
                />
              </div>

              {/* Question 5 */}
              <div className="mb-6">
                <h3 className="font-semibold">5. Computers understand code written in ________ form.</h3>
                <input
                  type="text"
                  name="q5"
                  onChange={(e) => handleChange(e, "q5")}
                  className="border border-gray-300 rounded-lg px-4 py-2 mt-2 w-full"
                  placeholder="Your answer here"
                />
              </div>

              {/* Question 6 */}
              <div className="mb-6">
                <h3 className="font-semibold">6. Java is a low-level programming language. (True/False)</h3>
                <input
                  type="text"
                  name="q6"
                  onChange={(e) => handleChange(e, "q6")}
                  className="border border-gray-300 rounded-lg px-4 py-2 mt-2 w-full"
                  placeholder="True or False"
                />
              </div>

              {/* Question 7 */}
              <div className="mb-6">
                <h3 className="font-semibold">7. Which of the following is NOT a step in the process of compiling code?</h3>
                <div>
                  <label>
                    <input
                      type="radio"
                      name="q7"
                      value="Lexical Analysis"
                      onChange={(e) => handleChange(e, "q7")}
                      className="mr-2"
                    />
                    Lexical Analysis
                  </label>
                </div>
                <div>
                  <label>
                    <input
                      type="radio"
                      name="q7"
                      value="Code Optimization"
                      onChange={(e) => handleChange(e, "q7")}
                      className="mr-2"
                    />
                    Code Optimization
                  </label>
                </div>
                <div>
                  <label>
                    <input
                      type="radio"
                      name="q7"
                      value="Syntax Error Execution"
                      onChange={(e) => handleChange(e, "q7")}
                      className="mr-2"
                    />
                    Syntax Error Execution
                  </label>
                </div>
                <div>
                  <label>
                    <input
                      type="radio"
                      name="q7"
                      value="Code Generation"
                      onChange={(e) => handleChange(e, "q7")}
                      className="mr-2"
                    />
                    Code Generation
                  </label>
                </div>
              </div>

              {/* Question 8 */}
              <div className="mb-6">
                <h3 className="font-semibold">
                  8. The first step in the compilation process, where code is broken into tokens, is called ________.
                </h3>
                <input
                  type="text"
                  name="q8"
                  onChange={(e) => handleChange(e, "q8")}
                  className="border border-gray-300 rounded-lg px-4 py-2 mt-2 w-full"
                  placeholder="Your answer here"
                />
              </div>

              {/* Question 9 */}
              <div className="mb-6">
                <h3 className="font-semibold">
                  9. ________ is a language commonly used for front-end web development.
                </h3>
                <input
                  type="text"
                  name="q9"
                  onChange={(e) => handleChange(e, "q9")}
                  className="border border-gray-300 rounded-lg px-4 py-2 mt-2 w-full"
                  placeholder="Your answer here"
                />
              </div>

              {/* Question 10 */}
              <div className="mb-6">
                <h3 className="font-semibold">10. Compiling ensures that the code is error-free and optimized. (True/False)</h3>
                <input
                  type="text"
                  name="q10"
                  onChange={(e) => handleChange(e, "q10")}
                  className="border border-gray-300 rounded-lg px-4 py-2 mt-2 w-full"
                  placeholder="True or False"
                />
              </div>

              <button
                type="button"
                onClick={handleSubmit}
                className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition"
              >
                Submit
              </button>
            </form>

            {score !== null && (
              <div className="mt-6 p-4 bg-green-100 rounded-lg">
                <h3 className="font-semibold text-green-800">
                  You scored {score} out of 10!
                </h3>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default ProgrammingQuiz;
