import { useEffect, useState } from "react";
import React from "react";
import NavBar from "../../components/common/navBar";
import UsersRelatedSkill from "../../components/user/UsersRelatedSkill";
import useGetUser from "../../hook/getUser";
import { getSkillRelatedUsers } from "../../API/user";

const Home: React.FC = () => {
  const currentUser = useGetUser();
  return (
    <div className="flex flex-col min-h-screen">
      <NavBar />
      <div className="flex-grow mt-16 sm:mt-20">
        {currentUser?.skill ? (
          <UsersRelatedSkill />
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
