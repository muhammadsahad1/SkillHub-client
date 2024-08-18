import React, { useEffect, useState } from "react";
import NotificationsDrawer from "./NotificationsDrawer";
import { getNotifications } from "../../API/notification";

interface NotificationEntryProps {
  onClose: () => void;
}

const NotificationEntry:React.FC<NotificationEntryProps> = ({ onClose }) => {
  const [notifications, setNotifications] = useState([]);

  const fetchUnreadNotifications = async () => {
    try {
      const result = await getNotifications();
      console.log("result ==>",result);
      if(result.length > 0){
        setNotifications(result)

      }
    } catch (error) {}
  };



  const markAsRead = async () => {
    try {
      
    } catch (error) {
      
    }
  }

  useEffect(() => {
    fetchUnreadNotifications();
  },[]);
  
  console.log("notification ==>",notifications);
  return (
    <div>
      <NotificationsDrawer notifications={notifications} onClose={onClose} markAsRead={markAsRead}/>
    </div>
  );
};

export default NotificationEntry;
