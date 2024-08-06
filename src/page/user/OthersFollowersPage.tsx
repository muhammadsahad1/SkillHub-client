import React from "react";
import NavBar from "../../components/common/navBar";
import OtherProfileFollowers from "../../components/user/OtherProfileFollowers";
import { useParams } from "react-router-dom";

const OthersFollowersPage = () => {
  const { userId } = useParams<{userId :string}>();

  return (
    <div>
      <NavBar />
      <OtherProfileFollowers userId={userId} />
    </div>
  );
  
};

export default OthersFollowersPage;
