
import ChatBody from "../../components/chat/ChatBody";
import NavBar from "../../components/common/navBar";
import { motion } from "framer-motion";

const ChatPage = () => {
  return (
    <div className="flex flex-col h-screen">
      <NavBar />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 8, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex-grow overflow-hidden pt-24">
        <ChatBody />
      </motion.div>
    </div>
  );
};

export default ChatPage;
