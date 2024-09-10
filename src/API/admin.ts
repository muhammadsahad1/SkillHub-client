import Api from "../services/axios";
import adminRoutes from "../services/endpoints/adminEndpoints";

export const adminLogin = async (email: string, password: string) => {
  try {
    console.log("api call");

    const response = await Api.post(adminRoutes.login, {
      email: email,
      password: password,
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

// Get Users
export const getUsers = async () => {
  try {
    const response = await Api.get(adminRoutes.users);
    console.log("res for getUsers ==>", response.data);
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

// Blocking users
export const blockUser = async (id: string | undefined) => {
  const response = await Api.post(adminRoutes.blockUser, { id: id });
  console.log("response =>", response.data);
  return response.data;
};

// get the verifications requests
export const getVerificationRequests = async () => {
  try {
    const response = await Api.get(adminRoutes.verificationRequests);
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
// updating the status of request
export const updateRequestStatus = async (reqId: string, status: string) => {
  try {
    const response = await Api.post(adminRoutes.updateRequestStatus, {
      reqId,
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

//getEvents
export const getEvents = async () => {
  try {
    const response = await Api.get(adminRoutes.getEvents);
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

// change event verify
export const changeEventStatus = async (requestId: string, action: string) => {
  try {
    const response = await Api.post(adminRoutes.updateEventStatus, {
      requestId,
      action,
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

export const getReports = async () => {
  try {
    console.log("callledd getReq");
    const response = await Api.get(adminRoutes.getReports);
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

export const changeReportStatus = async (reportId: string, status: string) => {
  try {
    const response = await Api.post(adminRoutes.reportAction, {
      reportId,
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

//fetchAnalyticsData
export const fetchAnalyticsData = async () => {
  try {
    const response = await Api.get(adminRoutes.fetchAnalyticsData)
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

// Logout admin
export const adminLogout = async () => {
  const response = await Api.post(adminRoutes.logout);
  return response.data;
};
