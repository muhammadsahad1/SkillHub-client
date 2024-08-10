import React, { useEffect, useRef, useState } from "react";
import skill from "../../assets/main logo.png";
import useGetUser from "../../hook/getUser";
import { profileImage } from "../../API/user";
import { Link } from "react-router-dom";
import { logoutUser } from "../../API/user";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { useDispatch  } from "react-redux";
import { deleteUser } from "../../redux/userSlices";
import { setUserImages } from "../../redux/userSlices";
import { CgProfile } from "react-icons/cg";
import { TbMessageDots } from "react-icons/tb";
import { MdNotifications } from "react-icons/md";
import SearchUsers from "./searchUsers";


const NavBar: React.FC = () => {
  const [isDropDown, openDropDown] = useState<boolean>(false);
  const dropDownRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const currentUser = useGetUser();
  // Handling the dropdown
  const handleDropDown = () => {
    openDropDown(!isDropDown);
  };

  // fetch the userImage
  const fetchProfileImage = async () => {
    if (currentUser?.id) {
      try {
        const response = await profileImage();
        dispatch(setUserImages(response.imageUrl));
        console.log("res image URLS ===>", response.imageUrl);
      } catch (error : any) {
        toast.success(error.message)
      }
    }
  };

  useEffect(() => {
    fetchProfileImage();
  }, [currentUser.picture?.imageUrl]);

  // Logout handler
  const handleLogout = async () => {
    try {
      const response = await logoutUser();
      if (response.success) {
        dispatch(deleteUser());
    
        navigate("/");
        toast.success(response.message);
      }
    } catch (error) {
      toast.error("logout failed");
    }
  };

  console.log("currentUser", currentUser);
  
  return (
    <nav className="bg-zinc-100 shadow-lg fixed w-full z-50 top-0 left-0">
    <div className="container mx-auto flex justify-between items-center px-4 py-4">
      <div className="flex justify-start">
      <div className="font-bold text-gray-800">
        <img className="w-20 h-12" src={skill} alt="Skill Logo" />
      </div>

      <SearchUsers />
      </div>
      <div className="flex items-center space-x-4">
        <Link to="/" className="text-zinc-900 font-bold hover:text-gray-600">
          Home
        </Link>
        <Link to="/explore" className="text-gray-800 font-bold hover:text-gray-600">
          Explore
        </Link>
        <TbMessageDots size={32} className="cursor-pointer" />
        <MdNotifications size={32} className="cursor-pointer" />
        <div className="relative" ref={dropDownRef}>
          <button className="profileIcon" onClick={handleDropDown}>
            {currentUser.picture?.imageUrl ? (
              <img
                src={currentUser.picture?.imageUrl}
                className="w-11 h-11 object-cover rounded-full"
              />
            ) : (
              <CgProfile size={32} className="object-cover rounded-full" />
            )}
          </button>
          {isDropDown && (
            <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-300 rounded-md shadow-lg z-50">
              <ul className="py-1">
                {currentUser.profile || currentUser.email ? (
                  <>
                    <li>
                      <Link
                        to="/auth/viewProfile"
                        className="cursor-pointer font-bold block px-4 py-2 text-gray-800 hover:bg-gray-100"
                      >
                        View Profile
                      </Link>
                    </li>
                    <li>
                      <a
                        onClick={() => navigate("/auth/settings")}
                        className="font-bold block px-4 py-2 text-gray-800 hover:bg-gray-100 cursor-pointer"
                      >
                        Settings
                      </a>
                    </li>
                    <li>
                      <a
                        onClick={handleLogout}
                        className="font-bold block px-4 py-2 text-gray-800 hover:bg-gray-100 cursor-pointer"
                      >
                        Logout
                      </a>
                    </li>
                  </>
                ) : (
                  <>
                    <li>
                      <Link
                        to="/auth/userSignup"
                        className="font-bold block px-4 py-2 text-gray-800 hover:bg-gray-100"
                      >
                        Signup
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/auth/userLogin"
                        className="font-bold block px-4 py-2 text-gray-800 hover:bg-gray-100"
                      >
                        Login
                      </Link>
                    </li>
                  </>
                )}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  </nav>
  );
};

export default NavBar;
