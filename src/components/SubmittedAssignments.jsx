import React from 'react';
import { useNavigate } from 'react-router-dom';
import SignedInNavbar from './SignedInNavbar';

const SubmittedAssignments = () => {
  const navigate = useNavigate();

  const assignments = [
    {
      title: 'Assignment 2 Submitted',
      dueDate: 'Sunday, 11 August, 11:59PM',
      submittedDate: 'Friday, 9 August 2024, 12:39 PM',
      course: 'IS4108 Natural Language Processing',
    },
    {
      title: 'Assignment 3 Submitted',
      dueDate: 'Sunday, 18 August, 11:59PM',
      submittedDate: 'Friday, 16 August 2024, 12:39 PM',
      course: 'IS4109 Cognitive Robotics',
    },
    {
      title: 'Assignment 4 Submitted',
      dueDate: 'Sunday, 25 August, 11:59PM',
      submittedDate: 'Friday, 23 August 2024, 12:39 PM',
      course: 'IS4102 Advanced Software Quality Assurance',
    },
  ];

  return (
    <div>
      <SignedInNavbar />
      <div className="container mx-auto px-6 py-8">
        <h1 className="text-3xl font-bold mb-6">Submitted Assignments</h1>

        <div className="space-y-4">
          {assignments.map((assignment, index) => (
            <div
              key={index}
              className="bg-green-200 p-6 rounded-lg shadow-lg flex justify-between items-center"
            >
              <div>
                <h2 className="text-xl font-bold">{assignment.title}</h2>
                <p className="text-gray-700">
                  <span className="font-semibold">Due Date: </span>
                  {assignment.dueDate}
                </p>
                <p className="text-gray-700">
                  <span className="font-semibold">Submitted on: </span>
                  {assignment.submittedDate}
                </p>
                <p className="text-gray-700">
                  <span className="font-semibold">Course: </span>
                  {assignment.course}
                </p>
              </div>
              <button
                onClick={() => navigate('/submitted-assignments/edit-assignment')}
                className="bg-blue-500 text-white py-2 px-8 rounded-full hover:bg-blue-600"
              >
                Edit
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SubmittedAssignments;
