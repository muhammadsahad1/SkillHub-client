import { FollowParams, userFormData } from "../@types/user";
import { IVerifyCreateUser } from "../@types/createUser";
import Api from "../services/axios";
import userRoutes from "../services/endpoints/userEndpoints";
import { User } from "../@types/allTypes";
import { verifyRequest } from "../components/user/profile/ProfessionalAccountModal";

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

// changePassword
export const changePassword = async (
  currentPassword: string,
  newPassword: string
) => {
  try {
    const response = await Api.post(userRoutes.changePassword, {
      currentPassword,
      newPassword,
    });
    console.log("recieve response =>", response);
    return response.data;
  } catch (error) {}
};

// Create Profile
export const createProfile = async (userProfile: User) => {
  try {
    const response = await Api.post(userRoutes.createProfile, userProfile, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    console.log("res first => ", response.data);
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

// verify requesing for proffesional account
export const verifityRequesting = async (formData: verifyRequest) => {
  try {
    const response = await Api.post(userRoutes.verifyRequesting, { formData });
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

// upload cover image
export const coverImageUpload = async (formdata: FormData) => {
  try {
    console.log("api call");
    const response = await Api.post(userRoutes.uploadCoverImg, formdata, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    console.log("first res for cover img", response.data);
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
export const profileImage = async () => {
  try {
    const response = await Api.get(userRoutes.profileImage);
    console.log("resssssssssssssss+====>", response.data);

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

// view Profile
export const viewProfile = async () => {
  try {
    const response = await Api.get(userRoutes.viewProfile);
    console.log("rs  in view profile ===>", response.data);

    response.data;
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
// Account Privacy
export const accountPrivacy = async (isPrivacy: boolean) => {
  try {
    const response = await Api.post(userRoutes.accountPrivacy, {
      isPrivacy: isPrivacy,
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
// showNotification
export const showNotification = async (isShowNotification: boolean) => {
  try {
    const response = await Api.post(userRoutes.showNotification, {
      isShowNotification: isShowNotification,
    });

    return response.data;
  } catch (error) {}
};

// Fetching the skill related users
export const getSkillRelatedUsers = async (currentUserSkill: string) => {
  try {
    const response = await Api.get(userRoutes.getSkillRelatedUsers, {
      params: {
        skill: currentUserSkill,
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
// get the Other userDetails
export const getOtherUserDetails = async (userId: string) => {
  try {
    const response = await Api.get(userRoutes.getUserDetails, {
      params: { userId: userId },
    });
    console.log("ress in otherViewDetails ===>", response.data);

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

// follow click
export const followApi = async ({
  toFollowingId,
  fromFollowerId,
}: FollowParams) => {
  try {
    const response = await Api.post(userRoutes.userFollowing, {
      toFollowingId,
      fromFollowerId,
    });
    return response.data;
  } catch (error) {}
};

// get my followings
export const getMyFollowings = async () => {
  try {
    const response = await Api.get(userRoutes.getMyFollowings);
    console.log("ress=>", response.data);
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
// unFollow
export const unFollow = async (
  toUnFollowId: string,
  fromFollowerId: string | undefined
) => {
  try {
    const response = await Api.post(userRoutes.unFollow, {
      toUnFollowId: toUnFollowId,
      fromFollowerId: fromFollowerId,
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
// listFollowers
export const myFollowers = async () => {
  try {
    const response = await Api.get(userRoutes.userFollowers);
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
// remove follower from followers list
export const removeFollower = async (toRemoveId: string) => {
  try {
    const response = await Api.post(userRoutes.removeFollower, {
      toRemoveId: toRemoveId,
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
// followBack
export const followBack = async (toFollowId: string) => {
  try {
    const response = await Api.post(userRoutes.followBack, {
      toFollowId: toFollowId,
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

export const otherFollowers = async (userId: string) => {
  try {
    const response = await Api.get(userRoutes.othersFollowers, {
      params: {
        userId: userId,
      },
    });
    console.log("res in frontend ===>", response.data);
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

export const othersFollowings = async (userId: string) => {
  try {
    console.log("userId ==>", userId);

    const response = await Api.get(userRoutes.othersFollowings, {
      params: {
        userId: userId,
      },
    });
    console.log("res in frontend ===>", response.data);
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

// getOthers posts
export const getOthersPosts = async (userId: string) => {
  try {
    const result = await Api.get(userRoutes.getOthersPosts, {
      params: {
        userId: userId,
      },
    });
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

export const fetchSearchUsers = async (query: string) => {
  try {
    const response = await Api.get(userRoutes.searchUser, {
      params: { query },
    });
    console.log("after users search ==>", response.data);
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
