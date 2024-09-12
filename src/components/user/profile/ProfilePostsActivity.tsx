import React, { useEffect, useState } from "react";
import PostGrid from "./PostGrid";
import { useGetMyPosts } from "../../../hook/usePosts";

const ProfilePostsActivity = () => {
  const [postType, setPostType] = useState<string>("all");
  // const { posts, isLoading } = useProfilePosts<string>(postType);
  const { data: posts, isLoading, isError } = useGetMyPosts();
  console.log("data ==> in  viewProfile", posts);

  if (isLoading) {
    return (
      <div className="flex flex-col lg:flex-row bg-white rounded-lg shadow-lg overflow-hidden mb-4 font-poppins transform transition duration-300 hover:shadow-xl animate-pulse mt-12">
        <div className="lg:w-1/3 w-full bg-gray-200 h-48 lg:h-full"></div>
        <div className="flex-1 p-4 bg-white">
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <div className="w-24 h-4 bg-gray-200 rounded"></div>
              <div className="w-32 h-4 bg-gray-200 rounded"></div>
              <div className="w-16 h-4 bg-gray-200 rounded"></div>
            </div>
          </div>
          <div className="mt-4 space-y-2">
            <div className="w-1/2 h-6 bg-gray-200 rounded"></div>
            <div className="w-2/3 h-4 bg-gray-200 rounded"></div>
            <div className="w-1/2 h-4 bg-gray-200 rounded"></div>
            <div className="w-3/4 h-4 bg-gray-200 rounded"></div>
          </div>
          <div className="mt-4 flex justify-end">
            <div className="w-24 h-8 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  if (isError) {
    return <div>Error loading posts</div>;
  }

  if (!posts) {
    return (
      <div className="mb-5 text-center">
        <h2 className="text-gray-800 font-poppins font-bold">
          No post available
        </h2>
      </div>
    );
  }
  console.log("res ====>", posts);
  return (
    <div className="flex justify-center mb-20">
      <PostGrid posts={posts} />
    </div>
  );
};

export default ProfilePostsActivity;
