import { useEffect, useState } from "react";
import useGetUser from "../hook/getUser";
import { coverImageUpload, profileImage } from "../API/user";
import { setCoverImage, setProfileImage } from "../redux/userSlices";
import { useDispatch } from "react-redux";
import NavBar from "./common/navBar";
import { useNavigate } from "react-router-dom";
import bgImage from "../assets/sideImage.png";
import { BiEdit } from "react-icons/bi";
import { TbCameraPlus } from "react-icons/tb";
import EditProfileModal from "./common/utilies/EditProfileModal";
import CoverImageModal from "./common/utilies/CoverImageModal";
import { FaUserCircle } from "react-icons/fa";
import nonProfile from "../assets/nonProfile.jpg";
import toast from "react-hot-toast";

const ViewProfile: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isCoverImgModalOpen, setCoverImgModalOpen] = useState<boolean>(false);

  const currentUser = useGetUser();
  const dispatch = useDispatch();
  const navigate = useNavigate()
  // Image fetch Request for profile image
  const fetchProfileImage = async () => {
    if (currentUser?.id) {
      try {
        const response = await profileImage();
        dispatch(setProfileImage(response.imageUrls));
      } catch (error) {
        console.error("Error fetching profile image:", error);
      }
    }
  };

  // Initially call the fetch
  useEffect(() => {
    fetchProfileImage();
  }, []);

  // Edit profile Modal open
  const openEditModal = () => {
    setIsOpen(true);
  };

  // to close the modal
  const closeModal = () => {
    setIsOpen(false);
    navigate('/')
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
    
      for (const pair of formData.entries()) {  
        console.log(`${pair[0]}: ${pair[1]}`);
      }

      const response = await coverImageUpload(formData);
      dispatch(setCoverImage(response.user));
    
      if (response.success) {
        toast.success(response.message);
      } else {
        toast.success("cover image upload failed");
      }

    } catch (error: any) {
      toast.error(error.message);
      
    }
  };
console.log("cover imgeUr; =>",currentUser.picture?.coverImageUrl)
  return (
    <div className="w-full min-h-screen">
      <NavBar />
      <div className="border-3 rounded-t-none border-zinc-800 shadow-sm shadow-zinc-900 w-full md:w-3/4 mx-auto rounded-lg overflow-hidden ">
        <div className="relative">
          {currentUser.picture?.coverImageUrl ? (
            <div className=" w-full md:h-72 shadow-lg bg-zinc-400">
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
            className="absolute right-5 top-5 bg-transparent border rounded-full border-zinc-950 p-2 hover:bg-zinc-900"
            onClick={handleCoverImage}
          >
            <TbCameraPlus
              size={32}
              className="text-zinc-900 bg-transparent rounded-full p-1 transition duration-100 hover:text-white hover:bg-zinc-900"
            />
          </button>
          <div className="absolute bottom-0 left-40 transform -translate-x-1/2 translate-y-1/2">
            {currentUser?.picture?.imageUrl ? (
              <img
                src={currentUser?.picture?.imageUrl}
                alt={`${currentUser.name}'s profile`}
                className="w-32 h-32 md:w-40 md:h-40 object-cover rounded-full border-4 border-white"
              />
            ) : (
              <div className="w-32 h-32 md:w-40 md:h-40  rounded-full border-4 border-white flex items-center justify-center">
                <FaUserCircle size={44} />
              </div>
            )}
          </div>
        </div>
        <div className="relative p-6">
          <button
            className="absolute right-4 top-4 border-2 rounded-xl flex items-center  border-zinc-900 text-zinc-900 font-bold p-2 hover:bg-zinc-900 hover:text-zinc-100"
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

          <div className="flex flex-col items-start mt-16 md:mt-24">
            <h1 className="text-2xl font-bold text-white">
              {currentUser?.name || "User Name"}
            </h1>
            <p className="text-gray-400">@{currentUser?.name || "tagname"}</p>
            <p className="text-gray-400 text-start px-4 md:px-0">
              {currentUser.bio}
            </p>
            <div className="flex space-x-2 mt-2">
              <p className="text-gray-400">Skill :</p>
              <p className="text-gray-400">{currentUser.skill}</p>
            </div>
            <div className="flex space-x-2 mt-2">
              <p className="text-gray-400">Country :</p>
              <p className="text-gray-400">{currentUser.country}</p>
            </div>
            <div className="flex space-x-2 mt-2">
              <p className="text-gray-400">State :</p>
              <p className="text-gray-400">{currentUser?.states}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewProfile;
