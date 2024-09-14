import React from "react";

import { useEffect, useState } from "react";
import {  useNavigate } from "react-router-dom";
import {
  followApi,
  othersFollowings,
  unFollow,
} from "../../API/user";
import useGetUser from "../../hook/getUser";
import { FaUserAlt } from "react-icons/fa";
import { showToastError, showToastSuccess } from "../common/utilies/toast";
import { TbMessageDots } from "react-icons/tb";

const OtherProfileFollowings = ({ userId }: { userId: string | undefined }) => {
  const [followings, setFollowing] = useState<any>();
  const navigate = useNavigate();
  const currentUser = useGetUser();

  const fetchFollowingUser = async () => {
    try {
      const result = await othersFollowings(userId);
      setFollowing(result);
    } catch (error) {}
  };

  // remove followings user
  const handleUnfollow = async (toUnFollowId: undefined | string) => {
    try {
      const fromFollowerId = currentUser.id;
      const result = await unFollow(toUnFollowId, fromFollowerId);
      if (result.success) {
        setFollowing((preFollowings: any[]) =>
          preFollowings?.filter(
            (following: { _id: string }) => following._id != toUnFollowId
          )
        );
        showToastSuccess("Unfollowed user");
      }
    } catch (error: any) {
      showToastError(error.message);
    }
  };

  const handleFollow = async (followingId: string) => {
    try {
      console.log("click")
      const result = await followApi({
        toFollowingId: followingId,
        fromFollowerId: currentUser.id,
      });

      if (result.success) {
        console.log("res ==>>.>>",result)
        showToastSuccess(result.message);
      }
    } catch (error) {}
  };

  useEffect(() => {
    fetchFollowingUser();
  }, []);

  return (
    <div className="max-w-6xl mx-auto p-4 mt-28">
      <h2 className="text-xl font-semibold mb-4">Following List </h2>
      <div className="space-y-4">
        {followings && followings.length > 0 ? (
          followings.map(
            (following: {
              relationship: "mutal" | "following" | "followed by";
              _id: undefined | string;
              imageUrl: string | undefined;
              name:
                | string
                | number
                | boolean
                | React.ReactElement<
                    any,
                    string | React.JSXElementConstructor<any>
                  >
                | Iterable<React.ReactNode>
                | null
                | undefined;
              coverImageUrl: any;
              location:
                | string
                | number
                | boolean
                | React.ReactElement<
                    any,
                    string | React.JSXElementConstructor<any>
                  >
                | Iterable<React.ReactNode>
                | React.ReactPortal
                | null
                | undefined;
            }) => (
              <div
                key={following?._id}
                className="flex items-center justify-between p-4 bg-white shadow round"
              >
                <div className="flex items-center space-x-4">
                  {following?.imageUrl ? (
                    <img
                      src={following?.imageUrl}
                      className="w-12 h-12 rounded-full object-cover ed-lg cursor-pointer"
                      onClick={() =>
                        navigate(`/auth/OtherProfileView/${following._id}`, {
                          state: {
                            profileImageUrl: following?.imageUrl,
                            coverImageurl: following?.coverImageUrl,
                          },
                        })
                      }
                    />
                  ) : (
                    <FaUserAlt
                      className="w-12 h-12 text-zinc-800 rounded-full object-covered-lg cursor-pointer"
                      onClick={() =>
                        navigate(`/auth/OtherProfileView/${following._id}`, {
                          state: {
                            profileImageUrl: following?.imageUrl,
                            coverImageurl: following?.coverImageUrl,
                          },
                        })
                      }
                    />
                  )}
                  <div>
                    <h3 className="font-medium text-gray-900">
                      {following.name}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {following.location}
                    </p>
                  </div>
                </div>
                <div className="flex space-x-2">
                  {following?.relationship === "mutal" ? (
                    <button className="font-semibold px-3 py-1 rounded-md bg-gray-300 text-gray-700  hover:bg-gray-400">
                      <TbMessageDots size={32} />
                    </button>
                  ) : following?.relationship === "following" ||
                    following?.relationship === "followed by" ? (
                    <button
                      className="shadow-[inset_0_0_0_2px_#616467] text-black px-3 py-1 rounded-md tracking-widest font-bold bg-transparent hover:bg-[#18181b] hover:text-white dark:text-neutral-200 transition duration-200"
                      onClick={() => handleUnfollow(following._id)}
                    >
                      following
                    </button>
                  ) : (
                    <button
                      className="shadow-[inset_0_0_0_2px_#616467] text-black px-3 py-1 rounded-md tracking-widest font-bold bg-transparent hover:bg-[#18181b] hover:text-white dark:text-neutral-200 transition duration-200"
                      onClick={() => handleFollow(following._id as string)}
                    >
                      follow
                    </button>
                  )}
                </div>
              </div>
            )
          )
        ) : (
          <h3>No followings</h3>
        )}
      </div>
    </div>
  );
};
export default OtherProfileFollowings;
