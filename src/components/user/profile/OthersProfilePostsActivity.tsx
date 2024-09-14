import React, { useEffect, useState } from "react";
import { getOthersPosts } from "../../../API/user";
import OthersPostGrid from "./OthersPostGrid";

const OthersProfilePostsActivity = ({
  userId,
}: {
  userId: string | undefined;
}) => {
  const [posts, setPosts] = useState();
  const fetchProfilePosts = async () => {
    try {
      const result = await getOthersPosts(userId);
      if (result.success) {
        setPosts(result.posts);
      }
    } catch (error) {}
  };

  useEffect(() => {
    fetchProfilePosts();
  }, []);

  if (!posts) {
    return <div>No posts available</div>;
  }

  console.log("res ====>", posts);
  return (
    <div className="flex justify-center mb-20">
      {/* <PostTypeSelector selectedType={postType} onTypeChange={setPostType} /> */}
      <OthersPostGrid posts={posts} />
    </div>
  );
};

export default OthersProfilePostsActivity;
