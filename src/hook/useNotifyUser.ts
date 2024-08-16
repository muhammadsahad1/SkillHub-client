import { sendNotification } from "../API/notification";
import { showToastError } from "../components/common/utilies/toast";

export const useNotifyUser = async (
  senderId: string | undefined,
  receiverId: string,
  type: string,
  message : string,
  link: string
) => {
  try {
    await sendNotification(senderId, receiverId, type,message, link);
  } catch (error: any) {
    showToastError(error.message);
  }
};
