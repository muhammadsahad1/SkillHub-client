import React, { useEffect, useState } from "react";
import useGetUser from "../../hook/getUser";
import { CgProfile } from "react-icons/cg";
import { BiEdit } from "react-icons/bi";
import EditProfileModal from "../common/utilies/EditProfileModal";
import { profileImage } from "../../API/user";
import { useDispatch } from "react-redux";
import { setUserImages } from "../../redux/userSlices";

const AccountInformation = () => {
  const currentUser = useGetUser();
  const [isModalOpen, setModalOpen] = useState<boolean>(false);
  const dispatch = useDispatch()

  const fetchProfileImage = async () => {
    if (currentUser?.id) {
      try {
        const response = await profileImage();
        console.log("URLS==>",response.imageUrls)
        if(response.imageUrls){
          dispatch(setUserImages(response.imageUrls));
        }
      } catch (error) {
        console.error("Error fetching profile image:", error);
      }
    }
  };


  useEffect(() => {

    fetchProfileImage();
  
}, [currentUser?.id]);


  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };
  

  return (
    <div className="w-full flex justify-center items-center mt-28">
      <div className="w-1/2 shadow-md rounded-mg p-6 mb-7">
        <h1 className="font-poppins font-bold mb-4  text-3xl">Personal Information</h1>
        <p className="font-montserrat">Update your personal details below</p>
      
        <div className="mt-8 cursor-pointer">
          {currentUser.picture?.imageUrl ? (
            <img
              src={currentUser.picture?.imageUrl}
              alt=""
              className="w-24 h-24 md:w-30 md:h-30 object-cover rounded-full border-4 border-zinc-600"
            />
          ) : (
            <CgProfile
              size={80}
              className="text-zinc-500 bg-transparent rounded-full p-1 cursor-pointer"
              onClick={() =>
                document.getElementById("profileImageInput")?.click()
              }
            />
          )}
          <p className="font-semibold mt-3">Upload or change your profile picture</p>
        </div>
        <input
          id="profileImageInput"
          type="file"
          accept="image/*"
          className="hidden"
        />
        <div className="flex-grow mt-4">
          <div className="flex space-x-5">
            <div className="mb-4 ">
              <label className="block font-bold text-zinc-800">Name</label>
              <input
                type="text"
                defaultValue={currentUser.name}
                readOnly
                className="mt-1 block w-full border border-gray-600  text-zinc-800 rounded-md p-2"
              />
            </div>
            <div className="mb-4">
              <label className="block text-zinc-800 font-bold">Skill</label>
              <input
                type="text"
                defaultValue={currentUser.skill}
                readOnly
                className="mt-1 block w-full border border-gray-600  text-zinc-800 rounded-md p-2"
              />
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-zinc-800 font-bold">Bio</label>
            <input
              type="text"
              defaultValue={currentUser.bio}
              readOnly
              className="mt-1 block w-full border  border-gray-600  text-zinc-800 rounded-md p-2"
            />
          </div>
          <div className="flex space-x-5">
            <div className="mb-4">
              <label className="block text-zinc-800 font-bold">Country</label>
              <input
                type="text"
                defaultValue={currentUser.country}
                readOnly
                className="mt-1 block w-full border  border-gray-600  text-zinc-800 rounded-md p-2"
              />
            </div>

            <div className="mb-4">
              <label className="block text-zinc-800 font-bold">State</label>
              <input
                type="text"
                defaultValue={currentUser.states}
                readOnly
                className="mt-1 block w-full border  border-gray-600  text-zinc-800 rounded-md p-2"
              />
            </div>
          </div>
        </div>
      <div className="flex justify-end">
          <button
            type="submit"
            className="px-4 tracking-wide bg-zinc-900 font-bold  text-white py-2 rounded-md"
            onClick={handleOpenModal}
          >
            Update Profile
            {/* <BiEdit className="mt-2" /> */}
          </button>
          <EditProfileModal isOpen={isModalOpen} isRequestClose={closeModal} />
        </div>
      </div>
    </div>
  );
};

export default AccountInformation;
