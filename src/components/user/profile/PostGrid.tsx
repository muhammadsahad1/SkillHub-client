import React from "react";
import { Grid } from "@mui/material";
import PostCard from "./PostCard";

const PostGrid = ({ posts }: { posts: any[] }) => {
  console.log("postsssssss ==>", posts);
  return (
  
    <Grid container spacing={2} justifyContent="center" padding={0}>
  
        {posts.map((post: any) => (
          <Grid item key={post.id} xs={12} sm={6} md={4}>
            <PostCard post={post} />
          </Grid>
        ))}
      </Grid>
  
  );
};
export default PostGrid;
