import React, { useEffect } from "react";
import { useSocket } from "../../hook/useSocket";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import {
  FaBell,
  FaCheckCircle,
  FaComment,
  FaRocketchat,
  FaTimesCircle,
} from "react-icons/fa";
import { AiFillLike } from "react-icons/ai";
import { useDispatch } from "react-redux";
import {
  setIsProfessional,
  setProfessionalBedge,
  setVerificationStatus,
} from "../../redux/userSlices";
import useGetUser from "../../hook/getUser";

const NotificationHandler = () => {
  const dispatch = useDispatch();
  const user = useGetUser();
  const { socket } = useSocket();
  console.log("socket ->", socket?.id);

  const navigate = useNavigate();

  useEffect(() => {
    if (socket) {
      const handleNotification = (notification: any) => {
        console.log("Received notification: ==>", notification.type);
        
        if (notification.type === "follow") {
          // for follow notification
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
              <AiFillLike size={20} />
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
        } else if (notification.type === "verifyRequestAccepted") {
          dispatch(setVerificationStatus("Approved"));
          dispatch(setIsProfessional(true));
          dispatch(setProfessionalBedge(true));

          // For comment notifications
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
              <FaCheckCircle size={20} />
              <div>
                <strong>{notification?.message}</strong>
              </div>
            </div>
          ));
        } else if (notification.type === "verifyRequestRejected") {
          dispatch(setVerificationStatus("Rejected"));
          dispatch(setIsProfessional(false));
          dispatch(setProfessionalBedge(false));
          console.log("currentUser =>");

          // For comment notifications
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
              <FaTimesCircle size={20} />
              <div>
                <strong>{notification?.message}</strong>
              </div>
            </div>
          ));
        }
      };
      console.log("user ===>", user);
      // here the event is listerning
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
