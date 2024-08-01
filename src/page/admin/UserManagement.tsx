import React from 'react'
import UserLists from '../../components/admin/userManagement/UserLists'
import SideBar from '../../components/admin/layouts/SideBar'
import useGetUser from '../../hook/getUser'

const UserManagement = () => {
console.log("admin data ==>",useGetUser())

  return (
    <div className="flex flex-col md:flex-row min-h-screen">
    <SideBar />
    <div className="ml-auto w-full md:w-5/6 p-4">
      <UserLists />
    </div>
  </div>
  
  )
}

export default UserManagement
