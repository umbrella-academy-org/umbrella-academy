"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { Booking } from "@/types/booking";
import { bookingService } from "@/services/booking";

interface BookingContextType {
    trainerPendingBookings: Booking[];
    trainerAllBookings: Booking[];
    loading: boolean;
    error: string | null;
    approveBooking: (bookingId: string) => Promise<void>;
    rejectBooking: (bookingId: string, reason: string) => Promise<void>;
    refreshBookings: () => Promise<void>;
}

const BookingContext = createContext<BookingContextType | null>(null);

export const BookingProvider = ({ children }: { children: React.ReactNode }) => {
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [trainerPendingBookings, setTrainerPendingBookings] = useState<Booking[]>([]);
    const [trainerAllBookings, setTrainerAllBookings] = useState<Booking[]>([]);

    const fetchBookings = async () => {
        try {
            setLoading(true);
            setError(null);
            const [pendingResponse, allResponse] = await Promise.all([
                bookingService.getTrainerPendingBookings(),
                bookingService.getTrainerAllBookings()
            ]);
            
            if (pendingResponse.data) {
                setTrainerPendingBookings(pendingResponse.data);
            }
            if (allResponse.data) {
                setTrainerAllBookings(allResponse.data);
            }
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to fetch bookings');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchBookings();
    }, []);

    const approveBooking = async (bookingId: string) => {
        try {
            await bookingService.approveBooking(bookingId);
            await fetchBookings(); // Refresh bookings
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to approve booking');
            throw err;
        }
    };

    const rejectBooking = async (bookingId: string, reason: string) => {
        try {
            await bookingService.rejectBooking(bookingId, reason);
            await fetchBookings(); // Refresh bookings
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to reject booking');
            throw err;
        }
    };

    const refreshBookings = async () => {
        await fetchBookings();
    };

    return (
        <BookingContext.Provider value={{ 
            trainerPendingBookings,
            trainerAllBookings,
            loading,
            error,
            approveBooking,
            rejectBooking,
            refreshBookings
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