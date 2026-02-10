import { Payment } from '@/types';

// Mock payment data
export const mockPayments: Payment[] = [
    {
        id: 'payment_001',
        studentId: 'user_001',
        fieldId: 'tech-companies',
        amount: 50000, // RWF
        currency: 'RWF',
        paymentMethod: 'momo',
        momoTransactionId: 'momo_tx_001',
        status: 'completed',
        revenueDistribution: {
            fieldShare: 32500, // 65%
            academyShare: 12500, // 25%
            processingFee: 5000, // 10%
            fieldId: 'tech-companies',
            transactionId: 'payment_001'
        },
        createdAt: new Date('2024-12-01T10:00:00Z'),
        processedAt: new Date('2024-12-01T10:05:00Z')
    },
    {
        id: 'payment_002',
        studentId: 'user_003',
        fieldId: 'business-companies',
        amount: 75000, // RWF
        currency: 'RWF',
        paymentMethod: 'momo',
        momoTransactionId: 'momo_tx_002',
        status: 'completed',
        revenueDistribution: {
            fieldShare: 48750, // 65%
            academyShare: 18750, // 25%
            processingFee: 7500, // 10%
            fieldId: 'business-companies',
            transactionId: 'payment_002'
        },
        createdAt: new Date('2024-12-05T14:30:00Z'),
        processedAt: new Date('2024-12-05T14:35:00Z')
    }
];

export const getPaymentById = (id: string) => mockPayments.find(p => p.id === id);
export const getPaymentsByStudent = (studentId: string) => mockPayments.filter(p => p.studentId === studentId);
export const getPaymentsByField = (fieldId: string) => mockPayments.filter(p => p.fieldId === fieldId);
