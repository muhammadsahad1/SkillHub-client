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

export const fetchFeed = async (skill: string, pageParam: number) => {
  try {
    const response = await Api.get(userRoutes.fetchPosts, {
      params: { skill: skill, pageParam: pageParam },
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
    const response = await Api.post(userRoutes.postLike, { postId: postId });
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

// Adding comment on post
export const addComment = async ({
  postId,
  comment,
}: {
  postId: string;
  comment: string;
}) => {
  try {
    const response = await Api.post(userRoutes.addComment, {
      postId: postId,
      comment: comment,
    });

    console.log("res in first for post like", response.data);
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

// deleteing comment
export const commentDelete = async ({
  commentId,
  postId,
}: {
  commentId: string;
  postId: string;
}) => {
  try {
    const response = await Api.delete(userRoutes.deleteComment, {
      data: {
        postId: postId,
        commentId: commentId,
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

// editing comment
export const editingComment = async ({
  commentId,
  postId,
  updatedText,
}: {
  commentId: string;
  postId: string;
  updatedText: string;
}) => {
  try {
    const response = await Api.put(userRoutes.editComment, {
      data: {
        postId: postId,
        commentId: commentId,
        updatedText: updatedText,
      },
    });

    console.log("res after edit comment", response.data);
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

//view one post
export const viewPost = async (postId: string) => {
  try {
    const response = await Api.get(userRoutes.viewPost, {
      params: {
        postId,
      },
    });
    console.log("response =>",response)
    return response.data;
  } catch (error) {}
};
