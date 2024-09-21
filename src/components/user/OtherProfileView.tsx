import React, { useEffect, useState } from "react";
import { followApi, getOtherUserDetails, unFollow } from "../../API/user";
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
  userId: string | undefined;
  profileImageUrl: string;
  coverImageUrl: string;
}

const OtherProfileView: React.FC<OtherProfileViewProps> = ({
  userId,
  coverImageUrl,
}) => {
  const [userDetails, setUserDetails] = useState<User | null>(null);
  const [isFollowingEachOther, setIsFollowingEachOther] = useState(false);
  const [isFollowingMe, setIsFollowingMe] = useState(false);
  const [isFollowingThem, setIsFollowingThem] = useState(false);
  const [isPrivate, setIsPrivate] = useState<boolean>(false);
  const [isLoading, setLoading] = useState(false);
  const currentUser = useGetUser();
  const { socket } = useSocket();

  // Fetch user details on initial load
  const fetchUserDetails = async () => {
    try {
      const result = await getOtherUserDetails(userId);
      const isFollowing = result?.user?.following.includes(currentUser.id);
      const meFollowing = result?.user?.followers.includes(currentUser.id);
      setIsPrivate(result?.user?.accountPrivacy);
      // Set initial follow state based on the fetched data
      setIsFollowingEachOther(isFollowing && meFollowing);
      setIsFollowingMe(isFollowing);
      setIsFollowingThem(meFollowing);

      setUserDetails(result.user);
    } catch (error: any) {
      showToastError(error.message);
    }
  };

  useEffect(() => {
    if (userId) {
      fetchUserDetails(); // Only fetch once on load
    }

    return () => {
      if (socket) {
        socket.off("follow");
      }
    };
  }, [userId, currentUser.id, socket]);

  const followThisUser = async () => {
    try {
      if (!socket || !isLoading) return;
      if (isLoading) return;
      setLoading(true);

      const result = await followApi({
        toFollowingId: userId,
        fromFollowerId: currentUser.id,
      });
      if (result.success === "successfully update the following") {
        // Update state locally
        setIsFollowingThem(true);
        if (isFollowingMe) setIsFollowingEachOther(true);

        socket.emit("follow", {
          senderId: currentUser.id,
          receiverId: userId,
          type: "follow",
          message: `${currentUser?.name} has started following you.`,
          link: `/auth/OtherProfileView/${currentUser.id}`,
        });

        showToastSuccess("Followed");
        await useNotifyUser(
          currentUser.id,
          userId,
          "follow",
          `${currentUser?.name} has started following you.`,
          `/auth/OtherProfileView/${currentUser.id}`
        );
      } else {
        showToastError("Follow failed");
      }
    } catch (error: any) {
      showToastError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleUnfollow = async () => {
    try {
      if (isLoading) return;
      setLoading(true);

      const result = await unFollow(userId, currentUser.id);
      if (result.success) {
        // Update state locally
        setIsFollowingEachOther(false);
        setIsFollowingThem(false);

        if (isFollowingMe) {
          // They are still following me, so show "Follow Back"
          setIsFollowingMe(true);
        } else {
          setIsFollowingMe(false);
        }

        showToastSuccess("Unfollowed");
      }
    } catch (error: any) {
      showToastError(error.message);
    } finally {
      setLoading(false);
    }
  };

  // Handle follow/unfollow button logic
  const handleFollowToggle = () => {
    if (isFollowingThem || isFollowingEachOther) {
      handleUnfollow();
    } else {
      followThisUser();
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
          {/* Follow/Unfollow Button */}
          <div className="flex justify-end items-center mb-6">
            <Button
              content={
                isFollowingEachOther
                  ? "Following"
                  : isFollowingThem
                  ? "Following"
                  : isFollowingMe
                  ? "Follow Back"
                  : "Follow"
              }
              onClick={handleFollowToggle}
              isLoading={isLoading}
            />
          </div>
          {userDetails ? (
            <div className="flex flex-col items-center md:items-start mt-6">
              <div className="flex items-start">
                <h1 className="text-3xl font-poppins font-bold text-gray-800 mb-2 mr-4">
                  {userDetails?.name || "User Name"}
                </h1>
                {isFollowingEachOther && (
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
              {!isPrivate || (isPrivate && isFollowingEachOther) ? (
                <>
                  <p className="text-zinc-900 font-semibold mb-3">
                    <span className="text-zinc-700">
                      {userDetails?.followers?.length}{" "}
                      <Link to={`/auth/OthersFollowers/${userId}`}>
                        followers
                      </Link>
                    </span>
                    <span className="text-zinc-700">
                      {" "}
                      | {userDetails?.following?.length}{" "}
                      <Link to={`/auth/OthersFollowings/${userId}`}>
                        followings
                      </Link>
                    </span>
                  </p>
                  <p className="text-gray-800 font-poppins text-center md:text-left px-4 md:px-0 mb-4">
                    {userDetails.bio}
                  </p>
                  <div className="flex flex-wrap justify-center md:justify-start space-x-4 md:space-x-6 mt-4">
                    <div className="flex items-center space-x-2">
                      <p className="text-gray-800 font-poppins font-semibold">
                        Skill:
                      </p>
                      <p className="text-gray-800 font-poppins">
                        {userDetails.skill}
                      </p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <p className="text-gray-800 font-poppins font-semibold">
                        Country:
                      </p>
                      <p className="text-gray-800 font-poppins">
                        {userDetails.country}
                      </p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <p className="text-gray-800 font-poppins font-semibold">
                        City:
                      </p>
                      <p className="text-gray-800 font-poppins">
                        {userDetails.states}
                      </p>
                    </div>
                  </div>
                </>
              ) : (
                <p className="text-center">This account is private.</p>
              )}
            </div>
          ) : (
            <div className="mt-32 text-center">
              <h2 className="text-gray-800 font-poppins font-bold">
                No profile details
              </h2>
            </div>
          )}
          <div className="my-6">
            <OthersProfilePostsActivity userId={userId} />
          </div>
        </div>
      </div>
      <NotificationHandler />
    </div>
  );
};

export default OtherProfileView;
