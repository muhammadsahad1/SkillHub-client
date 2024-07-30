import React, { useEffect, useState } from "react";
import CheckBoxBtn from "../common/CheckBoxBtn";
import { accountPrivacy } from "../../API/user";
import { setAccountPrivacy } from "../../redux/userSlices";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import useGetUser from "../../hook/getUser";

const PrivacyInformation = () => {
  const dispatch = useDispatch();
  const currentUser = useGetUser();
  const isPrivate = currentUser?.accountPrivacy

  console.log("current user ",useGetUser())
  // to change the privacy
  const handleToggle  = async () => {
    try {
      const newPrivacyState = !isPrivate; 
      const result = await accountPrivacy(newPrivacyState);
      if (result.status) {
        dispatch(
          setAccountPrivacy(result.updatedPrivacySettings?.isProfilePublic)
        );
      } else {
        toast.error("Failed to change profile privacy");
      }
    } catch (error: any) {
      console.log(error);
      toast.error(error.data.message);
    }
  };

  

  return (
    <div className="w-full flex justify-center items-center mt-28  md:flex-row md:space-x-5">
      <div className="w-1/2 shadow-md rounded-mg p-6 mb-7 border bottom-12 border-">
        <h1 className="font-poppins font-bold mb-4 text-3xl">
          Profile Visibility
        </h1>
        <CheckBoxBtn
          label={"Private Account"}
          isChecked={isPrivate}
          onChange={handleToggle }
        />
      </div>
    </div>
  );
};

export default PrivacyInformation;
