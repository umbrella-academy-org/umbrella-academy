// Field management service - Data access layer for field operations

import { Field, Company, User } from '@/types';
import {
    mockFields,
    mockCompanies,
    getFieldById,
    getActiveFields,
    getCompaniesByField,
    getCompanyById,
    createField,
    updateField,
    deleteField
} from '@/data/fields';
import {
    getUsersByField,
    getStudentsByField,
    getTrainersByField,
    getMentorsByField,
    assignUserToField,
    validateFieldAccess
} from '@/data/users';

export class FieldService {
    /**
     * Get all fields with populated user data
     */
    static async getAllFields(): Promise<Field[]> {
        return mockFields.map(field => ({
            ...field,
            students: getStudentsByField(field.id),
            trainers: getTrainersByField(field.id),
            mentors: getMentorsByField(field.id)
        }));
    }

    /**
     * Get active fields only
     */
    static async getActiveFields(): Promise<Field[]> {
        const activeFields = getActiveFields();
        return activeFields.map(field => ({
            ...field,
            students: getStudentsByField(field.id),
            trainers: getTrainersByField(field.id),
            mentors: getMentorsByField(field.id)
        }));
    }

    /**
     * Get field by ID with populated user data
     */
    static async getFieldById(id: string): Promise<Field | null> {
        const field = getFieldById(id);
        if (!field) return null;

        return {
            ...field,
            students: getStudentsByField(field.id),
            trainers: getTrainersByField(field.id),
            mentors: getMentorsByField(field.id)
        };
    }

    /**
     * Get companies by field ID
     */
    static async getCompaniesByField(fieldId: string): Promise<Company[]> {
        return getCompaniesByField(fieldId);
    }

    /**
     * Get company by ID
     */
    static async getCompanyById(id: string): Promise<Company | null> {
        return getCompanyById(id) || null;
    }

    /**
     * Create a new field
     */
    static async createField(fieldData: Omit<Field, 'id' | 'createdAt' | 'students' | 'trainers' | 'mentors'>): Promise<Field> {
        const newField = createField({
            ...fieldData,
            students: [],
            trainers: [],
            mentors: []
        });
        return newField;
    }

    /**
     * Update field information
     */
    static async updateField(id: string, updates: Partial<Field>): Promise<Field | null> {
        return updateField(id, updates);
    }

    /**
     * Delete field (soft delete by setting isActive to false)
     */
    static async deleteField(id: string): Promise<boolean> {
        const field = getFieldById(id);
        if (!field) return false;

        return updateField(id, { isActive: false }) !== null;
    }

    /**
     * Assign user to field
     */
    static async assignUserToField(userId: string, fieldId: string): Promise<boolean> {
        // Validate field exists
        const field = getFieldById(fieldId);
        if (!field || !field.isActive) return false;

        return assignUserToField(userId, fieldId);
    }

    /**
     * Validate user has access to field resources
     */
    static async validateFieldAccess(userId: string, resourceFieldId: string): Promise<boolean> {
        return validateFieldAccess(userId, resourceFieldId);
    }

    /**
     * Get field statistics
     */
    static async getFieldStatistics(fieldId: string): Promise<{
        totalStudents: number;
        totalTrainers: number;
        totalMentors: number;
        totalRevenue: number;
        activeCompanies: number;
    } | null> {
        const field = await this.getFieldById(fieldId);
        if (!field) return null;

        return {
            totalStudents: field.students.length,
            totalTrainers: field.trainers.length,
            totalMentors: field.mentors.length,
            totalRevenue: field.totalRevenue,
            activeCompanies: field.companies.filter(c => c.isActive).length
        };
    }

    /**
     * Get all fields with basic info for selection UI
     */
    static async getFieldsForSelection(): Promise<Array<{
        id: string;
        name: string;
        description: string;
        industry: string;
        companiesCount: number;
        isActive: boolean;
    }>> {
        const fields = getActiveFields();
        return fields.map(field => ({
            id: field.id,
            name: field.name,
            description: field.description,
            industry: field.industry,
            companiesCount: field.companies.length,
            isActive: field.isActive
        }));
    }
}
