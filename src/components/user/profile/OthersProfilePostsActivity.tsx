import { useEffect, useState } from "react";
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

  return (
    <div className="flex justify-center mb-20 items-center">  
      <OthersPostGrid posts={posts} />
    </div>
  );
};

export default OthersProfilePostsActivity;
