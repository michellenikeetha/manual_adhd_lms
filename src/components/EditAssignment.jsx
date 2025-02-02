import React, { useState } from 'react';
import { Save, Trash2, X, FileText, Clock, Calendar, Loader, CheckCircle } from 'lucide-react';
import SignedInNavbar from './SignedInNavbar';
import pdfimg from '../assets/pdf.png';
import { useNavigate } from 'react-router-dom';

const EditAssignment = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isRemoving, setIsRemoving] = useState(false);
  const [showFeedback, setShowFeedback] = useState(null); 
  const [isRemoved, setIsRemoved] = useState(false);
  const [assignment, setAssignment] = useState({
    title: 'Assignment 2',
    fileName: '20200742-assignment2.pdf',
    dueDate: 'Sunday, 11 August, 11:59 PM',
    submittedDate: 'Friday, 9 August, 12:39 PM',
    daysEarly: 66,
    fileSize: '2 GB',
    allowedFileTypes: ['PDF', 'DOCX'],
    maxFiles: 10,
  });

  const handleInputChange = (field, value) => {
    setAssignment((prev) => ({ ...prev, [field]: value }));
  };

  const handleSaveChanges = () => {
    setIsSaving(true);
    setShowFeedback(null);

    setTimeout(() => {
      setIsSaving(false);
      setShowFeedback({ type: 'success', message: 'Changes saved successfully!' });
    }, 2000);
  };

  const handleRemoveSubmission = () => {
    setIsModalOpen(true);
  };

  const confirmRemoveSubmission = () => {
    setIsRemoving(true);
    setShowFeedback(null);

    setTimeout(() => {
      setIsRemoving(false);
      setIsRemoved(true);
      setIsModalOpen(false);
      setShowFeedback({ type: 'success', message: 'Submission removed successfully!' });
      
      setTimeout(() => {
        navigate('/assignments');
      }, 3000);
    }, 3000);
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <SignedInNavbar />
      <div className="container mx-auto px-6 py-8">
        <h1 className="text-3xl font-bold mb-8 text-gray-800">Edit Your Assignment</h1>

        {/* {showFeedback && (
          <div
            className={`p-4 rounded-lg mb-4 ${
              showFeedback.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
            }`}
          >
            {showFeedback.message}
          </div>
        )} */}

        {showFeedback && (
          <div
            className={`fixed top-20 right-4 px-6 py-3 rounded-xl shadow-lg flex items-center gap-2 z-20 ${
              showFeedback.type === 'success' ? 'bg-green-500 text-white' : 'bg-red-100 text-red-800'
            }`}
          >
            {showFeedback.type === 'success' ? (
              <CheckCircle className="w-5 h-5" />
            ) : (
              <X className="w-5 h-5" />
            )}
            {showFeedback.message}
          </div>
        )}

        {!isRemoved && (
          <div className="bg-white p-10 rounded-2xl shadow-xl border-2 border-blue-50 max-w-6xl mx-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-blue-800">{assignment.title}</h2>
              <div className="flex space-x-2">
                <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
                  Submitted Early
                </span>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="flex items-center space-x-4 bg-blue-50 p-4 rounded-lg">
                <img src={pdfimg} alt="PDF Icon" className="w-25 h-20" />
                <div>
                  <p className="flex items-center">
                    <FileText className="mr-2 text-blue-600" size={20} />
                    <input
                      type="text"
                      value={assignment.fileName}
                      onChange={(e) => handleInputChange('fileName', e.target.value)}
                      className="bg-transparent border-b-2 border-blue-100 focus:border-blue-500 focus:outline-none text-gray-800"
                    />
                  </p>
                  <p className="flex items-center">
                    <Clock className="mr-2 text-blue-600" size={20} />
                    <strong className="mr-2">Submitted: </strong> {assignment.submittedDate}
                  </p>
                </div>
              </div>

              <div className="bg-blue-50 p-4 rounded-lg">
                <p className="flex items-center mb-2">
                  <Calendar className="mr-2 text-blue-600" size={20} />
                  <strong className="mr-2">Due Date:</strong> {assignment.dueDate}
                </p>
                <p className="text-green-700 font-semibold">
                  Submitted {assignment.daysEarly} days early
                </p>
              </div>
            </div>

            <div className="mt-6 bg-gray-100 p-4 rounded-lg">
              <h3 className="text-lg font-semibold mb-2">Submission Details</h3>
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <strong className="block text-blue-600">Max File Size</strong>
                  {assignment.fileSize}
                </div>
                <div>
                  <strong className="block text-blue-600">Max Files</strong>
                  {assignment.maxFiles}
                </div>
                <div>
                  <strong className="block text-blue-600">File Types</strong>
                  {assignment.allowedFileTypes.join(', ')}
                </div>
              </div>
            </div>

            <div className="mt-8 flex space-x-4">
              <button
                className="flex-1 flex items-center justify-center bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition-colors"
                onClick={handleSaveChanges}
                disabled={isSaving}
              >
                {isSaving ? (
                  <Loader className="animate-spin mr-2" size={20} />
                ) : (
                  <Save className="mr-2" size={20} />
                )}
                {isSaving ? 'Saving...' : 'Save Changes'}
              </button>
              <button
                className="flex-1 flex items-center justify-center bg-red-500 text-white py-3 rounded-lg hover:bg-red-600 transition-colors"
                onClick={handleRemoveSubmission}
              >
                <Trash2 className="mr-2" size={20} />
                Remove Submission
              </button>
              <button
                className="flex-1 flex items-center justify-center bg-gray-500 text-white py-3 rounded-lg hover:bg-gray-600 transition-colors"
                onClick={() => navigate('/submitted-assignments')}
              >
                <X className="mr-2" size={20} />
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-2xl shadow-2xl max-w-md w-full">
            <h2 className="text-2xl font-bold mb-4 text-red-600">Remove Submission</h2>
            <p className="mb-6">Are you sure you want to remove this submission? This action cannot be undone.</p>
            <div className="flex space-x-4">
              <button
                className="flex-1 bg-red-500 text-white py-2 rounded-lg hover:bg-red-600"
                onClick={confirmRemoveSubmission}
                disabled={isRemoving}
              >
                {isRemoving ? 'Removing...' : 'Remove'}
              </button>
              <button
                className="flex-1 bg-gray-200 text-gray-700 py-2 rounded-lg hover:bg-gray-300"
                onClick={() => setIsModalOpen(false)}
                disabled={isRemoving}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditAssignment;
