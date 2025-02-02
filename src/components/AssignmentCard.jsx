// components/AssignmentCard.js
import React from 'react';
import { useNavigate } from 'react-router-dom';

const AssignmentCard = ({ assignment }) => {
  const { title, dueDate, time, courseCode, courseName } = assignment;
  const navigate = useNavigate();

  return (
    <div className="bg-blue-100 p-4 mb-4 rounded-lg shadow-md flex justify-between items-center">
      <div>
        <h2 className="text-xl font-bold mb-2">
          <i className="fas fa-file-alt"></i> {title}
        </h2>
        <p className="text-gray-700 mb-1">
          <i className="fas fa-clock"></i> {dueDate}, {time}
        </p>
        <p className="text-gray-700 mb-1">
          <i className="fas fa-calendar-alt"></i> Course Event
        </p>
        <p className="text-gray-700 mb-1">
          <i className="fas fa-book"></i> {courseCode} {courseName}
        </p>
      </div>

      <button 
        onClick={() => navigate('/assignments/submit-assignment')}
        className="bg-blue-600 text-white rounded-full py-2 px-4 hover:bg-blue-500"
      >
        Submit
      </button>
    </div>
  );
};

export default AssignmentCard;
