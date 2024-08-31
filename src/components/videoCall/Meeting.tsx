// import React, { useEffect, useRef, useState } from "react";
// import AgoraRTC from "agora-rtc-sdk-ng";
// import { useLocation } from "react-router-dom";

// const Meeting = () => {
//   const location = useLocation();
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//   const localVideoRef = useRef<HTMLVideoElement>(null);
//   const remoteVideoContainerRef = useRef<HTMLDivElement>(null);
//   const { accessLink, agoraToken } = location.state || {};

//   // Extract the channel name from the access link
//   const channelName = accessLink?.split("/meeting/")[1];
//   const appId = import.meta.env.VITE_AGORA_APP_ID;

//   console.log("appId ===>",appId)

//   useEffect(() => {
//     const client = AgoraRTC.createClient({ mode: "rtc", codec: "vp8" });

//     const initClient = async () => {
//       setLoading(true);
//       try {
//         // Validate token
//         if (!agoraToken || agoraToken.length < 10) {
//           throw new Error("Invalid or missing token");
//         }
//         if (!channelName) {
//           throw new Error("Channel name is missing");
//         }

//         // Join the channel
//         await client.join(appId, channelName, agoraToken, null);
//         console.log("Joined channel successfully");

//         // Create and play the local video track
//         const localTrack = await AgoraRTC.createCameraVideoTrack();
//         if (localVideoRef.current) {
//           localTrack.play(localVideoRef.current);
//         }

//         // Publish the local video track
//         await client.publish(localTrack);
//         console.log("Published local track");

//         // Handle remote user published and subscribed events
//         client.on("user-published", async (user) => {
//           await client.subscribe(user, "video");
//           const remoteTrack = user.videoTrack;
//           if (remoteTrack) {
//             const remoteDiv = document.createElement("div");
//             remoteDiv.id = user.uid.toString();
//             remoteVideoContainerRef.current?.appendChild(remoteDiv);
//             remoteTrack.play(remoteDiv);
//           }
//         });

//         client.on("user-unpublished", (user) => {
//           const remoteDiv = document.getElementById(user.uid.toString());
//           if (remoteDiv) {
//             remoteDiv.remove();
//           }
//         });

//         client.on("user-left", (user) => {
//           const remoteDiv = document.getElementById(user.uid.toString());
//           if (remoteDiv) {
//             remoteDiv.remove();
//           }
//         });

//         setLoading(false);
//       } catch (error) {
//         setLoading(false);
//         setError(`Failed to initialize the meeting: ${error.message}`);
//         console.error("Agora client initialization failed", error);
//       }
//     };

//     initClient();

//     return () => {
//       client.leave();
//       console.log("Left the channel");
//     };
//   }, [channelName, agoraToken, appId]);

//   if (loading) return <div>Loading...</div>;
//   if (error) return <div>{error}</div>;

//   return (
//     <div>
//       <div>
//         <video ref={localVideoRef} autoPlay playsInline />
//       </div>
//       <div ref={remoteVideoContainerRef}></div>
//     </div>
//   );
// };

// export default Meeting;
