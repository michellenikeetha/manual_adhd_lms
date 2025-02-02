import React from "react";
import { motion } from 'framer-motion';
import { BookOpenText, Code, Share2, Target } from 'lucide-react';
import SignedInNavbar from "./SignedInNavbar";
import programmingLanguagesImage from "../assets/langs.png";
import flowchartImage from "../assets/flowchart.png";
import { useNavigate } from 'react-router-dom';

const CourseContent = () => {
  const navigate = useNavigate();

  const sectionVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  const iconClasses = "w-10 h-10 text-blue-600 mb-4";
  const sectionTitleClasses = "text-2xl font-bold text-blue-700 mb-4 flex items-center gap-3";

  return (
    <div className="bg-gradient-to-br from-blue-50 to-white min-h-screen">
      <SignedInNavbar />

      <motion.main 
        initial="hidden"
        animate="visible"
        className="container mx-auto px-4 py-8"
      >
        <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-2xl overflow-hidden">
          {/* Hero Section */}
          <motion.div 
            variants={sectionVariants}
            className="bg-blue-600 text-white p-8 text-center"
          >
            <h1 className="text-4xl font-extrabold mb-4 tracking-tight">
              Unit 1: Introduction to Programming
            </h1>
            <p className="text-xl text-blue-100 max-w-2xl mx-auto">
              Embark on your journey to understand the fundamental principles of programming and computational thinking.
            </p>
          </motion.div>

          {/* Content Sections */}
          <div className="p-8 space-y-8">
            {/* What is Programming */}
            <motion.section 
              variants={sectionVariants}
              className="bg-blue-50 rounded-xl p-6"
            >
              <h2 className={sectionTitleClasses}>
                <BookOpenText className={iconClasses} />
                What is Programming?
              </h2>
              <p className="text-gray-700 mb-4">
                Programming is the art and science of instructing computers to solve problems and create innovative solutions.
              </p>
              <ul className="space-y-2 pl-5 list-disc text-gray-700">
                <li>Transform complex challenges into algorithmic solutions</li>
                <li>Build interactive digital experiences</li>
                <li>Enable technological innovation across industries</li>
              </ul>
            </motion.section>

            {/* Programming Languages */}
            <motion.section 
              variants={sectionVariants}
              className="bg-green-50 rounded-xl p-6"
            >
              <h2 className={sectionTitleClasses}>
                <Code className={iconClasses} />
                Programming Languages
              </h2>
              <div className="flex items-center gap-6">
                <div className="flex-1">
                  <p className="text-gray-700 mb-4">
                    Each programming language is a unique ecosystem with its own strengths and use cases.
                  </p>
                  <ul className="space-y-2 pl-5 list-disc text-gray-700">
                    {[
                      { name: "Python", desc: "Data science & AI powerhouse" },
                      { name: "JavaScript", desc: "Web interactivity champion" },
                      { name: "Java", desc: "Enterprise & Android development" },
                      { name: "C++", desc: "Performance-critical systems" }
                    ].map((lang, idx) => (
                      <li key={idx}>
                        <strong>{lang.name}:</strong> {lang.desc}
                      </li>
                    ))}
                  </ul>
                </div>
                <img
                  src={programmingLanguagesImage}
                  alt="Programming Languages"
                  className="w-64 rounded-lg shadow-lg transform hover:scale-105 transition-transform"
                />
              </div>
            </motion.section>

            {/* Algorithms & Flowcharts */}
            <motion.section 
              variants={sectionVariants}
              className="bg-purple-50 rounded-xl p-6"
            >
              <h2 className={sectionTitleClasses}>
                <Share2 className={iconClasses} />
                Algorithms & Flowcharts
              </h2>
              <div className="flex items-center gap-6">
                <img
                  src={flowchartImage}
                  alt="Flowchart Example"
                  className="w-64 rounded-lg shadow-lg transform hover:scale-105 transition-transform"
                />
                <div className="flex-1">
                  <p className="text-gray-700 mb-4">
                    Algorithms are the strategic blueprints that transform ideas into executable solutions.
                  </p>
                  <ul className="space-y-2 pl-5 list-disc text-gray-700">
                    <li>Logical step-by-step problem-solving approach</li>
                    <li>Visual representation through flowcharts</li>
                    <li>Foundation of computational thinking</li>
                  </ul>
                </div>
              </div>
            </motion.section>

            {/* Quiz Call to Action */}
            <motion.div 
              variants={sectionVariants}
              className="bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl p-8 text-center"
            >
              <h2 className="text-3xl font-bold mb-4">
                Test Your New Knowledge!
              </h2>
              <p className="text-blue-100 mb-6 max-w-xl mx-auto">
                Validate your understanding and reinforce your learning by taking our interactive quiz.
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate("/quiz")}
                className="bg-white text-blue-600 py-3 px-8 rounded-full font-bold hover:shadow-lg transition"
              >
                Start Quiz
              </motion.button>
            </motion.div>
          </div>
        </div>
      </motion.main>
    </div>
  );
};

export default CourseContent;