import { IEventRegister } from "../@types/eventRegister";
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
    console.log("called");

    const response = await Api.post(userRoutes.createEvent, eventData, {
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

export const getEventsList = async () => {
  try {
    const response = await Api.get(userRoutes.listEvents);
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

export const fetchEventDetails = async (eventId: string | undefined) => {
  try {
    const response = await Api.get(userRoutes.event, {
      params: {
        eventId: eventId,
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


export const registerEvent = async (registerData: IEventRegister) => {
  try {
    const result = await Api.post(userRoutes.eventRegister, { registerData });
    console.log("Response from API:", result);

    return result.data;
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

// payment registration
export const makePayment = async (
  eventPrice: string | undefined,
  eventId: string | undefined,
  userId: string | undefined
) => {
  try {
    const response = await Api.post(userRoutes.makePayment, {
      eventPrice,
      eventId,
      userId,
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

// for event meeting
export const getMettingEvent = async (eventId: string) => {
  try {
    const response = await Api.get(userRoutes.joinMeeting, {
      params: { eventId },
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

export const changeStatusEvent = async (eventId: string, status: string) => {
  try {
    const response = await Api.post(userRoutes.changeStatus, {
      eventId,
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
