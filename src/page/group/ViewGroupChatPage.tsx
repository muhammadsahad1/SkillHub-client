import React from "react";
import GroupChatBody from "../../components/group/GroupChatBody";
import NavBar from "../../components/common/navBar";

const ViewGroupChatPage = () => {
  return (
    <div className="flex flex-col h-screen">
      <NavBar />
      <div className="flex-1 overflow-hidden mt-28">
        <GroupChatBody />
      </div>
    </div>
  );
};

export default ViewGroupChatPage;
