import { Payment } from '@/types';

// Mock payment data
export const mockPayments: Payment[] = [
    {
        id: 'payment_001',
        studentId: 'user_001',
        amount: 50000, // RWF
        currency: 'RWF',
        paymentMethod: 'momo',
        momoTransactionId: 'momo_tx_001',
        status: 'completed',
        revenueDistribution: {
            academyShare: 12500, // 25%
            processingFee: 5000, // 10%
            transactionId: 'payment_001'
        },
        createdAt: new Date('2024-12-01T10:00:00Z'),
        processedAt: new Date('2024-12-01T10:05:00Z')
    },
    {
        id: 'payment_002',
        studentId: 'user_003',
        amount: 75000, // RWF
        currency: 'RWF',
        paymentMethod: 'momo',
        momoTransactionId: 'momo_tx_002',
        status: 'completed',
        revenueDistribution: {
            academyShare: 18750, // 25%
            processingFee: 7500, // 10%
            transactionId: 'payment_002'
        },
        createdAt: new Date('2024-12-05T14:30:00Z'),
        processedAt: new Date('2024-12-05T14:35:00Z')
    }
];

export const getPaymentById = (id: string) => mockPayments.find(p => p.id === id);
export const getPaymentsByStudent = (studentId: string) => mockPayments.filter(p => p.studentId === studentId);
