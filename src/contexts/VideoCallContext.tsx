import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { useSocket } from "../hook/useSocket";
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";
import { v4 as uuidv4 } from "uuid";

// interface for video callContextProps
interface VideoCallContextProps {
  isCallRequested: boolean;
  isCallAccepted: boolean;
  roomId: string | null;
  requestCall: (receiverId: string) => void;
  acceptCall: () => void;
  declineCall: () => void;
}

const videoCallContext = createContext<VideoCallContextProps | undefined>(
  undefined
);

export const VideoCallProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [isCallRequested, setIsCallRequested] = useState<boolean>(false);
  const [isCallAccepted, setIsCallAccepted] = useState<boolean>(false);
  const [callerId, setCallerId] = useState<string | null>(null);
  const [roomId, setRoomId] = useState<string | null>(null);
  const { socket } = useSocket();

  // for requesting the call to people
  const requestCall = (receiverId: string) => {
    if (socket) {
      const newRoomId = uuidv4();
      socket.emit("callRequest", { receiverId, roomId: newRoomId });
      setCallerId(receiverId);
      setRoomId(newRoomId)
      setIsCallRequested(true);
    }
  };

  // for accepting the call of people
  const acceptCall = () => {
    if (socket && callerId && roomId) {
      socket.emit("callAccept", { callerId, roomId });
      setIsCallAccepted(true);
      setIsCallRequested(false);
    }
  };

  // for decline the call of people
  const declineCall = () => {
    if (socket && callerId && roomId) {
      socket.emit("callDecline", { callerId });
      setIsCallRequested(false);
    }
  };

  useEffect(() => {
    if (socket) {
      socket.on("callRequest", (data: { callerId: string; roomId: string }) => {
        setCallerId(data.callerId);
        setRoomId(data.roomId);
        setIsCallRequested(true);
      });

      socket.on("callAccepted", (data: { roomId: string }) => {
        setIsCallAccepted(true);
        setIsCallRequested(false);
        setRoomId(data.roomId);
      });

      socket.on("callDecline", () => {
        setIsCallRequested(false);
      });
    }

    return () => {
      socket?.off("callRequest");
      socket?.off("callAccepted");
      socket?.off("callDecline");
    };
  }, [socket]);

  return (
    <videoCallContext.Provider
      value={{
        isCallRequested,
        isCallAccepted,
        roomId,
        requestCall,
        acceptCall,
        declineCall,
      }}
    >
      {children}
    </videoCallContext.Provider>
  );
};

// custom hook to use the video call context
export const useVideoCall = () => {
  const context = useContext(videoCallContext);
  if (context === undefined) {
    throw new Error("useVideoCall must be used within a VideoCallProvider");
  }
  return context;
};
