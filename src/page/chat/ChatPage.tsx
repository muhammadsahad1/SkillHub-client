import React from 'react'
import ChatBody from '../../components/chat/ChatBody'
import NavBar from '../../components/common/navBar'

const ChatPage = () => {
  return (
    <div className="flex flex-col h-screen">
      <NavBar/>
      <div className="flex-grow overflow-hidden pt-24">
        <ChatBody/>
      </div>
    </div>
  )
}

export default ChatPage