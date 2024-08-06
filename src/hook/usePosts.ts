import { useQuery, useMutation, useQueryClient } from "react-query";
import { uploadPost, fetchFeed, deletPost, editPost, postLike, fetchMyPosts } from "../API/post";
import useGetUser from "./getUser";
import {
  showToastError,
  showToastSuccess,
} from "../components/common/utilies/toast";

// Hook to upload a post and refetch the feed
const useUploadPost = () => {
  const queryClient = useQueryClient();
  return useMutation(uploadPost, {
    onSuccess: (data) => {
      queryClient.invalidateQueries("feed");
      queryClient.invalidateQueries("posts");
      console.log("data after uploaded post ==>", data);
    },
    onError: (error: Error) => {
      console.error("Upload error:", error.message);
      showToastError("Failed to upload post");
    },
  });
};

// Hook to get posts
const useGetPosts = () => {
  const user = useGetUser();
  return useQuery(["posts", user?.skill], () => fetchFeed(user?.skill), {
    enabled: !!user?.skill,
    staleTime: 5 * 60 * 1000,
  });
};

// Hook to get posts

const useGetMyPosts = () => {
  const user = useGetUser(); 
  return useQuery(
    ['posts', user?.id], 
    () => fetchMyPosts(), 
    {
      enabled: !!user?.id, 
      staleTime: 5 * 60 * 1000, 
      refetchOnWindowFocus: false, 
    }
  );
};
// Hook to delete a post
const useDeletePost = () => {
  const queryClient = useQueryClient();
  return useMutation(deletPost, {
    onSuccess: (data) => {
      if (data.success) {
        showToastSuccess(data.message);
        queryClient.invalidateQueries("posts");
      } else {
        showToastError(data.message);
      }
    },
    onError: (error: Error) => {
      showToastError("Failed to delete post");
    },
  });
};

// Hook to edit a post
const useEditPost = () => {
  const queryClient = useQueryClient();
  return useMutation(editPost, {
    onSuccess: (data) => {
      if (data) {
        showToastSuccess(data.message);
        queryClient.invalidateQueries("posts");
      }
    },
    onError: (error: Error) => {
      showToastError("Failed to edit post");
    },
  });
};


// Hook to like a post
const usePostLike = () => {
  const queryClient = useQueryClient();
  return useMutation(postLike, {
    onSuccess: (data) => {
      if (data.success) {
        showToastSuccess(data.message);
        queryClient.invalidateQueries("posts");
      }
    },
    onError: (error: Error) => {
      showToastError("Failed to like post");
    },
  });
};

export { useUploadPost, useGetPosts, useDeletePost, useEditPost, usePostLike,useGetMyPosts };