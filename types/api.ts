/**
 * Generic API response wrapper.
 */
export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  message: string;
}

/**
 * API response for paginated data.
 */
export interface PaginatedResponse<T> {
  success: boolean,
  data: T,
  message: string,
  pageNumber: number,
  pageSize: number,
  totalElements: number,
  totalPages: number,
  first: boolean,
  last: boolean
}

/**
 * Generic socket response wrapper.
 */
export interface SocketResponse<T> {
  success: boolean;
  data?: T;
  message: string;
}


export interface Negotiation {
  id: string;
  orderId: string;
  status: 'pending' | 'accepted' | 'rejected' | 'countered';
  proposedPrice?: number;
  agreedPrice?: number;
  createdAt: string;
  updatedAt: string;
}

export interface SetAgreedPriceRequest {
  agreedPrice: number;
}

export interface Message {
  id: string;
  senderId: string;
  content: string;
  createdAt: string;
}
