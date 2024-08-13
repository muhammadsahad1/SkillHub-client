// src/services/SocketService.ts
import { io, Socket } from "socket.io-client";

class SocketService {
  private socket: Socket;

  constructor(serverUrl: string) {
    this.socket = io(serverUrl);
  }

  public on(event: string, callback: (data: any) => void) {
    this.socket.on(event, callback);
  }

  public off(event: string) {
    this.socket.off(event);
  }
  public emit(event: string, data: any) {
    this.socket.emit(event, data);
  }

  public disconnect() {
    this.socket.disconnect();
  }
}

export default SocketService;
