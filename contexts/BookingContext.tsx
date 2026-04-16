"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { Booking } from "@/types/booking";
import { bookingService } from "@/services/booking";

interface BookingContextType {
    trainerPendingBookings: Booking[];
    loading: boolean;
    error: string | null;
}

const BookingContext = createContext<BookingContextType | null>(null);

export const BookingProvider = ({ children }: { children: React.ReactNode }) => {
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [trainerPendingBookings, setTrainerPendingBookings] = useState<Booking[]>([]);

    useEffect(() => {
        const fetchTrainerPendingBookings = async () => {
            try {
                setLoading(true);
                const response = await bookingService.getTrainerPendingBookings();
                if (response.data) {
                    setTrainerPendingBookings(response.data);
                }
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Failed to fetch trainer pending bookings');
            } finally {
                setLoading(false);
            }
        };
        fetchTrainerPendingBookings();
    }, []);


    return (
        <BookingContext.Provider value={{ 
            trainerPendingBookings,
            loading,
            error
         }}>
            {children}
        </BookingContext.Provider>
    );
};

export const useBooking = () => {
    const context = useContext(BookingContext);
    if (!context) {
        throw new Error('useBooking must be used within a BookingProvider');
    }
    return context;
};