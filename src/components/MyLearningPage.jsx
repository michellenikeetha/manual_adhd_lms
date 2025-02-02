import React, { useState } from 'react';
import MyCourseCard from '../components/MyCourseCard';
import SignedInNavbar from './SignedInNavbar';
import { useNavigate } from 'react-router-dom';
import course1 from '../assets/course1.png';
import course2 from '../assets/course2.png';
import course3 from '../assets/course3.png';
import course4 from '../assets/course4.png';
import course5 from '../assets/course5.png';
import course6 from '../assets/course6.png';
import course7 from '../assets/course7.png';

const MyLearning = () => {
  const [activeTab, setActiveTab] = useState('in-progress');
  const navigate = useNavigate();

  const inProgressCourses = [
    {
      image: course1,
      title: 'Computer Science',
      description: 'Are you newer to Programming? Start learning basics of Computer Science as a beginner',
    },
    {
      image: course2,
      title: 'Algebra',
      description: 'Are you newer to Programming? Start learning basics of Algebra as a beginner',
      progress: 34,
    },
    {
      image: course3,
      title: 'Introduction to Biology',
      description: 'Are you newer to Programming? Start learning basics of Biology as a beginner',
    },
    {
      image: course4,
      title: 'Introduction to AI',
      description: 'Are you newer to Programming? Start learning basics of AI as a beginner',
      progress: 67,
    },
  ];

  const completedCourses = [
    {
      image: course5,
      title: 'Computer Ethics',
      description: 'Learn ethical practices and principles in computer science.',
      progress: 100,
    },
    {
      image: course6,
      title: 'Advanced Mathematics',
      description: 'Advanced math topics for STEM students.',
      progress: 100,
    },
    {
      image: course7,
      title: 'History of Science',
      description: 'Understand the milestones in the history of science.',
      progress: 100,
    },
  ];

  return (
    <div className="bg-gray-100 min-h-screen">
      <SignedInNavbar />

      <main className="container mx-auto px-4 py-6">
        <div className="flex space-x-4 mb-6">
          <button
            className={`px-4 py-2 rounded-lg ${
              activeTab === 'in-progress'
                ? 'bg-blue-500 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
            onClick={() => setActiveTab('in-progress')}
          >
            In Progress
          </button>
          <button
            className={`px-4 py-2 rounded-lg ${
              activeTab === 'completed'
                ? 'bg-blue-500 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
            onClick={() => setActiveTab('completed')}
          >
            Completed
          </button>
          <button 
            onClick={() => navigate('/my-learning/grades')}
            className="ml-auto px-4 py-2 rounded-lg bg-gray-200 text-gray-700 hover:bg-gray-300"
          >
            Grades
          </button>
        </div>

        <div>
          {activeTab === 'in-progress' &&
            inProgressCourses.map((course, index) => (
              <MyCourseCard key={index} {...course} />
            ))}

          {activeTab === 'completed' &&
            completedCourses.map((course, index) => (
              <MyCourseCard key={index} {...course} />
            ))}
        </div>
      </main>
    </div>
  );
};

export default MyLearning;
