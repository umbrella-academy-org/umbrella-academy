"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { Booking, TrainerApprovalRequest } from "@/types/booking";
import { bookingService } from "@/services/booking";
import { useAuth } from "./AuthContext";

interface BookingContextType {
    trainerPendingBookings: Booking[];
    trainerAllBookings: Booking[];
    studentBookings: Booking[];
    loading: boolean;
    error: string | null;
    approveBooking: (bookingId: string, approvalData: TrainerApprovalRequest) => Promise<void>;
    rejectBooking: (bookingId: string, reason: string) => Promise<void>;
    refreshBookings: () => Promise<void>;
}

const BookingContext = createContext<BookingContextType | null>(null);

export const BookingProvider = ({ children }: { children: React.ReactNode }) => {
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [trainerPendingBookings, setTrainerPendingBookings] = useState<Booking[]>([]);
    const [trainerAllBookings, setTrainerAllBookings] = useState<Booking[]>([]);
    const [studentBookings, setStudentBookings] = useState<Booking[]>([]);
    const { user } = useAuth()

    const fetchStudentBookings = async () => {
        try {
            setLoading(true);
            setError(null);
            const response = await bookingService.getStudentBookings();
            if (response.data) {
                setStudentBookings(response.data);
            }
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to fetch student bookings');
        } finally {
            setLoading(false);
        }
    }

    const fetchTrainerBookings = async () => {
        try {
            setLoading(true);
            setError(null);
            const [pendingResponse, allResponse] = await Promise.all([
                bookingService.getTrainerPendingBookings(),
                bookingService.getTrainerAllBookings(),
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
        if (user?.role === 'student') {
            fetchStudentBookings();
        } else if (user?.role === 'trainer') {
            fetchTrainerBookings();
        }
  
    }, [user?._id]);

    const approveBooking = async (bookingId: string, approvalData: TrainerApprovalRequest) => {
        try {
            await bookingService.approveBooking(bookingId, approvalData);
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
            studentBookings,
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