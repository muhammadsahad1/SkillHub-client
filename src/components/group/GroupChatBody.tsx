import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  fetchGroupMessages,
  fetchSelectedGroup,
  leaveGroup,
  sendGroupChat,
  updateOnlineStatus,
} from "../../API/group";
import { IGroup } from "../../@types/groupType";
import { showToastError, showToastSuccess } from "../common/utilies/toast";
import { Send, Info } from "lucide-react";
import useGetUser from "../../hook/getUser";
import { IMember, Member } from "../../@types/membersType";
import { useSocket } from "../../hook/useSocket";
import { useNotifyUser } from "../../hook/useNotifyUser";
import { GroupMessages } from "../../@types/groupMessageI";
import { BarLoader } from "react-spinners";
import { MdOutlineAdminPanelSettings } from "react-icons/md";

const GroupChatBody: React.FC = () => {
  const { groupId } = useParams();
  const [group, setGroup] = useState<IGroup | null>(null);
  const [messages, setMessages] = useState<GroupMessages[] | []>([]);
  const [filterGroupUsers, setFilterGroupUsers] = useState<Member[] | null>(
    null
  );
  const [searchUser, setSearchUser] = useState<string | null>(null);
  const [newMessage, setNewMessage] = useState("");
  const [showInfo, setShowInfo] = useState(false);
  const [loading, setLoading] = useState(true);
  const [groupSkills, setSkills] = useState<string[][]>([]);

  const { socket } = useSocket();
  const logedUser = useGetUser();
  const navigate = useNavigate();

  const chatContainerRef = useRef<HTMLDivElement>(null);
  const lastMessageRef = useRef<HTMLDivElement>(null);

  const fetchGroup = async (groupId: string) => {
    try {
      const result = await fetchSelectedGroup(groupId);
      if (result) {
        setGroup(result);
        if (result.skills) {
          setSkills(result.skills);
        }
        // Emit the joinGroup event
        socket?.emit("joinGroup", {
          senderId: logedUser.id,
          groupId: groupId,
        });
      }
    } catch (error: any) {
      showToastError(error.message || "Error in API request");
    } finally {
      setLoading(false);
    }
  };

  const GroupMessages = async (groupId: string) => {
    try {
      const result = await fetchGroupMessages(groupId);
      console.log("mesRes =>", result);
      setMessages(result);
    } catch (error) {
      console.error("Error fetching messages");
    }
  };

  const updateOnline = async (status: boolean) => {
    try {
      const res = await updateOnlineStatus(
        groupId as string,
        logedUser.id as string,
        status
      );
      console.log(res);
    } catch (error) {
      console.error("Error updating online status");
    }
  };

  useEffect(() => {
    if (groupId) {
      fetchGroup(groupId);
      GroupMessages(groupId);
    }
  }, [groupId]);

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!socket || !groupId || !logedUser.id) return;

    const message = newMessage.trim();
    if (!message) return;

    const newMsg: GroupMessages = {
      _id: groupId, // Now this is always a string
      media: undefined,
      readBy: [],
      sender: {
        name: logedUser.name,
        _id: logedUser.id,
        userProfile: logedUser?.picture?.imageUrl || "",
      },
      message: message,
      createdAt: new Date().toISOString(),
    };

    setMessages((prevMessages) => [...(prevMessages || []), newMsg]);

    setNewMessage("");
    socket.emit("sendGroupMessage", newMsg);
    await sendGroupChat(groupId as string, logedUser._id, message as string);
    fetchGroupMessages(groupId as string);
  };

  // Listen for incoming messages
  useEffect(() => {
    if (socket) {
      console.log("keriyaa");

      socket.on("receiveGroupMessage", (message) => {
        setMessages((prevMessage) => [...prevMessage, message]);
      });

      return () => {
        socket.off("receiveGroupMessage");
      };
    }
  }, [socket]);

  useEffect(() => {
    if (lastMessageRef.current) {
      lastMessageRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const handleSearchPeople = (value: string) => {
    setSearchUser(value);
    const members = group?.members;
    if (!members) {
      setFilterGroupUsers(null);
      return;
    }

    const filtered = members.filter((member: Member) =>
      member.userName.toLowerCase().includes(value.toLowerCase())
    );
    setFilterGroupUsers(filtered);
  };

  const handleLeaveGroup = async (userId: string) => {
    try {
      setLoading(true);
      const result = await leaveGroup(userId, group?._id);
      if (result.success) {
        navigate("/auth/groups");
        showToastSuccess("Leave group successfully");
      } else {
        showToastError("failed to leave the group");
      }
      setLoading(false);
    } catch (error) {}
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full text-gray-500">
        <BarLoader />
      </div>
    );
  }

  return (
    <div className="flex h-full overflow-hidden bg-gray-100">
      {/* Left sidebar - Member list */}
      <div className="w-72 bg-white border-r border-gray-200 flex-none hidden md:flex flex-col">
        <div className="p-4 border-b border-gray-200">
          <div className="flex justify-between">
            <h2 className="text-xl font-semibold text-gray-800">
              {group?.groupName}
            </h2>
          </div>
          <p className="text-sm text-gray-600">
            {group?.members.length} members
          </p>
        </div>
        <input
          className="ms-5 mt-2 shadow-md p-2 rounded-full border-2 w-60"
          type="text"
          placeholder="Search people"
          onChange={(e) => handleSearchPeople(e.target.value)}
        />
        <div className="flex-1 overflow-y-auto">
          {(!filterGroupUsers ? group?.members : filterGroupUsers)?.map(
            (member: any) => (
              <div
                onClick={() => {
                  logedUser.id !== member.userId
                    ? navigate(`/auth/OtherProfileView/${member.userId}`)
                    : navigate("/auth/viewProfile");
                }}
                key={member?.userId || member?.userId}
                className="flex items-center p-3 hover:bg-gray-200 transition-colors cursor-pointer"
              >
                <img
                  src={member?.profileImageUrl}
                  alt={member?.userName}
                  className="w-12 h-12 rounded-full mr-3"
                />
                <div>
                  <p className="font-medium text-gray-800">
                    {member?.userName}
                  </p>
                  <p
                    className={`text-sm ${
                      member.isOnline ? "text-green-500" : "text-gray-500"
                    }`}
                  >
                    {/* {member.isOnline ? "Online" : "Offline"} */}
                    {group?.creatorId === member.userId && (
                      <MdOutlineAdminPanelSettings />
                    )}
                  </p>
                </div>
              </div>
            )
          )}
        </div>
      </div>

      {/* Main chat area */}
      <div className="flex-1 flex flex-col">
        {/* Chat header */}
        <div className="bg-white p-4 flex items-center border-b border-gray-200">
          <img
            src={group?.groupImageUrl || "/default-group-image.png"}
            alt={group?.groupName || "Group"}
            className="w-14 h-14 object-cover rounded-full mr-3"
          />

          <h2 className="text-xl font-semibold text-gray-800">
            {group?.groupName}
          </h2>

          <button
            onClick={() => setShowInfo(!showInfo)}
            className="ml-auto text-gray-500 hover:text-gray-700"
          >
            <Info size={24} />
          </button>
        </div>
        <div
          className="flex-1 overflow-y-auto p-4 space-y-4 bg-zinc-950"
          ref={chatContainerRef}
        >
          {messages?.map((message: GroupMessages) => (
            <div
              key={message._id || message.sender._id}
              className={`flex items-start ${
                message.sender._id === logedUser.id
                  ? "justify-end"
                  : "justify-start"
              }`}
            >
              {message.sender._id !== logedUser.id && (
                <img
                  onClick={() =>
                    navigate(`/auth/OtherProfileView/${message.sender._id}`)
                  }
                  src={
                    message?.sender.userProfile || "/default-group-image.png"
                  }
                  alt="user profile"
                  className="cursor-pointer w-10 h-10 object-cover rounded-full mr-3" // Smaller size and circular shape
                />
              )}

              <div
                ref={lastMessageRef}
                className={`max-w-xs lg:max-w-md ${
                  message.sender._id === logedUser.id
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200"
                } rounded-lg p-3`}
              >
                <p>{message.message}</p>
              </div>

              {message.sender._id === logedUser.id && (
                <img
                  src={
                    message?.sender.userProfile || "/default-group-image.png"
                  }
                  alt="user profile"
                  className="w-10 h-10 object-cover rounded-full ml-3" // Smaller size and circular shape
                />
              )}
            </div>
          ))}
        </div>
        {/* Message input */}
        <form
          onSubmit={sendMessage}
          className="bg-white border-t border-gray-200 p-4"
        >
          <div className="flex items-center">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type a message..."
              className="flex-1 border border-gray-300 rounded-l-lg p-2"
            />
            <button
              type="submit"
              className="bg-blue-600 text-white p-2 rounded-r-lg hover:bg-blue-700"
            >
              <Send size={24} />
            </button>
          </div>
        </form>
      </div>

      {/* Right sidebar - Group info */}
      {showInfo && (
        <div className="w-72 bg-white border-l border-gray-200 flex-none hidden lg:flex flex-col">
          <div className="p-4 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-800">Group Info</h2>
          </div>
          <div className="p-4 flex-1 overflow-y-auto">
            <h3 className="font-medium text-gray-800 mb-2">Description</h3>
            <p className="text-sm text-gray-600 mb-4">{group?.description}</p>
            <h3 className="font-medium text-gray-800 mb-2">Skills</h3>
            <div className="flex flex-wrap gap-2">
              {groupSkills?.[0].map((skill: string) => (
                <span
                  key={skill}
                  className="bg-gray-200 text-sm text-gray-800 rounded-full px-3 py-1"
                >
                  {skill}
                </span>
              ))}
            </div>

            <button
              onClick={() => handleLeaveGroup(logedUser.id as string)}
              className="mt-6 text-sm  p-2 bg-zinc-900 rounded-full text-zinc-100"
            >
              {" "}
              Leave group
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default GroupChatBody;
