  import { useEffect, useRef, useState } from 'react';
  import logo from '../../../assets/skill.png';
  import useGetUser from '../../../hook/getUser';
  import { CgProfile } from "react-icons/cg";
  import { Link, useNavigate } from 'react-router-dom';
  import { useDispatch } from 'react-redux';
  import { logoutUser, profileImage } from '../../../API/user';
  import { deleteUser, setUserImages } from '../../../redux/userSlices';
  import toast from 'react-hot-toast';
  import { TbMessageDots } from 'react-icons/tb';
  import { MdNotifications } from 'react-icons/md';

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

      // Image fetch Request for profile image
  const fetchProfileImage = async () => {
    if (currentUser?.id) {
      try {

        console.log("res in first ==>")
        const response = await profileImage();
        if (response.imageUrls) {
          dispatch(setUserImages(response.imageUrls));
        }
      } catch (error) {
        console.error("Error fetching profile image:", error);
      }
    }
  };

  // Initially call the fetch
  useEffect(() => {
    fetchProfileImage();
  }, [currentUser?.id]);


    return (
      <nav className="bg-black shadow-xl shadow-zinc-950 shadow-bottom-only fixed z-50 w-full  ">
      <div className="container mx-auto flex justify-between items-center px-4 py-4">
        <div className=" font-bold text-gray-800">
          <img className="w-20 h-12" src={logo} alt="Skill Logo" />
        </div>

        <div className="flex items-center space-x-4">
          <Link to="/" className="text-zinc-900 font-bold hover:text-gray-600">
            Home
          </Link> 
          <Link to="/explore" className="text-gray-800 font-bold hover:text-gray-600">
            Explore
          </Link>
          <TbMessageDots size={32} className="cursor-pointer"/>
          <MdNotifications size={32} className="cursor-pointer "/>
          <div className="relative" ref={dropDownRef}>
            <button className="profileIcon" onClick={handleDropDown}>
              {currentUser.picture?.imageUrl ? (
                <img
                  src={currentUser.picture?.imageUrl}
                  className="w-11 h-11 object-cover rounded-full "
                />
              ) : (
                <CgProfile size={32} className=" object-cover rounded-full " />
              )}
            </button>
            {isDropDown && (
              <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-300 rounded-md shadow-lg z-50">
                <ul className="py-1">
                  {currentUser.profile === true || currentUser.email ? (
                    <>
                      <li>
                        <Link
                          to= {"/auth/viewProfile"}
                          className="cursor-pointer font-bold block px-4 py-2 text-gray-800 hover:bg-gray-100"
                        >
                          View Profile
                        </Link>
                      </li>
                      <li>
                        <a
                          onClick={() => navigate("/auth/settings")}
                          className="font-bold block px-4 py-2 text-gray-800 hover:bg-gray-100 cursor-pointer">
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
                  ) :      (
                    <>
                      <li>
                        <Link
                          to={"/auth/userSignup"}
                          className="font-bold block px-4 py-2 text-gray-800 hover:bg-gray-100"
                        >
                          Signup
                        </Link>
                      </li>
                      <li>
                        <Link
                          to={"/auth/userLogin"}
                          className="font-bold block px-4 py-2 text-gray-800 hover:bg-gray-100"
                        >
                          Login
                        </Link>
                      </li>
                    </>
                  )
                  }
            
              
                </ul>
              </div>
            )}
    
          </div>
        </div>
      </div>
    </nav>
    );
  };
  export default Header;
