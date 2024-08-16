// import React from "react";
// import { MdComment, MdFavorite, MdPersonAdd } from "react-icons/md";
// import { motion } from "framer-motion";

// interface Nofication {
//   id: string;
//   senderName: string;
//   message: string;
//   type: NotificationType;
//   reade: boolean;
//   timestamp: string;
// }

// type NotificationType = "follow" | "like" | "comment" | "chat";

// interface NotificationsDrawerProps {
//   notifications: Notification[];
//   onClose: () => void;
//   markAsRead: (id: string) => void;
//   onNotificationClick: (id: string) => void;
// }

// const NotificationsDrawer: React.FC<NotificationsDrawerProps> = ({
//   notifications,
//   onClose,
//   markAsRead,
//   onNotificationClick,
// }) => {
//   return <div></div>;
// };

// export default NotificationsDrawer;



// import React from 'react';
// import { MdComment, MdFavorite, MdPersonAdd } from 'react-icons/md';
// import { motion } from 'framer-motion';

// // Define the types for Notification and NotificationDrawer props
// interface Notification {
//   id: string;
//   senderName: string;
//   message: string;
//   type: NotificationType;
//   read: boolean;
//   timestamp: string;
// }

// type NotificationType = 'follow' | 'chat' | 'like' | 'comment';

// interface NotificationDrawerProps {
//   notifications: Notification[];
//   onClose: () => void;
//   markAsRead: (id: string) => void;
//   onNotificationClick: (id: string) => void;
// }

// const NotificationDrawer: React.FC<NotificationDrawerProps> = ({
//   notifications,
//   onClose,
//   markAsRead,
//   onNotificationClick,
// }) => {
  
//   const handleNotificationClick = (id: string) => {
//     onNotificationClick(id); // Open or view the notification details
//     markAsRead(id); // Mark notification as read
//   };

//   return (
//     <motion.div 
//       className="fixed top-0 right-0 w-80 h-full bg-white shadow-lg"
//       initial={{ x: '100%' }}
//       animate={{ x: 0 }}
//       exit={{ x: '100%' }}
//     >
//       <div className="p-4 flex justify-between items-center">
//         <h2 className="text-xl font-bold">Notifications</h2>
//         <button onClick={onClose} className="text-xl font-bold">✕</button>
//       </div>
//       <div className="overflow-y-auto h-full">
//         {notifications.map((notification) => (
//           <div 
//             key={notification.id} 
//             className={`flex items-center p-4 border-b cursor-pointer ${notification.read ? 'bg-gray-100' : 'bg-blue-50'}`}
//             onClick={() => handleNotificationClick(notification.id)}
//           >
//             <div className="mr-4">
//               {notification.type === 'like' && <MdFavorite className="text-red-500" />}
//               {notification.type === 'comment' && <MdComment className="text-green-500" />}
//               {notification.type === 'follow' && <MdPersonAdd className="text-blue-500" />}
//             </div>
//             <div>
//               <p className="text-sm">
//                 <strong>{notification.senderName}</strong> {notification.message}
//               </p>
//               <p className="text-xs text-gray-500">{notification.timestamp}</p>
//             </div>
//           </div>
//         ))}
//       </div>
//     </motion.div>
//   );
// };

// export default NotificationDrawer;
