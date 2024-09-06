import React from "react";
import { useGetPosts } from "../../hook/usePosts";
import { Box, CircularProgress, Skeleton, Typography } from "@mui/material";
import HomePostCard from "../common/utilies/HomePostsCard";
import { IPost } from "../../@types/postType";

const FeedPostsLists = () => {
  const { data, isLoading, error } = useGetPosts();
  
  if(isLoading){
    return (
      <Box sx={{ maxWidth: 800, margin: "auto", mt: 3, mb: 2 }}>
      {Array.from(new Array(5)).map((_, index) => (
        <Box key={index} sx={{ mb: 2 }}>
          <Skeleton variant="rectangular" width="100%" height={200} />
          <Skeleton width="60%" sx={{ mt: 1 }} />
          <Skeleton width="80%" />
          <Skeleton width="40%" />
        </Box>
      ))}
    </Box>
    )
  }

  if (!data || !data?.posts?.length) {
    return <Typography>No posts found</Typography>;
  }

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
      {data.posts.map((post: IPost) => (
        <HomePostCard key={post._id} post={post} />
      ))}
    </Box>
  );
};

export default FeedPostsLists;
