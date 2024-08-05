import React, { useState } from "react";
import useGetPosts from "../../../hook/getPosts";
import PostTypeSelector from "./PostTypeSelector ";
import PostGrid from "./PostGrid";
import { useProfilePosts } from "../../../hook/useProfilePosts";

const ProfilePostsActivity = () => {
  const [postType, setPostType] = useState<string>("all");
  // const { posts, isLoading } = useProfilePosts<string>(postType);
  const posts = useGetPosts()
  return (
    <div className="flex justify-center mb-20">
      {/* <PostTypeSelector selectedType={postType} onTypeChange={setPostType} /> */}
      <PostGrid posts={posts}/>
    </div>
  );
};

export default ProfilePostsActivity;
