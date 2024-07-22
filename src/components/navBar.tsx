import React, { useRef, useState } from "react";
import skill from '../assets/skill.png';
import useGetUser from "../hook/getUser";
import { CgProfile } from 'react-icons/cg';
import { Link } from "react-router-dom";
import { logoutUser } from "../API/user";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { useDispatch, UseDispatch } from "react-redux";
import { deleteUser } from "../redux/userSlices";

const NavBar: React.FC = () => {
  const [isDropDown, openDropDown] = useState<boolean>(false);
  const dropDownRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const currentUser = useGetUser(); 
  // Handling the dropdown
  const handleDropDown = () => {
    openDropDown(!isDropDown);
  };

  // Logout handler
  const handleLogout = async() => {
    try {
      const response = await logoutUser()
      if(response.success){
        dispatch(deleteUser())
        navigate('/')
        toast.success(response.message)
      }
    } catch (error) {
      toast.error('logout failed')
    }
  }

  console.log("currentUser",currentUser )


  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto flex justify-between items-center px-4 py-4">
        <div className="text-xl font-bold text-gray-800">
          <img className="w-12 h-12 " src={skill} alt="Skill Logo" />
        </div>
        <div className="flex items-center space-x-4">
          <Link to="/" className="text-gray-800 hover:text-gray-600">
            Home
          </Link>
          <Link to="/explore" className="text-gray-800 hover:text-gray-600">
            Explore
          </Link>
          <div className="relative">
            <input
              type="text"
              placeholder="Search..."
              className="border border-gray-300 rounded-full py-1 px-4 focus:outline-none focus:ring-2 focus:ring-gray-400"
            />
          </div>
          <div className="relative" ref={dropDownRef}>
            <button className="profileIcon" onClick={handleDropDown}>
              <CgProfile size={35} />
            </button>
            {isDropDown && (
              <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-300 rounded-md shadow-lg z-50">
                <ul className="py-1">
                  {currentUser.profile === true ? (
                    <>
                      <li>
                        <a onClick={()=> navigate('/auth/viewProfile')} className="cursor-pointer font-bold block px-4 py-2 text-gray-800 hover:bg-gray-100">
                          View Profile
                        </a>
                      </li>
                      <li>
                        <a onClick={()=> navigate('/auth/settings')} className="font-bold block px-4 py-2 text-gray-800 hover:bg-gray-100">
                          Settings
                        </a>
                      </li>
                      <li>
                        <a onClick={handleLogout} className="font-bold block px-4 py-2 text-gray-800 hover:bg-gray-100 cursor-progress">
                          Logout
                        </a>
                      </li>
                    </>
                  ) : (
                    <>
                      <li>
                        <a onClick={() => navigate('/auth/userSignup')} className="font-bold block px-4 py-2 text-gray-800 hover:bg-gray-100">
                          Signup
                        </a>
                      </li>
                      <li>
                        <a onClick={() => navigate('/auth/userLogin')} className="font-bold block px-4 py-2 text-gray-800 hover:bg-gray-100">
                          Login
                        </a>
                      </li>
                    </>
                  )}
                </ul>
              </div>
            )}
            <Toaster/>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
