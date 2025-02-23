import React, { useState } from 'react';
import SignedInNavbar from './SignedInNavbar';
import ImageUploader from './ImageUploader';
import user from '../assets/user.jpg';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Save, Eye, EyeOff } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const ProfilePage = () => {
  const [activeSection, setActiveSection] = useState('basic');
  const [focusMode, setFocusMode] = useState(false);
  const [hoveredSection, setHoveredSection] = useState(null);

  const getBackgroundColor = () => {
    return focusMode ? 'bg-gray-100' : 'bg-white';
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${getBackgroundColor()}`}>
      <SignedInNavbar />
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div className="flex items-center gap-4">
            <img 
              src={user} 
              alt="Profile" 
              className="rounded-full w-20 h-20 object-cover border-4 border-blue-500" 
            />
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Edit Your Profile</h1>
              <p className="text-gray-600">Complete one section at a time</p>
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setFocusMode(!focusMode)}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors mt-4 md:mt-0
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

        <Tabs defaultValue="basic" className="space-y-4">
          {/* <TabsList className="grid w-full grid-cols-3 lg:w-[400px]">
            <TabsTrigger value="basic">😊 Basic Info</TabsTrigger>
            <TabsTrigger value="socials">🔗 Social Links</TabsTrigger>
            <TabsTrigger value="details">📝 Bio & More</TabsTrigger>
          </TabsList> */}

          <AnimatePresence>
            {["basic", "socials", "details"].map((section, index) => (
              <TabsContent key={section} value={section}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ 
                    opacity: 1, 
                    y: 0,
                    scale: hoveredSection === section ? 1.02 : 1
                  }}
                  exit={{ opacity: 0, y: -20 }}
                  onHoverStart={() => setHoveredSection(section)}
                  onHoverEnd={() => setHoveredSection(null)}
                  className={`transition-all duration-300 ${
                    focusMode && hoveredSection !== section ? 'opacity-50' : 'opacity-100'
                  }`}
                >
                  {section === "basic" && (
                    <Card>
                      <CardHeader>
                        <CardTitle>Basic Information</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="space-y-2">
                          <label className="block text-lg font-medium text-gray-700">First Name</label>
                          <input 
                            type="text" 
                            placeholder="Enter your first name" 
                            className="w-full p-3 text-lg border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="block text-lg font-medium text-gray-700">Last Name</label>
                          <input 
                            type="text" 
                            placeholder="Enter your last name" 
                            className="w-full p-3 text-lg border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                        </div>
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className="flex items-center justify-center gap-2 w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg text-lg font-medium transition-colors"
                        >
                          <Save className="w-5 h-5" />
                          Save Basic Info
                        </motion.button>
                      </CardContent>
                    </Card>
                  )}

                  {section === "socials" && (
                    <Card>
                      <CardHeader>
                        <CardTitle>Social Media Links</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        {[
                          { name: 'Website', icon: '🌐' },
                          { name: 'X/Twitter', icon: '🐦' },
                          { name: 'LinkedIn', icon: '💼' },
                          { name: 'YouTube', icon: '📺' },
                          { name: 'Facebook', icon: '👥' }
                        ].map((social) => (
                          <div key={social.name} className="space-y-2">
                            <label className="flex items-center gap-2 text-lg font-medium text-gray-700">
                              {social.icon} {social.name}
                            </label>
                            <input 
                              type="text" 
                              placeholder={`Your ${social.name} profile`} 
                              className="w-full p-3 text-lg border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                          </div>
                        ))}
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className="flex items-center justify-center gap-2 w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg text-lg font-medium transition-colors"
                        >
                          <Save className="w-5 h-5" />
                          Save Social Links
                        </motion.button>
                      </CardContent>
                    </Card>
                  )}

                  {section === "details" && (
                    <Card>
                      <CardHeader>
                        <CardTitle>Bio & Additional Details</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-6">
                        <div className="space-y-2">
                          <label className="block text-lg font-medium text-gray-700">Short Bio</label>
                          <p className="text-sm text-gray-500">Brief introduction about yourself (max 150 characters)</p>
                          <textarea 
                            placeholder="I'm a creative developer who loves building user-friendly interfaces..." 
                            className="w-full p-3 text-lg border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent h-24"
                          />
                        </div>

                        <div className="space-y-4">
                          <h3 className="text-lg font-medium text-gray-700">Profile Picture</h3>
                          <ImageUploader />
                        </div>

                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className="flex items-center justify-center gap-2 w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg text-lg font-medium transition-colors"
                        >
                          <Save className="w-5 h-5" />
                          Save Details
                        </motion.button>
                      </CardContent>
                    </Card>
                  )}
                </motion.div>
              </TabsContent>
            ))}
          </AnimatePresence>
        </Tabs>
      </div>

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
            Take your time with each section. There's no rush - complete one part at a time.
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default ProfilePage;