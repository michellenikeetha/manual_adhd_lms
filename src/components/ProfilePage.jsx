import React, { useState } from 'react';
import SignedInNavbar from './SignedInNavbar';
import ImageUploader from './ImageUploader';
import user from '../assets/user.jpg';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Save } from 'lucide-react';

const ProfilePage = () => {
  const [activeSection, setActiveSection] = useState('basic');

  return (
    <div className="min-h-screen bg-gray-50">
      <SignedInNavbar />
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center gap-4 mb-8">
          <img 
            src={user} 
            alt="Profile" 
            className="rounded-full w-20 h-20 object-cover border-4 border-blue-500" 
          />
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Edit Your Profile</h1>
            <p className="text-gray-600">Complete one section at a time - your progress saves automatically</p>
          </div>
        </div>

        <Tabs defaultValue="basic" className="space-y-4">
          <TabsList className="grid w-full grid-cols-3 lg:w-[400px]">
            <TabsTrigger value="basic">😊 Basic Info</TabsTrigger>
            <TabsTrigger value="socials">🔗 Social Links</TabsTrigger>
            <TabsTrigger value="details">📝 Bio & More</TabsTrigger>
          </TabsList>

          <TabsContent value="basic">
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
                <button className="flex items-center justify-center gap-2 w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg text-lg font-medium transition-colors">
                  <Save className="w-5 h-5" />
                  Save Basic Info
                </button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="socials">
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
                <button className="flex items-center justify-center gap-2 w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg text-lg font-medium transition-colors">
                  <Save className="w-5 h-5" />
                  Save Social Links
                </button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="details">
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

                <button className="flex items-center justify-center gap-2 w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg text-lg font-medium transition-colors">
                  <Save className="w-5 h-5" />
                  Save Details
                </button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default ProfilePage;