import React from 'react';
import { useNavigate } from 'react-router-dom';
import certificate from '../assets/certificate.webp';
import SignedInNavbar from './SignedInNavbar';

const ViewCertificate = () => {
  const navigate = useNavigate();

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = certificate;
    link.download = 'Course_Certificate.png';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  
    alert("Certificate downloaded successfully!");
  };  

  return (
    <div className="min-h-screen bg-gray-100">
        <SignedInNavbar />

        <main className="container mx-auto px-4 py-6 flex flex-col items-center justify-center">
            <div className="bg-white shadow-lg rounded-lg p-8 max-w-3xl w-full">
                <h1 className="text-3xl font-bold text-center mb-4 text-blue-700">Your Certificate</h1>
                <div className="text-center mb-6">
                <p className="text-gray-600">Congratulations on completing the course! Here is your certificate of achievement.</p>
                </div>
                <div className="border rounded-lg overflow-hidden mb-6">
                <img
                    src={certificate} 
                    alt="Certificate"
                    className="w-full h-auto"
                />
                </div>
                <div className="flex justify-center space-x-4">
                <button
                    className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600"
                    onClick={handleDownload}
                >
                    Download Certificate
                </button>
                <button
                    className="bg-gray-500 text-white px-6 py-2 rounded-lg hover:bg-gray-600"
                    onClick={() => navigate('/my-learning')}
                >
                    Go Back to Courses
                </button>
                </div>
            </div>
        </main>
    </div>
  );
};

export default ViewCertificate;
