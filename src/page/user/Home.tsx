import { useEffect, useState } from "react";
import React from "react";
import NavBar from "../../components/common/navBar";
import UsersRelatedSkill from "../../components/user/UsersRelatedSkill";
import useGetUser from "../../hook/getUser";
import DisplayPostCard from "../post/DisplayPostCard";

const Home: React.FC = () => {
  const currentUser = useGetUser();
  return (
    <div className="flex min-h-screen justify-center">
      <NavBar />
      <div className="flex flex-col justify-center mt-16 sm:mt-24 w-2/3">
        {currentUser?.skill ? (
          <>
            <h1 className="text-zinc-950 text-4xl sm:text-5xl font-bold text-center mb-4 mt-0">
              Empower Your Skills, Connect with Experts
            </h1>
            <div className="w-full">
              <DisplayPostCard />
              <hr className="mt-8 border-zinc-400" />
              <UsersRelatedSkill />
            </div>
          </>
        ) : (
          <div className="flex justify-center items-center h-full">
            <h2 className="text-zinc-950 text-2xl sm:text-4xl font-bold text-center px-4">
              WELCOME TO SKILL SHARING PLATFORM
            </h2>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
