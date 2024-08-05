// hooks/useGetPosts.ts
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

const useGetPosts = () => {
  const posts = useSelector((state: RootState) => state.post.posts);
  return posts;
}

export default useGetPosts;
