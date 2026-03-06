import React from 'react';
import { FormInputProps } from '@/types';

export default function FormInput({
  id,
  label,
  type = 'text',
  value,
  onChange,
  placeholder,
  error,
  required = false,
  className = '',
}: FormInputProps) {
  return (
    <div className={className}>
      <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-2">
        {label}
      </label>
      <input
        type={type}
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-600 focus:border-transparent text-amber-900 placeholder:text-gray-400 ${
          error ? 'border-gray-500' : 'border-gray-300'
        }`}
        required={required}
      />
      {error && <p className="mt-2 text-sm text-gray-500">{error}</p>}
    </div>
  );
}