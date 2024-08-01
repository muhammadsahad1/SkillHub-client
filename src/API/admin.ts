import Api from "../services/axios";
import { User } from "../@types/allTypes";
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
export const blockUser = async (id: string) => {
  const response = await Api.post(adminRoutes.blockUser, { id: id });
  console.log("response =>", response.data);
  return response.data;
};

// Logout admin
export const adminLogout = async () => {
  const response = await Api.post(adminRoutes.logout)
  return response.data

}
