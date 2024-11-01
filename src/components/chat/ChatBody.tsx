import { useRef, useState, useEffect } from "react";
import SideBar from "./SideBar";
import ChatComponent from "./ChatCompontent";
import { useLocation } from 'react-router-dom'

export type SideBarHandle = {
  fetchChatUsers: () => Promise<void>;
};

const ChatBody = () => {
  const sideBarRef = useRef<SideBarHandle>(null);
  const [selectedUser, setSelectedUser] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState<boolean>(window.innerWidth < 640);


  
const location = useLocation()

const userId = location?.state?.userId;

  
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 640);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleNewMessage = async () => {
    if (sideBarRef.current) {
      await sideBarRef.current.fetchChatUsers();
    }
  };

  const handleSelectedUser = (userId: string) => {
    setSelectedUser(userId);
  };

  const handleBackClick = () => {
    setSelectedUser(null); // Deselect user
  };

  return (
    <div className="flex h-full">
      {(!selectedUser || !isMobile) && (
        <div className="w-full sm:w-1/2 md:w-1/2 lg:w-1/5 xl:w-1/6">
          <SideBar ref={sideBarRef} onSelectUser={handleSelectedUser} />
        </div>
      )}
      {selectedUser || userId ? (
        <div className="w-full sm:w-2/3 md:w-3/4 lg:w-4/5 xl:w-5/6">
          <ChatComponent
            onNewMessage={handleNewMessage}
            handleBackClick={handleBackClick}
          />
        </div>
      ) : (
        !isMobile && (
          <div className="w-full sm:w-2/3 md:w-3/4 lg:w-4/5 xl:w-5/6 flex justify-center items-center bg-gray-100">
            <div className="text-center p-8 bg-white rounded-lg shadow-md">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4 font-poppins">
                Welcome to SkillHub Chat   
              </h2>
              <p className="text-gray-600">
                Connect with fellow members to share knowledge and grow your
                skills.
              </p>
              <p className="text-gray-500 mt-2">
                Select a user from the list to start exchanging insights and
                expertise.
              </p>
            </div>
          </div>
        )
      )}
    </div>
  );
};

export default ChatBody;
