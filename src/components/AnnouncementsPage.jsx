// components/AnnouncementsPage.js
import React, { useState } from 'react';
import { 
  Bell, 
  ChevronRight,
  Calendar, 
  ArrowUpRight,
  Search,
  Eye,
  EyeOff
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import SignedInNavbar from './SignedInNavbar';

const getCategoryColor = (category) => {
  const colors = {
    course: 'border-green-500',
    platform: 'border-orange-500',
    webinar: 'border-purple-500'
  };
  return colors[category] || 'border-gray-300';
};

const getCategoryBadgeColor = (category) => {
  const colors = {
    course: 'bg-green-100 text-green-800',
    platform: 'bg-orange-100 text-orange-800',
    webinar: 'bg-purple-100 text-purple-800'
  };
  return colors[category] || 'bg-gray-100 text-gray-800';
};

const AnnouncementCard = ({ title, date, description, category, reduceMotion, isFocused, isHovered }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const navigate = useNavigate();

  return (
    <div 
      className={`bg-white border-l-4 ${getCategoryColor(category)} rounded-lg p-6 shadow-lg
        ${reduceMotion ? '' : 'transition-transform duration-200'} 
        ${isExpanded ? 'ring-2 ring-blue-400' : 'hover:shadow-xl'}
        ${isFocused && !isHovered ? 'opacity-50' : 'opacity-100'}
        transition-all duration-300
        ${isHovered ? 'scale-102' : 'scale-100'}`}
    >
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center">
          <Bell className="text-blue-500 mr-3" size={24} />
          <span className={`px-3 py-1 rounded-full text-sm ${getCategoryBadgeColor(category)}`}>
            {category}
          </span>
        </div>
        <span className="text-sm text-gray-500 flex items-center">
          <Calendar className="mr-2" size={16} />
          {new Date(date).toLocaleDateString()}
        </span>
      </div>
      
      <h3 className="text-xl font-bold text-gray-800 mb-3">{title}</h3>
      
      <div className={`${isExpanded ? 'block' : 'line-clamp-2'} text-gray-600 mb-4`}>
        {description}
      </div>

      <div className="flex space-x-3">
        <button 
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex-1 flex items-center justify-center bg-gray-100 text-gray-700 py-2 rounded-lg hover:bg-gray-200 transition-colors"
        >
          {isExpanded ? 'Show Less' : 'Show More'}
        </button>
        <button 
          onClick={() => navigate(`/announcements/${title.toLowerCase().replace(/\s+/g, '-')}`)}
          className="flex-1 flex items-center justify-center bg-blue-50 text-blue-600 py-2 rounded-lg hover:bg-blue-100 transition-colors"
        >
          Learn More
          <ArrowUpRight className="ml-2" size={20} />
        </button>
      </div>
    </div>
  );
};

const AnnouncementsPage = () => {
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [reduceMotion, setReduceMotion] = useState(false);
  const [focusMode, setFocusMode] = useState(false);
  const [hoveredAnnouncement, setHoveredAnnouncement] = useState(null);

  const announcements = [
    {
      id: 1,
      title: 'New Course: AI for Everyone',
      date: '2024-09-01',
      description: 'We are excited to announce a new course on Artificial Intelligence, designed for beginners. This comprehensive course covers fundamental concepts, practical applications, and hands-on exercises to help you understand AI better. Perfect for students and professionals looking to expand their knowledge.',
      category: 'course'
    },
    {
      id: 2,
      title: 'Platform Maintenance',
      date: '2024-08-25',
      description: 'Scheduled maintenance on our platform August 12th. Please save your work, maintenance will be taking place from 2 AM to 4 AM EST. We recommend completing any ongoing tasks before this window.',
      category: 'platform'
    },
    {
      id: 3,
      title: 'Webinar: Future of Tech',
      date: '2024-08-20',
      description: 'Join our upcoming webinar to discuss the future of technology and its impact on education. Featured speakers include leading experts in EdTech, AI, and digital transformation. Registration is required and spaces are limited.',
      category: 'webinar'
    }
  ];

  const filteredAnnouncements = announcements
    .filter(a => activeFilter === 'all' || a.category === activeFilter)
    .filter(a => 
      searchTerm === '' || 
      a.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      a.description.toLowerCase().includes(searchTerm.toLowerCase())
    );

  const getBackgroundColor = () => {
    return focusMode ? 'bg-gray-100' : 'bg-gray-50';
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${getBackgroundColor()}`}>
      <SignedInNavbar />
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col space-y-6">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold text-gray-800">Announcements</h1>
            <button
              onClick={() => setFocusMode(!focusMode)}
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
            </button>
          </div>

          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
            <div className="relative w-full sm:w-64">
              <input
                type="text"
                placeholder="Search announcements..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-transparent"
              />
              <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
            </div>

            <div className="flex flex-wrap gap-2">
              {['all', 'course', 'platform', 'webinar'].map(filter => (
                <button
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  className={`px-4 py-2 rounded-lg text-sm capitalize transition-colors
                    ${activeFilter === filter 
                      ? 'bg-blue-500 text-white' 
                      : 'bg-white text-gray-700 hover:bg-blue-50'}`}
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredAnnouncements.map((announcement, index) => (
              <div
                key={announcement.id}
                onMouseEnter={() => setHoveredAnnouncement(index)}
                onMouseLeave={() => setHoveredAnnouncement(null)}
              >
                <AnnouncementCard
                  {...announcement}
                  reduceMotion={reduceMotion}
                  isFocused={focusMode}
                  isHovered={hoveredAnnouncement === index}
                />
              </div>
            ))}
          </div>

          {filteredAnnouncements.length === 0 && (
            <div className="text-center py-8">
              <p className="text-gray-600">No announcements found matching your criteria.</p>
            </div>
          )}

          <div className="flex justify-center mt-8">
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
      
      {focusMode && (
        <div className="fixed bottom-6 left-6 bg-white p-3 rounded-lg shadow-lg max-w-xs opacity-80 hover:opacity-100 transition-opacity">
          <div className="text-sm text-gray-600">
            <span className="font-medium block mb-1">Focus Tip:</span>
            Browse one announcement at a time. Hover over cards to focus on specific content.
          </div>
        </div>
      )}
    </div>
  );
};

export default AnnouncementsPage;