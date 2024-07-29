import React from 'react'
import NotificationSettings from '../components/user/NotificationSettings'
import Header from '../components/user/layouts/Header'
import SideBar from '../components/user/layouts/SideBar'

const NotificationSettingsPage = () => {
  return (
    <div>
      <Header/>
      <SideBar/>
      <NotificationSettings/>
    </div>
  )
}

export default NotificationSettingsPage
