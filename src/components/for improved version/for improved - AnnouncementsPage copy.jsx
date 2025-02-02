import React, { useState } from 'react';
import { 
  Bell, 
  ChevronRight, 
  Calendar, 
  BookOpen, 
  ArrowUpRight 
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const AnnouncementCard = ({ title, date, description }) => {
  const navigate = useNavigate();

  return (
    <div className="bg-white border-2 border-blue-50 rounded-2xl p-6 shadow-lg transform transition-all hover:scale-105 hover:shadow-xl">
      <div className="flex justify-between items-center mb-4">
        <Bell className="text-blue-500" size={32} />
        <span className="text-sm text-gray-500 flex items-center">
          <Calendar className="mr-2" size={16} />
          {new Date(date).toLocaleDateString('en-US', { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          })}
        </span>
      </div>
      <h3 className="text-xl font-bold text-gray-800 mb-3">{title}</h3>
      <p className="text-gray-600 mb-4">{description}</p>
      <button 
        onClick={() => navigate(`/announcements/${title.toLowerCase().replace(/\s+/g, '-')}`)}
        className="w-full flex items-center justify-center bg-blue-50 text-blue-600 py-2 rounded-lg hover:bg-blue-100 transition-colors"
      >
        Learn More
        <ArrowUpRight className="ml-2" size={20} />
      </button>
    </div>
  );
};

const AnnouncementsPage = () => {
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState('all');

  const announcements = [
    {
      id: 1,
      title: 'New Course: AI for Everyone',
      date: '2024-09-01',
      description: 'We are excited to announce a new course on Artificial Intelligence, designed for beginners.',
      category: 'course'
    },
    {
      id: 2,
      title: 'Platform Maintenance',
      date: '2024-08-25',
      description: 'Scheduled maintenance on our platform August 12th. Please save your work, maintenance will be taking place.',
      category: 'platform'
    },
    {
      id: 3,
      title: 'Webinar: Future of Tech',
      date: '2024-08-20',
      description: 'Join our upcoming webinar to discuss the future of technology and its impact on education.',
      category: 'webinar'
    }
  ];

  const filteredAnnouncements = activeFilter === 'all' 
    ? announcements 
    : announcements.filter(a => a.category === activeFilter);

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="container mx-auto px-6 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-extrabold text-gray-800">Announcements</h1>
          <div className="flex space-x-2">
            {['all', 'course', 'platform', 'webinar'].map(filter => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-4 py-2 rounded-full text-sm capitalize transition-colors ${
                  activeFilter === filter 
                    ? 'bg-blue-500 text-white' 
                    : 'bg-gray-200 text-gray-700 hover:bg-blue-100'
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAnnouncements.map((announcement) => (
            <AnnouncementCard
              key={announcement.id}
              title={announcement.title}
              date={announcement.date}
              description={announcement.description}
            />
          ))}
        </div>

        <div className="mt-8 flex justify-center">
          <button 
            onClick={() => navigate('/announcements/older-announcements')}
            className="flex items-center bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors"
          >
            See Older Announcements
            <ChevronRight className="ml-2" size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default AnnouncementsPage;