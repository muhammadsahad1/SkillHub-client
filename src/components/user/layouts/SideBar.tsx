import { NavLink } from "react-router-dom";
import { HiOutlineChevronLeft } from "react-icons/hi";

const SideBar = ({ onClose, onSelect }) => {
  return (
    <div className={`bg-zinc-100 shadow-md fixed top-16 left-0 z-40 w-full md:w-1/4 lg:w-1/6 h-screen transition-transform ${onClose ? 'transform -translate-x-full' : ''}`}>
      <button onClick={onClose} className="absolute top-4 right-4 text-zinc-600">
        <HiOutlineChevronLeft />
      </button>
      <div className="mt-10">
        <ul className="font-bold font-poppins text-zinc-950 cursor-pointer ms-2">
          <NavLink to="/auth/settings" onClick={() => onSelect('settings')}>
            {({ isActive }) => (
              <li className={`border-b border-zinc-100 py-2 hover:bg-zinc-200 ${isActive ? 'bg-zinc-200' : ''}`}>
                <h2 className="ms-2">Account</h2>
              </li>
            )}
          </NavLink>
          <NavLink to="/auth/privacySettings" onClick={() => onSelect('privacy')}>
            {({ isActive }) => (
              <li className={`border-b border-zinc-100 py-2 hover:bg-zinc-200 ${isActive ? 'bg-zinc-200' : ''}`}>
                <h2 className="ms-2">Privacy</h2>
              </li>
            )}
          </NavLink>
          <NavLink to="/auth/notificationSettings" onClick={() => onSelect('notifications')}>
            {({ isActive }) => (
              <li className={`border-b border-zinc-100 py-2 hover:bg-zinc-200 ${isActive ? 'bg-zinc-200' : ''}`}>
                <h2 className="ms-2">Notifications</h2>
              </li>
            )}
          </NavLink>
        </ul>
      </div>
    </div>
  );
};

export default SideBar;
