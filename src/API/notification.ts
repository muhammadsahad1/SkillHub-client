import Api from "../services/axios";
import userRoutes from "../services/endpoints/userEndpoints";

export const sendNotification = async (
  senderId: string | undefined,
  receiverId: string,
  type: string,
  message: string,
  link: string
) => {
  try {
    const response = await Api.post(userRoutes.notification, {
      senderId,
      receiverId,
      type,
      message,
      link,
    });
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
