import React, { ReactNode, useEffect, useState } from "react";
import { SocketContext } from "../@types/socketTypes";
import { io, Socket } from "socket.io-client";

interface SocketProviderProps {
  children: ReactNode;
}

export const SocketProvider: React.FC<SocketProviderProps> = ({ children }) => {
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    //initialize the socket with url of backend
    const newSocket = io(`${import.meta.env.VITE_BASE_URL}`);
    setSocket(newSocket);
    //calling the connect event for connect to server
    newSocket.on("connect", () => {
      console.log("client connected to server ===> ID ===> ", newSocket.id);
    });
    //cleaner function for clean the unnessary mount
    return () => {
      newSocket.close();
    };
  }, []);

  return (
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  );
};
