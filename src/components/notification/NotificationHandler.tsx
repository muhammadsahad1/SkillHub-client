import React, { useEffect } from "react";
import { useSocket } from "../../hook/useSocket";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { FaBell } from "react-icons/fa";

const NotificationHandler = () => {
  const { socket } = useSocket();
  const navigate = useNavigate();

  useEffect(() => {
    if (socket) {
      socket.on("notification", (notification) => {
        toast.custom((t) => (
          <div
            className={`flex items-center p-3 space-x-3 bg-gray-800 text-white rounded-md shadow-md cursor-pointer ${
              t.visible ? "opacity-100" : "opacity-0"
            }`}
            style={{ transition: "opacity 0.5s ease-in-out" }}
            onClick={() => {
              navigate(notification.link); // Navigate to the page specified in the notification
              toast.dismiss(t.id);
            }}
          >
            <FaBell size={20} />
            <div>
              <strong>{notification.message}</strong>
            </div>
          </div>
        ));
      });
    }
  }, [socket, navigate]);
  
  return null;
};
export default NotificationHandler;
