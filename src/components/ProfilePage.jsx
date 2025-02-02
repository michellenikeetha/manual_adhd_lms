// components/ProfilePage.js
import React from 'react';
import SignedInNavbar from './SignedInNavbar';
import ImageUploader from './ImageUploader';
import user from '../assets/user.jpg'

const ProfilePage = () => {

  return (
    <div>
      <SignedInNavbar />
      <div className="container mx-auto px-6 py-8">
        <h1 className="text-3xl font-bold mb-6">Profile Page</h1>

        <div className="grid grid-cols-3 gap-6">
          <div className="col-span-1">
            <div className="bg-white p-4 shadow-lg rounded-lg mb-6 flex flex-col items-center">
              <img src={user} alt="Profile" className="rounded-full mb-4 w-32 h-32 object-cover" />
              <h2 className="text-xl font-bold text-center">John Doe</h2>
              <button className="w-full bg-blue-500 text-white py-2 mt-2 rounded-lg">Message</button>
            </div>

            <div className="bg-white p-4 shadow-lg rounded-lg">
              <h3 className="text-xl font-bold mb-4">Links</h3>
              <div className="space-y-4">
                <label className="block">
                  <span className="text-gray-600">Website</span>
                  <input type="text" placeholder="Website" className="w-full p-2 border rounded" />
                </label>
                <label className="block">
                  <span className="text-gray-600">X/Twitter</span>
                  <input type="text" placeholder="X/Twitter" className="w-full p-2 border rounded" />
                </label>
                <label className="block">
                  <span className="text-gray-600">LinkedIn</span>
                  <input type="text" placeholder="LinkedIn" className="w-full p-2 border rounded" />
                </label>
                <label className="block">
                  <span className="text-gray-600">YouTube</span>
                  <input type="text" placeholder="YouTube" className="w-full p-2 border rounded" />
                </label>
                <label className="block">
                  <span className="text-gray-600">Facebook</span>
                  <input type="text" placeholder="Facebook" className="w-full p-2 border rounded" />
                </label>
              </div>
            </div>
          </div>

          <div className="col-span-2">
            <div className="bg-white p-6 shadow-lg rounded-lg">
              <h3 className="text-xl font-bold mb-4">Details</h3>
              <div className="grid grid-cols-2 gap-4">
                <label>
                  <span className="text-gray-600">First Name</span>
                  <input type="text" placeholder="First Name" className="w-full p-2 border rounded" />
                </label>
                <label>
                  <span className="text-gray-600">Last Name</span>
                  <input type="text" placeholder="Last Name" className="w-full p-2 border rounded" />
                </label>
                <label className="col-span-2">
                  <span className="text-gray-600">Bio</span>
                  <textarea placeholder="Bio" className="w-full p-2 border rounded"></textarea>
                </label>
                <label className="col-span-2">
                  <span className="text-gray-600">Description</span>
                  <textarea placeholder="Description" className="w-full p-2 border rounded"></textarea>
                </label>
              </div>

              <div className="mt-6">
                <ImageUploader />
                <button className="bg-blue-600 text-white py-2 px-4 rounded-lg mt-5">Save Image</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
