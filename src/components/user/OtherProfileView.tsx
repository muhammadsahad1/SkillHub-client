import React, { useEffect, useState } from "react";
import {
  coverImageUpload,
  followApi,
  getOtherUserDetails,
  profileImage,
  unFollow,
} from "../../API/user";
import { setCoverImage, setUserImages } from "../../redux/userSlices";
import { useDispatch } from "react-redux";
import NavBar from "../common/navBar";
import { Link, useNavigate, useParams } from "react-router-dom";
import bgImage from "../../assets/sideImage.png";
import { BiEdit } from "react-icons/bi";
import { TbCameraPlus } from "react-icons/tb";
import { FaUserCircle } from "react-icons/fa";
import noProfile from "../../assets/no profile.png";
import { showToastError , showToastSuccess } from "../common/utilies/toast";
import { User } from "../../@types/allTypes";
import Button from "../common/Button";
import useGetUser from "../../hook/getUser";


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
  const [isLoading, setLoading] = useState<boolean>(false);
  const currentUser = useGetUser();

  const fetchUserDetails = async () => {
    try {
      const result = await getOtherUserDetails(userId);
      setUserDetails(result.user);
      setIsFollowing(result.user.followers.includes(currentUser.id)); //here we checking the follower in following list
    } catch (error: any) {
      showToastError(error.message);
    }
  };

  console.log("isFollowing ==? ",isFollowing)
  useEffect(() => {
    if (userId) {
      fetchUserDetails();
    }
  }, [userId]);

  // handle Follow
  const followThisUser = async () => {
    try {
      setLoading(true);
      const result = await followApi({
        toFollowingId: userId,
        fromFollowerId: currentUser.id,
      });
      if(result.success){
        setIsFollowing(true)
        showToastSuccess("Followed")
      }else{
        showToastError("Followed failed")
      }

      setLoading(false);
    } catch (error: any) {
      showToastError(error.message);
    }
  };

  // handling the unFOllow
  const handleUnfollow = async () => {
    try {
      setLoading(true);
      const fromFollowerId = currentUser.id;
      const result = await unFollow(userId, fromFollowerId);
      if(result.success){
        setIsFollowing(false)
        showToastSuccess("Unfollowed")
      }
      setLoading(false);
    } catch (error: any) {
       showToastError(error.message);
    }
  };

  return (
    <div className="w-full min-h-screen">
      <NavBar />
      <div className="border-3 rounded-t-none border-zinc-800 shadow-sm shadow-zinc-900 w-full md:w-3/4 mx-auto rounded-lg overflow-hidden ">
        <div className="relative">
          {coverImageUrl ? (
            <div className=" w-full md:h-72 shadow-lg bg-zinc-400">
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

          <div className="absolute bottom-0 left-40 transform -translate-x-1/2 translate-y-1/2">
            {profileImageUrl ? (
              <img
                src={profileImageUrl}
                alt="s profile"
                className="w-32 h-32 md:w-40 md:h-40 object-cover rounded-full border-4 border-white"
              />
            ) : (
              <img
                src={noProfile}
                alt=""
                className="w-36 h-32 md:w-40 md:h-40 object-cover rounded-full"
              />
            )}
          </div>
        </div>
        <div className="relative p-6">
          <div className="flex justify-end items-center">
            {isFollowing ? (
              <Button
                content={"Following"}
                onClick={handleUnfollow}
                isLoading={isLoading}
              />
            ) : (
              <Button
                content={"Follow"}
                onClick={followThisUser}
                isLoading={isLoading}
              />
            )}
          </div>
          {userDetails ? (
            <div className="flex flex-col items-start mt-16 md:mt-7">
              <h1 className="text-2xl font-bold text-zinc-900 mb-2">
                {userDetails?.name || "User Name"}
              </h1>

              <p className="text-zinc-900 font-semibold text-start fonrshowNotificationBV  px-4 md:px-0">
                {userDetails.bio}
              </p>
              <div className="flex space-x-2 mt-2">
                <p className="text-zinc-900 font-semibold ">Skill :</p>
                <p className="text-zinc-900 font-semibold ">
                  {userDetails.skill}
                </p>
              </div>
              <div className="flex space-x-2 mt-2">
                <p className="text-zinc-900 font-semibold ">Country :</p>
                <p className="text-zinc-900 font-semibold ">
                  {userDetails.country}
                </p>
              </div>
              <div className="flex space-x-2 mt-2">
                <p className="text-zinc-900 font-semibold ">State :</p>
                <p className="text-zinc-900 font-semibold ">
                  {userDetails?.states}
                </p>
              </div>
              <div className="flex space-x-4">
                <Link to="/auth/followers">
                  <button className="font-semibold mt-5 px-4 py-2 rounded-md border border-neutral-300 bg-zinc-950 text-zinc-200 text-sm hover:-translate-y-1 transform transition duration-200 hover:shadow-md">
                    <h1 className="tracking-wide">Followers</h1>
                  </button>
                </Link>
              </div>
            </div>
          ) : (
            <div className="mt-32">
              <h2 className="text-zinc-900 font-bold "> No profile details</h2>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OtherProfileView;
