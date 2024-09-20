import React, { useCallback, useEffect, useState } from "react";
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";
import { useVideoCall } from "../../contexts/VideoCallContext";
import useGetUser from "../../hook/getUser";
import { MdJoinInner } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const ZEGOCLOUD_APP_ID = import.meta.env.VITE_ZEGO_APP_ID;
const ZEGOCLOUD_APP_SECRET = import.meta.env.VITE_ZEGO_SERVER_SECRET;

const VideoCallComponent = () => {

  const {
    isCallAccepted,
    isCallRequested,
    roomId,
    callerName,
    receiverName,
    acceptCall,
    declineCall,
  } = useVideoCall();
  const [isZegoOpen, setZegoOpen] = useState<boolean>(false);
  const [callInstance, setCallInstance] = useState<ZegoUIKitPrebuilt | null>(
    null
  );
  const user = useGetUser();
  const navigate = useNavigate();

  const initCall = useCallback(async () => {
    try {
      const appID = Number(ZEGOCLOUD_APP_ID);
      const serverSecret = ZEGOCLOUD_APP_SECRET;
      const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
        appID,
        serverSecret,
        roomId as string,
        Date.now().toString(),
        user.name
      );
      setZegoOpen(true);
      const zc = ZegoUIKitPrebuilt.create(kitToken);

      zc.joinRoom({
        container: document.getElementById("video-call-container")!,
        scenario: {
          mode: ZegoUIKitPrebuilt.OneONoneCall,
        },
        showScreenSharingButton: false,
      });

      setCallInstance(zc);
    } catch (error) {
      console.error("Failed to initialize ZEGOCLOUD UI Kit:", error);
    }
  }, [user.id, user.name, roomId]);

  useEffect(() => {
    if (isCallAccepted && roomId) {
      initCall();
    }

    return () => {
      if (callInstance) {
        callInstance.destroy();
        console.log("Cleaning up ZEGOCLOUD instance");
      }
    };
  }, [isCallAccepted, roomId]);

  const handleCallEnd = () => {
    if (callInstance) {
      callInstance.hangUp(); 
      callInstance.destroy();
      setCallInstance(null);  
      setZegoOpen(false);    
      navigate(-1);         
    }
  };

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      handleCallEnd();
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-zinc-900 bg-opacity-50"
      onClick={handleBackdropClick}
    >
      {isCallRequested && !isCallAccepted && (
        <div className="absolute z-50 p-4 bg-white rounded shadow-xl max-w-full w-96">
          <div className="flex justify-center items-center mb-10">
            <h3 className="font-poppins font-bold text-lg">
              {callerName && receiverName ? `You are connecting to ${receiverName}` : `${callerName} is calling ...`}
            </h3>
            <span className="ps-4">
              <MdJoinInner size={32} />
            </span>
          </div>
          <div className="font-poppins font-bold flex justify-evenly max-w-xs w-full">
            <button
              onClick={() => {
                acceptCall();
              }}
            >
              Join call
            </button>
            <button
              onClick={() => {
                declineCall();
                handleCallEnd();
              }}
            >
              Decline
            </button>
          </div>
        </div>
      )}

{isZegoOpen && (
  <div className="relative w-full h-screen">
    <div
      id="video-call-container"
      style={{ width: "100%", height: "100vh", position: "relative", backgroundColor: "whiteSmoke", zIndex: 0 }}
    />
    <button 
      className="absolute top-4 right-4 z-50 bg-red-500 text-white px-4 py-2 rounded-full hover:bg-red-600 transition-colors"
      onClick={handleCallEnd}
    >
      Close Call
    </button>
  </div>
)}
    </div>
  );
};

export default VideoCallComponent;
