import React from 'react'
import UserLists from '../../components/admin/userManagement/UserLists'
import SideBar from '../../components/admin/layouts/SideBar'

const UserManagement = () => {
  return (
    <div className='flex'>
  

      <SideBar/>
      <UserLists/>
      
      </div>
  
  )
}

export default UserManagement
