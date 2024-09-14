import Api from "../services/axios";
import userRoutes from "../services/endpoints/userEndpoints";

// sending the notification and creating
export const sendNotification = async (
  senderId: string | undefined,
  receiverId: string | undefined,
  type: string,
  message: string,
  link: string | undefined
) => {
  try {
    const response = await Api.post(userRoutes.notification, {
      senderId,
      receiverId,
      type,
      message,
      link,
    });

    return response.data;
  } catch (error: any) {
    if (error.response) {
      return error.response.data;
    } else if (error.request) {
      return { success: false, message: "No response from server" };
    } else {
      return { success: false, message: error.message };
    }
  }
};

// get Notification api
export const getNotifications = async () => {
  try {
    const response = await Api.get(userRoutes.notification);
    console.log("res from backend for notification list ===>", response.data);
    return response.data;
  } catch (error: any) {
    if (error.response) {
      return error.response.data;
    } else if (error.request) {
      return { success: false, message: "No response from server" };
    } else {
      return { success: false, message: error.message };
    }
  }
};

// notification mark as read
export const markNotificationAsRead = async (notificationId: string) => {
  try {
    console.log("Sending request to mark as read:", notificationId);
    const response = await Api.post(userRoutes.notificationMarkAsRead, {notificationId})
  } catch (error: any) {
    if (error.response) {
      return error.response.data;
    } else if (error.request) {
      return { success: false, message: "No response from server" };
    } else {
      return { success: false, message: error.message };
    }
  }
};
