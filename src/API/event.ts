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

// export const getToken = async () => {
//   try {
//     const response = await Api.get(userRoutes.)
//   } catch (error) {
    
//   }
// }

// export const getJoinLink = async (date :string,time: string) => {
//   try {
//     const response = await Api.get(userRoutes.joinLink, {});
//     console.log("response llink ==>",response.data);
    
//     return response.data.joinLink;
//   } catch (error) {}
// };

export const registerEvent = async (registerData: IEventRegister) => {
  try {
    console.log('Register Data Sent:', registerData);

    const result = await Api.post(userRoutes.eventRegister, {registerData});
    console.log('Response from API:', result);

    return result.data;
  } catch (error) {
    console.log(error)
  }


};

  // for event meeting
  export const getMettingEvent = async (eventId : string) => {
    try {
      console.log("called eventGet");
      
      const response = await Api.get(userRoutes.joinMeeting,{
        params : { eventId }
      })
      return response.data
    } catch (error : any) {
      console.log("errro",error.message)
    }
  } 
