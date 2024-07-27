import Api from "../services/axios";
import { User } from "../@types/allTypes";
import adminRoutes from "../services/endpoints/adminEndpoints";

export const adminLogin = async (email: string, password: string) => {
  try {
    
    const response = await Api.post(adminRoutes.login,{
      email : email ,
      password : password
    });
    console.log(response.data)
    return response.data
  } catch (error : any) {
    if (error.response) {
      return error.response.data;
    } else if (error.request) {
      return { success: false, message: "No response from server" };
    } else {
      return { success: false, message: error.message };
    }
  }
};
