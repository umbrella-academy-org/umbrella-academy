'use client';

import { Star, Users, Clock, BookOpen } from 'lucide-react';

interface FeaturedCourseProps {
  selectedCourse: string;
  onCourseSelect: (courseId: string) => void;
}

export default function FeaturedCourse({ selectedCourse, onCourseSelect }: FeaturedCourseProps) {
  const course = {
    id: 'programming-development',
    title: 'Programming & Development',
    subtitle: 'Learn to build software, websites, and apps',
    description: 'This course introduces students to software development through practical coding, planning, building, and real-world application. Students will learn to create software applications, websites, and mobile apps.',
    rating: 4.8,
    reviews: 127,
    students: 36364,
    lessons: 2,
    instructor: {
      name: 'Olivia Whitman',
      title: 'Senior UX Designer & Instructor',
      avatar: '/api/placeholder/40/40'
    },
    image: '/api/placeholder/300/200',
    tags: ['Programming', 'Web Development', 'Software Engineering']
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Course Image */}
        <div className="lg:w-80 flex-shrink-0">
          <div className="relative h-48 lg:h-full bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg overflow-hidden">
            <div className="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center">
              <div className="text-center text-white">
                <BookOpen className="w-16 h-16 mx-auto mb-4" />
                <div className="text-lg font-semibold">Programming</div>
                <div className="text-sm opacity-90">& Development</div>
              </div>
            </div>
          </div>
        </div>

        {/* Course Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h2 className="text-xl lg:text-2xl font-semibold text-gray-900 mb-2">
                {course.title}
              </h2>
              <p className="text-gray-600 mb-3">{course.subtitle}</p>
              <p className="text-sm text-gray-600 leading-relaxed mb-4">
                {course.description}
              </p>
            </div>
            
            <div className="flex items-center gap-2 ml-4">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    className={`w-4 h-4 ${i < 4 ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
                  />
                ))}
              </div>
              <span className="text-sm font-medium text-gray-900">{course.rating}</span>
              <span className="text-sm text-gray-500">({course.reviews})</span>
            </div>
          </div>

          {/* Course Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5 text-gray-400" />
              <div>
                <div className="text-sm font-medium text-gray-900">{course.students.toLocaleString()}</div>
                <div className="text-xs text-gray-600">Students</div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-gray-400" />
              <div>
                <div className="text-sm font-medium text-gray-900">{course.lessons}</div>
                <div className="text-xs text-gray-600">Lessons</div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-gray-400" />
              <div>
                <div className="text-sm font-medium text-gray-900">12 Weeks</div>
                <div className="text-xs text-gray-600">Duration</div>
              </div>
            </div>
          </div>

          {/* Instructor Info */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-orange-400 rounded-full flex items-center justify-center">
                <span className="text-sm font-medium text-white">OW</span>
              </div>
              <div>
                <div className="font-medium text-gray-900">{course.instructor.name}</div>
                <div className="text-sm text-gray-600">{course.instructor.title}</div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                Details
              </button>
              <button className="px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors">
                Enroll
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}