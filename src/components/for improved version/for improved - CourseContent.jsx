import React, { useState } from "react";
import { CodeIcon, BookOpen, Target, Terminal, CheckCircle } from "lucide-react";
import SignedInNavbar from "./SignedInNavbar";

const CourseContent = () => {
  const [activeSection, setActiveSection] = useState(null);

  const programmingChallenges = [
    {
      title: "Hello World Challenge",
      description: "Write your first program in three different languages",
      difficulty: "Beginner",
      languages: ["Python", "JavaScript", "Java"]
    },
    {
      title: "Calculator App",
      description: "Build a simple calculator with basic arithmetic operations",
      difficulty: "Intermediate",
      languages: ["React", "Python", "JavaScript"]
    },
    {
      title: "Data Visualization",
      description: "Create a chart displaying statistical data",
      difficulty: "Advanced",
      languages: ["Python", "JavaScript", "R"]
    }
  ];

  const recommendedResources = [
    {
      title: "FreeCodeCamp",
      type: "Online Learning Platform",
      description: "Free coding courses with interactive challenges",
      url: "https://www.freecodecamp.org"
    },
    {
      title: "Codecademy",
      type: "Interactive Learning",
      description: "Programming courses with hands-on practice",
      url: "https://www.codecademy.com"
    },
    {
      title: "GitHub Learning Lab",
      type: "Project-Based Learning",
      description: "Learn by working on real-world coding projects",
      url: "https://lab.github.com"
    }
  ];

  return (
    <div className="bg-gray-50 min-h-screen">
      <SignedInNavbar />

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-5xl mx-auto bg-white p-8 rounded-lg shadow-lg">
          {/* Existing previous content remains the same */}

          <div className="mt-12 bg-blue-50 p-6 rounded-lg">
            <h2 className="text-2xl font-bold text-blue-800 mb-4 flex items-center">
              <Target className="mr-3 text-blue-600" />
              Learning Objectives
            </h2>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="bg-white p-4 rounded-lg shadow-md">
                <CodeIcon className="w-10 h-10 text-blue-600 mb-3" />
                <h3 className="font-semibold mb-2">Understand Basics</h3>
                <p className="text-sm text-gray-600">
                  Learn fundamental programming concepts and logic
                </p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-md">
                <Terminal className="w-10 h-10 text-green-600 mb-3" />
                <h3 className="font-semibold mb-2">Write Code</h3>
                <p className="text-sm text-gray-600">
                  Practice writing clean, efficient code in multiple languages
                </p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-md">
                <BookOpen className="w-10 h-10 text-purple-600 mb-3" />
                <h3 className="font-semibold mb-2">Problem Solving</h3>
                <p className="text-sm text-gray-600">
                  Develop computational thinking and algorithmic skills
                </p>
              </div>
            </div>
          </div>

          <div className="mt-12">
            <h2 className="text-2xl font-bold mb-4">Programming Challenges</h2>
            <div className="grid md:grid-cols-3 gap-4">
              {programmingChallenges.map((challenge, index) => (
                <div 
                  key={index} 
                  className="bg-gray-100 p-5 rounded-lg hover:shadow-md transition-all duration-300"
                >
                  <h3 className="font-semibold text-lg mb-2">{challenge.title}</h3>
                  <p className="text-sm text-gray-600 mb-3">{challenge.description}</p>
                  <div className="flex justify-between items-center">
                    <span className={`
                      px-3 py-1 rounded-full text-xs font-medium
                      ${challenge.difficulty === 'Beginner' ? 'bg-green-100 text-green-800' :
                        challenge.difficulty === 'Intermediate' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }
                    `}>
                      {challenge.difficulty}
                    </span>
                    <div className="flex space-x-1">
                      {challenge.languages.map((lang, i) => (
                        <span 
                          key={i} 
                          className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full"
                        >
                          {lang}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-12 bg-gray-50 p-6 rounded-lg">
            <h2 className="text-2xl font-bold mb-4">Recommended Learning Resources</h2>
            <div className="grid md:grid-cols-3 gap-4">
              {recommendedResources.map((resource, index) => (
                <div 
                  key={index} 
                  className="bg-white p-5 rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
                >
                  <h3 className="font-semibold text-lg mb-2">{resource.title}</h3>
                  <p className="text-sm text-gray-600 mb-3">{resource.description}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-xs bg-purple-100 text-purple-800 px-3 py-1 rounded-full">
                      {resource.type}
                    </span>
                    <a 
                      href={resource.url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800 text-sm flex items-center"
                    >
                      Visit <CheckCircle className="ml-1 w-4 h-4" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-12 bg-indigo-50 p-6 rounded-lg">
            <h2 className="text-2xl font-bold text-indigo-800 mb-4">
              Next Steps in Your Programming Journey
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <h3 className="font-semibold text-lg mb-2">Practice, Practice, Practice</h3>
                <p className="text-sm text-gray-700">
                  Consistent coding practice is key to becoming a proficient programmer. 
                  Start with small projects, solve coding challenges, and gradually 
                  increase complexity.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-2">Build a Portfolio</h3>
                <p className="text-sm text-gray-700">
                  Document your learning journey by creating a GitHub repository. 
                  Showcase your projects, contribute to open-source, and track 
                  your progress.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CourseContent;