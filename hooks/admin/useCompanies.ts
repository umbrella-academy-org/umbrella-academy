import { useState } from 'react';
import { apiClient } from '@/services/client';
import { API_ENDPOINTS } from '@/services/constants';
import { AdminCompany } from '@/types/admin';

export interface CreateCompanyData {
  name: string;
  description?: string;
  website?: string;
  fields?: string[];
}

interface UseCompaniesReturn {
  isLoading: boolean;
  error: string | null;
  createCompany: (data: CreateCompanyData) => Promise<AdminCompany | null>;
  updateCompany: (id: string, data: Partial<CreateCompanyData & { isActive: boolean }>) => Promise<AdminCompany | null>;
  deleteCompany: (id: string) => Promise<boolean>;
  assignAdmin: (companyId: string, adminId: string) => Promise<AdminCompany | null>;
}

export function useCompanies(): UseCompaniesReturn {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createCompany = async (data: CreateCompanyData): Promise<AdminCompany | null> => {
    try {
      setIsLoading(true);
      const res = await apiClient.post<{ data: AdminCompany }>(API_ENDPOINTS.COMPANIES, data);
      setError(null);
      return res.data ?? null;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create company');
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  const updateCompany = async (id: string, data: Partial<CreateCompanyData & { isActive: boolean }>): Promise<AdminCompany | null> => {
    try {
      setIsLoading(true);
      const res = await apiClient.put<{ data: AdminCompany }>(API_ENDPOINTS.COMPANY_BY_ID(id), data);
      setError(null);
      return res.data ?? null;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update company');
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  const deleteCompany = async (id: string): Promise<boolean> => {
    try {
      setIsLoading(true);
      await apiClient.delete(API_ENDPOINTS.COMPANY_BY_ID(id));
      setError(null);
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete company');
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const assignAdmin = async (companyId: string, adminId: string): Promise<AdminCompany | null> => {
    try {
      setIsLoading(true);
      const res = await apiClient.post<{ data: AdminCompany }>(
        API_ENDPOINTS.COMPANY_ASSIGN_ADMIN(companyId),
        { adminId }
      );
      setError(null);
      return res.data ?? null;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to assign admin');
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, error, createCompany, updateCompany, deleteCompany, assignAdmin };
}
