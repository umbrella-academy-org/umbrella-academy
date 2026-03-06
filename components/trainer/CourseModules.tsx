'use client';

import { Play, CheckCircle, Clock, Users } from 'lucide-react';

interface CourseModulesProps {
  selectedCourse: string;
}

export default function CourseModules({ selectedCourse }: CourseModulesProps) {
  const modules = [
    {
      id: 1,
      title: 'Web Dev with JavaScript',
      lessons: 12,
      duration: '2h 30m',
      students: 24,
      progress: 100,
      status: 'completed',
      color: 'from-gray-400 to-gray-600',
      icon: '🌐'
    },
    {
      id: 2,
      title: 'Software Development',
      lessons: 8,
      duration: '1h 45m',
      students: 18,
      progress: 75,
      status: 'in-progress',
      color: 'from-gray-400 to-gray-600',
      icon: '💻'
    },
    {
      id: 3,
      title: 'Software Development',
      lessons: 15,
      duration: '3h 20m',
      students: 32,
      progress: 60,
      status: 'in-progress',
      color: 'from-gray-400 to-gray-600',
      icon: '⚙️'
    },
    {
      id: 4,
      title: 'Software Development',
      lessons: 10,
      duration: '2h 15m',
      students: 28,
      progress: 40,
      status: 'in-progress',
      color: 'from-gray-400 to-gray-600',
      icon: '🔧'
    }
  ];

  const getStatusBadge = (status: string, progress: number) => {
    if (status === 'completed') {
      return (
        <div className="flex items-center gap-1 px-2 py-1 bg-gray-100 text-gray-800 rounded-full text-xs font-medium">
          <CheckCircle className="w-3 h-3" />
          Completed
        </div>
      );
    }
    return (
      <div className="flex items-center gap-1 px-2 py-1 bg-gray-100 text-gray-800 rounded-full text-xs font-medium">
        <Play className="w-3 h-3" />
        {progress}% Complete
      </div>
    );
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900">Course Modules</h2>
          <p className="text-sm text-gray-600">
            Explore modules to enhance your understanding
          </p>
        </div>
      </div>

      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {modules.map((module, index) => (
            <div 
              key={module.id}
              className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-all duration-200 cursor-pointer animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex items-start gap-4">
                {/* Module Icon */}
                <div className={`w-12 h-12 bg-linear-to-br ${module.color} rounded-lg flex items-center justify-center text-white text-xl shrink-0`}>
                  {module.icon}
                </div>

                {/* Module Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-semibold text-gray-900 text-sm">
                      {module.title}
                    </h3>
                    {getStatusBadge(module.status, module.progress)}
                  </div>

                  <div className="flex items-center gap-4 text-xs text-gray-600 mb-3">
                    <div className="flex items-center gap-1">
                      <Play className="w-3 h-3" />
                      {module.lessons} Lessons
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {module.duration}
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="w-3 h-3" />
                      {module.students}
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="mb-3">
                    <div className="flex items-center justify-between text-xs mb-1">
                      <span className="text-gray-600">Progress</span>
                      <span className="font-medium text-gray-900">{module.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className={`bg-linear-to-r ${module.color} h-2 rounded-full transition-all duration-500`}
                        style={{ width: `${module.progress}%` }}
                      />
                    </div>
                  </div>

                  {/* Action Button */}
                  <button className="w-full text-center py-2 text-sm font-medium text-gray-600 hover:text-gray-700 border border-yellow-600 hover:border-gray-700 rounded-lg transition-colors">
                    {module.status === 'completed' ? 'Review Module' : 'Continue Learning'}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Module Progress Summary */}
        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold text-gray-900">Overall Progress</h3>
            <span className="text-sm font-medium text-gray-900">68% Complete</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div className="bg-yellow-600 h-3 rounded-full transition-all duration-500" style={{ width: '68%' }} />
          </div>
          <div className="flex items-center justify-between mt-2 text-sm text-gray-600">
            <span>3 of 4 modules in progress</span>
            <span>1 module completed</span>
          </div>
        </div>
      </div>
    </div>
  );
}