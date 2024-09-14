
import UserLists from '../../components/admin/userManagement/UserLists'
import SideBar from '../../components/admin/layouts/SideBar'
import useGetUser from '../../hook/getUser'

const UserManagement = () => {
  console.log("admin data ==>", useGetUser())

  return (
    <div className="flex flex-col lg:flex-row min-h-screen">
      <div className="lg:w-1/6 lg:fixed lg:h-screen">
        <SideBar />
      </div>
      <div className="w-full lg:w-5/6 lg:ml-[16.67%] p-4">
        <UserLists />
      </div>
    </div>
  )
}

export default UserManagement