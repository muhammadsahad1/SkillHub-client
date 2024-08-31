import React, { useEffect } from 'react';
import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt';
import { IEvent } from '../../@types/events';

interface User {
  id: string;
  name: string;
}

const ZegoVideoCall: React.FC<{ event: IEvent; currentUser: User }> = ({ event, currentUser }) => {
  useEffect(() => {
    const initZegoUIKit = async () => {
      try {
        // Retrieve app ID and server secret from environment variables
        const appID = Number(import.meta.env.VITE_ZEGO_APP_ID);
        const serverSecret = import.meta.env.VITE_ZEGO_SERVER_SECRET;

        // Generate a kit token for joining the room
        const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
          appID,
          serverSecret,
          event._id,               // roomId
          currentUser.id,           // userID
          currentUser.name          // userName
        );

        // Initialize ZegoUIKitPrebuilt with the generated token
        const zegoUIKit = ZegoUIKitPrebuilt.create(kitToken);

        // Join the room with necessary options
        zegoUIKit.joinRoom({
          container: document.getElementById("video-container")!,
          scenario: {
            mode: ZegoUIKitPrebuilt.GroupCall, // Use GroupCall mode for group video calls
          },
          showScreenSharingButton: true,
          showParticipantsButton: true,
          showSettingsButton: true,
          showMicButton: true,
          showCameraButton: true,
        });
      } catch (error) {
        console.error("Failed to initialize ZEGOCLOUD UI Kit:", error);
      }
    };

    initZegoUIKit();
  }, [event, currentUser]);

  return (
    <div id="video-container" style={{ width: '100vw', height: '100vh' }}>
      {/* Zego UIKit will render video elements here */}
    </div>
  );
};

export default ZegoVideoCall;
