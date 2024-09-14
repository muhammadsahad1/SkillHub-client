import React, { useRef, useCallback } from "react";
import { useGetPosts } from "../../hook/usePosts";
import { Box, CircularProgress, Typography, Skeleton } from "@mui/material";
import HomePostCard from "../common/utilies/HomePostsCard";
import { IPost } from "../../@types/postType";

const FeedPostsLists = () => {
  const { data, fetchNextPage, hasNextPage, isFetching, isLoading } =
    useGetPosts();

  // Ref for the Intersection Observer
  const observer = useRef<IntersectionObserver | null>(null);

  // Callback to attach the Intersection Observer to the last post
  const lastPostElementRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (isFetching) return;

      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasNextPage) {
          fetchNextPage();
        }
      });

      if (node) observer.current.observe(node);
    },
    [isFetching, hasNextPage, fetchNextPage]
  );

  if (isLoading) {
    return (
      <Box sx={{ maxWidth: 800, margin: "auto", mt: 3, mb: 2 }}>
        {Array.from(new Array(5)).map((_, index) => (
          <Box key={index} sx={{ mb: 2 }}>
            <Skeleton variant="rectangular" width="100%" height={200} />
            <Skeleton width="60%" sx={{ mt: 1 }} />
            <Skeleton width="80%" />
            <Skeleton width="40%" />
          </Box>
        ))}
      </Box>
    );
  }

  if (!data || !data.pages.flatMap((page) => page.posts).length) {
    return (
      <div className="mb-11 mt-5 text-center">
        <h2 className="text-gray-800 font-poppins font-bold">
          No post available
        </h2>
      </div>
    );
  }

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
      {data.pages
        .flatMap((page) => page.posts)
        .map((post: IPost, index, arr) => (
          <HomePostCard
            key={post._id}
            post={post}
            ref={index === arr.length - 1 ? lastPostElementRef : null}
          />
        ))}

      {isFetching && (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            mt: 2,
            mb: 10, // Add some margin at the top for better spacing
          }}
        >
          <CircularProgress />
        </Box>
      )}
      {!hasNextPage && (
        <div className="flex justify-center items-center mb-28 mt-12">
          <Typography>
            <span className="font-bold font-poppins text-lg text-zinc-700">
              You've reached the end! Stay tuned for more content.
            </span>
          </Typography>
        </div>
      )}
    </Box>
  );
};

export default FeedPostsLists;
