import SideBar from "./SideBar";
import ChatComponent from "./ChatCompontent";
import { useRef } from "react";

export type SideBarHandle = {
  fetchChatUsers : () => Promise<void>
}

const ChatBody = () => {

  const sideBarRef = useRef<SideBarHandle>(null)


  const handleNewMessage = async() => {
    if(sideBarRef.current){
      await sideBarRef.current?.fetchChatUsers()
    }
  }

  return (
    <div className="flex h-full">
      <div className="w-full sm:w-1/3 md:w-1/4 lg:w-1/5 xl:w-1/6">
        <SideBar ref={sideBarRef}/>
      </div>
      <div className="hidden sm:block w-full sm:w-2/3 md:w-3/4 lg:w-4/5 xl:w-5/6">
      <ChatComponent onNewMessage={handleNewMessage}/>
      </div>  
    </div>
  );
};

export default ChatBody
