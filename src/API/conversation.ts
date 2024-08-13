import Api from "../services/axios";
import userRoutes from "../services/endpoints/userEndpoints";

export const fetchChatUsers = async (
  senderId: string,
  userToChatId: string
) => {
  try {
    console.log("userto000000000000000000 ===>",userToChatId);
    
    const response = await Api.get(userRoutes.getChatUsers, {
      params: {
        senderId: senderId,
        userToChatId: userToChatId, 
      },
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

// sending message
export const sendChat = async (senderId: string, id: string , messages : string) => {
  try {
    const response = await Api.post(userRoutes.sendChat, {
      senderId: senderId,
      receiverId: id,
      messages : messages
    });
    console.log("reesssssssss =>",response.data);
    
    return response.data
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
