import Api from "../services/axios";
import userRoutes from "../services/endpoints/userEndpoints";

// ================================ Group API ========================= \\
export const createGroup = async (groupData: FormData) => {
  try {
    const response = await Api.post(userRoutes.createGroup, groupData, {
      headers: {
        "Content-Type": "multipart/form-data",
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

export const fetchGroups = async () => {
  try {
    const response = await Api.get(userRoutes.getGroups);
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

export const joinGroup = async (groupId: string) => {
  try {
    const response = await Api.post(userRoutes.joinGroup, {
      groupId,
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

export const fetchSelectedGroup = async (groupId: string) => {
  try {
    console.log("called");

    const response = await Api.get(userRoutes.getGroup, {
      params: {
        groupId,
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

export const sendGroupChat = async (
  groupId: string,
  senderId: string | undefined,
  message: string
) => {
  try {
    const response = await Api.post(userRoutes.sendMessage, {
      groupId,
      senderId,
      message,
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

export const fetchGroupMessages = async (groupId: string) => {
  try {
    const response = await Api.get(userRoutes.getChatMessages, {
      params: {
        groupId,
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

export const updateOnlineStatus = async (
  groupId: string,
  userId: string,
  status: boolean
) => {
  try {
    const response = await Api.post(userRoutes.updateStatus, {
      groupId,
      userId,
      status,
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

export const reportPost = async (postId: string, reason: string) => {
  try {
    const response = await Api.post(userRoutes.reportPost, { postId, reason });
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

export const leaveGroup = async (
  userId: string,
  groupId: string | undefined
) => {
  try {
    const response = await Api.post(userRoutes.leaveGroup, { userId, groupId });
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
