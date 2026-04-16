import { BookingStatus, StudentBookingRequest } from "@/types";
import { apiClient } from "./client";
import { API_ENDPOINTS } from "./constants";
import { Booking } from "@/types/booking";
import { ApiResponse } from "@/types";

class BookingService {

    async createBooking(data: StudentBookingRequest): Promise<ApiResponse<Booking>> {
        const response = await apiClient.post<Booking>(API_ENDPOINTS.BOOKING, data);
        return response;
    }

    async getTrainerPendingBookings(): Promise<ApiResponse<Booking[]>> {
        const response = await apiClient.get<Booking[]>(API_ENDPOINTS.BOOKING_TRAINER, { status: BookingStatus.PENDING });
        return response;
    }

    async approveBooking(bookingId: string): Promise<ApiResponse<Booking>> {
        const response = await apiClient.post<Booking>(API_ENDPOINTS.BOOKING_APPROVE(bookingId));
        return response;
    }

    async rejectBooking(bookingId: string, reason: string): Promise<ApiResponse<Booking>> {
        const response = await apiClient.post<Booking>(API_ENDPOINTS.BOOKING_REJECT(bookingId), { rejectionReason: reason });
        return response;
    }

    async getTrainerAllBookings(): Promise<ApiResponse<Booking[]>> {
        const response = await apiClient.get<Booking[]>(API_ENDPOINTS.BOOKING_TRAINER);
        return response;
    }

}

export const bookingService = new BookingService();