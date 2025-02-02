import React, { useState, useRef } from 'react';
import { Upload, FileText, X, CheckCircle2, CheckCircle } from 'lucide-react';
import SignedInNavbar from './SignedInNavbar';
import { useNavigate } from 'react-router-dom';

const SubmitAssignment = () => {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [isDragging, setIsDragging] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const fileInputRef = useRef(null);
  const navigate = useNavigate();

  const assignmentDetails = {
    title: 'Assignment 2',
    maxFileSize: '2 GB',
    maxFiles: 10,
    allowedFileTypes: ['PDF', 'DOCX'],
  };

  const handleFileDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const files = Array.from(e.dataTransfer.files);
    setSelectedFiles(files);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setSelectedFiles(files);
  };

  const handleFileRemove = (indexToRemove) => {
    setSelectedFiles(selectedFiles.filter((_, index) => index !== indexToRemove));
  };

  const handleSubmit = () => {
    if (selectedFiles.length === 0) {
      alert("Please select a file to submit.");
      return;
    }
    setShowSuccess(true); 
    setTimeout(() => setShowSuccess(false), 5000);
    
    setTimeout(() => {
      setShowSuccess(false); 
      navigate('/submitted-assignments'); 
    }, 3000);
  };

  // const handleCancel = () => {
  //   setSelectedFiles([]);
  // };

  return (
    <div className="bg-gray-50 min-h-screen">
      <SignedInNavbar />
      <div className="container mx-auto px-6 py-8">
        <h1 className="text-3xl font-bold mb-8 text-gray-800">Submit Your Assignment</h1>

        <div className="bg-white p-8 rounded-2xl shadow-xl border-2 border-blue-50 max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-blue-800">{assignmentDetails.title}</h2>
          </div>

          <div 
            className={`border-2 border-dashed ${isDragging ? 'border-blue-500 bg-blue-50' : 'border-gray-300 bg-gray-100'} p-8 rounded-2xl mb-6 text-center transition-all duration-300`}
            onDrop={handleFileDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
          >
            <input
              type="file"
              ref={fileInputRef}
              multiple
              className="hidden"
              accept=".pdf,.docx"
              onChange={handleFileChange}
            />
            {selectedFiles.length === 0 ? (
              <div className="flex flex-col items-center">
                <Upload className="text-blue-400 mb-4" size={64} />
                <p className="text-gray-600 mb-4 text-lg">Drag & Drop your files here</p>
                <p className="text-gray-500 mb-4">or</p>
                <button 
                  onClick={() => fileInputRef.current.click()}
                  className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors flex items-center"
                >
                  <FileText className="mr-2" size={20} />
                  Browse Files
                </button>
              </div>
            ) : (
              <div>
                <h3 className="text-lg font-semibold mb-4 text-blue-800">Files Ready for Submission</h3>
                <div className="space-y-2">
                  {selectedFiles.map((file, index) => (
                    <div 
                      key={index} 
                      className="flex items-center justify-between bg-white p-3 rounded-lg shadow-sm"
                    >
                      <div className="flex items-center">
                        <CheckCircle2 className="text-green-500 mr-2" size={20} />
                        <span className="text-gray-700">{file.name}</span>
                      </div>
                      <button 
                        onClick={() => handleFileRemove(index)}
                        className="text-red-500 hover:text-red-600"
                      >
                        <X size={20} />
                      </button>
                    </div>
                  ))}
                </div>
                <div className="mt-4 flex justify-center space-x-4">
                  <button 
                    onClick={() => fileInputRef.current.click()}
                    className="bg-blue-100 text-blue-700 px-4 py-2 rounded-lg hover:bg-blue-200 transition-colors"
                  >
                    Add More Files
                  </button>
                </div>
              </div>
            )}
          </div>

          <div className="bg-gray-100 p-4 rounded-lg mb-6">
            <h3 className="text-lg font-semibold mb-2">Submission Guidelines</h3>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <strong className="block text-blue-600 mb-1">Max File Size</strong>
                {assignmentDetails.maxFileSize}
              </div>
              <div>
                <strong className="block text-blue-600 mb-1">Max Files</strong>
                {assignmentDetails.maxFiles}
              </div>
              <div>
                <strong className="block text-blue-600 mb-1">File Types</strong>
                {assignmentDetails.allowedFileTypes.join(', ')}
              </div>
            </div>
          </div>

          <div className="flex space-x-4">
            <button 
              className="flex-1 flex items-center justify-center bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition-colors"
              onClick={handleSubmit}
            >
              <Upload className="mr-2" size={20} />
              Submit Assignment
            </button>
            <button 
              className="flex-1 flex items-center justify-center bg-gray-500 text-white py-3 rounded-lg hover:bg-gray-600 transition-colors"
              onClick={() => navigate("/assignments")}
            >
              <X className="mr-2" size={20} />
              Cancel
            </button>
          </div>
        </div>

        {showSuccess && (
          <div className="fixed top-20 right-4 bg-green-500 text-white px-6 py-3 rounded-xl shadow-lg flex items-center gap-2 z-20">
            <CheckCircle className="w-5 h-5" />
            Assignment Submission Successful!
          </div>
        )}
      </div>
    </div>
  );
};

export default SubmitAssignment;
