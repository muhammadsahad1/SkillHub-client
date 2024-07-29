import React, { useEffect, useState } from "react";
import CheckBoxBtn from "../common/CheckBoxBtn";
import { accountPrivacy } from "../../API/user";
import { setAccountPrivacy } from "../../redux/userSlices";

const PrivacyInformation = () => {
  const [isPrivate, setPrivate] = useState<boolean>(false);

  // to change the privacy 
  const changePrivacy = async () => {
    try {
      const result = await accountPrivacy(isPrivate);
      // if (result.success) {
      //   setAccountPrivacy(result.)
      // }

    } catch (error) {
      console.log(error)
    }
  };

  useEffect(() => {
    changePrivacy();
  }, [isPrivate]);

  return (
    <div className="w-full flex justify-center items-center mt-28">
      <div className="w-1/2 shadow-md rounded-mg p-6 mb-7 border bottom-12 border-">
        <h1 className="font-poppins font-bold mb-4 text-3xl">
          Profile Visibility
        </h1>
        <CheckBoxBtn
          label={"Private Account"}
          isChecked={isPrivate}
          onChange={() => setPrivate(!isPrivate)}
        />
      </div>
    </div>
  );
};

export default PrivacyInformation;
