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
      return { success: false, message: "No response from server" };
    } else {
      return { success: false, message: error.message };
    }
  }
};

// verifyOTP and creating user
export const verifyCreateUser = async ({
  email,
  verifyCode,
}: IVerifyCreateUser) => {
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
export const resentOtp = async (email: string) => {
  try {
    const response = await Api.post(userRoutes.resentOtp, { email: email });
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

// Login User
export const userLogin = async (email: string, password: string) => {
  try {
    const response = await Api.post(userRoutes.login, {
      email: email,
      password: password,
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

// User google Login
export const googleLogin = async (
  name: string,
  email: string,
  picture: string
) => {
  try {
    const response = await Api.post(userRoutes.googleLogin, {
      name: name,
      email: email,
      picture: picture,
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

// Forgot password
export const forgotPassword = async (email: string) => {
  try {
    const response = await Api.post(userRoutes.fogotPassword, email);
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

// resetPassword
export const resetPassword = async (passwordToken: {
  password: string;
  resetToken: string;
}) => {
  try {
    const response = await Api.post(userRoutes.resetPassword, passwordToken);
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

// Create Profile
export const createProfile = async (userProfile: User) => {
  try {
    const response = await Api.post(userRoutes.createProfile, userProfile, {
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

// profile image fetching
export const profileImage = async (userId : string) => {
  try {
    const response = await Api.get(userRoutes.profileImage,{ params : { userId}})
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

// view Profile
export const viewProfile = async () => {
  try {
    const response = await Api.get(userRoutes.viewProfile)
    console.log("response ===>",response.data)
    response.data
  } catch (error) {
    
  }
}

// Logout user
export const logoutUser = async () => {
  try {
    const response = await Api.post(userRoutes.logout);
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
