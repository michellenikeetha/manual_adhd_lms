import React, { useState, useRef } from 'react';
import { Upload, ImagePlus, Trash2 } from 'lucide-react';

const ImageUploader = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const fileInputRef = useRef(null);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageRemove = () => {
    setSelectedImage(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  return (
    <div className="bg-gray-50 border-2 border-dashed border-blue-200 p-6 rounded-xl transition-all duration-300 hover:border-blue-400">
      <h3 className="text-xl font-bold mb-4 text-gray-700">Profile Image</h3>
      
      <div className="relative w-full h-64 bg-gray-100 rounded-lg mb-4 overflow-hidden">
        {selectedImage ? (
          <img 
            src={selectedImage} 
            alt="Profile" 
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="flex flex-col justify-center items-center h-full text-gray-400">
            <ImagePlus size={64} className="mb-4 text-blue-300" />
            <p>No image selected</p>
          </div>
        )}
      </div>
      
      <div className="flex space-x-4">
        <input 
          type="file" 
          ref={fileInputRef}
          onChange={handleImageChange}
          accept="image/*"
          className="hidden"
        />
        <button 
          onClick={triggerFileInput}
          className="flex-1 flex items-center justify-center bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition-colors"
        >
          <Upload className="mr-2" size={20} />
          Select Image
        </button>
        
        {selectedImage && (
          <button 
            onClick={handleImageRemove}
            className="flex-1 flex items-center justify-center bg-red-500 text-white py-3 rounded-lg hover:bg-red-600 transition-colors"
          >
            <Trash2 className="mr-2" size={20} />
            Remove Image
          </button>
        )}
      </div>
    </div>
  );
};

export default ImageUploader;