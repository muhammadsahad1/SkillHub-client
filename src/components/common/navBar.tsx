import React, { useEffect, useRef, useState } from "react";
import skill from "../../assets/main logo.png";
import useGetUser from "../../hook/getUser";
import { profileImage } from "../../API/user";
import { Link } from "react-router-dom";
import { logoutUser } from "../../API/user";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { deleteUser, setUserImages } from "../../redux/userSlices";
import { CgProfile } from "react-icons/cg";
import { TbMessageDots } from "react-icons/tb";
import { MdNotifications } from "react-icons/md";
import SearchUsers from "./searchUsers";
import NotificationEntry from "../notification/NotificationEntry";
import { fetchNotifications } from "../../redux/features/notificationSlices";
import { RootState } from "../../redux/store";
import ProfessionalAccountModal from "../user/profile/ProfessionalAccountModal";

const NavBar: React.FC = () => {
  const [isDropDownOpen, setDropDownOpen] = useState<boolean>(false);
  const [isNotificationsDropdownOpen, setNotificationsDropdownOpen] = useState<boolean>(false);
  const [isProfessionalModalOpen, setProfessionalModalOpen] = useState<boolean>(false);
  const profileDropdownRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const unreadNotificationsCount = useSelector(
    (state: RootState) => state?.notifications?.unreadCount
  );

  const loggedInUser = useGetUser();
  
  const toggleProfileDropdown = () => {
    setDropDownOpen(!isDropDownOpen);
  };

  const getProfileImage = async () => {
    if (loggedInUser?.id) {
      try {
        const response = await profileImage();
        dispatch(setUserImages(response.imageUrls.imageUrl));
      } catch (error: any) {
        toast.success(error.message);
      }
    }
  };
  // updating the notification with redux thunk
  useEffect(() => {
    dispatch(fetchNotifications() as any);
  }, [dispatch]);

  useEffect(() => {
    console.log("Fetching profile image");
    getProfileImage();
  }, [loggedInUser.picture?.imageUrl]);
// handling the logout
  const logoutHandler = async () => {
    try {
      const response = await logoutUser();
      if (response.success) {
        dispatch(deleteUser());

        navigate("/");
        toast.success(response.message);
      }
    } catch (error) {
      toast.error("Logout failed");
    }
  };

  const toggleNotificationsDropdown = () => {
    setNotificationsDropdownOpen(!isNotificationsDropdownOpen);
  };

  const toggleProfessionalModal = () => {
    setProfessionalModalOpen(!isProfessionalModalOpen);
  };

  console.log("loggedInUser", loggedInUser);

  return (
    <nav className="bg-zinc-100 shadow-lg fixed w-full right-0 z-50 top-0 left-0">
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
          <Link
            to="/auth/events"
            className="text-gray-800 font-bold hover:text-gray-600"
          >
            Explore
          </Link>
          <Link to="/auth/chat">
            <TbMessageDots size={32} className="cursor-pointer" />
          </Link>
          <div onClick={toggleNotificationsDropdown} className="cursor-pointer relative">
            {unreadNotificationsCount > 0 && (
              <span className="absolute -top  -2 -right-2 bg-emerald-400 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                {unreadNotificationsCount}
              </span>
            )}
            <MdNotifications size={32} />
          </div>
          <div className="relative" ref={profileDropdownRef}>
            <button className="profile-icon-btn" onClick={toggleProfileDropdown}>
              {loggedInUser &&
              loggedInUser?.picture?.imageUrl ? (
                <img
                  src={loggedInUser?.picture?.imageUrl}
                  className="w-11 h-11 object-cover rounded-full"
                />
              ) : (
                <CgProfile size={32} className="object-cover rounded-full" />
              )}
            </button>
            {isDropDownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-300 rounded-md shadow-lg z-50">
                <ul className="py-1">
                  {loggedInUser.profile || loggedInUser.email ? (
                    <>
                      <li>
                        <Link
                          to="/auth/viewProfile"
                          className="cursor-pointer font-bold block px-4 py-2 text-gray-800 hover:bg-gray-100"
                        >
                          View profile
                        </Link>
                      </li>
                      <li
                        className="cursor-pointer font-bold block px-4 py-2 text-gray-800 hover:bg-gray-100"
                        onClick={toggleProfessionalModal}
                      >
                        Professional account
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
                          onClick={logoutHandler}
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
      {isNotificationsDropdownOpen && (
        <div className="absolute top-50 right-4 w-80 z-50 max-h-96">
          <NotificationEntry onClose={toggleNotificationsDropdown} />
        </div>
      )}
      {isProfessionalModalOpen && <ProfessionalAccountModal />}
    </nav>
  );
};

export default NavBar;
