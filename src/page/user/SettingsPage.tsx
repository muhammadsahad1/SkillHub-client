import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import SideBar from '../../components/user/layouts/SideBar';
import AccountInformation from '../../components/user/AccountInformation';
import PrivacyInformation from '../../components/user/PrivacyInformation';
import NotificationSettings from '../../components/user/NotificationSettings';
import NavBar from '../../components/common/navBar';
import { HiOutlineChevronLeft } from 'react-icons/hi';

const SettingsPage = () => {
  const [sidebarVisible, setSidebarVisible] = useState(true);
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const location = useLocation();

  // Update selectedItem based on the current route
  React.useEffect(() => {
    const path = location.pathname;
    if (path === '/auth/settings') {
      setSelectedItem('settings');
    } else if (path === '/auth/privacySettings') {
      setSelectedItem('privacy');
    } else if (path === '/auth/notificationSettings') {
      setSelectedItem('notifications');
    }
  }, [location.pathname]);

  const handleSidebarClose = () => {
    setSidebarVisible(false);
  };

  const handleSidebarOpen = () => {
    setSidebarVisible(true);
  };

  return (
    <div className="flex flex-col md:flex-row">
      {sidebarVisible && <SideBar onClose={handleSidebarClose} onSelect={setSelectedItem} />}
      <div className={`flex-grow mt-5 p-8 ${sidebarVisible ? 'md:ml-64 lg:ml-80 xl:ml-96' : ''}`}>
        <NavBar />
        {selectedItem === 'settings' && <AccountInformation />}
        {selectedItem === 'privacy' && <PrivacyInformation />}
        {selectedItem === 'notifications' && <NotificationSettings />}
        {!sidebarVisible && (
          <button onClick={handleSidebarOpen} className="text-zinc-600">
            <HiOutlineChevronLeft />
          </button>
        )}
      </div>
    </div>
  );
};

export default SettingsPage;
