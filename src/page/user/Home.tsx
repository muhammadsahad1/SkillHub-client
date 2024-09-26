import React from "react";
import NavBar from "../../components/common/navBar";
import UsersRelatedSkill from "../../components/user/UsersRelatedSkill";
import useGetUser from "../../hook/getUser";
import DisplayPostCard from "../post/DisplayPostCard";
import FeedPostsLists from "../../components/post/FeedPostsLists";
import { motion } from "framer-motion";
import LandingContent from "../../components/user/LandingContent";

const Home: React.FC = () => {
  const currentUser = useGetUser();

  return (
    <div className="flex min-h-screen justify-center font-poppins bg-zinc-100">
      <NavBar />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col justify-center mt-16 sm:mt-24 w-full max-w-4xl px-4"
      >
        {currentUser?.skill || currentUser?.email ? (
          <>
            <h1 className="text-zinc-950 text-4xl sm:text-5xl font-bold text-center mb-4 mt-6">
              Empower Your Skills, Connect with Experts
            </h1>
            <div className="w-full">
              <DisplayPostCard />
              <hr className="mt-8 border-zinc-400" />
              <UsersRelatedSkill />
              <hr className="mt-8 border-zinc-400" />
              <FeedPostsLists />
            </div>
          </>
        ) : (
          <LandingContent />
        )}
      </motion.div>
    </div>
  );
};

export default Home;
