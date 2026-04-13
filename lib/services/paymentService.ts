// Payment service - Data access layer for MoMo payments and revenue distribution

import { Payment, RevenueDistribution, MoMoPaymentData } from '@/types';
import { mockPayments } from '@/data/payments';

export class PaymentService {
  /**
   * Process MoMo payment with automatic revenue distribution
   */
  static async processMoMoPayment(
    studentId: string,
    amount: number,
    momoDetails: MoMoPaymentData
  ): Promise<Payment | null> {
    try {
      const momoTransactionId = await this.callMoMoAPI(momoDetails);

      if (!momoTransactionId) {
        return null;
      }

      const revenueDistribution = this.calculateRevenueDistribution(amount);

      const payment: Payment = {
        id: `payment_${Date.now()}`,
        studentId,
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
   * Calculate revenue distribution (25% academy, 10% processing)
   */
  private static calculateRevenueDistribution(amount: number): RevenueDistribution {
    const academyShare = Math.round(amount * 0.25);
    const processingFee = Math.round(amount * 0.10);

    return {
      academyShare,
      processingFee,
      transactionId: `payment_${Date.now()}`
    };
  }

  /**
   * Simulate MoMo API call
   */
  private static async callMoMoAPI(momoDetails: MoMoPaymentData): Promise<string | null> {
    await new Promise(resolve => setTimeout(resolve, 2000));
    if (Math.random() > 0.1) {
      return `momo_tx_${Date.now()}`;
    }
    return null;
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
   * Get overall payment statistics
   */
  static async getOverallPaymentStatistics(): Promise<{
    totalRevenue: number;
    totalAcademyRevenue: number;
    totalProcessingFees: number;
  }> {
    const completedPayments = mockPayments.filter(p => p.status === 'completed');

    const totalRevenue = completedPayments.reduce((sum, p) => sum + p.amount, 0);
    const totalAcademyRevenue = completedPayments.reduce((sum, p) => sum + p.revenueDistribution.academyShare, 0);
    const totalProcessingFees = completedPayments.reduce((sum, p) => sum + p.revenueDistribution.processingFee, 0);

    return {
      totalRevenue,
      totalAcademyRevenue,
      totalProcessingFees,
    };
  }

  /**
   * Refund a payment
   */
  static async refundPayment(paymentId: string): Promise<Payment | null> {
    const paymentIndex = mockPayments.findIndex(p => p.id === paymentId);
    if (paymentIndex === -1) return null;

    const payment = mockPayments[paymentIndex];
    if (payment.status !== 'completed') return null;

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

    const phoneRegex = /^(\+250|250)?[0-9]{9}$/;
    if (!phoneRegex.test(momoDetails.phoneNumber)) {
      errors.push('Invalid phone number format');
    }

    if (momoDetails.amount <= 0) {
      errors.push('Amount must be greater than 0');
    }

    if (momoDetails.amount < 1000) {
      errors.push('Minimum payment amount is 1000 RWF');
    }

    if (momoDetails.currency !== 'RWF') {
      errors.push('Only RWF currency is supported');
    }

    return {
      isValid: errors.length === 0,
      errors
    };
  }

  /**
   * Get payment history
   */
  static async getPaymentHistory(
    startDate?: Date,
    endDate?: Date
  ): Promise<Payment[]> {
    let payments = mockPayments;

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
