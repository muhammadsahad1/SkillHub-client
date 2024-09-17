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
  const currentUser = useGetUser();

  useEffect(() => {
    console.log(import.meta.env.VITE_BASE_URL);

    // Initialize the socket with the backend URL
    const newSocket = io("https://justingeorge.site/socket.io/", {
      query: { userId: currentUser.id },
      withCredentials: true,
      transports: ["websocket"],
    });

    setSocket(newSocket);

    // Listen to the connect event
    newSocket.on("connect", () => {
      console.log("Client connected to server, Socket ID:", newSocket.id);
      setConnected(true);
    });
    //cleaner function for clean the unnessary mount
    return () => {
      newSocket.close();
    };
  }, [currentUser.id]);

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
