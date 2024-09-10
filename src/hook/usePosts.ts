import {
  useQuery,
  useMutation,
  useQueryClient,
  useInfiniteQuery,
} from "react-query";
import {
  uploadPost,
  fetchFeed,
  deletPost,
  editPost,
  postLike,
  fetchMyPosts,
  addComment,
  commentDelete,
  editingComment,
  viewPost,
} from "../API/post";
import useGetUser from "./getUser";
import {
  showToastError,
  showToastSuccess,
} from "../components/common/utilies/toast";
import { LastPage } from "@mui/icons-material";

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

  return useInfiniteQuery(
    ["posts", user?.skill],
    ({ pageParam = 1 }) => fetchFeed(user?.skill, pageParam),
    {
      enabled: !!user?.skill,
      getNextPageParam: (lastPage, allPages) => {
        // Determine if there are more pages to fetch
        return lastPage.hasMore ? allPages.length + 1 : undefined;
      },
      staleTime: 5 * 60 * 1000,
    }
  );
};
// Hook to get posts
const useGetMyPosts = () => {
  const user = useGetUser();
  return useQuery(["posts", user?.id], () => fetchMyPosts(), {
    enabled: !!user?.id,
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
  });
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
        showToastSuccess("Post edit successfully");
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

const useAddComment = () => {
  const queryClient = useQueryClient();
  return useMutation(addComment, {
    onSuccess: (data) => {
      if (data.success) {
        // Validating the queries related to the specific post
        queryClient.invalidateQueries(["posts"]);
        queryClient.invalidateQueries(["post", data.postId]);
        return data;
      } else {
        showToastError(data.message);
      }
    },
  });
};

const useDeleteComment = () => {
  const queryClient = useQueryClient();
  return useMutation(commentDelete, {
    onSuccess: (data) => {
      if (data.success) {
        showToastSuccess(data.message);
        queryClient.invalidateQueries("posts");
        queryClient.invalidateQueries(["post", data.postId]);
      } else {
        showToastError(data.message);
      }
    },
  });
};

const useEditComment = () => {
  const queryClient = useQueryClient();
  return useMutation(editingComment, {
    onSuccess: (data) => {
      if (data.success) {
        queryClient.invalidateQueries("posts");
        queryClient.invalidateQueries(["post", data.postId]);
      } else {
        showToastError(data.message);
      }
    },
  });
};

const useViewPost = (postId: string) => {
  return useQuery(["post", postId], () => viewPost(postId), {
    enabled: !!postId, // Fetch only if postId is available
    onError: (error: any) => {
      console.error("Fetch error:", error.message);
      showToastError("Failed to fetch post");
    },
  });
};

export {
  useUploadPost,
  useGetPosts,
  useDeletePost,
  useEditPost,
  usePostLike,
  useGetMyPosts,
  useAddComment,
  useDeleteComment,
  useEditComment,
  useViewPost,
};
