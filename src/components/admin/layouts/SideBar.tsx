import React, { useState } from "react";
import logo from "../../../assets/admin Logomain.png";
import { NavLink, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { adminLogout } from "../../../API/admin";

const SideBar = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = async () => {
    try {
      const result = await adminLogout();
      if (result.message) {
        navigate("/admin/login");
        toast.success(result.message);
      } else {
        toast.error("Logout failed");
      }
    } catch (error: any) {
      toast.error(error?.message);
    }
  };

  return (
    <div className="lg:w-1/6 w-full lg:fixed bg-zinc-950 text-zinc-100 p-4 h-auto lg:h-screen rounded-tr-3xl">
      <div className="flex justify-between lg:justify-start items-center">
        <div className="flex items-center">
          <img
            src={logo}
            alt="admin logo"
            className="w-12 h-12 lg:w-24 lg:h-24"
          />
          <h1 className="text-lg lg:text-2xl font-bold ml-4">Admin</h1>
        </div>
        <button
          className="lg:hidden text-white focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
        >
          ☰
        </button>
      </div>

      <div className={`${isOpen ? "block" : "hidden"} lg:block`}>
        <ul className="font-bold text-zinc-100 mt-4">
          <NavLink to="/admin/dashboard" onClick={() => setIsOpen(false)}>
            <li className="border-b border-zinc-100 py-2 hover:bg-zinc-700">
              Dashboard
            </li>
          </NavLink>
          <NavLink to="/admin/ums" onClick={() => setIsOpen(false)}>
            <li className="border-b border-zinc-100 py-2 hover:bg-zinc-700">
              User Management
            </li>
          </NavLink>
          <NavLink
            to="/admin/verification-requests"
            onClick={() => setIsOpen(false)}
          >
            <li className="border-b border-zinc-100 py-2 hover:bg-zinc-700">
              Verification Requests
            </li>
          </NavLink>
          <NavLink
            to="/admin/events"
            onClick={() => setIsOpen(false)}
          >
            <li className="border-b border-zinc-100 py-2 hover:bg-zinc-700">
              Verification Events
            </li>
          </NavLink>
        </ul>
        <button
          className="mt-4 block w-full border-2 border-zinc-900 px-6 py-2 hover:bg-[#636363] hover:text-white transition duration-200 rounded-lg font-bold"
          onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  );
};

export default SideBar;
