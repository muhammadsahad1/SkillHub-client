import React, { useEffect, useState } from "react";
import {
  followApi,
  getOthersPosts,
  getOtherUserDetails,
  unFollow,
} from "../../API/user";
import NavBar from "../common/navBar";
import { Link } from "react-router-dom";
import bgImage from "../../assets/sideImage.png";
import noProfile from "../../assets/no profile.png";
import { showToastError, showToastSuccess } from "../common/utilies/toast";
import { User } from "../../@types/allTypes";
import Button from "../common/Button";
import useGetUser from "../../hook/getUser";
import { AiFillMessage } from "react-icons/ai";
import OthersProfilePostsActivity from "./profile/OthersProfilePostsActivity";
import { useSocket } from "../../hook/useSocket";
import { useNotifyUser } from "../../hook/useNotifyUser";
import NotificationHandler from "../notification/NotificationHandler";

interface OtherProfileViewProps {
  userId: string;
  profileImageUrl: string;
  coverImageUrl: string;
}

const OtherProfileView: React.FC<OtherProfileViewProps> = ({
  userId,
  profileImageUrl,
  coverImageUrl,
}) => {
  const [userDetails, setUserDetails] = useState<User>();
  const [isFollowing, setIsFollowing] = useState<boolean>(false);
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [isFollowBack, setIsFollowBack] = useState<boolean>(false);
  const [isMeOnlyFollowing, setIsMeOnlyFollowing] = useState<boolean>(false);

  const [isFollowingList, setFollowingList] = useState<boolean>(false);
  const [isLoading, setLoading] = useState<boolean>(false);
  const [isPrivate, setIsPrivate] = useState<boolean>(false);
  const currentUser = useGetUser();
  const { socket } = useSocket();

  const fetchUserDetails = async () => {
    try {
      const result = await getOtherUserDetails(userId);
      console.log("resss ===>>>>>>", result);
      const isFollowBack = result?.user?.following.includes(currentUser.id);
      const meFollowing = result?.user?.followers.includes(currentUser.id);
      // conditions for ensure the following and follow 
      if (isFollowBack && meFollowing) {
        setIsConnected(true);
      } else if (isFollowBack) {
        setIsFollowBack(true);
      } else if (meFollowing) {
        setIsMeOnlyFollowing(true);
      }

      setFollowingList(isFollowBack);
      setIsFollowing(meFollowing);
      setIsPrivate(result.user.accountPrivacy);
      setUserDetails(result.user);
    } catch (error: any) {
      showToastError(error.message);
    }
  };
  useEffect(() => {
    if (userId) {
      fetchUserDetails();
    }

    // Cleanup function to remove socket listeners
    return () => {
      if (socket) {
        socket.off("follow");
      }
    };
  }, [userId, currentUser.id, socket]);

  const followThisUser = async () => {
    try {
      if (!socket) return;

      setLoading(true);
      const result = await followApi({
        toFollowingId: userId,
        fromFollowerId: currentUser.id,
      });
      console.log("follow ress ===>", result);

      if (result.success === "successfully update the following") {
        fetchUserDetails();
        setIsFollowing(true);
        socket?.emit("joinRoom", {
          senderId: currentUser.id,
          receiverId: userId,
        });
        // here the follow event is emit for sent the notification
        // with link to go that currentUser profile
        socket?.emit("follow", {
          senderId: currentUser.id,
          receiverId: userId,
          type: "follow",
          message: `${currentUser?.name} has started following you.`,
          link: `auth/OtherProfileView/${currentUser.id}`, //profile link
        });

        // calling and passing the fields to sendNotificaion && creating Notificaion
        await useNotifyUser(
          currentUser.id,
          userId,
          "follow",
          `${currentUser?.name} has started following you.`,
          `auth/OtherProfileView/${currentUser.id}`
        );
        showToastSuccess("Followed");
      } else {
        showToastError("Follow failed");
      }
      setLoading(false);
    } catch (error: any) {
      showToastError(error.message);
    }
  };

  const handleUnfollow = async () => {
    try {
      setLoading(true);
      const fromFollowerId = currentUser.id;
      const result = await unFollow(userId, fromFollowerId);
      if (result.success) {
        setIsFollowing(false);
        setIsMeOnlyFollowing(!isMeOnlyFollowing)
        fetchUserDetails();
        showToastSuccess("Unfollowed");
      }
      setLoading(false);
    } catch (error: any) {
      showToastError(error.message);
    }
  };

  return (
    <div className="w-full min-h-screen bg-gray-100">
      <NavBar />
      <div className="border-3 rounded-lg border-zinc-800 shadow-lg w-full md:w-3/4 mx-auto bg-white overflow-hidden mt-20">
        <div className="relative">
          {coverImageUrl ? (
            <div className="w-full md:h-72 bg-gray-300">
              <img
                src={coverImageUrl}
                alt="Cover"
                className="w-full h-48 md:h-72 object-cover"
              />
            </div>
          ) : (
            <img
              src={bgImage}
              alt="Cover"
              className="w-full h-48 md:h-72 object-cover"
            />
          )}

          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2">
            {userDetails?.profileImageUrl ? (
              <img
                src={userDetails?.profileImageUrl}
                alt="Profile"
                className="w-36 h-36 md:w-44 md:h-44 object-cover rounded-full border-4 border-white shadow-lg"
              />
            ) : (
              <img
                src={noProfile}
                alt="No Profile"
                className="w-36 h-36 md:w-44 md:h-44 object-cover rounded-full shadow-lg"
              />
            )}
          </div>
        </div>
        <div className="relative p-8">
          <div className="flex justify-end items-center mb-6">
            {isMeOnlyFollowing ? (
              <Button
                content={"Following"}
                onClick={handleUnfollow}
                isLoading={isLoading}
                className="bg-red-500 text-white hover:bg-red-600"
              />
            ) : isFollowBack ? (
              <Button
                content={"Follow back"}
                onClick={followThisUser}
                isLoading={isLoading}
                className="bg-blue-500 text-white hover:bg-blue-600"
              />
            ) : isConnected ? (
              <Button
                content={"Following"}
                onClick={handleUnfollow}
                isLoading={isLoading}
                className="bg-red-500 text-white hover:bg-red-600"
              />
            ) : (
              <Button
                content={"Follow"}
                onClick={followThisUser}
                isLoading={isLoading}
                className="bg-blue-500 text-white hover:bg-blue-600"
              />
            )}
          </div>
          {userDetails ? (
            <div className="flex flex-col items-center md:items-start mt-6">
              <div className="flex items-start">
                <h1 className="text-3xl font-poppins font-bold text-gray-800 mb-2 mr-4">
                  {userDetails?.name || "User Name"}
                </h1>
                {isFollowingList && (
                  <Link to="/auth/chat" state={{ userId: userId }}>
                    <AiFillMessage
                      className="message-icon"
                      size={32}
                      style={{
                        cursor: "pointer",
                        color: "rgba(74, 74, 74, 8)",
                      }}
                    />
                  </Link>
                )}
              </div>
              {!isPrivate || (isPrivate && isFollowingList) ? (
                <>
                  <p className="text-zinc-900 font-semibold mb-3">
                    <span className="text-zinc-700">
                      {userDetails?.followers?.length} followers
                    </span>
                    <span className="text-zinc-700">
                      {" "}
                      | {userDetails?.following?.length} followings
                    </span>
                  </p>
                  <p className="text-gray-800 font-poppins text-center md:text-left px-4 md:px-0 mb-4">
                    {userDetails.bio}
                  </p>
                  <div className="flex flex-wrap justify-center md:justify-start space-x-4 md:space-x-6 mt-4">
                    <div className="flex items-center space-x-2">
                      <p className="text-gray-800 font-poppins font-semibold font-poppins font-semibold">
                        Skill:
                      </p>
                      <p className="text-gray-800 font-poppins">
                        {userDetails.skill}
                      </p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <p className="text-gray-800 font-poppins font-semibold font-poppins font-semibold">
                        Country:
                      </p>
                      <p className="text-gray-800 font-poppins">
                        {userDetails.country}
                      </p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <p className="text-gray-800 font-poppins font-semibold font-poppins font-semibold">
                        State:
                      </p>
                      <p className="text-gray-800 font-poppins">
                        {userDetails?.states}
                      </p>
                    </div>
                  </div>
                  <div className="flex justify-center md:justify-start space-x-4 mt-6">
                    <Link to={`/auth/OthersFollowers/${userId}`}>
                      <button className="font-poppins mt-5 px-4 py-2 rounded-md border border-neutral-300 bg-zinc-950 text-zinc-200 text-sm hover:-translate-y-1 transform transition duration-200 hover:shadow-md">
                        <h1 className="tracking-wide">Followers</h1>
                      </button>
                    </Link>
                    <Link to={`/auth/OthersFollowings/${userId}`}>
                      <button className="font-poppins mt-5 px-4 py-2 rounded-md border border-neutral-300 bg-zinc-950 text-zinc-200 text-sm hover:-translate-y-1 transform transition duration-200 hover:shadow-md">
                        <h1 className="tracking-wide">Followings</h1>
                      </button>
                    </Link>
                  </div>
                </>
              ) : (
                <p className="text-gray-800 font-semibold mt-4">
                  This account is private. Follow to see their full profile.
                </p>
              )}
            </div>
          ) : (
            <div className="mt-32 text-center">
              <h2 className="text-gray-800 font-bold">No profile details</h2>
            </div>
          )}
          <hr className="my-8 border-gray-300" />
          <OthersProfilePostsActivity userId={userId} />
        </div>
      </div>
    </div>
  );
};

export default OtherProfileView;
