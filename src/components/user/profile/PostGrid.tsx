import { Grid } from "@mui/material";
import PostCard from "./PostCard";

const PostGrid = ({ posts }: { posts: any[] }) => {
  console.log("posts ===>", posts.length);

  return (
    <Grid container spacing={2} justifyContent="center" padding={0}>
      {posts.map((post: any) => (
        <Grid item key={post._id} xs={12} sm={12} md={12}>
          <>
            {" "}
            <PostCard post={post} />
          </>
        </Grid>
      ))}
    </Grid>
  );
};
export default PostGrid;
