import { bookingService } from "@/services/booking";
import { StudentBookingRequest } from "@/types";
import { useState } from "react";

export function useBooking() {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    
    const createBooking = async (data: StudentBookingRequest) => {
        setIsLoading(true);
        setError(null);
        try {
            await bookingService.createBooking(data);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Booking creation failed');
        } finally {
            setIsLoading(false);
        }
    };
    
    return {
        isLoading,
        error,
        createBooking
    };
}