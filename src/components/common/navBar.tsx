import React, { useEffect, useRef, useState } from "react";
import skill from "../../assets/main logo.png";
import useGetUser from "../../hook/getUser";
import { profileImage } from "../../API/user";
import { Link, useLocation } from "react-router-dom";
import { logoutUser } from "../../API/user";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { deleteUser, setUserImages } from "../../redux/userSlices";
import { CgProfile } from "react-icons/cg";
import { TbMessageDots } from "react-icons/tb";
import { MdNotifications } from "react-icons/md";
import SearchUsers from "./searchUsers";
import NotificationEntry from "../notification/NotificationEntry";
import {
  fetchNotifications,
  removeAllNotifications,
} from "../../redux/features/notificationSlices";
import { RootState } from "../../redux/store";
import ProfessionalAccountModal from "../user/profile/ProfessionalAccountModal";
import { GiHamburgerMenu } from "react-icons/gi";

const NavBar: React.FC = () => {
  const [isDropDownOpen, setDropDownOpen] = useState<boolean>(false);
  const [isNotificationsDropdownOpen, setNotificationsDropdownOpen] =
    useState<boolean>(false);
  const [isProfessionalModalOpen, setProfessionalModalOpen] =
    useState<boolean>(false);
  const [isMobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const profileDropdownRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

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

  useEffect(() => {
    if (loggedInUser.email != "") {
      dispatch(fetchNotifications() as any);
    }
  }, [loggedInUser.email]);

  useEffect(() => {
    getProfileImage();
  }, [loggedInUser.picture?.imageUrl]);

  const logoutHandler = async () => {
    try {
      const response = await logoutUser();
      if (response.success) {
        dispatch(deleteUser());
        dispatch(removeAllNotifications());
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

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };

  console.log("loggedInUser", loggedInUser);

  const isActive = (path: string) =>
    location.pathname === path ? "border-b-2 border-emerald-500" : "";

  return (
    <nav className="bg-zinc-100 shadow-lg fixed w-full right-0 z-50 top-0 left-0">
      <div className="container mx-auto flex justify-between items-center px-4 py-4 font-poppins">
        <div className="flex justify-start items-center space-x-4">
          <img className="w-20 h-12" src={skill} alt="Skill Logo" />
          <div className="hidden md:block">
            <SearchUsers />
          </div>
        </div>
        <div className="md:hidden">
          <button onClick={toggleMobileMenu}>
            <GiHamburgerMenu size={32} />
          </button>
        </div>
        <div className="hidden md:flex items-center space-x-4">
          <Link
            to="/"
            className={`text-zinc-900 font-bold hover:text-gray-600 ${isActive(
              "/"
            )}`}
          >
            Home
          </Link>
          <Link
            to="/auth/events"
            className={`text-zinc-900 font-bold hover:text-gray-600 ${isActive(
              "/auth/events"
            )}`}
          >
            Explore
          </Link>
          {loggedInUser?.id && (
            <Link
              to="/auth/groups"
              className={`text-zinc-900 font-bold hover:text-gray-600 ${isActive(
                "/auth/groups"
              )}`}
            >
              Groups
            </Link>
          )}
          <Link to="/auth/chat">
            {loggedInUser?.id && (
              <TbMessageDots size={32} className="cursor-pointer" />
            )}
          </Link>
          <div
            onClick={toggleNotificationsDropdown}
            className="cursor-pointer relative"
          >
            {unreadNotificationsCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-emerald-400 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                {unreadNotificationsCount}
              </span>
            )}
            <MdNotifications size={32} />
          </div>
          <div className="relative" ref={profileDropdownRef}>
            <button
              className="profile-icon-btn"
              onClick={toggleProfileDropdown}
            >
              {loggedInUser && loggedInUser?.picture?.imageUrl ? (
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
                  {loggedInUser?.profile || loggedInUser?.email ? (
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
      {isMobileMenuOpen && (
        <div className="md:hidden flex flex-col items-center space-y-4 p-4 bg-zinc-100">
          <SearchUsers />
          <Link
            to="/"
            className={`text-zinc-900 font-bold hover:text-gray-600 ${isActive(
              "/"
            )}`}
          >
            Home
          </Link>
          <Link
            to="/auth/events"
            className={`text-zinc-900 font-bold hover:text-gray-600 ${isActive(
              "/auth/events"
            )}`}
          >
            Explore
          </Link>
          {loggedInUser?.id && (
            <Link
              to="/auth/groups"
              className={`text-zinc-900 font-bold hover:text-gray-600 ${isActive(
                "/auth/groups"
              )}`}
            >
              Groups
            </Link>
          )}
          {loggedInUser.id && (
            <Link to="/auth/chat">
              <TbMessageDots size={32} className="cursor-pointer" />
            </Link>
          )}
          <div
            onClick={toggleNotificationsDropdown}
            className="cursor-pointer relative"
          >
            {unreadNotificationsCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-emerald-400 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                {unreadNotificationsCount}
              </span>
            )}
            <MdNotifications size={32} />
          </div>
          <div className="relative" ref={profileDropdownRef}>
            <button
              className="profile-icon-btn"
              onClick={toggleProfileDropdown}
            >
              {loggedInUser && loggedInUser?.picture?.imageUrl ? (
                <img
                  src={loggedInUser.picture.imageUrl}
                  className="w-11 h-11 object-cover rounded-full"
                />
              ) : (
                <CgProfile size={32} className="object-cover rounded-full" />
              )}
            </button>
            {isDropDownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-300 rounded-md shadow-lg z-50">
                <ul className="py-1">
                  {loggedInUser?.profile || loggedInUser?.email ? (
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
      )}
      {isNotificationsDropdownOpen && (
        <div className="absolute top-50 right-4 w-80 z-1 max-h-96">
          <NotificationEntry onClose={toggleNotificationsDropdown} />
        </div>
      )}
      {isProfessionalModalOpen && <ProfessionalAccountModal />}
    </nav>
  );
};

export default NavBar;
