import React from "react";
import { Grid } from "@mui/material";
import OthersPostCard from "./OthersPostCard";


const OthersPostGrid = ({ posts }: { posts: any[] }) => {
  return (
  
    <Grid container spacing={2} justifyContent="center" padding={0}>
  
        {posts.map((post: any) => (
          <Grid item key={post.id} xs={12} sm={12} md={12}>
            <OthersPostCard post={post} />
          </Grid>
        ))}
      </Grid>
  
  );
};
export default OthersPostGrid;