import React from "react";
import logo from "../../../assets/admin Logomain.png";
import { NavLink  } from "react-router-dom";

const SideBar = () => {
  return (
    <div className="bg-zinc-950 rounded-tr-3xl min-h-screen w-1/6 ">
      <div className="flex items-start ">
        <img src={logo} alt="admin logo" className="w-24 h-24" />
        <h1 className="text-zinc-200 font-poppins font-bold mt-12 ">Admin</h1>
      </div>
      <div className="">
        <ul className="font-bold text-zinc-100 cursor-pointer">
          <NavLink  to="/admin/dashboard">
            <li className="border-b border-zinc-100 py-2 hover:bg-zinc-700">
              <h2 className="ms-2">Dashboard</h2>
            </li>
          </NavLink >

          <NavLink  to="/admin/ums"  className="ms-2 " >
            <li className="border-b border-zinc-100 py-2 hover:bg-zinc-700">
              <h2 className="ms-2">User management</h2>
            </li>
          </NavLink >
        </ul>
      </div>
    </div>
  );
};

export default SideBar;
