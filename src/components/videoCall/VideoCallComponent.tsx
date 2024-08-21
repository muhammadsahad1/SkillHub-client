import React, { useCallback, useEffect, useState } from "react";
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";
import { useVideoCall } from "../../contexts/VideoCallContext";
import useGetUser from "../../hook/getUser";
import { v4 as uuidv4 } from "uuid";
import { useSocket } from "../../hook/useSocket";
import { MdJoinInner } from "react-icons/md";

const ZEGOCLOUD_APP_ID = import.meta.env.VITE_ZEGO_APP_ID;
const ZEGOCLOUD_APP_SECRET = import.meta.env.VITE_ZEGO_SERVER_SECRET;

// type ZegoUIKitPrebuiltInstance = {
//   joinRoom: (options: {
//     container: HTMLElement;
//     userID: string;
//     userName: string;
//     roomID: string;
//   }) => any;
//   leaveRoom?: () => void; // Manually adding expected method
// };

const VideoCallComponent = () => {
  console.log("VideoCallComponent is rendered");
  const { isCallAccepted, isCallRequested, roomId, acceptCall, declineCall } =
    useVideoCall();
  const [isZegoOpen , setZegoOpen ] = useState<boolean>(false)
  const [callInstance, setCallInstance] = useState<ZegoUIKitPrebuilt | null>(
    null
  ); // Use `any` type for dynamic methods
  const user = useGetUser();
  const { socket } = useSocket();

  const initCall = useCallback(async () => {
    try {
      const appID = Number(ZEGOCLOUD_APP_ID);
      const serverSecret = ZEGOCLOUD_APP_SECRET;
      const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
        appID,
        serverSecret,
        roomId,
        Date.now().toString(),
        user.name
      );
      setZegoOpen(true)
      const zc = ZegoUIKitPrebuilt.create(kitToken); // creating the prebuilt zegokit with appId and seceretId

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
    // if accepted tha we call the zc.cloud
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
// for handle end call 
  const handleCallEnd = () => {
    if (callInstance) {
      callInstance.hangUp();
      setCallInstance(null);
    }
  };

  console.log(
    "isCallAccepted:",
    isCallAccepted,
    "roomId:",
    roomId,
    "initCall:",
    initCall,
    "callInstance:",
    callInstance
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-zinc-900 bg-opacity-50 ">
      {isCallRequested && !isCallAccepted && (
        <div className="absolute z-50 p-4 bg-white rounded shadow-xl max-w-full w-96">
          <div className="flex justify-center items-center mb-10">
            <h3 className="font-poppins font-bold text-lg ">join to room </h3>
            <span className="ps-4"><MdJoinInner size={32}/></span>
          </div>
          <div className="font-poppins font-bold flex justify-evenly max-w-xs w-full">
            <button
              onClick={() => {
                acceptCall();
                handleCallEnd();
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
  
  <div id="video-call-container" style={{ width: "100%", height: "50vh", position: 'relative' }}>
  {/* <button
    className="absolute top-4 right-4 bg-red-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-red-600"
    onClick={() => handleCallEnd()}
    style={{ zIndex: 1000 }}
  >
    Close
  </button> */}
  {/* ZEGOCLOUD Video Call UI will be rendered here */}
</div>


    
    </div>
  );
};

export default VideoCallComponent;
