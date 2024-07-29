import React from 'react'
import Header from '../../components/user/layouts/Header'
import SideBar from '../../components/user/layouts/SideBar'
import AccountInformation from '../../components/user/AccountInformation'

const SettingsPage = () => {
  return (
    <div>
      <Header/>
      <SideBar/>
      <AccountInformation/>
    </div>
  )
}

export default SettingsPage
