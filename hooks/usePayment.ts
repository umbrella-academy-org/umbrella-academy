import { paymentService } from "@/services";
import { useState } from "react";

export function usePayment() {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const payOriantaionPayment = async (promocode?: string) => {
        setIsLoading(true);
        setError(null);
        try {
            await paymentService.payOriantaionPayment({ promocode });
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Payment processing failed');
        } finally {
            setIsLoading(false);
        }
    };

    const paySubscriptionPayment = async (promocode?: string) => {
        setIsLoading(true);
        setError(null);
        try {
            await paymentService.paySubscriptionPayment({ promocode });
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Payment processing failed');
        } finally {
            setIsLoading(false);
        }
    };


    return {
        isLoading,
        error,
        payOriantaionPayment,
        paySubscriptionPayment,
    }
}