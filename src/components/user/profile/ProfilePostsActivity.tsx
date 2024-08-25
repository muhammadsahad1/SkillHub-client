import React, { useEffect, useState } from "react";
import PostGrid from "./PostGrid";
import { useGetMyPosts } from "../../../hook/usePosts";

const ProfilePostsActivity = () => {
  const [postType, setPostType] = useState<string>("all");
  // const { posts, isLoading } = useProfilePosts<string>(postType);
  const { data: posts, isLoading, isError } = useGetMyPosts();
  console.log("data ==> in  viewProfile",posts)

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
      <PostGrid  posts={posts}/>
    </div>
  );
};

export default ProfilePostsActivity;
