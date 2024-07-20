import { userFormData } from "../@types/user";
import { IVerifyCreateUser } from "../@types/createUser";
import Api from "../services/axios";
import userRoutes from "../services/endpoints/userEndpoints";
import { User } from "../@types/allTypes";

// HERE USER EACH API REQUEST
export const userSignup = async (userData: userFormData) => {
  try {
    const response = await Api.post(userRoutes.signup, userData);
    return response.data;
    
  } catch (error: any) {
    if (error.response) {

      return error.response.data;

    } else if (error.request) {
      // Request was made but no response received
      return { success: false, message: "No response from server" };
    } else {
    
      return { success: false, message: error.message };
    }
  }
};

// verifyOTP and creating user
export const verifyCreateUser = async ({email,verifyCode}: IVerifyCreateUser) => {
  try {
    const response = await Api.post(userRoutes.createUser, {
      email,
      verifyCode,
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


// Resent OTP
export const resentOtp = async(email : string)=>{
  try {
  console.log("resent API CALL",email)
  const response = await Api.post(userRoutes.resentOtp,{email : email})
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

// Login User 
export const userLogin = async(email : string,password : string) => {
  try {
    const response = await Api.post(userRoutes.login,{email : email ,password : password})
    console.log(response)
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

// User google Login
export const googleLogin = async(name: string, email: string, picture: string, ) => {
  try {
    console.log("google routil vannu")
    const response = await Api.post(userRoutes.googleLogin,{ name : name , email : email , picture : picture })
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

// Forgot password
export const forgotPassword = async(email : string) => {
  try {
    console.log("api call ayieee")
    const response = await Api.post(userRoutes.fogotPassword,{email : email})
    console.log("rsponse =====",response.data)
    return response.data
  } catch (error: any) {
    console.log(error)
    if (error.response) {
      return error.response.data;

    } else if (error.request) {
      return { success: false, message: "No response from server" };
    } else {
      return { success: false, message: error.message };
    }
  }finally {
    console.log("finaly ...sajaleeee")
  }
} 
// Verify resetToken
export const verifyResetToken = async (resetToken : string) => {
  try {
    const response = await Api.post(userRoutes.verifyResetToken,{resetToken : resetToken})
    console.log("verify resetToken response",response)
  } catch (error : any) {
    if (error.response) {
      return error.response.data;

    } else if (error.request) {
      return { success: false, message: "No response from server" };
    } else {
      return { success: false, message: error.message };
    }
  }
}

// Create Profile
export const createProfile = async (userProfile: User) => {
  try {
    const response = await Api.post(userRoutes.createProfile,userProfile,{
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    
    console.log(response.data)
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

// Logout user
export const logoutUser = async() => {
try {
  const response = await Api.post(userRoutes.logout)
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