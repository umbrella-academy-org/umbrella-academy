'use client';

export default function CurrentLessons() {
  const lessons = [
    {
      id: 1,
      title: 'Web Dev With JavaScript',
      description: 'Manage your mentorship sessions, deadlines, and learning activities in one place',
      subject: 'Javascript',
      status: 'Pending',
      statusColor: 'bg-purple-100 text-purple-700'
    },
    {
      id: 2,
      title: 'Javascript',
      description: '',
      subject: 'Javascript',
      status: 'Pending',
      statusColor: 'bg-purple-100 text-purple-700'
    },
    {
      id: 3,
      title: 'Javascript',
      description: '',
      subject: 'Javascript', 
      status: 'Pending',
      statusColor: 'bg-purple-100 text-purple-700'
    }
  ];

  return (
    <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
      <div className="mb-4">
        <h3 className="text-base font-semibold text-gray-900">Web Dev With JavaScript</h3>
        <p className="text-sm text-gray-500">Manage your mentorship sessions, deadlines, and learning activities in one place</p>
      </div>

      <div className="space-y-3">
        {lessons.map((lesson) => (
          <div key={lesson.id} className="border border-gray-200 rounded-lg p-3">
            <div className="flex items-start justify-between mb-2">
              <div className="flex-1">
                <h4 className="text-sm font-medium text-gray-900 mb-1">{lesson.title}</h4>
                {lesson.description && (
                  <p className="text-xs text-gray-600 mb-2">{lesson.description}</p>
                )}
                <div className="flex items-center gap-2">
                  <span className="text-xs text-gray-500">{lesson.subject}</span>
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${lesson.statusColor}`}>
                    ● {lesson.status}
                  </span>
                </div>
              </div>
            </div>
            <button className="text-xs text-yellow-600 hover:text-yellow-700 font-medium">
              View Lesson
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}