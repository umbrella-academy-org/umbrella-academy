// Centralized context exports for Umbrella Academy LMS

export { AuthProvider, useAuth } from './AuthContext';
export { AdminProvider, useAdminContext } from './AdminContext';
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
import { ThemeProvider } from '@/components/providers/ThemeProvider';
import { BookingProvider } from './BookingContext';

interface AppProvidersProps {
  children: React.ReactNode;
}

export function AppProviders({ children }: AppProvidersProps) {
  return (
    <ThemeProvider defaultMode="system" enableSystem={true}>
      <AuthProvider>
        <UserProvider>
          <BookingProvider>
          <RoadmapProvider>
            <FinancialProvider>
              <SystemProvider>
                {children}
              </SystemProvider>
            </FinancialProvider>
          </RoadmapProvider>
          </BookingProvider>
        </UserProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}