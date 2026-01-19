'use client';

import { Code, CheckCircle, ArrowRight } from 'lucide-react';

export default function RoadmapPhases() {
  const phases = [
    {
      id: 1,
      title: 'Web Dev with JavaScript',
      lessons: '12 Lessons',
      status: 'completed',
      color: 'bg-green-100 border-green-200',
      iconColor: 'text-green-600',
      progressColor: 'bg-green-500'
    },
    {
      id: 2,
      title: 'Software Development',
      lessons: '13 Lessons',
      status: 'in-progress',
      color: 'bg-blue-100 border-blue-200',
      iconColor: 'text-blue-600',
      progressColor: 'bg-blue-500'
    },
    {
      id: 3,
      title: 'Software Development',
      lessons: '12 Lessons',
      status: 'pending',
      color: 'bg-orange-100 border-orange-200',
      iconColor: 'text-orange-600',
      progressColor: 'bg-orange-500'
    },
    {
      id: 4,
      title: 'Software Development',
      lessons: '13 Lessons',
      status: 'pending',
      color: 'bg-orange-100 border-orange-200',
      iconColor: 'text-orange-600',
      progressColor: 'bg-orange-500'
    }
  ];

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Roadmap Phases</h3>
        <p className="text-sm text-gray-500">Select a phase to view its key sessions to attend in the right panel</p>
      </div>

      <div className="space-y-4">
        {phases.map((phase, index) => (
          <div key={phase.id} className="relative">
            <div className={`border-2 rounded-xl p-4 transition-all hover:shadow-md cursor-pointer ${phase.color}`}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center">
                    {phase.status === 'completed' ? (
                      <CheckCircle className={`w-6 h-6 ${phase.iconColor}`} />
                    ) : (
                      <Code className={`w-6 h-6 ${phase.iconColor}`} />
                    )}
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">{phase.title}</h4>
                    <p className="text-sm text-gray-600">{phase.lessons}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  {phase.status === 'completed' && (
                    <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                      <CheckCircle className="w-5 h-5 text-white" />
                    </div>
                  )}
                  {phase.status === 'in-progress' && (
                    <div className="w-16 h-2 bg-gray-200 rounded-full">
                      <div className={`w-3/4 h-2 ${phase.progressColor} rounded-full`}></div>
                    </div>
                  )}
                  <ArrowRight className="w-5 h-5 text-gray-400" />
                </div>
              </div>
            </div>
            
            {/* Connector line */}
            {index < phases.length - 1 && (
              <div className="absolute left-6 top-full w-0.5 h-4 bg-gray-200"></div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}