import React, { useEffect, useState } from "react";
import { User } from "../../@types/allTypes";
import { followBack, myFollowers, removeFollower } from "../../API/user";
import { FaUserAlt } from "react-icons/fa";
import useGetUser from "../../hook/getUser";
import { showToastError, showToastSuccess } from "../common/utilies/toast";
import PopUpModal from "../common/utilies/Modal";

const FollowersLists = () => {
  const [followers, setFollowers] = useState<User[]>([]);
  const [isOpen, setOpenModal] = useState<boolean>(false);
  const currentUser = useGetUser();

  const fetchFollowers = async () => {
    try {
      const result = await myFollowers();
      setFollowers(result);
    } catch (error) {}
  };

  useEffect(() => {
    fetchFollowers();
  }, []);


  //To Remove the follower
  const handleRemove = async (toRemoveId: string) => {
    try {
      setOpenModal(false)
      const result = await removeFollower(toRemoveId);
      if (result.success) {
        setFollowers((prevFollowers) =>
          prevFollowers.filter((follower) => follower._id != toRemoveId)
        );
        showToastSuccess("Removed follower");
      }
    } catch (error: any) {
      showToastError(error.message);
    }
  };

  // Following back
  const handleFollowBack = async (toFollowId: string) => {
    try {
      const result = await followBack(toFollowId);
      if (result.success) {
        showToastSuccess("Followed back");
        fetchFollowers();
      }
    } catch (error: any) {
      showToastError(error.message);
    }
  };

  // for modal
  const openModal = async () => {
    setOpenModal(true);
  };

  const closeModal = async () => {
    setOpenModal(false);
  };

  return (
    <div className="max-w-6xl mx-auto p-4 mt-28">
      <h2 className="text-xl font-semibold mb-4">People who followed you</h2>
      <div className="space-y-4">
        {followers.map((follower) => (
          <div
            key={follower._id}
            className="flex items-center justify-between p-4 bg-white shadow rounded-lg"
          >
            <div className="flex items-center space-x-4">
              {follower.imageUrl ? (
                <img
                  src={follower?.imageUrl}
                  alt={follower.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
              ) : (
                <FaUserAlt className="w-12 h-12 text-zinc-800 rounded-full object-cover" />
              )}

              <div>
                <h3 className="font-medium text-gray-900">{follower.name}</h3>
                <p className="text-sm text-gray-600">{follower.location}</p>
              </div>
            </div>
            <div className="flex space-x-2">
              {follower?.isFollowingBack ? (
                <button
                  className="font-semibold px-3 py-1 rounded-md bg-gray-300 text-gray-700  hover:bg-gray-400"
                  onClick={openModal}
                >
                  Remove
                </button>
              ) : (
                <button className="shadow-[inset_0_0_0_2px_#616467]  text-black px-3 py-1  rounded-md tracking-widest  font-bold bg-transparent hover:bg-[#18181b] hover:text-white dark:text-neutral-200 transition duration-200"
                onClick={()=>handleFollowBack(follower._id)}
                >
                  Follow
                </button>
              )}
              <PopUpModal
                isOpen={isOpen}
                isClose={closeModal}
                onConfirm={() => handleRemove(follower._id)}
                title="Confirm Removal"
                content="Are you sure you want to remove this follower?"
                confirmText="Yes, Remove"
                cancelText="Cancel"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FollowersLists;
