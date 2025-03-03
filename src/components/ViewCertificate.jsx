import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import certificate from '../assets/certificate.webp';
import SignedInNavbar from './SignedInNavbar';
import { Check } from 'lucide-react';

const ViewCertificate = () => {
  const navigate = useNavigate();
  const [isDownloaded, setIsDownloaded] = useState(false);
  
  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = certificate;
    link.download = 'Course_Certificate.png';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    setIsDownloaded(true);
    
    setTimeout(() => {
      setIsDownloaded(false);
    }, 5000);
  };
  
  return (
    <div className="min-h-screen bg-gray-50">
      <SignedInNavbar />
      
      {/* <div className="bg-blue-600 text-white py-2">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center space-x-2">
            <span className="bg-white text-blue-600 rounded-full h-6 w-6 flex items-center justify-center text-sm font-bold">3</span>
            <span>of 3 steps complete - Final Achievement!</span>
          </div>
        </div>
      </div> */}
      
      <main className="container mx-auto px-4 py-6 flex flex-col items-center justify-center">
        {isDownloaded && (
          <div className="fixed top-20 right-4 bg-green-100 border-l-4 border-green-500 text-green-700 p-4 rounded shadow-lg flex items-center mb-4 animate-pulse">
            <Check className="mr-2" size={20} />
            <span>Certificate downloaded successfully!</span>
          </div>
        )}
        
        <div className="bg-white shadow-lg rounded-lg p-8 max-w-3xl w-full border-2 border-blue-200 mb-8">
          <h1 className="text-3xl font-bold text-center mb-4 text-blue-700">
            🎉 Your Certificate 🎉
          </h1>
          
          <div className="text-center mb-6 bg-blue-50 p-4 rounded-lg border-l-4 border-blue-500">
            <p className="text-gray-700 font-medium">
              <span className="text-xl">Congratulations!</span> You've completed the course!
            </p>
          </div>
          
          <div className="border-4 border-blue-300 rounded-lg overflow-hidden mb-6 hover:border-blue-500 transition-all duration-300">
            <img
              src={certificate}
              alt="Certificate of Completion"
              className="w-full h-auto"
            />
          </div>
          
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <button
              className="bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 transition-colors duration-300 flex items-center justify-center text-lg font-bold shadow-md"
              onClick={handleDownload}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
              Download Certificate
            </button>
            <button
              className="bg-gray-500 text-white px-6 py-3 rounded-lg hover:bg-gray-600 transition-colors duration-300 flex items-center justify-center text-lg shadow-md"
              onClick={() => navigate('/my-learning')}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z" clipRule="evenodd" />
              </svg>
              Back to My Courses
            </button>
          </div>
        </div>
        
        <div className="bg-white shadow rounded-lg p-6 max-w-3xl w-full">
          <h2 className="text-xl font-bold mb-4 text-gray-800">What's Next?</h2>
          <ul className="space-y-3">
            <li className="flex items-start">
              <div className="bg-blue-100 text-blue-800 p-2 rounded-full mr-3 mt-1">1</div>
              <div>
                <p className="font-medium">Share your achievement on LinkedIn</p>
                <p className="text-gray-600">Let your network know about your new skills</p>
              </div>
            </li>
            <li className="flex items-start">
              <div className="bg-blue-100 text-blue-800 p-2 rounded-full mr-3 mt-1">2</div>
              <div>
                <p className="font-medium">Explore related courses</p>
                <p className="text-gray-600">Continue building your skills with our recommended courses</p>
              </div>
            </li>
          </ul>
        </div>
      </main>
    </div>
  );
};

export default ViewCertificate;