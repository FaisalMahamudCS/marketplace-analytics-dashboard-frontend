import { io, Socket } from 'socket.io-client';

class SocketService {
  private socket: Socket | null = null;
  private url: string;

  constructor(url: string = 'http://localhost:3000') {
    this.url = url;
  }

  connect(): Socket {
    if (!this.socket) {
      this.socket = io(this.url, {
        transports: ['websocket', 'polling'],
        timeout: 20000,
        forceNew: true,
      });

      this.socket.on('connect', () => {
        console.log('Connected to WebSocket server');
      });

      this.socket.on('disconnect', () => {
        console.log('Disconnected from WebSocket server');
      });

      this.socket.on('connect_error', (error) => {
        console.error('WebSocket connection error:', error);
      });
    }

    return this.socket;
  }

  disconnect(): void {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
    }
  }

  getSocket(): Socket | null {
    return this.socket;
  }

  isConnected(): boolean {
    return this.socket?.connected || false;
  }
}

export const socketService = new SocketService();
export default socketService;
