import Api from "../services/axios";
import userRoutes from "../services/endpoints/userEndpoints";

export const createEvent = async (eventData: FormData) => {
  try {
    const response = await Api.post(userRoutes.createEvent, { eventData });
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
