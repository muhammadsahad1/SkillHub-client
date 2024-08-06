import Api from "../services/axios";
import userRoutes from "../services/endpoints/userEndpoints";
// createPost and Uploading
export const uploadPost = async (formData: FormData) => {
  try {
    const response = await Api.post(userRoutes.uploadPost, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    console.log("result ===>", response.data);
    return response.data;
  } catch (error) {}
};

export const fetchFeed = async (skill: string) => {
  try {
    const response = await Api.get(userRoutes.fetchPosts, {
      params: { skill: skill },
    });
    console.log("first res ===>", response.data);
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
// Fetch my post data
export const fetchMyPosts = async () => {
  try {
    const response = await Api.get(userRoutes.fetchMyPost);
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


// Delete a post
export const deletPost = async (postId: string) => {
  try {
    const response = await Api.delete(userRoutes.fetchPosts, {
      params: { postId: postId },
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

// Edit a post caption only
export const editPost = async ({
  id,
  caption,
}: {
  id: string;
  caption: string;
}) => {
  try {
    const response = await Api.post(userRoutes.editPost, {
      id,
      caption,
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

// like post
export const postLike = async (postId: string) => {
  try {
    console.log("api calll");
    
    const response = await Api.post(userRoutes.postLike, { postId: postId });
    console.log("res in first for post like",response.data)
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
