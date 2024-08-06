import React, { useEffect, useState } from "react";
import useGetPosts from "../../../hook/getPosts";
import PostTypeSelector from "./PostTypeSelector ";
import PostGrid from "./PostGrid";
import { useProfilePosts } from "../../../hook/useProfilePosts";
import { useDispatch } from "react-redux";
import useGetUser from "../../../hook/getUser";
import { useGetMyPosts } from "../../../hook/usePosts";

const ProfilePostsActivity = () => {
  const [postType, setPostType] = useState<string>("all");
  // const { posts, isLoading } = useProfilePosts<string>(postType);
  const { data: posts, isLoading, isError } = useGetMyPosts();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error loading posts</div>;
  }

  if (!posts) {
    return <div>No posts available</div>;
  }
  console.log("res ====>",posts)
  return (
    <div className="flex justify-center mb-20">
      {/* <PostTypeSelector selectedType={postType} onTypeChange={setPostType} /> */}
      <PostGrid posts={posts}/>
    </div>
  );
};

export default ProfilePostsActivity;
