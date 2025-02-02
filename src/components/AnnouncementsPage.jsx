// components/AnnouncementsPage.js
import React from 'react';
import SignedInNavbar from './SignedInNavbar';
import AnnouncementCard from './AnnouncementCard';
import { useNavigate } from 'react-router-dom';

const AnnouncementsPage = () => {
  const navigate = useNavigate();
  const announcements = [
    {
      id: 1,
      title: 'New Course: AI for Everyone',
      date: '2024-09-01',
      description: 'We are excited to announce a new course on Artificial Intelligence, designed for beginners.'
    },
    {
      id: 2,
      title: 'Platform Maintenance',
      date: '2024-08-25',
      description: 'Scheduled maintenance on our platform August 12th. Please save your work, maintenance will be taking place.'
    },
    {
      id: 3,
      title: 'Webinar: Future of Tech',
      date: '2024-08-20',
      description: 'Join our upcoming webinar to discuss the future of technology and its impact on education.'
    }
  ];

  return (
    <div>
      <SignedInNavbar />
      <div className="container mx-auto px-6 py-8">
        <h1 className="text-3xl font-bold mb-6">Announcements</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {announcements.map((announcement) => (
            <AnnouncementCard
              key={announcement.id}
              title={announcement.title}
              date={announcement.date}
              description={announcement.description}
            />
          ))}
        </div>
        <button 
          onClick={() => navigate('/announcements/older-announcements')}
          className="mt-6 text-blue-600 hover:underline"
        >
          See Older Announcements
        </button>
      </div>
    </div>
  );
};

export default AnnouncementsPage;
