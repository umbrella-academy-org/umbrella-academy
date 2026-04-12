'use client';

import { AdminProvider } from '@/contexts';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AdminProvider>{children}</AdminProvider>;
}
