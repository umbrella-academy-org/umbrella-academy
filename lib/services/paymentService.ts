// Payment service - Data access layer for MoMo payments and revenue distribution

import { Payment, RevenueDistribution, MoMoPaymentData } from '@/types';

// Mock payment data
const mockPayments: Payment[] = [
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

export class PaymentService {
  /**
   * Process MoMo payment with automatic revenue distribution
   */
  static async processMoMoPayment(
    studentId: string,
    fieldId: string,
    amount: number,
    momoDetails: MoMoPaymentData
  ): Promise<Payment | null> {
    try {
      // Simulate MoMo API call
      const momoTransactionId = await this.callMoMoAPI(momoDetails);

      if (!momoTransactionId) {
        return null; // Payment failed
      }

      // Calculate revenue distribution
      const revenueDistribution = this.calculateRevenueDistribution(amount, fieldId);

      // Create payment record
      const payment: Payment = {
        id: `payment_${Date.now()}`,
        studentId,
        fieldId,
        amount,
        currency: 'RWF',
        paymentMethod: 'momo',
        momoTransactionId,
        status: 'completed',
        revenueDistribution,
        createdAt: new Date(),
        processedAt: new Date()
      };

      mockPayments.push(payment);
      return payment;
    } catch (error) {
      console.error('Payment processing failed:', error);
      return null;
    }
  }

  /**
   * Calculate revenue distribution (65% field, 25% academy, 10% processing)
   */
  private static calculateRevenueDistribution(amount: number, fieldId: string): RevenueDistribution {
    const fieldShare = Math.round(amount * 0.65);
    const academyShare = Math.round(amount * 0.25);
    const processingFee = amount - fieldShare - academyShare; // Remaining amount

    return {
      fieldShare,
      academyShare,
      processingFee,
      fieldId,
      transactionId: `payment_${Date.now()}`
    };
  }

  /**
   * Simulate MoMo API call
   */
  private static async callMoMoAPI(momoDetails: MoMoPaymentData): Promise<string | null> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Simulate success/failure (90% success rate)
    if (Math.random() > 0.1) {
      return `momo_tx_${Date.now()}`;
    }

    return null; // Payment failed
  }

  /**
   * Get payment by ID
   */
  static async getPaymentById(id: string): Promise<Payment | null> {
    return mockPayments.find(payment => payment.id === id) || null;
  }

  /**
   * Get payments by student ID
   */
  static async getPaymentsByStudent(studentId: string): Promise<Payment[]> {
    return mockPayments.filter(payment => payment.studentId === studentId);
  }

  /**
   * Get payments by field ID
   */
  static async getPaymentsByField(fieldId: string): Promise<Payment[]> {
    return mockPayments.filter(payment => payment.fieldId === fieldId);
  }

  /**
   * Get payment statistics for a field
   */
  static async getFieldPaymentStatistics(fieldId: string): Promise<{
    totalPayments: number;
    totalRevenue: number;
    fieldRevenue: number;
    academyRevenue: number;
    processingFees: number;
    averagePayment: number;
    completedPayments: number;
    failedPayments: number;
  }> {
    const payments = mockPayments.filter(payment => payment.fieldId === fieldId);
    const completedPayments = payments.filter(p => p.status === 'completed');

    const totalRevenue = completedPayments.reduce((sum, p) => sum + p.amount, 0);
    const fieldRevenue = completedPayments.reduce((sum, p) => sum + p.revenueDistribution.fieldShare, 0);
    const academyRevenue = completedPayments.reduce((sum, p) => sum + p.revenueDistribution.academyShare, 0);
    const processingFees = completedPayments.reduce((sum, p) => sum + p.revenueDistribution.processingFee, 0);

    return {
      totalPayments: payments.length,
      totalRevenue,
      fieldRevenue,
      academyRevenue,
      processingFees,
      averagePayment: completedPayments.length > 0 ? totalRevenue / completedPayments.length : 0,
      completedPayments: completedPayments.length,
      failedPayments: payments.filter(p => p.status === 'failed').length
    };
  }

  /**
   * Get overall payment statistics for Umbrella Academy
   */
  static async getOverallPaymentStatistics(): Promise<{
    totalRevenue: number;
    totalAcademyRevenue: number;
    totalFieldRevenue: number;
    totalProcessingFees: number;
    paymentsByField: Record<string, number>;
  }> {
    const completedPayments = mockPayments.filter(p => p.status === 'completed');

    const totalRevenue = completedPayments.reduce((sum, p) => sum + p.amount, 0);
    const totalAcademyRevenue = completedPayments.reduce((sum, p) => sum + p.revenueDistribution.academyShare, 0);
    const totalFieldRevenue = completedPayments.reduce((sum, p) => sum + p.revenueDistribution.fieldShare, 0);
    const totalProcessingFees = completedPayments.reduce((sum, p) => sum + p.revenueDistribution.processingFee, 0);

    // Group payments by field
    const paymentsByField: Record<string, number> = {};
    completedPayments.forEach(payment => {
      paymentsByField[payment.fieldId] = (paymentsByField[payment.fieldId] || 0) + payment.amount;
    });

    return {
      totalRevenue,
      totalAcademyRevenue,
      totalFieldRevenue,
      totalProcessingFees,
      paymentsByField
    };
  }

  /**
   * Refund a payment
   */
  static async refundPayment(paymentId: string, reason?: string): Promise<Payment | null> {
    const paymentIndex = mockPayments.findIndex(p => p.id === paymentId);
    if (paymentIndex === -1) return null;

    const payment = mockPayments[paymentIndex];
    if (payment.status !== 'completed') return null;

    // Update payment status
    mockPayments[paymentIndex] = {
      ...payment,
      status: 'refunded'
    };

    return mockPayments[paymentIndex];
  }

  /**
   * Validate MoMo payment details
   */
  static validateMoMoDetails(momoDetails: MoMoPaymentData): {
    isValid: boolean;
    errors: string[];
  } {
    const errors: string[] = [];

    // Validate phone number (Rwanda format)
    const phoneRegex = /^(\+250|250)?[0-9]{9}$/;
    if (!phoneRegex.test(momoDetails.phoneNumber)) {
      errors.push('Invalid phone number format');
    }

    // Validate amount
    if (momoDetails.amount <= 0) {
      errors.push('Amount must be greater than 0');
    }

    if (momoDetails.amount < 1000) { // Minimum 1000 RWF
      errors.push('Minimum payment amount is 1000 RWF');
    }

    // Validate currency
    if (momoDetails.currency !== 'RWF') {
      errors.push('Only RWF currency is supported');
    }

    return {
      isValid: errors.length === 0,
      errors
    };
  }

  /**
   * Get payment history for a field range
   */
  static async getPaymentHistory(
    fieldId?: string,
    startDate?: Date,
    endDate?: Date
  ): Promise<Payment[]> {
    let payments = mockPayments;

    // Filter by field if specified
    if (fieldId) {
      payments = payments.filter(p => p.fieldId === fieldId);
    }

    // Filter by date range if specified
    if (startDate || endDate) {
      payments = payments.filter(payment => {
        const paymentDate = payment.createdAt;
        if (startDate && paymentDate < startDate) return false;
        if (endDate && paymentDate > endDate) return false;
        return true;
      });
    }

    return payments.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  }
}