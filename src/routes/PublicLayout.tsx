import { Navigate , Outlet } from "react-router-dom";
import useGetUser from "../hook/getUser";
import { User } from "../@types/allTypes";
import React from "react";

const PublicLayout : React.FC = () => {
  const currentUser :User = useGetUser()
  return currentUser.profile ? <Navigate to='/'/> : <Outlet/>
}

export default PublicLayout