// components/AnnouncementCard.js
import React from 'react';
import { useNavigate } from 'react-router-dom';

const AnnouncementCard = ({ title, date, description }) => {
  const navigate = useNavigate();

  return (
    <div className="bg-gray-100 p-4 rounded-lg shadow-lg mb-6">
      <h3 className="text-lg font-bold">{title}</h3>
      <p className="text-sm text-gray-600">Date: {date}</p>
      <p className="text-sm mt-2">{description}</p>
      <button 
        onClick={() => navigate('/announcements/ai-for-everyone')} 
        className="mt-4 text-blue-600 hover:underline"
      >
        See More
      </button>
    </div>
  );
};

export default AnnouncementCard;
