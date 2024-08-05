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
    console.log("first res ===>", response.data)
    return response.data

  } catch (error) {}
};

// Delete a post
export const deletPost = async (postId : string) => {
  try {
    const response = await Api.delete(userRoutes.fetchPosts, {
      params: { postId: postId },
    });
    console.log("first res ===============>", response.data)
    return response.data

  } catch (error) {
    
  }
}