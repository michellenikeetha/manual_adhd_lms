// components/AnnouncementDetail.js
import React from 'react';
import SignedInNavbar from './SignedInNavbar';
import { Link } from 'react-router-dom';

const AnnouncementDetail = () => {
  return (
    <div>
      <SignedInNavbar />
      <div className="container mx-auto px-6 py-8">
        <h1 className="text-3xl font-bold mb-4">
          Announcements / <span className="text-blue-600">New Course: AI for Everyone</span>
        </h1>
        
        <div className="bg-white p-6 shadow-lg rounded-lg">
          <h2 className="text-2xl font-bold mb-4">New Course: AI for Everyone</h2>
          
          <p className="mb-6">
            <strong>Course Overview:</strong> The "AI for Everyone" course is designed to demystify Artificial Intelligence and make it accessible to beginners with no prior experience. This course will cover the basics of AI, including key concepts, applications, and the potential impact of AI in various industries.
          </p>

          <h3 className="font-bold">What You Will Learn:</h3>
          <ul className="list-disc list-inside mb-6">
            <li>Introduction to AI and its importance</li>
            <li>Understanding how AI works</li>
            <li>Key areas of AI, including machine learning, natural language processing, and computer vision</li>
            <li>Real-world applications of AI in different sectors</li>
            <li>Ethical considerations in AI development and deployment</li>
          </ul>

          <h3 className="font-bold">Who Should Attend:</h3>
          <ul className="list-disc list-inside mb-6">
            <li>Beginners with no prior knowledge of AI</li>
            <li>Professionals looking to understand AI fundamentals</li>
            <li>Students interested in exploring AI as a career option</li>
            <li>Anyone curious about the impact of AI on the future</li>
          </ul>

          <h3 className="font-bold">Course Format:</h3>
          <p className="mb-6">
            The course will be delivered online through a series of video lectures, interactive quizzes, and hands-on exercises. You will have the flexibility to learn at your own pace, with access to a community of learners and support from instructors.
          </p>

          <h3 className="font-bold">Enrollment Information:</h3>
          <ul className="list-disc list-inside mb-6">
            <li>Course Start Date: 01/11/2024</li>
            <li>Duration: 8 weeks</li>
            <li>Mode: Online</li>
            <li>Fee: Free</li>
            <li>Registration Deadline: 10/10/2024</li>
          </ul>

          <p className="mb-4">
            How to Enroll: Click <Link to="/enroll" className="text-blue-600 underline">here</Link> to register for the course. Limited spots are available, so secure your place today!
          </p>

          <p className="text-sm text-gray-600">
            For more information, feel free to contact us at +94 71-234-5678 / +94 77-123-4567
          </p>
        </div>
      </div>
    </div>
  );
};

export default AnnouncementDetail;
