import { useRef, useState } from 'react';
import logo from '../../../assets/skill.png';
import useGetUser from '../../../hook/getUser';
import { CgProfile } from "react-icons/cg";
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logoutUser } from '../../../API/user';
import { deleteUser } from '../../../redux/userSlices';
import toast from 'react-hot-toast';

const Header = () => {
  const currentUser = useGetUser()
  const [isDropDown,setIsDropDown] = useState<boolean>(false)
  const dropDownRef = useRef<HTMLDivElement>(null);

  const navigate = useNavigate()
  const dispatch = useDispatch()

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

  const handleDropDown = () => {
    setIsDropDown(!isDropDown)
  }
  return (
    <div className='w-full bg-zinc-100 shadow-sm shadow-zinc-300 px-4 py-3 flex items-center fixed z-50 top-0 left-0'>
    <img src={logo} className="w-12 h-12" alt="Skill Logo" />
    <h2 className='font-bold text-xl ml-4'>Skill Hub</h2>
    <div className='flex flex-grow justify-end items-center ' ref={dropDownRef}>
    <button className="profileIcon" onClick={handleDropDown} >
              {currentUser.picture?.imageUrl ? (
                <img
                  src={currentUser.picture?.imageUrl}
                  className="w-11 h-11 object-cover rounded-full hover:size-9"
                />
              ) : (
                <CgProfile size={32} className=" object-cover rounded-full hover:size-9" />
              )}
            </button>
            {isDropDown && (
          <div className="absolute right-0 mt-44 me-3 w-48 bg-white border border-gray-300 rounded-md shadow-lg z-50">
            <ul className="py-1">
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
            </ul>
          </div>
        )}
    </div>
  </div>
  );
};
export default Header;
