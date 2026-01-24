// Centralized context exports for Umbrella Academy LMS

export { AuthProvider, useAuth } from './AuthContext';
export { UserProvider, useUsers } from './UserContext';
export { RoadmapProvider, useRoadmaps } from './RoadmapContext';
export { FinancialProvider, useFinancial } from './FinancialContext';
export { SystemProvider, useSystem } from './SystemContext';

// Combined provider component for easy setup
import React from 'react';
import { AuthProvider } from './AuthContext';
import { UserProvider } from './UserContext';
import { RoadmapProvider } from './RoadmapContext';
import { FinancialProvider } from './FinancialContext';
import { SystemProvider } from './SystemContext';

interface AppProvidersProps {
  children: React.ReactNode;
}

export function AppProviders({ children }: AppProvidersProps) {
  return (
    <AuthProvider>
      <UserProvider>
        <RoadmapProvider>
          <FinancialProvider>
            <SystemProvider>
              {children}
            </SystemProvider>
          </FinancialProvider>
        </RoadmapProvider>
      </UserProvider>
    </AuthProvider>
  );
}