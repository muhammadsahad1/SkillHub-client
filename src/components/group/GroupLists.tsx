import React, { useEffect, useState } from "react";
import { showToastError, showToastSuccess } from "../common/utilies/toast";
import { fetchGroups, joinGroup } from "../../API/group";
import { IGroup } from "../../@types/groupType";
import { Eye, MessageCircle, UserPlus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import useGetUser from "../../hook/getUser";

interface props {
  isCreated: boolean;
}

const GroupLists: React.FC<props> = ({ isCreated }) => {
  const [groups, setGroups] = useState<IGroup[] | []>([]);
  const [loadingGroupId, setLoadingGroupId] = useState<string | null>(null);
  const navigate = useNavigate();
  const currentUser = useGetUser();

  const fetchGroupsLists = async () => {
    try {
      const result = await fetchGroups();
      console.log(result);
      if (result.success) {
        setGroups(result.result);
      } else {
        showToastError("Failed to fetch groups");
      }
    } catch (error) {
      console.error("Fetch groups failed:", error);
    }
  };

  const handleViewGroupChat = (groupId: string) => {
    navigate(`/auth/groupChat/${groupId}`);
  };

  const handleJoinGroup = async (groupId: string, event: React.MouseEvent) => {
    event.stopPropagation(); // Prevents triggering the parent div's onClick
    setLoadingGroupId(groupId); // Set loading state for the current group
    try {
      const result = await joinGroup(groupId);
      if (result.success) {
        showToastSuccess(result.message);
        fetchGroupsLists();
      } else {
        showToastError(result.message);
      }
    } catch (error) {
      showToastError("Failed to join group");
    } finally {
      setLoadingGroupId(null); // Reset loading state
    }
  };

  useEffect(() => {
    fetchGroupsLists();
  }, [isCreated]);

  return (
    <div className="flex flex-col items-center">
      {groups.length === 0 ? (
        <div className="text-center py-4">No groups available</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 p-4 cursor-pointer">
          {groups.map((group: IGroup) => (
            <div
              key={group._id}
              className="bg-white rounded-lg shadow-lg overflow-hidden  w-56 h-[300px] flex flex-col"
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
                <div className="flex justify-center">
                  {group.members.some(
                    (member :any) => member?.userId  === currentUser.id
                  ) ? (
                    <button
                      className="bg-zinc-100 rounded-full w-32 text-black font-semibold py-1 px-2 hover:bg-zinc-200 transition-transform duration-300 hover:scale-105 ease-in-out flex items-center justify-center mt-4"
                      onClick={(event) => {
                        event.stopPropagation();
                        handleViewGroupChat(group._id);
                      }}
                    >
                      <MessageCircle size={15} className="mr-2" />
                      <span className="text-sm">Open Chat</span>
                    </button>
                  ) : (
                    <button
                      className="bg-zinc-950 rounded-full w-32 text-white font-semibold py-1 px-2 hover:bg-zinc-900 ease-in-out flex items-center justify-center mt-4 transition-transform duration-300 hover:scale-105"
                      onClick={(event) => handleJoinGroup(group._id, event)}
                      disabled={loadingGroupId === group._id}
                    >
                      {loadingGroupId === group._id ? (
                        <svg
                          className="animate-spin h-5 w-5 mr-2 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zM12 24c-4.627 0-8-3.373-8-8h-4c0 6.627 5.373 12 12 12v-4z"
                          ></path>
                        </svg>
                      ) : (
                        <UserPlus size={15} className="mr-2" />
                      )}
                      <span className="text-sm">
                        {loadingGroupId === group._id
                          ? "Joining..."
                          : "Join Group"}
                      </span>
                    </button>
                  )}
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
