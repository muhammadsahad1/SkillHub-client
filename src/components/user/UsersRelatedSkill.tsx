import React, { useState } from "react";
import OutlinedCard from "../common/Card";
import { getSkillRelatedUsers } from "../../API/user";
import useGetUser from "../../hook/getUser";
import SkeletonUsers from "../common/skeleton/SkeletonUserList";

export interface IuserSkillCardProps {
  _id?: string;
  userName?: string;
  profileUrl?: string;
  coverImgUrl?: string;
  country?: string;
  skill?: string;
  bio?: string;
}

const UsersRelatedSkill = () => {
  const currentUser = useGetUser();
  const currentUserSkill = currentUser.skill;
  const [skillRelatedUsers, setSkillRelatedUsers] = useState<any>([]);
  const [isLoading, setLoading] = useState<boolean>(false);

  const fetchSkillRelatedUsers = async () => {
    try {
      setLoading(true);
      const result = await getSkillRelatedUsers(currentUserSkill);

      if (result.success) {
        setSkillRelatedUsers(result.userDetails);
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    if (currentUser.skill) {
      fetchSkillRelatedUsers();
    }
  }, []);

  return (
    <div className="mt-5">
      {skillRelatedUsers.length > 0 && (
        <p className="font-poppins font-semibold text-zinc-900">
          Your Skill Network
        </p>
      )}

      {isLoading ? (
        <SkeletonUsers />
      ) : skillRelatedUsers.length > 0 ? (
        <OutlinedCard users={skillRelatedUsers} />
      ) : (
        <div className="text-center mt-5">
          <p className="text-zinc-700 font-medium">
            No users found with the skill "{currentUserSkill}".
          </p>
          <p className="text-zinc-600 mt-2">
            Connect with groups or search for users based on other skills.
          </p>
          {/* Optionally add a search or connect button */}
          {/* <button className="bg-blue-500 text-white mt-4 px-4 py-2 rounded-md">
          Search for Groups
        </button> */}
        </div>
      )}
    </div>
  );
};

export default UsersRelatedSkill;
