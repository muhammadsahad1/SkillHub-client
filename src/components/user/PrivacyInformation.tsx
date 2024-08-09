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
  const [isPrivate, setIsPrivate] = useState(false); // Initialize with a default value

  console.log("current user ", currentUser);

  useEffect(() => {
    if (currentUser) {
      setIsPrivate(currentUser?.accountPrivacy);
    }
  }, [currentUser]);

  // to change the privacy
  const handleToggle = async () => {
    try {
      const newPrivacyState = !isPrivate;
      const result = await accountPrivacy(newPrivacyState);
      if (result.status) {
        console.log("status =>",result);
        
        dispatch(
          setAccountPrivacy(result.updatedPrivacySettings?.accountPrivacy)
        );
        setIsPrivate(newPrivacyState); // Update local state
      } else {
        toast.error("Failed to change profile privacy");
      }
    } catch (error:any) {
      console.log(error);
      toast.error(error.message || "An error occurred");
    }
  };

  return (
    <div className="w-full flex justify-center items-center mt-28 md:flex-row md:space-x-5">
      <div className="w-1/2 shadow-md rounded-mg p-6 mb-7 border bottom-12 border-">
        <h1 className="font-poppins font-bold mb-4 text-3xl">
          Profile Visibility
        </h1>
        <CheckBoxBtn
          label={"Private Account"}
          isChecked={isPrivate}
          onChange={handleToggle}
        />
      </div>
    </div>
  );
};

export default PrivacyInformation;
