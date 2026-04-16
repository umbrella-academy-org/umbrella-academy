import { StudentBookingRequest } from "@/types";
import { apiClient } from "./client";
import { API_ENDPOINTS } from "./constants";
import { Booking } from "@/types/booking";
import { ApiResponse } from "@/types";

class BookingService {

    async createBooking(data: StudentBookingRequest): Promise<ApiResponse<Booking>> {
        const response = await apiClient.post<Booking>(API_ENDPOINTS.BOOKING, data);
        return response;
    }

}

export const bookingService = new BookingService();