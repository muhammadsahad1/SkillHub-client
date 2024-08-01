import { useEffect, useState } from "react";
import React from "react";
import NavBar from "../../components/common/navBar";
import UsersRelatedSkill from "../../components/user/UsersRelatedSkill";
import useGetUser from "../../hook/getUser";
import { getSkillRelatedUsers } from "../../API/user";

export interface IuserSkillCardProps {
  _id: string;
  userName: string;
  profileUrl: string;
  coverImgUrl: string;
  country : string,
  skill: string;
  bio: string;
}

const Home: React.FC = () => {
  const currentUser = useGetUser();
  const currentUserSkill = currentUser.skill;
  const [skillRelatedUsers, setSkillRelatedUsers] = useState<
    IuserSkillCardProps[]
  >([]);
  const [isLoading, setLoading] = useState<boolean>(false);

  const fetchSkillRelatedUsers = async () => {
    try {
      const result = await getSkillRelatedUsers(currentUserSkill);
      if (result.success) {
        setSkillRelatedUsers(result.userDetails);
      }
    } catch (error) {}
  };

  console.log("fetched User ==>", skillRelatedUsers);

  React.useEffect(() => {
    if (currentUser.skill) {
      fetchSkillRelatedUsers();
    }
  }, []);

  return (
    <div className=" flex flex-col h-screen">
      <NavBar />
      {currentUser.skill ? (
        <UsersRelatedSkill users={skillRelatedUsers} />
      ) : (
        <div className="flex justify-center items-center">
          <h2 className="text-zinc-950 text-4xl font-bold mt-20">
            WELCOME TO SKILL SHARING PLATFORM
          </h2>
        </div>
      )}
    </div>
  );
};

export default Home;
