import React, { useEffect, useState } from "react";
import { showToastError, showToastSuccess } from "../common/utilies/toast";
import { fetchGroups, joinGroup } from "../../API/group";
import { IGroup } from "../../@types/groupType";
import { UserPlus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import useGetUser from "../../hook/getUser";

interface props {
  isCreated: boolean;
}

const GroupLists: React.FC<props> = ({ isCreated }) => {
  const [groups, setGroups] = useState<IGroup[] | []>([]);
  const [isJoined, setIsJoin] = useState<boolean>(false);
  const navigate = useNavigate();
  const currentUser = useGetUser();

  const fetchGroupsLists = async () => {
    try {
      const result = await fetchGroups();
      if (result.success) {
        setGroups(result.result);
        if (result.result.members.includes(currentUser.id)) {
          console.log("joined ahn")
          setIsJoin(true);
        }
      } else {
        showToastError("Failed to fetch groups");
      }
    } catch (error) {
      console.error("Fetch groups failed:", error);
    }
  };

  const handleViewGroup = (groupId: string) => {
    try {
      navigate(`/auth/group/${groupId}`);
    } catch (error) {}
  };

  const handleJoinGroup = async (groupId: string) => {
    try {
      const result = await joinGroup(groupId);
      console.log(result);
      if (result.success) {
        showToastSuccess(result.message);
        fetchGroupsLists();
      } else {
        showToastError(result.message);
      }
    } catch (error) {}
  };

  useEffect(() => {
    fetchGroupsLists();
  }, [isCreated]);

  return (
    <div className="flex flex-col items-center">
      {groups.length === 0 ? (
        <div className="text-center py-4">No groups available</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 p-4 cursor-pointer ">
          {groups.map((group: IGroup) => (
            <div
              key={group._id}
              className="bg-white rounded-lg shadow-lg overflow-hidden transition-transform duration-300 hover:scale-105 w-56 h-[300px] flex flex-col "
              onClick={() => handleViewGroup(group._id)}
            >
              <img
                src={group.groupImageUrl || "/api/placeholder/300/200"}
                alt={group.groupName}
                className="w-full h-32 object-cover"
              />
              <div className="p-4 flex flex-col flex-grow">
                <div className="flex-grow">
                  <h2 className="text-md font-semibold mb-2 text-zinc-900 font-poppins">
                    {group.groupName}
                  </h2>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2 font-poppins">
                    {group.description}
                  </p>
                </div>
                <div className=" flex justify-center">
                  <button className="bg-zinc-950 rounded-full w-32 text-white font-semibold py-1 px-2 hover:bg-zinc-900 transition duration-300 ease-in-out flex items-center justify-center mt-4">
                    <UserPlus size={15} className="mr-2 " />
                    <span
                      className="text-sm"
                      onClick={() => handleJoinGroup(group._id)}
                    >
                      Join Group
                    </span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default GroupLists;
