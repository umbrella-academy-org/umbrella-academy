import React from 'react';
import { FormSelectProps, Option } from '@/types';

export default function FormSelect({
  id,
  label,
  value,
  onChange,
  options,
  placeholder = 'Select an option',
  error,
  required = false,
  className = '',
}: FormSelectProps) {
  return (
    <div className={className}>
      <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-2">
        {label}
      </label>
      <select
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-600 focus:border-transparent appearance-none bg-white text-black ${
          error ? 'border-gray-500' : 'border-gray-300'
        }`}
        required={required}
      >
        <option value="">{placeholder}</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && <p className="mt-2 text-sm text-gray-500">{error}</p>}
    </div>
  );
}