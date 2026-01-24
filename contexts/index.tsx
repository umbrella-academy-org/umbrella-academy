// Centralized context exports for Umbrella Academy LMS

export { AuthProvider, useAuth } from './AuthContext';
export { UserProvider, useUsers } from './UserContext';
export { CourseProvider, useCourses } from './CourseContext';
export { FinancialProvider, useFinancial } from './FinancialContext';
export { SystemProvider, useSystem } from './SystemContext';

// Combined provider component for easy setup
import React from 'react';
import { AuthProvider } from './AuthContext';
import { UserProvider } from './UserContext';
import { CourseProvider } from './CourseContext';
import { FinancialProvider } from './FinancialContext';
import { SystemProvider } from './SystemContext';

interface AppProvidersProps {
  children: React.ReactNode;
}

export function AppProviders({ children }: AppProvidersProps) {
  return (
    <AuthProvider>
      <UserProvider>
        <CourseProvider>
          <FinancialProvider>
            <SystemProvider>
              {children}
            </SystemProvider>
          </FinancialProvider>
        </CourseProvider>
      </UserProvider>
    </AuthProvider>
  );
}