import { useAuth } from "@/contexts";
import { paymentService } from "@/services";
import { useState } from "react";

export function usePayment() {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const {fetchOnboardingChecklist}=useAuth()

    const payOriantaionPayment = async (promocode?: string) => {
        setIsLoading(true);
        setError(null);
        try {
            await paymentService.payOriantaionPayment({ promocode });
            await fetchOnboardingChecklist();
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
            await fetchOnboardingChecklist();
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