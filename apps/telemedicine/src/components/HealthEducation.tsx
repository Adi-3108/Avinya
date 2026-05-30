import React, { useState } from 'react';
import { BookOpen, Play, Download, Star } from 'lucide-react';

interface HealthEducationProps {
  language: 'en' | 'hi';
}

const HealthEducation: React.FC<HealthEducationProps> = ({ language }) => {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', name: 'All Topics' },
    { id: 'nutrition', name: 'Nutrition' },
    { id: 'exercise', name: 'Exercise' },
    { id: 'mental-health', name: 'Mental Health' },
    { id: 'preventive-care', name: 'Preventive Care' }
  ];

  const resources = [
    {
      id: 1,
      title: 'Healthy Eating Habits',
      category: 'nutrition',
      type: 'video',
      duration: '15 mins',
      rating: 4.5,
      thumbnail: 'https://images.unsplash.com/photo-1498837167922-ddd27525d352?w=400'
    },
    {
      id: 2,
      title: 'Stress Management Techniques',
      category: 'mental-health',
      type: 'article',
      readTime: '10 mins',
      rating: 4.8,
      thumbnail: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=400'
    },
    {
      id: 3,
      title: 'Basic Home Exercises',
      category: 'exercise',
      type: 'video',
      duration: '20 mins',
      rating: 4.6,
      thumbnail: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=400'
    }
  ];

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Health Education</h2>

      {/* Categories */}
      <div className="flex space-x-4 mb-8 overflow-x-auto pb-2">
        {categories.map(category => (
          <button
            key={category.id}
            onClick={() => setSelectedCategory(category.id)}
            className={`px-4 py-2 rounded-full whitespace-nowrap
              ${selectedCategory === category.id
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
          >
            {category.name}
          </button>
        ))}
      </div>

      {/* Resources Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {resources
          .filter(resource => selectedCategory === 'all' || resource.category === selectedCategory)
          .map(resource => (
            <div
              key={resource.id}
              className="border rounded-lg overflow-hidden hover:shadow-md transition-shadow"
            >
              <img
                src={resource.thumbnail}
                alt={resource.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-blue-600">
                    {categories.find(c => c.id === resource.category)?.name}
                  </span>
                  <div className="flex items-center">
                    <Star className="h-4 w-4 text-yellow-400 fill-current" />
                    <span className="text-sm text-gray-600 ml-1">{resource.rating}</span>
                  </div>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{resource.title}</h3>
                <div className="flex items-center justify-between">
                  <div className="flex items-center text-sm text-gray-600">
                    {resource.type === 'video' ? (
                      <>
                        <Play className="h-4 w-4 mr-1" />
                        <span>{resource.duration}</span>
                      </>
                    ) : (
                      <>
                        <BookOpen className="h-4 w-4 mr-1" />
                        <span>{resource.readTime} read</span>
                      </>
                    )}
                  </div>
                  <button className="text-blue-600 hover:text-blue-700">
                    {resource.type === 'video' ? 'Watch Now' : 'Read More'}
                  </button>
                </div>
              </div>
            </div>
          ))}
      </div>

      {/* Featured Content */}
      <div className="mt-8">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Featured Content</h3>
        <div className="bg-blue-50 rounded-lg p-6">
          <div className="flex items-start space-x-4">
            <div className="flex-shrink-0">
              <BookOpen className="h-8 w-8 text-blue-600" />
            </div>
            <div>
              <h4 className="text-lg font-medium text-gray-900 mb-2">
                Understanding COVID-19 Prevention
              </h4>
              <p className="text-gray-600 mb-4">
                Learn about the latest guidelines and best practices for protecting yourself and others.
              </p>
              <button className="flex items-center text-blue-600 hover:text-blue-700">
                <Download className="h-4 w-4 mr-1" />
                Download Guide
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HealthEducation;