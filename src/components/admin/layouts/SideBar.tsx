import React from "react";
import logo from "../../../assets/admin Logomain.png";
import { NavLink, useNavigate } from "react-router-dom";
import Button from "../../common/Button";
import { adminLogout } from "../../../API/admin";
import toast from "react-hot-toast";

const SideBar = () => {

  const navigate = useNavigate()
  const handleLogout = async () => {
    try {
      const result = await adminLogout()

        if(result.message){
          navigate('/admin/login')
        toast.success(result.message)
      }else{
        toast.error("logout failed")  
      }
    } catch (error : any) {
      toast.error(error.message)
    }
  }

  return (
    <div className="bg-zinc-950 rounded-tr-3xl min-h-screen w-1/6 fixed">
      <div className="flex items-start ">
        <img src={logo} alt="admin logo" className="w-24 h-24" />
        <h1 className="text-zinc-200 font-poppins font-bold mt-12 ">Admin</h1>
      </div>
      <div className="">
        <ul className="font-bold text-zinc-100 cursor-pointer">
          
          <NavLink to="/admin/dashboard">
            <li className="border-b border-zinc-100 py-2 hover:bg-zinc-700">
              <h2 className="ms-2">Dashboard</h2>
            </li>
          </NavLink>

          <NavLink to="/admin/ums" className="ms-2 ">
            <li className="border-b border-zinc-100 py-2 hover:bg-zinc-700">
              <h2 className="ms-2">User management</h2>
            </li>
          </NavLink>

          <NavLink to="/admin/verification-requests" className="ms-2 ">
            <li className="border-b border-zinc-100 py-2 hover:bg-zinc-700">
              <h2 className="ms-2">Verification Requests</h2>
            </li>
          </NavLink>

        </ul>
        <button className="mt-4 border-2 border-zinc-900 px-6 py-2   hover:bg-[#636363] hover:text-white dark:text-neutral-200 transition duration-200 rounded-lg font-bold transform hover:-translate-y-1 duration-400 bg-zinc-100 bottom-5 left-3"
        onClick={handleLogout}
        >
          {" "}
          Logout{" "}
        </button>
      </div>
    </div>
  );
};

export default SideBar;
