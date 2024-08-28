import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { User } from "../../@types/allTypes";
import useGetUser from "../../hook/getUser";

// for adminprotect layout routes
const AdminLayout: React.FC = () => {
  const currentAdmin: User | null = useGetUser();
  if (currentAdmin && currentAdmin?.id) {
    return <Outlet />;
  } else {
    return <Navigate to="/admin/login" />;
  }
};

export default AdminLayout;
