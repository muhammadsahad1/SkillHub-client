import { Navigate , Outlet } from "react-router-dom";
import React from "react";
import useGetUser from "../hook/getUser";
import { User } from "../@types/allTypes";

const ProtectLayout : React.FC = () => {
const currentUser : User = useGetUser()
return currentUser && currentUser.profile ? <Outlet/> : <Navigate to='/auth/userLogin'/>
}

export default ProtectLayout