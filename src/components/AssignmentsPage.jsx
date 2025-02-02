// components/AssignmentsPage.js
import React from 'react';
import AssignmentCard from './AssignmentCard';
import SignedInNavbar from './SignedInNavbar';

const assignments = [
  {
    title: "Assignment 2 is Due",
    dueDate: "Sunday, 8 September",
    time: "11:59 PM",
    courseCode: "IS4108",
    courseName: "Natural Language Processing"
  },
  {
    title: "Assignment 3 is Due",
    dueDate: "Sunday, 8 September",
    time: "11:59 PM",
    courseCode: "IS4109",
    courseName: "Cognitive Robotics"
  },
  {
    title: "Assignment 4 is Due",
    dueDate: "Sunday, 8 September",
    time: "11:59 PM",
    courseCode: "IS4102",
    courseName: "Advanced Software Quality Assurance"
  }
];

const AssignmentsPage = () => {
  return (
    <div>
      <SignedInNavbar />
      <div className="container mx-auto px-6 py-8">
        <h1 className="text-3xl font-bold mb-6">Assignments</h1>
        <div className="text-right mb-6">
          <a href="/submitted-assignments" className="text-blue-600 underline">
            See Submitted Assignments
          </a>
        </div>
        {assignments.map((assignment, index) => (
          <AssignmentCard key={index} assignment={assignment} />
        ))}
      </div>
    </div>
  );
};

export default AssignmentsPage;
