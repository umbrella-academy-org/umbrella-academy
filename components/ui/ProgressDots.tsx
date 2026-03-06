import React from 'react';

interface ProgressDotsProps {
  currentStep: number;
  totalSteps: number;
  className?: string;
}

export default function ProgressDots({ 
  currentStep, 
  totalSteps, 
  className = 'flex justify-center gap-2 pt-4' 
}: ProgressDotsProps) {
  return (
    <div className={className}>
      {Array.from({ length: totalSteps }, (_, index) => (
        <div
          key={index}
          className={`h-2 rounded-full ${
            index < currentStep 
              ? 'w-8 bg-yellow-600' 
              : 'w-2 bg-gray-300'
          }`}
        />
      ))}
    </div>
  );
}