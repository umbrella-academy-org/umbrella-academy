'use client';

import { BookOpen, ArrowRight } from 'lucide-react';

export default function LearningMaterials() {
  const materials = [
    {
      id: 1,
      title: 'Node.js Design Patterns',
      category: 'By Harsh Choudhary',
      color: 'from-gray-400 to-gray-600'
    },
    {
      id: 2,
      title: 'Node.js Design Patterns',
      category: 'By Harsh Choudhary',
      color: 'from-gray-400 to-gray-600'
    },
    {
      id: 3,
      title: 'Node.js Design Patterns',
      category: 'By Harsh Choudhary',
      color: 'from-gray-400 to-gray-600'
    },
    {
      id: 4,
      title: 'Node.js Design Patterns',
      category: 'By Harsh Choudhary',
      color: 'from-gray-400 to-gray-600'
    }
  ];

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-1">Learning Materials</h2>
          <p className="text-gray-600">Last updated 12 September 2024</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {materials.map((material, index) => (
          <div 
            key={material.id}
            className="group border border-gray-200 rounded-lg p-4 hover:shadow-md transition-all duration-200 cursor-pointer animate-fade-in"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className="flex items-start justify-between mb-4">
              <div className={`w-12 h-12 bg-gradient-to-br ${material.color} rounded-lg flex items-center justify-center text-white`}>
                <BookOpen className="w-6 h-6" />
              </div>
              <button className="opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:bg-gray-100 rounded">
                <ArrowRight className="w-4 h-4 text-gray-600" />
              </button>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 mb-2 leading-tight">
                {material.title}
              </h3>
              <p className="text-sm text-gray-600">
                {material.category}
              </p>
            </div>

            <div className="mt-4 pt-4 border-t border-gray-200">
              <button className="w-full text-center py-2 text-sm font-medium text-gray-600 hover:text-gray-700 border border-yellow-600 hover:border-gray-700 rounded-lg transition-colors group-hover:bg-gray-50">
                Access Material
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}