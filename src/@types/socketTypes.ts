import { createContext, useContext } from 'react';
import { Socket } from 'socket.io-client';

export interface ISocketContext {
  socket: Socket | null;
}

export const SocketContext = createContext<ISocketContext | undefined>(undefined);
