'use client';

import { useState } from 'react';
import { Building2, Users, DollarSign } from 'lucide-react';
import DataTable from '@/components/ui/DataTable';

interface Wing {
  id: number;
  name: string;
  code: string;
  admin: string;
  students: number;
  trainers: number;
  revenue: number;
  status: string;
}

interface WingsTableProps {
  wings: Wing[];
}

export default function WingsTable({ wings }: WingsTableProps) {
  const [selectedWings, setSelectedWings] = useState<any[]>([]);

  // Transform data for DataTable
  const tableData = wings.map(wing => ({
    id: wing.id,
    wing: (
      <div className="flex items-center">
        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-3">
          <Building2 className="w-5 h-5 text-blue-600" />
        </div>
        <div>
          <div className="text-sm font-medium text-gray-900">{wing.name}</div>
          <div className="text-sm text-gray-500">{wing.code}</div>
        </div>
      </div>
    ),
    administrator: wing.admin,
    students: (
      <div className="flex items-center gap-2">
        <Users className="w-4 h-4 text-gray-400" />
        <span className="text-sm text-gray-900">{wing.students}</span>
      </div>
    ),
    trainers: (
      <div className="flex items-center gap-2">
        <Users className="w-4 h-4 text-gray-400" />
        <span className="text-sm text-gray-900">{wing.trainers}</span>
  