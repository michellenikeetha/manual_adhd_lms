// components/CourseCard.js
import React, { useState } from 'react';
import { CheckCircle } from 'lucide-react';

const CourseCard = ({ course, isEnrolled }) => {
  const [showConfirm, setShowConfirm] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleEnroll = () => {
    setShowConfirm(false); 
    setShowSuccess(true); 
    setTimeout(() => setShowSuccess(false), 3000);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg relative">
      <div
        className="h-32 bg-gray-200 rounded-lg mb-4 bg-cover bg-center"
        style={{ backgroundImage: `url(${course.imageUrl})` }}
      ></div>
      <h3 className="text-lg font-bold mb-2">{course.title}</h3>
      <p className="text-sm text-gray-600">{course.semester}</p>

      {isEnrolled ? (
        <p className="text-sm text-blue-600 mt-4">{course.progress}% Complete</p>
      ) : (
        <button
          className="mt-4 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition"
          onClick={() => setShowConfirm(true)}
        >
          Enroll now
        </button>
      )}

      {showConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-80">
            <h4 className="text-lg font-bold mb-4">Confirm Enrollment</h4>
            <p className="text-sm text-gray-600 mb-6">
              Are you sure you want to enroll in this course?
            </p>
            <div className="flex justify-end space-x-4">
              <button
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400"
                onClick={() => setShowConfirm(false)}
              >
                Cancel
              </button>
              <button
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                onClick={handleEnroll}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}

      {showSuccess && (
        <div className="fixed top-20 right-4 bg-green-500 text-white px-6 py-3 rounded-xl shadow-lg flex items-center gap-2 z-20">
          <CheckCircle className="w-5 h-5" />
          Enrollment Successful!
        </div>
      )}
    </div>
  );
};

export default CourseCard;
