import React, { ReactNode, useEffect, useState } from "react";
import { SocketContext } from "../@types/socketTypes";
import { io, Socket } from "socket.io-client";
import useGetUser from "../hook/getUser";

interface SocketProviderProps {
  children: ReactNode;
}

export const SocketProvider: React.FC<SocketProviderProps> = ({ children }) => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [connected, setConnected] = useState(false);
  const currentUser = useGetUser()

  useEffect(() => {
    console.log(import.meta.env.VITE_BASE_URL)
    
    // Initialize the socket with the backend URL
    const newSocket = io(import.meta.env.VITE_BASE_URL, {
      query: { userId: currentUser.id },
      transports: ['websocket'],  // Force WebSocket transport
      withCredentials: true,      // Use credentials if needed
    });
    setSocket(newSocket);
    //calling the connect event for connect to server
    newSocket.on("connect", () => {
      console.log("client connected to server ===> ID ===> ", newSocket.id);
      setConnected(true); 
    });
    //cleaner function for clean the unnessary mount
    return () => {
      newSocket.close();
    };
  }, []);

  if (!connected) {
    console.log("not connecteddd run");
    
    return null; // Or some loading indicator
  } 

  return (
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  );
};
