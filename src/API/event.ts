import Api from "../services/axios";
import userRoutes from "../services/endpoints/userEndpoints";

const logFormData = (formData: FormData) => {
  const data = {};
  formData.forEach((value, key) => {
    data[key] = value;
  });
  console.log("FormData:", data);
};

export const createEvent = async (eventData: FormData) => {
  try {
    logFormData(eventData);
    const response = await Api.post(userRoutes.createEvent, eventData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    console.log(response.data);
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

export const getEventsList = async () => {
  try {
    const response = await Api.get(userRoutes.listEvents)
    console.log("res after the fethc Events ==>",response.data)
    return response.data
  } catch (error) {
    
  }
}
