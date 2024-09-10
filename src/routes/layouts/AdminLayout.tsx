import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { User } from "../../@types/allTypes";
import useGetUser from "../../hook/getUser";

// for adminprotect layout routes
const AdminLayout: React.FC = () => {
  const currentAdmin: User | null = useGetUser();
  console.log("ADMIN", currentAdmin);
  if (!currentAdmin || !currentAdmin.email || !currentAdmin.id ) {
    console.log("Navigating to admin login...");
    return <Navigate to="/admin/login" replace={true} />;
  }else{

    return <Outlet />;
  }
  
};

export default AdminLayout;
