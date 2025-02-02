import React, { useState } from 'react';
import { FileText, UploadCloud } from 'lucide-react';
import SignedInNavbar from './SignedInNavbar';
import { useNavigate } from 'react-router-dom';

const MyCoursePage = () => {
  const [assignmentUploaded, setAssignmentUploaded] = useState(false);
  const navigate = useNavigate();

  const handleAssignmentUpload = () => {
    setAssignmentUploaded(true);
  };

  const units = [
    {
      title: "UNIT 1: Introduction to Programming",
      description: ["What is Programming?", "Programming languages", "Algorithms and Flow charts"],
      progress: 55,
    },
    {
      title: "UNIT 2: Fundamentals of C",
      description: ["What is Programming?", "Programming languages"],
      progress: 0,
    },
    {
      title: "UNIT 3: Rapid Application Development",
      description: ["What is Programming?", "Programming languages", "Algorithms and Flow charts"],
      progress: 0,
    },
    {
      title: "UNIT 4: Introduction to Database Management Systems",
      description: ["What is Programming?", "Programming languages", "Algorithms and Flow charts"],
      progress: 0,
    },
  ];

  const sidebarUnits = [
    "Introduction to Programming",
    "Fundamentals of C",
    "Rapid Application Development",
    "Introduction to Database Management Systems",
    "Basics of Python Programming",
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <SignedInNavbar />

      <main className='flex'>
        <div className="w-1/4 bg-white shadow-lg">
          <h2 className="text-xl font-bold text-blue-700 px-6 py-4">Computer Science</h2>
          <ul className="space-y-2 px-6">
            {sidebarUnits.map((unit, index) => (
              <li
                key={index}
                className="text-gray-600 bg-blue-50 p-3 rounded-md hover:bg-blue-100 cursor-pointer"
              >
                UNIT {index + 1}: {unit}
              </li>
            ))}
          </ul>
        </div>

        <div className="flex-1 p-8">
          <h1 className="text-2xl font-bold text-gray-800 mb-6">Computer Science</h1>
          {units.map((unit, index) => (
            <div key={index} className="bg-white shadow-md rounded-lg p-6 mb-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-blue-700">{unit.title}</h2>
                <p className="text-sm text-gray-600">Progress: {unit.progress}%</p>
              </div>
              <ul className="text-gray-600 mb-4">
                {unit.description.map((desc, i) => (
                  <li key={i} className="mb-1">
                    • {desc}
                  </li>
                ))}
              </ul>
              {unit.progress > 0 ? (
                <button 
                  onClick={() => navigate('/my-learning/my-course/course-content')}
                  className="bg-black text-white px-4 py-2 rounded-lg"
                >
                  Resume
                </button>
              ) : (
                <button 
                  onClick={() => navigate('/my-learning/my-course/course-content')}
                  className="bg-blue-500 text-white px-4 py-2 rounded-lg"
                >
                  Get Started
                </button>
              )}
            </div>
          ))}

          <div className="bg-blue-50 p-4 rounded-lg shadow-md flex items-center justify-between">
            <div className="flex items-center">
              <UploadCloud size={30} className="text-blue-700 mr-4" />
              <h3 className="text-blue-700 font-semibold">Upload Assignment 1</h3>
            </div>
            <button
              // onClick={handleAssignmentUpload}
              onClick={() => navigate('/assignments/submit-assignment')}
              className={`px-4 py-2 rounded-lg ${
                assignmentUploaded
                  ? "bg-green-500 text-white"
                  : "bg-blue-500 text-white hover:bg-blue-600"
              }`}
            >
              {assignmentUploaded ? "Done" : "Upload"}
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default MyCoursePage;
