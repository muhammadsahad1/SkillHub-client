import React from "react";
import { MdComment, MdFavorite, MdPersonAdd, MdChat } from "react-icons/md";
import { motion } from "framer-motion";
import { FaAngleUp } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { showToastError } from "../common/utilies/toast";
import { readNotification } from "../../redux/features/notificationSlices";
import { useDispatch } from "react-redux";

export interface Notification {
  _id: string;
  senderName: string;
  message: string;
  type: NotificationType;
  read: boolean;
  createdAt?: string;
  link: string;
}

type NotificationType = "follow" | "like" | "comment" | "chat";

interface NotificationsDrawerProps {
  notifications: Notification[];
  onClose: () => void;
}

const NotificationsDrawer: React.FC<NotificationsDrawerProps> = ({
  notifications,
  onClose,
  // markAsRead,
}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleNotificationClick = async (notification: Notification) => {
    try {
      dispatch(readNotification(notification._id) as any).unwrap();
      navigate(notification.link, { replace: true });
    } catch (error) {
      showToastError("something went wrong in markAsRead update");
    }
  };

  return (
    <motion.div
      initial={{ x: 400 }}
      animate={{ x: 0 }}
      exit={{ x: 400 }}
      className="bg-zinc-900 mt-2 shadow-lg rounded-md overflow-hidden"
    >
      <div className="border-b p-4">
        <div className="flex justify-between">
          <h2 className="text-lg font-poppins font-semibold text-zinc-200 tracking-wider ">
            Notifications
          </h2>
          <button
            className="text-gray-500 hover:text-gray-700"
            onClick={onClose}
          >
            <FaAngleUp size={24} />
          </button>
        </div>
      </div>

      <ul className="max-h-80 overflow-y-auto">
        {notifications.map((notification) => (
          <li
            key={notification._id}
            className={`p-4 border-b cursor-pointer ${
              notification?.read ? "bg-gray-200" : "bg-gray-100"
            }`}
            onClick={() => handleNotificationClick(notification)}
          >
            {notification?.type === "comment" && <MdComment />}
            {notification?.type === "like" && <MdFavorite />}
            {notification?.type === "follow" && <MdPersonAdd />}
            {notification?.type === "chat" && <MdChat />}
            <div className="ml-2">
              <p className="text-zinc-black font-bold ">
                {notification?.message}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </motion.div>
  );
};

export default NotificationsDrawer;
