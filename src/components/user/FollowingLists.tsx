import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getMyFollowings, unFollow } from "../../API/user";
import useGetUser from "../../hook/getUser";
import { User } from "../../@types/allTypes";
import toast from "react-hot-toast";
import { FaUserAlt } from "react-icons/fa";
import { showToastError, showToastSuccess } from "../common/utilies/toast";

const FollowingLists = () => {
  const [followings, setFollowing] = useState<User[] | undefined>();
  const navigate = useNavigate();
  const currentUser = useGetUser();

  const fetchFollowingUser = async () => {
    try {
      const result = await getMyFollowings();
      setFollowing(result);
    } catch (error) {}
  };

  // remove followings user
  const handleUnfollow = async (toUnFollowId: string) => {
    try {
      const fromFollowerId = currentUser.id;
      const result = await unFollow(toUnFollowId, fromFollowerId);
      if (result.success) {
        setFollowing((preFollowings) =>
          preFollowings?.filter((following) => following._id != toUnFollowId)
        );
        showToastSuccess("Unfollowed user");
      }
    } catch (error: any) {
      showToastError(error.message);
    }
  };

  console.log("following lists ==>", followings);

  useEffect(() => {
    fetchFollowingUser();
  }, []);

  return (
    <div className="max-w-6xl mx-auto p-4 mt-28">
      <h2 className="text-xl font-semibold mb-4">People you followed</h2>
      <div className="space-y-4">
        {followings && followings.length > 0 ? (
          followings.map((following : any) => (
            <div
              key={following?._id}
              className="flex items-center justify-between p-4 bg-white shadow round"
            >
              <div className="flex items-center space-x-4">
                {following?.imageUrl ? (
                  <img
                    src={following?.imageUrl}
                    alt={following.name}
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
                  <p className="text-sm text-gray-600">{following.location}</p>
                </div>
              </div>
              <div className="flex space-x-2">
                <button
                  className="shadow-[inset_0_0_0_2px_#616467] text-black px-3 py-1 rounded-md tracking-widest font-bold bg-transparent hover:bg-[#18181b] hover:text-white dark:text-neutral-200 transition duration-200"
                  onClick={() => handleUnfollow(following._id)}
                >
                  Unfollow
                </button>
              </div>
            </div>
          ))
        ) : (
          <h3>No followings</h3>
        )}
      </div>
    </div>
  );
};

export default FollowingLists;
