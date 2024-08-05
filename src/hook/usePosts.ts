import { useQuery, useMutation, useQueryClient } from "react-query";
import { uploadPost, fetchFeed, deletPost } from "../API/post";
import useGetUser from "./getUser";
import {
  showToastError,
  showToastSuccess,
} from "../components/common/utilies/toast";
import { useDispatch } from "react-redux";
import { Ipost, removePost, setPost } from "../redux/features/postSlices";

// hook to upload a post and refetch the feed
const useUploadPost = () => {
  const queryClient = useQueryClient();
  const dispatch = useDispatch();

  return useMutation(uploadPost, {
    onSuccess: (data) => {
      queryClient.invalidateQueries("feed");
      const post: Ipost = {
        id: data.post._id,
        userId: data.post.userId,
        postUrl: data.post.signedUrl,
        caption: data.post.caption,
        skill: data.post.skill,
        createdAt: data.post.createdAt,
        updatedAt: data.post.updatedAt,
      };
      dispatch(setPost(post));
    },
    onError: (error: Error) => {
      console.error("Upload error:", error.message);
    },
  });
};

const useGetPosts = () => {
  const user = useGetUser();
  return useQuery(["posts", user?.skill], () => fetchFeed(user?.skill), {
    enabled: !!user?.skill,
    staleTime: 5 * 60 * 1000,
  });
};

const useDeletePost = () => {
  const dispatch = useDispatch();
  const queryClient = useQueryClient();

  return useMutation(deletPost, {
    onSuccess: (data) => {
      if (data.success) {
        showToastSuccess(data.message);
        queryClient.invalidateQueries("posts");
        dispatch(removePost(data.post._id));
      } else {
        showToastError(data.message);
      }
    }
  });
};

export { useUploadPost, useGetPosts, useDeletePost };
