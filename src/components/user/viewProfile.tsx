import { useEffect, useState } from "react";
import useGetUser from "../../hook/getUser";
import { coverImageUpload, profileImage } from "../../API/user";
import {
  setCoverImage,
  setFollowingsFollowersCount,
  setUserImages,
} from "../../redux/userSlices";
import { useDispatch } from "react-redux";
import NavBar from "../common/navBar";
import { Link, useNavigate } from "react-router-dom";
import bgImage from "../../assets/sideImage.png";
import { BiEdit } from "react-icons/bi";
import { TbCameraPlus } from "react-icons/tb";
import EditProfileModal from "../common/utilies/EditProfileModal";
import CoverImageModal from "../common/utilies/CoverImageModal";
import noProfile from "../../assets/no profile.png";
import toast from "react-hot-toast";
import SkeletonLoader from "../common/skeleton/Skelton";
import ProfilePostsActivity from "./profile/ProfilePostsActivity";
import PostSpringModal from "../post/MediaPostModal";

const ViewProfile: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isCoverImgModalOpen, setCoverImgModalOpen] = useState<boolean>(false);
  const [isLoading, setLoading] = useState<boolean>(false);
  const [isModelOpen, setModalOpen] = useState<boolean>(false)

  const currentUser = useGetUser();
  const dispatch = useDispatch();
  const navigate = useNavigate();

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

  // to open add cover image
  const handleCoverImage = () => {
    setCoverImgModalOpen(true);
  };

  // here api calling to backend
  const handleChangeCoverImg = async (imageFile: File) => {
    try {
      const formData = new FormData();
      formData.append("coverImage", imageFile);

      const response = await coverImageUpload(formData);
      dispatch(setCoverImage(response.user));

      if (response.success) {
        toast.success(response.message);
      } else {
        toast.error("Cover image upload failed");
      }
    } catch (error: any) {
      toast.error(error.message);
    }
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

          <button
            className="absolute right-5 top-5 bg-transparent border rounded-full border-gray-800 p-2 hover:bg-gray-900"
            onClick={handleCoverImage}
          >
            <TbCameraPlus
              size={32}
              className="text-gray-800 bg-transparent rounded-full p-1 transition duration-100 hover:text-white hover:bg-gray-900"
            />
          </button>
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2">
            {currentUser?.picture?.imageUrl ? (
              <img
                src={currentUser?.picture?.imageUrl }
                alt={`${currentUser.name}'s profile`} 
                className="w-36 h-36 md:w-44 md:h-44 object-cover rounded-full border-4 border-white shadow-lg"
              />
            ) : (
              <img
                src={noProfile}
                alt=""
                className="w-36 h-36 md:w-44 md:h-44 object-cover rounded-full shadow-lg"
              />
            )}
          </div>
        </div>
        <div className="relative p-8">
          <button
            className="absolute right-4 top-4 border-2 rounded-xl flex items-center border-gray-800 text-gray-800 font-poppins font-bold p-2 hover:bg-gray-900 hover:text-white"
            onClick={openEditModal}
          >
            <BiEdit className="mr-2" />
            Edit Profile
          </button>
          <EditProfileModal isOpen={isOpen} isRequestClose={closeModal} />
          <CoverImageModal
            isOpen={isCoverImgModalOpen}
            onRequestClose={() => setCoverImgModalOpen(false)}
            onCoverImageChange={handleChangeCoverImg}
          />

          {currentUser.profile ? (
            <div className="flex flex-col items-center md:items-start mt-6">
              <h1 className="text-3xl font-poppins font-bold text-gray-800 mb-2">
                {currentUser?.name || "User Name"}
              </h1>

              <p className="text-zinc-900 font-semibold mb-3">
                <span className="text-zinc-700">
                  {currentUser.followersCount} followers
                </span>
                <span className="text-zinc-700">
                  {" "}
                  | {currentUser.followingsCount} followings
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
                  <button onClick={openModal} className="shadow-[inset_0_0_0_2px_#09090b] text-black px-4 py-2 rounded-md tracking-widest font-bold font-poppins  bg-transparent hover:bg-[#09090b] hover:text-white dark:text-neutral-200 transition duration-200">
                    Create a post
                  </button>
                </div>
                <PostSpringModal isOpen={isModelOpen} onClose={closeMediaModal} />
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
