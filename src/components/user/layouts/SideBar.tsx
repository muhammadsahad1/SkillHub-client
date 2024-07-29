import { NavLink } from "react-router-dom"

const SideBar = () => {
  return (
    <div className="bg-zinc-100 shadow-sm shadow-zinc-300 rounded-tr-3xl min-h-screen fixed top-0 left-0 z-40 sm:w-1/4 md:w-1/6 lg:w-1/6  sm:block">
      <div className="mt-20 ">
        <ul className="font-bold font-poppins text-zinc-100 cursor-pointer ms-2">
          <NavLink  to="/auth/settings">
            <li className="border-b border-zinc-100 py-2 hover:bg-zinc-200">
              <h2 className="ms-2 text-zinc-950">Account</h2>
            </li>
          </NavLink >

          <NavLink  to="/auth/privacySettings"  className="ms-2 " >
            <li className="border-b border-zinc-100 py-2 hover:bg-zinc-200">
              <h2 className="ms-2 text-zinc-950">Privacy</h2>
            </li>
          </NavLink >

          <NavLink  to="/auth/notificationSettings"  className="ms-2 " >
            <li className="border-b border-zinc-100 py-2 hover:bg-zinc-200">
              <h2 className="ms-2 text-zinc-950">Notifications</h2>
            </li>
          </NavLink >
        </ul>
      </div>
    </div>
  )
}

export default SideBar
