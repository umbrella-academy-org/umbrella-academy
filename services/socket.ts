import { io, Socket } from 'socket.io-client';
import { BASE_URL, SOCKET_EVENTS } from './constants';

type MessageCallback = (data: { message: Record<string, unknown> }) => void;
type NotificationCallback = (data: { notification: Record<string, unknown> }) => void;

let socket: Socket | null = null;

const socketService = {
  connect(): void {
    if (socket?.connected) return;
    const token = localStorage.getItem('auth_token');
    socket = io(BASE_URL, {
      auth: { token },
      transports: ['websocket'],
    });
  },

  disconnect(): void {
    socket?.disconnect();
    socket = null;
  },

  sendMessage(recipientId: string, text: string): void {
    socket?.emit(SOCKET_EVENTS.SEND_MESSAGE, { recipientId, text });
  },

  onMessage(cb: MessageCallback): void {
    socket?.on(SOCKET_EVENTS.MESSAGE_RECEIVED, cb);
  },

  onNotification(cb: NotificationCallback): void {
    socket?.on(SOCKET_EVENTS.NEW_NOTIFICATION, cb);
  },

  removeMessageListener(cb: MessageCallback): void {
    socket?.off(SOCKET_EVENTS.MESSAGE_RECEIVED, cb);
  },

  removeNotificationListener(cb: NotificationCallback): void {
    socket?.off(SOCKET_EVENTS.NEW_NOTIFICATION, cb);
  },

  isConnected(): boolean {
    return socket?.connected ?? false;
  },
};

export default socketService;
