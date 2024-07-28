import { Navigate, Outlet } from "react-router-dom";
import React from "react";
import useGetUser from "../hook/getUser";
import { User } from "../@types/allTypes";

const ProtectLayout: React.FC = () => {
  const currentUser: User = useGetUser();
  
  if (currentUser && currentUser.blocked) {
    return <Navigate to="/blockedUser" />;
  } else if (currentUser && currentUser.email) {
    return <Outlet />;
  } else {
    return <Navigate to="/auth/userLogin" />;
  }
};

export default ProtectLayout;
