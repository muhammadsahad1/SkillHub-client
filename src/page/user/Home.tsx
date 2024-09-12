import { useEffect, useState } from "react";
import React from "react";
import NavBar from "../../components/common/navBar";
import UsersRelatedSkill from "../../components/user/UsersRelatedSkill";
import useGetUser from "../../hook/getUser";
import DisplayPostCard from "../post/DisplayPostCard";
import FeedPostsLists from "../../components/post/FeedPostsLists";
import { motion } from "framer-motion";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";

const Home: React.FC = () => {
  const currentUser = useGetUser();

  const LoginContent = () => (
    <div className="flex flex-col items-center justify-center space-y-6 text-center px-4">
      <h2 className="text-zinc-950 text-3xl sm:text-4xl font-bold">
        Welcome to the Skill Sharing Platform
      </h2>
      <p className="text-zinc-700 text-lg sm:text-xl max-w-2xl">
        Connect with experts, share your knowledge, and grow your skills in our
        vibrant community.
      </p>
      <div className="space-y-4">
        <h3 className="text-zinc-900 text-xl font-semibold">Why Join Us?</h3>
        <ul className="text-zinc-700 text-left list-disc list-inside space-y-2">
          <li>Learn from experienced professionals across various fields</li>
          <li>Share your expertise and help others grow</li>
          <li>Build a network of like-minded individuals</li>
          <li>Discover new opportunities for collaboration and growth</li>
        </ul>
      </div>
      <div className="flex space-x-4">
        <Link to={"auth/userLogin"}>
          <Button
            sx={{
              transition: "transform 0.2s ease-in-out",
              background: "#18181b",
              color: "whitesmoke",
              letterSpacing: 3,
              "&:hover": {
                background: "#18181b",
                transform: "scale(1.05)",
              },
            }}
          >
            Login
          </Button>
        </Link>
        <Link to={"auth/userSignup"}>
          <Button
            sx={{
              transition: "transform 0.2s ease-in-out",
              background: "#18181b",
              color: "whitesmoke",
              letterSpacing: 3,
              "&:hover": {
                background: "#18181b",
                transform: "scale(1.05)",
              },
            }}
          >
            Register
          </Button>
        </Link>
      </div>
    </div>
  );

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
          <LoginContent />
        )}
      </motion.div>
    </div>
  );
};

export default Home;
