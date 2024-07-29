import React, { useState } from "react";
import CheckBoxBtn from "../common/CheckBoxBtn";

const NotificationSettings = () => {
  const [isShowNotification, setShowNotification] = useState<boolean>(false);

  return (
    <div className="w-full flex justify-center items-center mt-28">
      <div className="w-1/2 shadow-md rounded-mg p-6 mb-7 border bottom-12 border-">
        <h1 className="font-poppins font-bold mb-4 text-3xl">
          Notification settings
        </h1>
        <CheckBoxBtn
          label={"Show notification"}
          isChecked={isShowNotification}
          onChange={() => setShowNotification(!isShowNotification)}
        />
      </div>
    </div>
  );
};

export default NotificationSettings;
