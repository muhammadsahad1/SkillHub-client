import { useEffect, useState } from "react";
import useGetUser from "../hook/getUser";
import { profileImage } from "../API/user";
import { setProfileImage } from "../redux/userSlices";
import { useDispatch } from "react-redux";
import NavBar from "./common/navBar";
import bgImage from "../assets/sideImage.png";
import { BiEdit } from "react-icons/bi";
import EditProfileModal from "./EditProfileModal";


const ViewProfile: React.FC = () => {

  const [isOpen,setIsOpen] = useState<boolean>(false)
  
  const currentUser = useGetUser();
  const dispatch = useDispatch();

  // Image fetch Request for profile image
  const fetchProfileImage = async () => {
    if (currentUser?.id) {
      try {
        const response = await profileImage();
        dispatch(setProfileImage(response.imageUrl));
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
    setIsOpen(true)
  }

  const closeModal = () => {
    setIsOpen(false)
    window.location.reload()
  }

  console.log(currentUser)

  return ( 
    <div className="w-full min-h-screen">
      <NavBar />
      <div className="border-3 border-zinc-800 shadow-lg shadow-zinc-900 w-full md:w-3/4 mx-auto mt-6 rounded-lg overflow-hidden">
        <div className="relative">
          <img
            src={bgImage}
            alt="Cover"
            className="w-full h-48 md:h-72 object-cover"
          />
          <div className="absolute bottom-0 left-40 transform -translate-x-1/2 translate-y-1/2">
            {currentUser?.picture ? (
              <img
                src={currentUser.picture}
                alt={`${currentUser.name}'s profile`}
                className="w-32 h-32 md:w-40 md:h-40 object-cover rounded-full border-4 border-white"
              />
            ) : (
              <div className="w-32 h-32 md:w-40 md:h-40 bg-gray-300 rounded-full border-4 border-white flex items-center justify-center">
                No profile image
              </div>
            )}
          </div>
        </div>
        <div className="relative p-6">
          <button
            className="absolute right-4 top-4 text-zinc-100 border-white border-2 p-2 font-bold rounded-xl flex items-center"
            onClick={openEditModal}>
            <BiEdit className="mr-2" />
            Edit Profile
          </button>
        <EditProfileModal isOpen={isOpen} isRequestClose = {closeModal}/>
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
