import React from 'react'
import SideBar from '../../components/user/layouts/SideBar'
import AccountInformation from '../../components/user/AccountInformation'
import NavBar from '../../components/common/navBar';

const SettingsPage = () => {
  return (
    <div className="flex">
    <SideBar />
    <div className="flex-grow ml-64 mt-5 p-8"> {/* Adjust margin and padding to fit your layout */}
      <NavBar />
      <AccountInformation />
    </div>
  </div>
);
};


export default SettingsPage
