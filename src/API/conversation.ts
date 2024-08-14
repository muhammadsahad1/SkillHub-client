import Api from "../services/axios";
import userRoutes from "../services/endpoints/userEndpoints";

export const fetchChatUsers = async (
  senderId: string,
  userToChatId: string
) => {
  try {
  
    const response = await Api.get(userRoutes.getChatUsers, {
      params: {
        senderId: senderId,
        userToChatId: userToChatId, 
      },
    });
    console.log("res ===>",response.data);
    
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

// fetching the chatUsers 
export const getConversationsUsers = async () => {
  try {
    const response = await Api.get(userRoutes.fetchUsers);
    console.log("reesssssssss ====>",response.data);
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
}