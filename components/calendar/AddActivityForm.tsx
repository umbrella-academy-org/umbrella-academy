'use client';

import { useState } from 'react';
import { Mail } from 'lucide-react';

export default function AddActivityForm() {
  const [formData, setFormData] = useState({
    activityName: '',
    date: '',
    description: '',
    sendReminders: true
  });

  const [charactersLeft, setCharactersLeft] = useState(275);

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const text = e.target.value;
    if (text.length <= 275) {
      setFormData(prev => ({ ...prev, description: text }));
      setCharactersLeft(275 - text.length);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Activity data:', formData);
  };

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Add Activities To Your Dream Calendar</h3>
      <p className="text-sm text-gray-500 mb-6">Check out the new dashboard view. Maybe now, load faster.</p>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Activity Name */}
          <div>
            <label htmlFor="activityName" className="block text-sm font-medium text-gray-700 mb-2">
              Name Of Activity
            </label>
            <input
              type="text"
              id="activityName"
              placeholder="eg. John"
              value={formData.activityName}
              onChange={(e) => setFormData(prev => ({ ...prev, activityName: e.target.value }))}
              className="w-full px-4 py-3 bg-gray-100 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-600 focus:border-transparent focus:bg-white text-gray-900 placeholder:text-gray-500"
            />
          </div>

          {/* Date */}
          <div>
            <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-2">
              Date
            </label>
            <input
              type="text"
              id="date"
              placeholder="eg. Due"
              value={formData.date}
              onChange={(e) => setFormData(prev => ({ ...prev, date: e.target.value }))}
              className="w-full px-4 py-3 bg-gray-100 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-600 focus:border-transparent focus:bg-white text-gray-900 placeholder:text-gray-500"
            />
          </div>
        </div>

        {/* Description */}
        <div>
          <textarea
            placeholder="I'm a Product Designer based in Melbourne, Australia. I specialise in UX/UI design, brand strategy, and Webflow development."
            value={formData.description}
            onChange={handleDescriptionChange}
            rows={4}
            className="w-full px-4 py-3 bg-gray-100 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-600 focus:border-transparent focus:bg-white text-gray-900 placeholder:text-gray-500 resize-none"
          />
          <div className="flex items-center justify-between mt-2">
            <span className="text-sm text-gray-500">{charactersLeft} characters left</span>
          </div>
        </div>

        {/* Email Reminders Toggle */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Mail className="w-5 h-5 text-gray-400" />
            <div>
              <p className="text-sm font-medium text-gray-900">Send Email Reminders</p>
              <p className="text-xs text-gray-500">Receive email notifications for this activity</p>
            </div>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={formData.sendReminders}
              onChange={(e) => setFormData(prev => ({ ...prev, sendReminders: e.target.checked }))}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-yellow-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-yellow-600"></div>
          </label>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="px-6 py-2 bg-yellow-600 text-white rounded-lg font-medium hover:bg-yellow-700 transition-colors"
        >
          Continue
        </button>
      </form>
    </div>
  );
}