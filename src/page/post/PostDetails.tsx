import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useViewPost } from "../../hook/usePosts";
import { showToastError } from "../../components/common/utilies/toast";
import { Grid, Typography } from "@mui/material";
import PostCard from "../../components/user/profile/PostCard";
import { viewPost } from "../../API/post";

const PostDetails = () => {
  const { postId } = useParams<{ postId: string }>();
  const [onePost,setPost] = useState<any>([])
  // const { data: post, isLoading, isError } = useViewPost(postId as string);
  const viewPostt = async (postId: string) => {
    const post = await viewPost(postId);
    setPost(post)
    console.log("post =(())==>", post);
  };

  useEffect(() => {
    viewPostt(postId as string);
  }, [postId]);

  return (
    <Grid item key={onePost._id} xs={12} sm={12} md={12}>
      <>
        <PostCard post={onePost} />
      </>
    </Grid>
  );
};

export default PostDetails;
