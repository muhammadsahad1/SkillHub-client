import React from "react";
import { useGetPosts } from "../../hook/usePosts";
import { Box, CircularProgress, Typography } from "@mui/material";
import HomePostCard from "../common/utilies/HomePostsCard";

const FeedPostsLists = () => {
  const { data, isLoading, error } = useGetPosts();
  console.log("data ===>",data);

    // console.log("posts fetched ==+>" , posts)

  if (!data || !data?.posts?.length) {
    return <Typography>No posts found</Typography>;
  }


  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
      {data.posts.map((post: any) => (
        <HomePostCard key={post._id} post={post} />
      ))}
    </Box>
  );
};

export default FeedPostsLists;
