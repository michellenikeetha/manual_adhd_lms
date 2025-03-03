import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, X } from 'lucide-react';

const RegistrationPopup = ({ isOpen, onClose }) => {
  const [registrationStatus, setRegistrationStatus] = useState('idle'); // idle, submitting, success
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    organization: '',
    interests: []
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCheckboxChange = (topic) => {
    setFormData(prev => {
      const newInterests = [...prev.interests];
      if (newInterests.includes(topic)) {
        return {
          ...prev,
          interests: newInterests.filter(item => item !== topic)
        };
      } else {
        return {
          ...prev,
          interests: [...newInterests, topic]
        };
      }
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setRegistrationStatus('submitting');
    
    setTimeout(() => {
      setRegistrationStatus('success');
    }, 1500);
  };

  const handleCloseComplete = () => {
    if (!isOpen) {
      setRegistrationStatus('idle');
      setFormData({
        name: '',
        email: '',
        organization: '',
        interests: []
      });
    }
  };

  return (
    <AnimatePresence onExitComplete={handleCloseComplete}>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 z-40 flex items-center justify-center p-4"
            onClick={onClose}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="bg-white rounded-lg shadow-xl w-full max-w-md mx-auto p-6 overflow-y-auto max-h-[90vh]"
              onClick={e => e.stopPropagation()}
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold">Register for Webinar</h3>
                <button 
                  onClick={onClose}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              {registrationStatus === 'success' ? (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center py-8"
                >
                  <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                    <Check className="text-green-500" size={32} />
                  </div>
                  <h4 className="text-xl font-bold mb-2">Registration Successful!</h4>
                  <p className="text-gray-600 mb-4">You're all set for the Future of Tech webinar.</p>
                  <p className="text-gray-600">A confirmation email has been sent to your inbox with connection details.</p>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={onClose}
                    className="mt-6 px-6 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600"
                  >
                    Close
                  </motion.button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">Name</label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-400 focus:border-transparent"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-1">Email</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-400 focus:border-transparent"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-2">Topics of Interest (select all that apply)</label>
                      <div className="space-y-2">
                        {[
                          'AI in Education',
                          'Digital Transformation',
                          'EdTech Technologies',
                          'Digital Education Challenges'
                        ].map(topic => (
                          <div key={topic} className="flex items-center">
                            <input
                              type="checkbox"
                              id={topic.replace(/\s+/g, '')}
                              checked={formData.interests.includes(topic)}
                              onChange={() => handleCheckboxChange(topic)}
                              className="w-4 h-4 text-purple-600 rounded focus:ring-purple-500"
                            />
                            <label htmlFor={topic.replace(/\s+/g, '')} className="ml-2 text-sm">{topic}</label>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div className="pt-2">
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        disabled={registrationStatus === 'submitting'}
                        type="submit"
                        className={`w-full py-2 bg-purple-500 text-white rounded-md hover:bg-purple-600 flex justify-center items-center
                          ${registrationStatus === 'submitting' ? 'opacity-70 cursor-not-allowed' : ''}`}
                      >
                        {registrationStatus === 'submitting' ? (
                          <div className="flex items-center">
                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Submitting...
                          </div>
                        ) : (
                          'Complete Registration'
                        )}
                      </motion.button>
                    </div>
                  </div>
                </form>
              )}
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default RegistrationPopup;