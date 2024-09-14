import React from "react";
import NotificationsDrawer from "./NotificationsDrawer";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

interface NotificationEntryProps {
  onClose: () => void;
}


const NotificationEntry: React.FC<NotificationEntryProps> = ({ onClose }) => {

  const { notifications } = useSelector((state : RootState) => state.notifications)

  return (
    <div>
      <NotificationsDrawer
        notifications={notifications}
        onClose={onClose}
        // markAsRead={markAsRead}
      />
    </div>
  );
};

export default NotificationEntry;
