// components/ForgotPassword.js
import React, { useState } from 'react';
import logo from '../assets/logo.png';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email === "") {
      alert("Please enter a valid email address.");
      return;
    }
    // Logic to send OTP to the email
    setIsSubmitted(true);
    console.log('OTP sent to:', email);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-sm w-full">
        <div className="text-center mb-6">
          <div className="flex justify-center mb-5">
            <img src={logo} alt="Logo" className="w-15 h-15" />
          </div>          
          <h1 className="text-2xl font-bold mb-2">Forgot Password?</h1>
          <p className="text-gray-600">Don't worry! It happens. We will send an OTP to your registered email address.</p>
        </div>

        {!isSubmitted ? (
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="email" className="sr-only">Email</label>
              <input
                type="email"
                id="email"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                placeholder="example@mail.com"
                value={email}
                onChange={handleEmailChange}
                required
              />
            </div>

            <button 
              type="submit" 
              className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600"
            >
              Send OTP
            </button>
          </form>
        ) : (
          <div className="text-center">
            <p className="text-green-600">An OTP has been sent to {email}.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;
