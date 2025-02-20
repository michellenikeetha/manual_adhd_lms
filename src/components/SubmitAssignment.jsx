import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, FileText, X, CheckCircle2, CheckCircle, Eye, EyeOff, Info, Sparkles } from 'lucide-react';
import SignedInNavbar from './SignedInNavbar';
import { useNavigate } from 'react-router-dom';

const SubmitAssignment = () => {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [isDragging, setIsDragging] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [focusMode, setFocusMode] = useState(false);
  const [stepProgress, setStepProgress] = useState(1);
  const fileInputRef = useRef(null);
  const navigate = useNavigate();

  const assignmentDetails = {
    title: 'Assignment 2',
    maxFileSize: '2 GB',
    maxFiles: 10,
    allowedFileTypes: ['PDF', 'DOCX'],
    dueDate: '10 September 2023',
    dueTime: '11:59 PM',
  };

  const handleFileDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const files = Array.from(e.dataTransfer.files);
    setSelectedFiles(files);
    if (files.length > 0) {
      setStepProgress(2);
    }
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
    if (files.length > 0) {
      setStepProgress(2);
    }
  };

  const handleFileRemove = (indexToRemove) => {
    setSelectedFiles(selectedFiles.filter((_, index) => index !== indexToRemove));
    if (selectedFiles.length <= 1) {
      setStepProgress(1);
    }
  };

  const handleSubmit = () => {
    if (selectedFiles.length === 0) {
      alert("Please select a file to submit.");
      return;
    }
    setShowSuccess(true);
    setStepProgress(3);
    
    setTimeout(() => {
      setShowSuccess(false);
      navigate('/submitted-assignments');
    }, 3000);
  };

  const toggleFocusMode = () => {
    setFocusMode(!focusMode);
  };

  const getBackgroundColor = () => {
    return focusMode ? 'bg-gray-100' : 'bg-white';
  };

  const renderProgressBar = () => {
    return (
      <div className="mb-8">
        <div className="flex justify-between mb-2">
          <span className={`text-sm ${stepProgress >= 1 ? 'text-blue-600 font-bold' : 'text-gray-500'}`}>1. Select Files</span>
          <span className={`text-sm ${stepProgress >= 2 ? 'text-blue-600 font-bold' : 'text-gray-500'}`}>2. Review Files</span>
          <span className={`text-sm ${stepProgress >= 3 ? 'text-green-600 font-bold' : 'text-gray-500'}`}>3. Submission Complete</span>
        </div>
        <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
          <motion.div 
            className="h-full bg-blue-500"
            initial={{ width: "33%" }}
            animate={{ width: `${stepProgress * 33.33}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>
      </div>
    );
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${focusMode ? 'bg-gray-100' : 'bg-gray-50'}`}>
      <SignedInNavbar />
      <div className="container mx-auto px-6 py-8">
        <div className="flex justify-between items-center mb-4">
          <motion.h1 
            className="text-3xl font-bold text-gray-800"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Submit Your Assignment
          </motion.h1>
          
          <div className="flex items-center space-x-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={toggleFocusMode}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors
                ${focusMode ? 'bg-blue-500 text-white' : 'bg-blue-100 text-blue-500'}`}
            >
              {focusMode ? (
                <>
                  <EyeOff size={20} />
                  <span>Focus Mode</span>
                </>
              ) : (
                <>
                  <Eye size={20} />
                  <span>Normal Mode</span>
                </>
              )}
            </motion.button>
          </div>
        </div>

        {renderProgressBar()}

        <motion.div 
          className={`p-8 rounded-2xl shadow-xl border-2 max-w-4xl mx-auto transition-all duration-300 ${
            focusMode 
              ? 'border-blue-200 bg-white' 
              : 'border-blue-50 bg-white text-gray-800'
          }`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="flex items-center justify-between mb-6">
            <motion.h2 
              className="text-2xl font-bold text-blue-800"
              whileHover={{ scale: 1.02 }}
            >
              {assignmentDetails.title}
            </motion.h2>
            
            <motion.div 
              className="px-3 py-1 rounded-lg bg-red-100 text-red-800"
              whileHover={{ scale: 1.05 }}
            >
              Due: {assignmentDetails.dueDate} at {assignmentDetails.dueTime}
            </motion.div>
          </div>

          <motion.div 
            className={`border-2 border-dashed p-8 rounded-2xl mb-6 text-center transition-all duration-300 ${
              isDragging 
                ? 'border-blue-500 bg-blue-50' 
                : 'border-gray-300 bg-gray-100'
            }`}
            onDrop={handleFileDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            whileHover={{ scale: 1.01 }}
          >
            <input
              type="file"
              ref={fileInputRef}
              multiple
              className="hidden"
              accept=".pdf,.docx"
              onChange={handleFileChange}
            />
            
            <AnimatePresence mode="wait">
              {selectedFiles.length === 0 ? (
                <motion.div 
                  className="flex flex-col items-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  key="dropzone"
                >
                  <motion.div
                    animate={{ 
                      y: [0, -10, 0],
                    }}
                    transition={{ 
                      repeat: Infinity, 
                      duration: 2,
                      repeatType: "reverse"
                    }}
                  >
                    <Upload className="mb-4 text-blue-400" size={64} />
                  </motion.div>
                  
                  <p className="mb-4 text-lg text-gray-600">
                    Drag & Drop your files here
                  </p>
                  <p className="mb-4 text-gray-500">or</p>
                  
                  <motion.button 
                    onClick={() => fileInputRef.current.click()}
                    className="px-6 py-3 rounded-lg transition-colors flex items-center bg-blue-500 hover:bg-blue-600 text-white"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <FileText className="mr-2" size={20} />
                    Browse Files
                  </motion.button>
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  key="filelist"
                >
                  <h3 className="text-lg font-semibold mb-4 text-blue-800">
                    Files Ready for Submission
                  </h3>
                  
                  <div className="space-y-2">
                    <AnimatePresence>
                      {selectedFiles.map((file, index) => (
                        <motion.div 
                          key={index} 
                          className="flex items-center justify-between p-3 rounded-lg shadow-sm bg-white"
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: 20 }}
                          transition={{ duration: 0.3 }}
                        >
                          <div className="flex items-center">
                            <motion.div
                              animate={{ rotate: [0, 0, -10, 10, 0] }}
                              transition={{ duration: 0.5, delay: index * 0.1 }}
                            >
                              <CheckCircle2 className="text-green-500 mr-2" size={20} />
                            </motion.div>
                            <span className="text-gray-700">
                              {file.name}
                            </span>
                          </div>
                          
                          <motion.button 
                            onClick={() => handleFileRemove(index)}
                            className="text-red-500 hover:text-red-600"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                          >
                            <X size={20} />
                          </motion.button>
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </div>
                  
                  <div className="mt-4 flex justify-center space-x-4">
                    <motion.button 
                      onClick={() => fileInputRef.current.click()}
                      className="px-4 py-2 rounded-lg transition-colors bg-blue-100 text-blue-700 hover:bg-blue-200"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Add More Files
                    </motion.button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          <motion.div 
            className="p-4 rounded-lg mb-6 bg-gray-100"
            whileHover={{ scale: 1.02 }}
          >
            <div className="flex items-center mb-2">
              <Info size={18} className="text-blue-600 mr-2" />
              <h3 className="text-lg font-semibold">Submission Guidelines</h3>
            </div>
            
            <div className="grid grid-cols-3 gap-4 text-center">
              <motion.div 
                whileHover={{ scale: 1.05 }}
                className="p-2 rounded-lg bg-white"
              >
                <strong className="block mb-1 text-blue-600">
                  Max File Size
                </strong>
                {assignmentDetails.maxFileSize}
              </motion.div>
              
              <motion.div 
                whileHover={{ scale: 1.05 }}
                className="p-2 rounded-lg bg-white"
              >
                <strong className="block mb-1 text-blue-600">
                  Max Files
                </strong>
                {assignmentDetails.maxFiles}
              </motion.div>
              
              <motion.div 
                whileHover={{ scale: 1.05 }}
                className="p-2 rounded-lg bg-white"
              >
                <strong className="block mb-1 text-blue-600">
                  File Types
                </strong>
                {assignmentDetails.allowedFileTypes.join(', ')}
              </motion.div>
            </div>
          </motion.div>

          <div className="flex space-x-4">
            <motion.button 
              className={`flex-1 flex items-center justify-center py-3 rounded-lg text-white ${
                selectedFiles.length > 0 
                  ? 'bg-blue-500 hover:bg-blue-600' 
                  : 'bg-gray-400 cursor-not-allowed'
              }`}
              onClick={handleSubmit}
              whileHover={selectedFiles.length > 0 ? { scale: 1.03 } : {}}
              whileTap={selectedFiles.length > 0 ? { scale: 0.97 } : {}}
              disabled={selectedFiles.length === 0}
            >
              <Upload className="mr-2" size={20} />
              Submit Assignment
            </motion.button>
            
            <motion.button 
              className="flex-1 flex items-center justify-center py-3 rounded-lg text-white bg-gray-500 hover:bg-gray-600"
              onClick={() => navigate("/assignments")}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              <X className="mr-2" size={20} />
              Cancel
            </motion.button>
          </div>
        </motion.div>

        {focusMode && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ 
              opacity: [0.7, 1, 0.7],
              transition: { repeat: Infinity, duration: 4 }
            }}
            className="fixed bottom-6 left-6 bg-white p-3 rounded-lg shadow-lg max-w-xs"
          >
            <div className="text-sm text-gray-600">
              <span className="font-medium block mb-1">Focus Tip:</span>
              Break down this submission into smaller steps. Take your time to select the right files and review them carefully.
            </div>
          </motion.div>
        )}

        <AnimatePresence>
          {showSuccess && (
            <motion.div 
              initial={{ opacity: 0, y: -50, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="fixed top-20 right-4 bg-green-500 text-white px-6 py-3 rounded-xl shadow-lg flex items-center gap-2 z-20"
            >
              <motion.div
                animate={{ 
                  rotate: [0, 0, -10, 10, 0],
                  scale: [1, 1.2, 1]
                }}
                transition={{ duration: 0.5, repeat: 1 }}
              >
                <CheckCircle className="w-5 h-5" />
              </motion.div>
              Assignment Submission Successful!
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default SubmitAssignment;