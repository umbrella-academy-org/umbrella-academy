import { apiClient } from './client';
import { API_ENDPOINTS } from './constants';

export interface Field {
  _id: string;
  name: string;
  slug: string;
  description?: string;
  icon?: string;
  monthlyPrice: number;
  specializations: string[];
  isActive: boolean;
}

class FieldsService {
  async getFields(): Promise<{ success: boolean; data: Field[] }> {
    return apiClient.get<{ success: boolean; data: Field[] }>(API_ENDPOINTS.FIELDS);
  }
}

export const fieldsService = new FieldsService();
