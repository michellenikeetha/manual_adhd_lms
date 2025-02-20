import React, { useState, useEffect } from 'react';
import { Save, Trash2, X, FileText, Clock, Calendar, Loader, CheckCircle, AlertTriangle, ChevronLeft } from 'lucide-react';
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
  const [timeRemaining, setTimeRemaining] = useState(null);
  const [focusMode, setFocusMode] = useState(false);
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

  useEffect(() => {
    const calculateTimeRemaining = () => {
      const dueDate = new Date('August 11, 2025 23:59:00');
      const now = new Date();
      const diff = dueDate - now;
      
      if (diff > 0) {
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        setTimeRemaining({ days, hours });
      }
    };
    
    calculateTimeRemaining();
  }, []);

  const handleInputChange = (field, value) => {
    setAssignment((prev) => ({ ...prev, [field]: value }));
  };

  const handleSaveChanges = () => {
    setIsSaving(true);
    setShowFeedback(null);

    setTimeout(() => {
      setIsSaving(false);
      setShowFeedback({ type: 'success', message: 'Changes saved successfully!' });
      
      setTimeout(() => {
        setShowFeedback(null);
      }, 5000);
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

  const toggleFocusMode = () => {
    setFocusMode(prev => !prev);
  };

  return (
    <div className={`min-h-screen transition-all duration-300 ${focusMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <SignedInNavbar />
      
      <div className="container mx-auto px-6 py-8">
        <div className="flex justify-between items-center mb-6">
          <button 
            onClick={() => navigate('/submitted-assignments')}
            className="flex items-center text-blue-600 hover:text-blue-800 font-medium transition-colors"
          >
            <ChevronLeft className="mr-1" size={20} />
            Back to Assignments
          </button>
          
          <button
            onClick={toggleFocusMode}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              focusMode 
                ? 'bg-yellow-500 text-gray-900 hover:bg-yellow-400' 
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            {focusMode ? 'Exit Focus Mode' : 'Enter Focus Mode'}
          </button>
        </div>

        <div className="flex items-center mb-8">
          <h1 className={`text-3xl font-bold ${focusMode ? 'text-white' : 'text-gray-800'}`}>
            Edit Your Assignment
          </h1>
          {/* <div className="ml-4 flex-1 max-w-xs">
            <div className="h-2 bg-gray-200 rounded-full">
              <div className="h-full bg-green-500 rounded-full w-3/4"></div>
            </div>
            <p className={`text-xs mt-1 ${focusMode ? 'text-gray-400' : 'text-gray-500'}`}>Task Progress: 75% complete</p>
          </div> */}
        </div>

        {showFeedback && (
          <div
            className="fixed top-20 right-4 px-6 py-3 rounded-xl shadow-lg flex items-center gap-2 z-20 animate-bounce-once"
            style={{animation: 'bounce 0.5s ease 2'}}
          >
            <div className={`${
              showFeedback.type === 'success' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
            } p-4 rounded-xl flex items-center`}>
              {showFeedback.type === 'success' ? (
                <CheckCircle className="w-5 h-5 mr-2" />
              ) : (
                <AlertTriangle className="w-5 h-5 mr-2" />
              )}
              <span className="font-medium">{showFeedback.message}</span>
            </div>
          </div>
        )}

        {!isRemoved && (
          <div className={`p-8 rounded-2xl shadow-xl border-2 max-w-6xl mx-auto transition-all duration-300 ${
            focusMode 
              ? 'bg-gray-800 border-gray-700 text-white' 
              : 'bg-white border-blue-50 text-gray-800'
          }`}>
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
              <div className="flex items-center">
                <div className={`w-4 h-16 rounded-full mr-4 ${assignment.daysEarly > 0 ? 'bg-green-500' : 'bg-yellow-500'}`}></div>
                <h2 className="text-2xl font-bold text-blue-500">{assignment.title}</h2>
              </div>
              <div className="flex flex-col md:flex-row md:items-center gap-2">
                <span className="bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-semibold">
                  Submitted Early ✓
                </span>
                {timeRemaining && (
                  <div className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium ${
                    focusMode ? 'bg-blue-900 text-blue-100' : 'bg-blue-50 text-blue-800'
                  }`}>
                    <Clock size={16} />
                    <span>Due: {timeRemaining.days}d {timeRemaining.hours}h remaining</span>
                  </div>
                )}
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className={`flex items-center space-x-4 p-6 rounded-lg transition-colors ${
                focusMode ? 'bg-gray-700' : 'bg-blue-50'
              }`}>
                <img src={pdfimg} alt="PDF Icon" className="w-20 h-20" />
                <div>
                  <label className={`block mb-1 font-medium ${focusMode ? 'text-gray-300' : 'text-gray-600'}`}>File Name:</label>
                  <p className="flex items-center mb-3">
                    <FileText className={`mr-2 ${focusMode ? 'text-blue-400' : 'text-blue-600'}`} size={20} />
                    <input
                      type="text"
                      value={assignment.fileName}
                      onChange={(e) => handleInputChange('fileName', e.target.value)}
                      className={`border-b-2 focus:outline-none transition-colors ${
                        focusMode 
                          ? 'bg-transparent border-gray-600 focus:border-blue-400 text-white' 
                          : 'bg-transparent border-blue-100 focus:border-blue-500 text-gray-800'
                      }`}
                      aria-label="File name"
                    />
                  </p>
                  <label className={`block mb-1 font-medium ${focusMode ? 'text-gray-300' : 'text-gray-600'}`}>Submission Date:</label>
                  <p className="flex items-center">
                    <Clock className={`mr-2 ${focusMode ? 'text-blue-400' : 'text-blue-600'}`} size={20} />
                    <span>{assignment.submittedDate}</span>
                  </p>
                </div>
              </div>

              <div className={`p-6 rounded-lg flex flex-col justify-center transition-colors ${
                focusMode ? 'bg-gray-700' : 'bg-blue-50'
              }`}>
                <label className={`block mb-1 font-medium ${focusMode ? 'text-gray-300' : 'text-gray-600'}`}>Due Date:</label>
                <p className="flex items-center mb-4">
                  <Calendar className={`mr-2 ${focusMode ? 'text-blue-400' : 'text-blue-600'}`} size={20} />
                  <span>{assignment.dueDate}</span>
                </p>
                
                <div className={`flex items-center gap-2 ${
                  assignment.daysEarly > 0 ? 'text-green-500' : 'text-yellow-500'
                } font-semibold text-lg`}>
                  <CheckCircle size={20} />
                  <span>Submitted {assignment.daysEarly} days early</span>
                </div>
              </div>
            </div>

            <div className={`mt-6 p-6 rounded-lg mb-8 transition-colors ${
              focusMode ? 'bg-gray-700' : 'bg-gray-100'
            }`}>
              <h3 className={`text-lg font-semibold mb-4 ${focusMode ? 'text-gray-200' : 'text-gray-700'}`}>
                Submission Requirements
              </h3>
              <div className="grid md:grid-cols-3 gap-6">
                <div className={`p-4 rounded-lg text-center transition-colors ${
                  focusMode ? 'bg-gray-800' : 'bg-white'
                }`}>
                  <strong className={`block text-lg mb-2 ${focusMode ? 'text-blue-400' : 'text-blue-600'}`}>
                    Maximum File Size
                  </strong>
                  <span className="text-2xl font-bold">{assignment.fileSize}</span>
                </div>
                <div className={`p-4 rounded-lg text-center transition-colors ${
                  focusMode ? 'bg-gray-800' : 'bg-white'
                }`}>
                  <strong className={`block text-lg mb-2 ${focusMode ? 'text-blue-400' : 'text-blue-600'}`}>
                    Maximum Files
                  </strong>
                  <span className="text-2xl font-bold">{assignment.maxFiles}</span>
                </div>
                <div className={`p-4 rounded-lg text-center transition-colors ${
                  focusMode ? 'bg-gray-800' : 'bg-white'
                }`}>
                  <strong className={`block text-lg mb-2 ${focusMode ? 'text-blue-400' : 'text-blue-600'}`}>
                    Allowed File Types
                  </strong>
                  <div className="flex justify-center gap-2">
                    {assignment.allowedFileTypes.map(type => (
                      <span key={type} className="px-3 py-1 rounded-full bg-blue-100 text-blue-800 font-medium">
                        {type}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-4">
              <button
                className="flex items-center justify-center bg-blue-500 text-white py-4 rounded-xl hover:bg-blue-600 transition-colors font-medium text-lg shadow-lg hover:shadow-xl"
                onClick={handleSaveChanges}
                disabled={isSaving}
              >
                {isSaving ? (
                  <Loader className="animate-spin mr-3" size={24} />
                ) : (
                  <Save className="mr-3" size={24} />
                )}
                <span>{isSaving ? 'Saving...' : 'Save Changes'}</span>
              </button>
              
              <button
                className="flex items-center justify-center bg-red-500 text-white py-4 rounded-xl hover:bg-red-600 transition-colors font-medium text-lg shadow-lg hover:shadow-xl"
                onClick={handleRemoveSubmission}
              >
                <Trash2 className="mr-3" size={24} />
                <span>Remove Submission</span>
              </button>
              
              <button
                className={`flex items-center justify-center py-4 rounded-xl transition-colors font-medium text-lg shadow-lg hover:shadow-xl ${
                  focusMode 
                    ? 'bg-gray-600 text-white hover:bg-gray-500' 
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
                onClick={() => navigate('/submitted-assignments')}
              >
                <X className="mr-3" size={24} />
                <span>Cancel</span>
              </button>
            </div>
          </div>
        )}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 backdrop-blur-sm">
          <div className={`p-8 rounded-2xl shadow-2xl max-w-md w-full transition-all ${
            focusMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'
          }`}>
            <div className="flex items-center mb-6">
              <AlertTriangle size={28} className="text-red-500 mr-4" />
              <h2 className="text-2xl font-bold text-red-500">Remove Submission</h2>
            </div>
            
            <p className="mb-8 text-lg leading-relaxed">
              Are you sure you want to remove this submission? 
              <strong className="block mt-2">This action cannot be undone.</strong>
            </p>
            
            <div className="grid grid-cols-2 gap-4">
              <button
                className="bg-gray-200 text-gray-800 py-3 px-4 rounded-xl hover:bg-gray-300 font-medium"
                onClick={() => setIsModalOpen(false)}
                disabled={isRemoving}
              >
                Cancel
              </button>
              <button
                className="bg-red-500 text-white py-3 px-4 rounded-xl hover:bg-red-600 font-medium flex items-center justify-center"
                onClick={confirmRemoveSubmission}
                disabled={isRemoving}
              >
                {isRemoving ? (
                  <>
                    <Loader className="animate-spin mr-2" size={20} />
                    <span>Removing...</span>
                  </>
                ) : (
                  <>
                    <Trash2 className="mr-2" size={20} />
                    <span>Remove</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditAssignment;