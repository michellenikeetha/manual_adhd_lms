import React from "react";
import SignedInNavbar from "./SignedInNavbar";
import programmingLanguagesImage from "../assets/langs.png";
import flowchartImage from "../assets/flowchart.png";
import { useNavigate } from 'react-router-dom';

const CourseContent = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-gray-50 min-h-screen">
      <SignedInNavbar />

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-5xl mx-auto bg-white p-8 rounded-lg shadow-lg">
          <h1 className="text-3xl font-bold text-blue-600 mb-6">
            Unit 1: Introduction to Programming
          </h1>

          <div className="mb-6">
            <h2 className="text-xl font-bold mb-2">What is Programming?</h2>
            <p className="text-gray-700 text-md justify-text">
              Programming is the process of designing, writing, testing, and maintaining a set of instructions 
              (called code) that a computer can execute. It enables us to create software applications, websites, 
              games, and much more. Computers rely on programming languages to understand human intent and perform 
              specific tasks. Programming allows us to:
            </p>
            <ul className="list-disc pl-6 text-gray-700 text-md mt-2">
              <li>Solve real-world problems through automation.</li>
              <li>Create interactive user experiences in apps and websites.</li>
              <li>Process large volumes of data efficiently.</li>
              <li>Develop artificial intelligence and machine learning systems.</li>
            </ul>
            <p className="text-gray-700 text-md mt-2 justify-text">
              Computers cannot interpret human language directly, so programmers use programming languages to
              communicate in a structured way.
            </p>
          </div>

          <div className="mb-6">
            <h2 className="text-xl font-bold mb-2">Programming Languages</h2>
            <p className="text-gray-700 text-md justify-text">
              Programming languages are tools that allow us to write code in a way that computers can interpret. Each 
              language has its own syntax, structure, and purpose. Here are some popular programming languages:
            </p>
            <ul className="list-disc pl-6 text-gray-700 text-md mt-2">
              <li>
                <strong>Python:</strong> Known for its simplicity, Python is widely used in data science, AI, and 
                web development.
              </li>
              <li>
                <strong>Java:</strong> Popular for its portability and often used in enterprise applications and 
                Android app development.
              </li>
              <li>
                <strong>C++:</strong> Ideal for system programming, game development, and high-performance 
                applications.
              </li>
              <li>
                <strong>JavaScript:</strong> Essential for creating interactive web applications and front-end 
                development.
              </li>
              <li>
                <strong>Ruby:</strong> Often used for web development, especially with the Ruby on Rails framework.
              </li>
            </ul>
            <img
              src={programmingLanguagesImage}
              width={400}
              alt="Programming Languages"
              className="mt-4 rounded-lg shadow-lg"
            />
            <p className="text-gray-700 text-md mt-2 justify-text">
              Programming languages are chosen based on the type of project,
              performance requirements, and developer preference.
            </p>
          </div>

          <div className="mb-6">
            <h2 className="text-xl font-bold mb-2">Algorithms and Flowcharts</h2>

            <p className="text-gray-700 text-md justify-text">
              <strong>Algorithms:</strong> Algorithms are step-by-step instructions designed to solve a problem 
              or perform a specific task. They serve as the backbone of programming by providing a clear set of rules 
              to follow. Think of them as a recipe for solving a problem. For instance, an algorithm for making a cup of tea could look like
              this:
            </p>
            <div className="border rounded-lg p-4 bg-gray-100 mt-4">
              <ul className="list-decimal pl-6 text-gray-700 text-md">
                <li>Boil water.</li>
                <li>Put a tea bag in a cup.</li>
                <li>Pour hot water into the cup.</li>
                <li>Add sugar or milk (optional).</li>
                <li>Stir and serve.</li>
              </ul>
            </div>

            <p className="text-gray-700 text-md mt-6 justify-text">
              Algorithms can be represented in different ways, such as plain text, pseudocode, or flowcharts. They are 
              crucial for defining logical solutions to problems.
            </p>
            <p className="text-gray-700 text-md mt-2 justify-text">
              <strong>Key Concept:</strong> Algorithms are always correct if implemented correctly, and they can be 
              verified through dry runs.
            </p>

            <p className="text-gray-700 text-md mt-6 justify-text">
              <strong>Flowcharts:</strong> Flowcharts visually represent algorithms. They use shapes like rectangles 
              (process), diamonds (decisions), and arrows (flow) to illustrate steps clearly. For example:
            </p>
            <p className="text-gray-700 text-md mt-2 justify-text">
              Here is a flowchart for checking whether a number is positive or negative:
            </p>
            <img
              src={flowchartImage}
              width={400}
              alt="Flowchart Example"
              className="mt-4 rounded-lg shadow-lg"
            />
          </div>

          <div className="mb-6">
            <h2 className="text-xl font-bold mb-2">Compiling: From Code to Machine Instructions</h2>
            <p className="text-gray-700 text-md justify-text">
              <strong>Compiling</strong> is the process of converting source code, written by developers in a high-level 
              programming language like Python or C++, into machine code (also known as binary code). Machine code is the 
              language that a computer's processor can understand and execute directly. 
            </p>
            <p className="text-gray-700 text-md mt-2">
              The compilation process involves several steps:
            </p>
            <ul className="list-disc pl-6 text-gray-700 text-md mt-2">
              <li>
                <strong>Lexical Analysis:</strong> Breaking the code into smaller units called tokens (e.g., keywords, 
                variables, symbols).
              </li>
              <li>
                <strong>Syntax Analysis:</strong> Checking the structure of the code to ensure it adheres to the 
                language's grammar.
              </li>
              <li>
                <strong>Code Optimization:</strong> Improving the efficiency of the machine code for better performance.
              </li>
              <li>
                <strong>Code Generation:</strong> Producing the final machine code, which the computer can execute.
              </li>
            </ul>
            <p className="text-gray-700 text-md mt-2 justify-text">
              Compilers play a critical role in ensuring that the code is error-free and optimized before running on 
              the machine.
            </p>
          </div>

          <div className="mb-6">
            <h2 className="text-xl font-bold mb-2">Understanding Binary Code</h2>
            <p className="text-gray-700 text-md justify-text">
              Computers operate on binary code, which is a sequence of 0s and 1s that represent instructions and data. 
              This is because modern computers use digital circuits that can be in one of two states: on (1) or off (0). 
              Everything from images, videos, and text to software applications is ultimately represented in binary 
              format.
            </p>
            <p className="text-gray-700 text-md mt-2">
              For example:
            </p>
            <ul className="list-disc pl-6 text-gray-700 text-md mt-2">
              <li>The binary number <strong>01000001</strong> represents the letter <strong>A</strong> in the ASCII 
              system.</li>
              <li>The number <strong>0011 1110</strong> might represent a specific machine instruction.</li>
            </ul>
            <p className="text-gray-700 text-md mt-2 justify-text">
              Binary code forms the foundation of all computing, making it essential for programs to be translated 
              (compiled) into this format for execution.
            </p>
          </div>

          <div className="mt-8">
            <h2 className="text-xl font-bold mb-2">Summary</h2>
            <p className="text-gray-700 text-md justify-text">
              Programming involves understanding concepts like programming languages, algorithms, and flowcharts. By 
              mastering these basics, you can build a solid foundation for solving complex problems through logical 
              thinking and structured approaches.
            </p>
            <p className="text-gray-700 text-md mt-2 justify-text">
              Algorithms and flowcharts are tools to streamline problem-solving and ensure consistency in your 
              solutions.
            </p>
            <p className="text-gray-700 text-md mt-2">
              In this unit, you explored the following key concepts:
            </p>
            <ul className="list-disc pl-6 text-gray-700 text-md mt-2 justify-text">
              <li>
                <strong>Programming Languages:</strong> These are tools that allow humans to write code in a structured and logical manner. Popular languages include Python, Java, C++, and JavaScript, each suited to different applications.
              </li>
              <li>
                <strong>Algorithms:</strong> Step-by-step problem-solving instructions that form the foundation of logical thinking and efficient programming. Representations like pseudocode and flowcharts help simplify and visualize these steps.
              </li>
              <li>
                <strong>Flowcharts:</strong> A visual representation of an algorithm using shapes and arrows to illustrate processes, decisions, and flows clearly.
              </li>
              <li>
                <strong>Compiling:</strong> The process of converting human-readable source code into binary code, ensuring the program is executable by a computer's processor.
              </li>
              <li>
                <strong>Binary Code:</strong> The fundamental language of computers, consisting of 0s and 1s. All data and instructions are ultimately represented in this format.
              </li>
            </ul>
            <p className="text-gray-700 text-md mt-2 justify-text">
              By mastering these foundational concepts, you build a robust understanding of how software systems work and how to create solutions to real-world problems. Understanding the role of compilers and the importance of binary code bridges the gap between human logic and machine execution.
            </p>
            <p className="text-gray-700 text-md mt-2 justify-text">
              This foundational knowledge will serve as a stepping stone as you dive deeper into programming, solving complex problems, and creating impactful applications.
            </p>
          </div>

          <div className="bg-blue-100 p-6 mt-8 rounded-lg shadow-lg text-center">
            <h2 className="text-2xl font-bold text-blue-600 mb-4">Ready to Test Your Knowledge?</h2>
            <p className="text-gray-700 text-md mb-6">
              Take a short quiz to review what you've learned in Unit 1: Introduction to Programming.
            </p>
            <button
              onClick={() => navigate("/quiz")}
              className="bg-blue-600 text-white py-2 px-6 rounded-lg hover:bg-blue-700 transition"
            >
              Start Quiz
            </button>
          </div>

        </div>
      </main>
    </div>
  );
};

export default CourseContent;
