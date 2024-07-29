import React from "react";
import Header from "../../components/user/layouts/Header";
import SideBar from "../../components/user/layouts/SideBar";
import PrivacyInformation from "../../components/user/PrivacyInformation";

const PrivacyUserPage = () => {
  return (
    <div>
      <Header />
      <SideBar />
      <PrivacyInformation/>
    </div>
  );
};

export default PrivacyUserPage;
