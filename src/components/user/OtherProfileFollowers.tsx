import { useEffect, useState } from "react";
import { User } from "../../@types/allTypes";
import { followApi, otherFollowers } from "../../API/user";
import { FaUserAlt } from "react-icons/fa";
import useGetUser from "../../hook/getUser";
import { TbMessageDots } from "react-icons/tb";
import { Link, useNavigate } from "react-router-dom";
import { showToastSuccess } from "../common/utilies/toast";

const OtherProfileFollowers = ({ userId }: { userId: string | undefined }) => {
  const [followers, setFollowers] = useState<User[]>([]);
  const currentUser = useGetUser();
  const navigate = useNavigate();

  const fetchOthersFollowers = async () => {
    try {
      const result = await otherFollowers(userId);
      setFollowers(result);
    } catch (error) {}
  };

  useEffect(() => {
    fetchOthersFollowers();
  }, [userId]);

  console.log(followers);

  const handleFollowBack = async (followerId: any) => {
    try {
      const result = await followApi({
        toFollowingId: followerId,
        fromFollowerId: currentUser.id,
      });

      if (result.success) {
        showToastSuccess("Followed");
      }
    } catch (error) {}
  };

  return (
    <div className="max-w-6xl mx-auto p-4 mt-28">
      <h2 className="text-xl font-semibold mb-4">Followers List</h2>
      <div className="space-y-4">
        {followers.map((follower: any) => (
          <div
            key={follower._id}
            className="flex items-center justify-between p-4 bg-white shadow rounded-lg"
          >
            <div className="flex items-center space-x-4">
              {follower.imageUrl ? (
                <img
                  onClick={() => {
                    follower._id != currentUser.id
                      ? navigate(`/auth/OtherProfileView/${follower._id}`, {
                          state: {
                            profileImageUrl: follower?.imageUrl,
                          },
                        })
                      : navigate(`/auth/viewProfile`);
                  }}
                  src={follower?.imageUrl}
                  alt={follower.name}
                  className="w-12 h-12 rounded-full object-cover cursor-pointer"
                />
              ) : (
                <FaUserAlt
                  className="cursor-pointer w-12 h-12 text-zinc-800 rounded-full object-cover"
                  onClick={() => {
                    navigate(`/auth/OtherProfileView/${follower._id}`);
                  }}
                />
              )}

              <div>
                <h3 className="font-medium text-gray-900">{follower.name}</h3>
                <p className="text-sm text-gray-600">{follower.location}</p>
              </div>
            </div>
            <div className="flex space-x-2">
              {follower?._id === currentUser.id ? null : (
                <>
                  {follower?.isFollowingBack ? (
                    <button className="font-semibold px-3 py-1 rounded-md bg-gray-300 text-gray-700  hover:bg-gray-400">
                      <Link to="/auth/chat" state={{ userId: follower?._id }}>
                        <TbMessageDots size={32} />
                      </Link>
                    </button>
                  ) : (
                    <button
                      className="shadow-[inset_0_0_0_2px_#616467]  text-black px-3 py-1  rounded-md tracking-widest  font-bold bg-transparent hover:bg-[#18181b] hover:text-white dark:text-neutral-200 transition duration-200"
                      onClick={() => handleFollowBack(follower._id)}
                    >
                      Follow
                    </button>
                  )}
                </>
              )}
    
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OtherProfileFollowers;
