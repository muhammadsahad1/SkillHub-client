import { useEffect, useState } from "react";
import useGetUser from "../../hook/getUser";
import { profileImage } from "../../API/user";
import {
  setFollowingsFollowersCount,
  setUserImages,
} from "../../redux/userSlices";
import { useDispatch } from "react-redux";
import NavBar from "../common/navBar";
// import { Link, useNavigate } from "react-router-dom";
import bgImage from "../../assets/sideImage.png";
import { BiEdit } from "react-icons/bi";
// import { TbCameraPlus } from "react-icons/tb";
import EditProfileModal from "../common/utilies/EditProfileModal";
import noProfile from "../../assets/no profile.png";
import SkeletonLoader from "../common/skeleton/Skelton";
import ProfilePostsActivity from "./profile/ProfilePostsActivity";
import PostSpringModal from "../post/MediaPostModal";
import { HiCheckBadge } from "react-icons/hi2";
import { Link } from "react-router-dom";

const ViewProfile: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isLoading, setLoading] = useState<boolean>(false);
  const [isModelOpen, setModalOpen] = useState<boolean>(false);

  const currentUser = useGetUser();
  const dispatch = useDispatch();
  // const navigate = useNavigate();

  // Image fetch Request for profile image
  const fetchProfileImage = async () => {
    if (currentUser?.id) {
      setLoading(true);
      try {
        const response = await profileImage();
        if (response.imageUrls) {
          dispatch(setUserImages(response.imageUrls));
          dispatch(
            setFollowingsFollowersCount({
              followersCount: response.imageUrls.followersCount,
              followingsCount: response.imageUrls.followingsCount,
            })
          );
          setLoading(false);
        }
      } catch (error) {
        setLoading(false);
        console.error("Error fetching profile image:", error);
      }
    }
  };

  const openModal = () => {
    setModalOpen(true);
  };

  const closeMediaModal = () => {
    setModalOpen(false);
  };

  // Initially call the fetch
  useEffect(() => {
    fetchProfileImage();
  }, [currentUser?.id]);

  // Edit profile Modal open
  const openEditModal = () => {
    setIsOpen(true);
  };

  // to close the modal
  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <div className="w-full min-h-screen bg-gray-100">
      <NavBar />
      {isLoading ? (
        <div>
          <SkeletonLoader />
        </div>
      ) : (
        <div className="rounded-lg border border-gray-800 shadow-lg mt-20 w-full md:w-3/4 mx-auto bg-white overflow-hidden">
          <div className="relative">
            {currentUser.picture?.coverImageUrl ? (
              <div className="w-full md:h-72 bg-gray-300">
                <img
                  src={currentUser.picture?.coverImageUrl}
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
              {typeof currentUser?.picture?.imageUrl === "string" &&
              currentUser?.picture?.imageUrl != "" ? (
                <img
                  src={currentUser?.picture?.imageUrl}
                  alt={`${currentUser.name}'s profile`}
                  className="w-36 h-36 md:w-44 md:h-44 object-cover rounded-full border-4 border-white shadow-lg"
                />
              ) : (
                <img
                  src={noProfile}
                  alt=""
                  className="w-36 h-36 md:w-44 md:h-44 object-cover rounded-full border-4 shadow-lg"
                />
              )}
            </div>
          </div>
          <div className="relative p-8">
            <button
              className="absolute right-9 top-4 border-2 rounded-xl flex items-center border-gray-800 text-gray-800 font-poppins font-bold p-2 hover:bg-gray-900 hover:text-white"
              onClick={openEditModal}
            >
              <BiEdit className="mr-2 size-7" />
              Edit
            </button>
            <EditProfileModal isOpen={isOpen} onRequestClose={closeModal} />

            {currentUser.profile ? (
              <div className="flex flex-col items-center md:items-start mt-6">
                <div className="flex ">
                  <h1 className="mt-3 text-3xl font-poppins font-bold text-gray-800 mb-2 me-2">
                    {currentUser?.name || "User Name"}
                  </h1>
                  {currentUser.isProfessional && (
                    <HiCheckBadge className="text-zinc-800 mt-3" size={28} />
                  )}
                </div>
                {currentUser?.isProfessional && (
                  <span className="text-sm text-zinc-800 font-poppins font-bold">
                    professional account{" "}
                  </span>
                )}

                <p className="text-zinc-900 font-semibold mb-3">
                  <span className="text-zinc-700">
                    {currentUser?.followersCount} followers
                  </span>
                  <span className="text-zinc-700">
                    {" "}
                    | {currentUser?.followingsCount} followings
                  </span>
                </p>
                <p className="text-gray-800 font-poppins text-center md:text-left px-4 md:px-0 mb-4">
                  {currentUser.bio}
                </p>
                <div className="flex flex-wrap justify-center md:justify-start space-x-4 md:space-x-6 mt-4">
                  <div className="flex items-center space-x-2">
                    <p className=" text-gray-800 font-poppins font-semibold">
                      Skill:
                    </p>
                    <p className="text-gray-800 font-poppins">
                      {currentUser.skill}
                    </p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <p className="text-gray-800 font-poppins font-semibold">
                      Country:
                    </p>
                    <p className="text-gray-800 font-poppins">
                      {currentUser.country}
                    </p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <p className="text-gray-800 font-poppins font-semibold">
                      State:
                    </p>
                    <p className="text-gray-800 font-poppins">
                      {currentUser?.states}
                    </p>
                  </div>
                </div>
                <div className="w-full flex justify-between items-center mt-6">
                  <div className="flex space-x-4">
                    <Link to="/auth/followings">
                      <button className="font-poppins mt-5 px-4 py-2 rounded-md border border-neutral-300 bg-gray-950 text-gray-200 text-sm transform transition duration-200 hover:shadow-md">
                        <h1 className="tracking-wide">Following</h1>
                      </button>
                    </Link>
                    <Link to="/auth/followers">
                      <button className="font-poppins mt-5 px-4 py-2 rounded-md border border-neutral-300 bg-gray-950 text-gray-200 text-sm  transform transition duration-200 hover:shadow-md">
                        <h1 className="tracking-wide">Followers</h1>
                      </button>
                    </Link>
                  </div>

                  <div className="flex justify-end">
                    <button
                      onClick={openModal}
                      className="ms-4 shadow-[inset_0_0_0_2px_#09090b] border-gray-800 text-gray-800 px-4 py-2 rounded-md tracking-widest font-bold font-poppins bg-transparent hover:bg-gray-900 hover:text-white
                        "
                    >
                      Create a post
                    </button>
                  </div>
                  <PostSpringModal
                    isOpen={isModelOpen}
                    onClose={closeMediaModal}
                  />
                </div>
              </div>
            ) : (
              <div className="mt-32 text-center">
                <h2 className="text-gray-800 font-poppins font-bold">
                  No profile details
                </h2>
              </div>
            )}
            <hr className="my-8 border-gray-300" />
          </div>
          <ProfilePostsActivity />
        </div>
      )}
    </div>
  );
};

export default ViewProfile;
