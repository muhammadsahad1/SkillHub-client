import React, { useEffect } from "react";
import { useSocket } from "../../hook/useSocket";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { FaBell, FaComment, FaRocketchat } from "react-icons/fa";
import useGetUser from "../../hook/getUser";

const NotificationHandler = () => {
  const { socket } = useSocket();
  console.log("socket ->", socket?.id);

  const navigate = useNavigate();

  useEffect(() => {
    if (socket) {
      const handleNotification = (notification: any) => {
        console.log("Received notification:", notification);
        if (notification.type === "follow") {
          //for follow notification
          toast.custom((t) => (
            <div
              className={`flex items-center p-3 space-x-3 bg-zinc-800 text-white rounded-md shadow-md cursor-pointer ${
                t.visible ? "opacity-100 toast-enter" : "opacity-0 toast-exit"
              }`}
              style={{ transition: "opacity 0.5s ease-in-out" }}
              onClick={() => {
                navigate(notification?.link);
                toast.dismiss(t.id);
              }}
            >
              <FaBell size={20} />
              <div>
                <strong>{notification?.message}</strong>
              </div>
            </div>
          ));
        } else if (notification.type === "chat") {
          //For chat notification
          toast.custom((t) => (
            <div
              className={`flex items-center p-3 space-x-3 bg-gray-800 text-white rounded-md shadow-md cursor-pointer ${
                t.visible ? "opacity-100 toast-enter" : "opacity-0 toast-exit"
              }`}
              style={{ transition: "opacity 0.5s ease-in-out" }}
              onClick={() => {
                navigate(notification?.link);
                toast.dismiss(t.id);
              }}
            >
              <FaRocketchat size={20} />
              <div>
                <strong>{notification?.message}</strong>
              </div>
            </div>
          ));
        } else if (notification.type === "like") {
          //For like notification
          toast.custom((t) => (
            <div
              className={`flex items-center p-3 space-x-3 bg-gray-800 text-white rounded-md shadow-md cursor-pointer ${
                t.visible ? "opacity-100 toast-enter" : "opacity-0 toast-exit"
              }`}
              style={{ transition: "opacity 0.5s ease-in-out" }}
              onClick={() => {
                navigate(notification?.link);
                toast.dismiss(t.id);
              }}
            >
              {/* <AiFillLike size={20} /> */}
              <div>
                <strong>{notification?.message}</strong>
              </div>
            </div>
          ));
        } else if (notification.type === "comment") {
          //For comment notification
          toast.custom((t) => (
            <div
              className={`flex items-center p-3 space-x-3 bg-gray-800 text-white rounded-md shadow-md cursor-pointer ${
                t.visible ? "opacity-100 toast-enter" : "opacity-0 toast-exit"
              }`}
              style={{ transition: "opacity 0.5s ease-in-out" }}
              onClick={() => {
                navigate(notification?.link);
                toast.dismiss(t.id);
              }}
            >
              <FaComment size={20} />
              <div>
                <strong>{notification?.message}</strong>
              </div>
            </div>
          ));
        }
      };

      socket.on("notification", handleNotification);

      // Cleanup listener on component unmount or socket change
      return () => {
        socket.off("notification", handleNotification);
      };
    }
  }, [socket, navigate]);

  return null;
};

export default NotificationHandler;
