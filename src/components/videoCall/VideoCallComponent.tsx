import React, { useCallback, useEffect, useState } from "react";
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";
import { useVideoCall } from "../../contexts/VideoCallContext";
import useGetUser from "../../hook/getUser";
import { v4 as uuidv4 } from "uuid";
import { useSocket } from "../../hook/useSocket";

const ZEGOCLOUD_APP_ID = import.meta.env.VITE_ZEGO_APP_ID;
const ZEGOCLOUD_APP_SECRET = import.meta.env.VITE_ZEGO_SERVER_SECRET;

type ZegoUIKitPrebuiltInstance = {
  joinRoom: (options: {
    container: HTMLElement;
    userID: string;
    userName: string;
    roomID: string;
  }) => any;
  leaveRoom?: () => void; // Manually adding expected method
};

const VideoCallComponent = () => {
  const { isCallAccepted, isCallRequested, roomId, acceptCall, declineCall } = useVideoCall();
  const [callInstance, setCallInstance] =
    useState<ZegoUIKitPrebuiltInstance | null>(null); // Use `any` type for dynamic methods
  const user = useGetUser();
  const { socket } = useSocket();

  const initCall = useCallback(async () => {
    try {
      const appID = Number(ZEGOCLOUD_APP_ID);
      const serverSecret = ZEGOCLOUD_APP_SECRET;

      const zegoUIKit = ZegoUIKitPrebuilt.create(appID, serverSecret);

      zegoUIKit.joinRoom({
        container: document.getElementById("video-call-container")!,
        userID: user?.id,
        userName: user.name,
        roomID: roomId ?? uuidv4(),
      });

      setCallInstance(zegoUIKit);
    } catch (error) {
      console.error("Failed to initialize ZEGOCLOUD UI Kit:", error);
    }
  }, [user.id, user.name, roomId]);

  useEffect(() => {
    if (isCallAccepted && roomId) {
      initCall();
    }

    return () => {
      if (callInstance && callInstance.leaveRoom) {
        callInstance.leaveRoom();
      }};
  }, [isCallAccepted, roomId, initCall, callInstance]);

  return (
    <div>
      {isCallRequested && !isCallAccepted && (
        <div>
          <h3>Incoming Call</h3>
          <button onClick={acceptCall}>Accept</button>
          <button onClick={declineCall}>Decline</button>
        </div>
      )}
      <div id="video-call-container" style={{ width: "100%", height: "100vh" }}>
        {/* ZEGOCLOUD Video Call UI will be rendered here */}
      </div>
    </div>
  );
};

export default VideoCallComponent;
