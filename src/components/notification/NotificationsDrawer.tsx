import React from "react";
import { MdComment, MdFavorite, MdPersonAdd } from "react-icons/md";
import { motion } from "framer-motion";
import { FaAngleUp } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { showToastError } from "../common/utilies/toast";

interface Nofication {
  _id: string;
  senderName: string;
  message: string;
  type: NotificationType;
  reade: boolean;
  timestamp: string;
  link: string;
}

type NotificationType = "follow" | "like" | "comment" | "chat";

interface NotificationsDrawerProps {
  notifications: Notification[];
  onClose: () => void;
  markAsRead: (id: string) => void;
  // onNotificationClick: (id: string) => void;
}

const NotificationsDrawer: React.FC<NotificationsDrawerProps> = ({
  notifications,
  onClose,
  markAsRead,
}) => {
  const navigate = useNavigate();

  const handleNotificationClick = async (notification: Nofication) => {
    try {
      markAsRead(notification._id);
      navigate(notification.link);
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
              notification.read ? "bg-gray-200" : "bg-gray-100"
            }`}
            onClick={() => handleNotificationClick(notification)}
          >
            {notification.type === "comment" && <MdComment />}
            {notification.type === "like" && <MdFavorite />}
            {notification.type === "follow" && <MdPersonAdd />}

            <div className="ml-2">
              <p className="text-zinc-black font-bold ">{ notification.message}</p>
            </div>
          </li>
        ))}
      </ul>
    </motion.div>
  );
};

export default NotificationsDrawer;
