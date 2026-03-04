'use client';

import { Play, Search, Filter, Calendar } from 'lucide-react';

export default function VideoTutorials() {
  const tutorials = [
    {
      id: 1,
      title: 'HOW TO MAKE A TOAST USING HTML, CSS, JS',
      category: 'ABC Tutorials',
      instructor: 'Backend developer',
      tag: 'Technology',
      thumbnail: 'from-gray-400 to-gray-600',
      duration: '15:30'
    },
    {
      id: 2,
      title: 'HOW TO MAKE A TOAST USING HTML, CSS, JS',
      category: 'ABC Tutorials',
      instructor: 'Backend developer',
      tag: 'Technology',
      thumbnail: 'from-gray-400 to-gray-600',
      duration: '12:45'
    }
  ];

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-900">Video Tutorials</h2>
        
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search here..."
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-600 focus:border-transparent"
            />
          </div>
          
          <select className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-600 focus:border-transparent">
            <option>All Courses</option>
            <option>Web Development</option>
            <option>Backend Development</option>
            <option>Frontend Development</option>
          </select>
          
          <select className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-600 focus:border-transparent">
            <option>By Date</option>
            <option>By Duration</option>
            <option>By Popularity</option>
            <option>By Rating</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {tutorials.map((tutorial, index) => (
          <div 
            key={tutorial.id}
            className="group border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-all duration-200 animate-fade-in"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            {/* Video Thumbnail */}
            <div className={`relative h-48 bg-gradient-to-br ${tutorial.thumbnail} flex items-center justify-center`}>
              <div className="absolute inset-0 bg-black bg-opacity-20" />
              <button className="relative z-10 w-16 h-16 bg-white bg-opacity-90 rounded-full flex items-center justify-center group-hover:bg-opacity-100 transition-all duration-200 transform group-hover:scale-110">
                <Play className="w-8 h-8 text-gray-800 ml-1" />
              </button>
              
              {/* Duration Badge */}
              <div className="absolute bottom-3 right-3 px-2 py-1 bg-black bg-opacity-70 text-white text-xs rounded">
                {tutorial.duration}
              </div>
              
              {/* Title Overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black to-transparent">
                <h3 className="text-white font-bold text-lg leading-tight">
                  {tutorial.title}
                </h3>
              </div>
            </div>

            {/* Video Info */}
            <div className="p-4">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <p className="text-sm text-gray-600 mb-1">{tutorial.category}</p>
                  <p className="text-sm text-gray-600">{tutorial.instructor}</p>
                </div>
                <span className="px-2 py-1 bg-gray-100 text-gray-800 text-xs font-medium rounded-full">
                  {tutorial.tag}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm">
                  Cancel
                </button>
                <button className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors text-sm font-medium">
                  Continue
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Load More Button */}
      <div className="mt-6 text-center">
        <button className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium">
          Load More Tutorials
        </button>
      </div>
    </div>
  );
}