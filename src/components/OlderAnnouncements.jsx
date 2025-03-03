// components/OlderAnnouncementsPage.js
import React, { useState } from 'react';
import { 
  Bell, 
  ChevronLeft,
  Calendar, 
  ArrowUpRight,
  Search,
  Eye,
  EyeOff,
  Clock
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import SignedInNavbar from './SignedInNavbar';

const getCategoryColor = (category) => {
  const colors = {
    course: 'border-green-500',
    platform: 'border-orange-500',
    webinar: 'border-purple-500',
    event: 'border-indigo-500',
    policy: 'border-red-500'
  };
  return colors[category] || 'border-gray-300';
};

const getCategoryBadgeColor = (category) => {
  const colors = {
    course: 'bg-green-100 text-green-800',
    platform: 'bg-orange-100 text-orange-800',
    webinar: 'bg-purple-100 text-purple-800',
    event: 'bg-indigo-100 text-indigo-800',
    policy: 'bg-red-100 text-red-800'
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

const OlderAnnouncementsPage = () => {
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [reduceMotion, setReduceMotion] = useState(false);
  const [focusMode, setFocusMode] = useState(false);
  const [hoveredAnnouncement, setHoveredAnnouncement] = useState(null);
  const [archiveYear, setArchiveYear] = useState('2024');

  // Sample older announcements data
  const olderAnnouncements = {
    '2024': [
      {
        id: 1,
        title: 'System Update: New Features',
        date: '2024-07-15',
        description: 'We\'ve introduced several new features to enhance your learning experience. These include improved navigation, advanced search capabilities, and a redesigned dashboard for better visualization of your progress. Check out the updated interface and let us know your feedback.',
        category: 'platform'
      },
      {
        id: 2,
        title: 'Summer Coding Challenge',
        date: '2024-06-22',
        description: 'Join our annual Summer Coding Challenge from July 1-14. Compete with peers, solve challenging problems, and win exciting prizes. This year\'s theme focuses on sustainable technology solutions. Registration opens next week.',
        category: 'event'
      },
      {
        id: 3,
        title: 'New Course: Data Science Fundamentals',
        date: '2024-05-10',
        description: 'Introducing our comprehensive Data Science course covering statistics, Python programming, data visualization, and machine learning basics. Perfect for beginners looking to enter the field of data analytics and AI.',
        category: 'course'
      },
      {
        id: 4,
        title: 'Updated Privacy Policy',
        date: '2024-04-05',
        description: 'We\'ve updated our privacy policy to comply with new regulations. The changes include enhanced data protection measures, updated sharing policies, and improved transparency in how we use your information. These changes will take effect starting May 1, 2024.',
        category: 'policy'
      }
    ],
    '2023': [
      {
        id: 5,
        title: 'Year-End Hackathon Results',
        date: '2023-12-18',
        description: 'Congratulations to all participants in our Year-End Hackathon! Team "DataWizards" took first place with their innovative solution for healthcare analytics. Check out all the winning projects and honorable mentions.',
        category: 'event'
      },
      {
        id: 6,
        title: 'Winter Break Schedule',
        date: '2023-12-01',
        description: 'The platform will remain operational during the winter break, but with limited support from December 23 to January 2. Emergency support will be available for critical issues. Regular operations will resume on January 3, 2023.',
        category: 'platform'
      },
      {
        id: 7,
        title: 'Webinar: Careers in Tech',
        date: '2023-11-15',
        description: 'Join our panel of industry experts discussing career opportunities and growth paths in technology. Topics include skills in demand, emerging roles, and strategies for professional development. Perfect for students planning their career trajectory.',
        category: 'webinar'
      },
      {
        id: 8,
        title: 'New Course: Cloud Computing',
        date: '2023-10-05',
        description: 'Expand your technical skills with our new Cloud Computing course. Learn about major cloud platforms, deployment models, security best practices, and cost optimization strategies. Includes hands-on projects with AWS, Azure, and Google Cloud.',
        category: 'course'
      }
    ],
    '2022': [
      {
        id: 9,
        title: 'Platform Migration Complete',
        date: '2022-11-30',
        description: 'We\'ve successfully completed our platform migration to a more robust infrastructure. Expect improved performance, faster loading times, and enhanced security. If you encounter any issues, please contact our support team.',
        category: 'platform'
      },
      {
        id: 10,
        title: 'Fall Webinar Series',
        date: '2022-09-10',
        description: 'Our Fall Webinar Series kicks off next week with topics spanning artificial intelligence, blockchain, cybersecurity, and more. Sessions will be held every Thursday at 7 PM EST. Recordings will be available for registered participants.',
        category: 'webinar'
      }
    ]
  };

  const years = Object.keys(olderAnnouncements).sort((a, b) => b - a);
  
  const filteredAnnouncements = olderAnnouncements[archiveYear]
    .filter(a => activeFilter === 'all' || a.category === activeFilter)
    .filter(a => 
      searchTerm === '' || 
      a.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      a.description.toLowerCase().includes(searchTerm.toLowerCase())
    );

  const getBackgroundColor = () => {
    return focusMode ? 'bg-gray-100' : 'bg-gray-50';
  };
  
  // Get all categories across all years for filter buttons
  const getAllCategories = () => {
    const categories = new Set();
    categories.add('all');
    
    Object.values(olderAnnouncements).forEach(yearAnnouncements => {
      yearAnnouncements.forEach(announcement => {
        categories.add(announcement.category);
      });
    });
    
    return Array.from(categories);
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${getBackgroundColor()}`}>
      <SignedInNavbar />
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col space-y-6">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => navigate('/announcements')}
                className="p-2 rounded-lg hover:bg-gray-200 transition-colors"
                aria-label="Back to Announcements"
              >
                <ChevronLeft size={24} />
              </button>
              <h1 className="text-3xl font-bold text-gray-800">Older Announcements</h1>
            </div>
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

          <div className="bg-blue-50 p-4 rounded-lg mb-4">
            <h2 className="font-semibold mb-2">Archive Year</h2>
            <div className="flex flex-wrap gap-2">
              {years.map(year => (
                <button
                  key={year}
                  onClick={() => setArchiveYear(year)}
                  className={`px-4 py-2 rounded-lg text-sm transition-colors
                    ${archiveYear === year 
                      ? 'bg-blue-500 text-white' 
                      : 'bg-white text-gray-700 hover:bg-blue-50'}`}
                >
                  {year}
                </button>
              ))}
            </div>
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
              {getAllCategories().map(filter => (
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

          <div className="flex items-center space-x-2 text-gray-600">
            <Clock size={18} />
            <span>Showing announcements from {archiveYear}</span>
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
              onClick={() => navigate('/announcements')}
              className="flex items-center bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors"
            >
              <ChevronLeft className="mr-2" size={20} />
              Back to Current Announcements
            </button>
          </div>
        </div>
      </div>
      
      {focusMode && (
        <div className="fixed bottom-6 left-6 bg-white p-3 rounded-lg shadow-lg max-w-xs opacity-80 hover:opacity-100 transition-opacity">
          <div className="text-sm text-gray-600">
            <span className="font-medium block mb-1">Archive Tip:</span>
            Use year filters to quickly find past announcements. Focus on one period at a time.
          </div>
        </div>
      )}
    </div>
  );
};

export default OlderAnnouncementsPage;