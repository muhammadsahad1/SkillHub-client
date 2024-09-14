import NavBar from "../../components/common/navBar";
import PostDetails from "./PostDetails";

const PostViewPage = () => {
  return (
    <div className="flex min-h-screen justify-center">
      <NavBar />
      <div className="mt-20">
        <PostDetails />
      </div>
    </div>
  );
};

export default PostViewPage;
