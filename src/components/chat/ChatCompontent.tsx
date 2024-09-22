import React, { useEffect, useRef, useState } from "react";
import {
  Box,
  Avatar,
  Typography,
  IconButton,
  Paper,
  InputBase,
  Divider,
  Fade,
} from "@mui/material";
import VideocamIcon from "@mui/icons-material/Videocam";
import InsertEmoticonIcon from "@mui/icons-material/InsertEmoticon";
import { BiPaperPlane, BiImageAdd } from "react-icons/bi";
import EmojiPicker from "emoji-picker-react";
import TimeLine from "./TimeLine";
import useGetUser from "../../hook/getUser";
import { useLocation, useNavigate } from "react-router-dom";
import {
  fetchChatUsers,
  sendChat,
  sendImageInChat,
} from "../../API/conversation";
import { useSocket } from "../../hook/useSocket";
import { useNotifyUser } from "../../hook/useNotifyUser";
import { useVideoCall } from "../../contexts/VideoCallContext";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Button } from "antd";
import { showToastError } from "../common/utilies/toast";
import { IoMdArrowRoundBack } from "react-icons/io";

const formatTime = (dateString: string) => {
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return "Invalid date";
  
  let hours = date.getHours();
  let minutes = String(date.getMinutes()).padStart(2, "0");
  const ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12;
  hours = hours ? hours : 12;
  return `${hours}:${minutes} ${ampm}`;
};

type OnNewMessage = {
  onNewMessage: () => Promise<void>;
  handleBackClick: () => void;
};

const ChatComponent = ({ onNewMessage, handleBackClick }: OnNewMessage) => {
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [image, setImage] = useState<null | File>(null);
  const [prevModal, setPrevModal] = useState<boolean>(false);
  const [imagePreview, setImagePrev] = useState<string | null>(null);
  const [message, setMessage] = useState<string>("");
  const [chats, setChat] = useState<any>([]);
  const [user, setUser] = useState<any>({});
  const { socket } = useSocket();
  const sender = useGetUser();
  const location = useLocation();
  const navigate = useNavigate();
  const { requestCall } = useVideoCall();
  const imageUseRef = useRef<HTMLInputElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const lastMessageRef = useRef<HTMLDivElement>(null);
  const userId = location?.state?.userId;

  useEffect(() => {
    if (socket) {
      const handleReceiveMessage = (data: any) => {
        if (data.receiverId === userId || data.senderId === userId) {
          setChat((prevChat: any) => [...prevChat, data]);
          onNewMessage();
        }
      };
      socket.on("receiveData", handleReceiveMessage);
      return () => {
        socket.off("receiveData", handleReceiveMessage);
      };
    }
  }, [socket, userId, onNewMessage]);

  // Fetch the chat history only once
  useEffect(() => {
    const fetchChat = async () => {
      if (userId) {
        try {
          const userChat = await fetchChatUsers(sender.id as string, userId as string);
          setUser(userChat?.userWithProfileImage);
          setChat(userChat?.messages || []);
          socket?.emit("joinRoom", { senderId: sender.id, receiverId: userId });
        } catch (error) {
          console.log("error", error);
        }
      }
    };

    fetchChat();
  }, [userId, sender.id, socket]);

  // Scroll to last message
  useEffect(() => {
    if (lastMessageRef.current) {
      lastMessageRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [chats]);

  const handlePreviewImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const validImage = ["image/jpg", "image/jpeg", "image/png", "image/gif"];
      if (!validImage.includes(file.type)) {
        showToastError("It must be a valid image");
        return;
      }
      setImage(file);
      const previewUrl = URL.createObjectURL(file);
      setImagePrev(previewUrl);
      setPrevModal(true);
    }
  };

  const sendMessage = async () => {
    if (!socket) {
      console.error("Socket is not initialized");
      return;
    }

    const messages = message.trim();
    if (!messages) return;

    let newMessage = {
      _id: new Date().getTime().toString(),
      senderId: sender.id,
      receiverId: userId,
      message: messages,
      media: "",
      createAt: new Date().toISOString(),
    };
    setMessage("");
    socket.emit("sendData", { ...newMessage });
    socket.emit("chat", {
      senderId: sender.id,
      receiverId: userId,
      type: "chat",
      message: `${sender.name} has sent a message`,
      link: `/auth/chat?userId=${userId}`,
    });

    await sendChat(sender.id as string, userId as string, messages as string);
    onNewMessage();
    await useNotifyUser(sender.id, userId, "chat", `${sender.name} has sent a message`, `/auth/chat?userId=${userId}`);
  };

  const onEmojiClick = (emoji: any) => {
    setMessage((prev) => prev + emoji.emoji);
    setShowEmojiPicker(false);
  };

  const handleCall = (userId: string, userName: string) => {
    requestCall(userId, userName);
  };

  const handleCloseModal = () => {
    setPrevModal(false);
  };

  const sendImage = async () => {
    if (!image || !socket) return;

    const formdata = new FormData();
    formdata.append("image", image);
    formdata.append("senderId", sender.id as string);
    formdata.append("receiverId", userId);
    await sendImageInChat(formdata);
    setImage(null);
    setImagePrev(null);
    setPrevModal(false);

    let newMessage = {
      _id: new Date().getTime().toString(),
      senderId: sender.id,
      receiverId: userId,
      message: message || "",
      media: "",
      createAt: new Date().toISOString(),
    };

    socket.emit("sendData", { ...newMessage });
    socket.emit("chat", {
      senderId: sender.id,
      receiverId: userId,
      type: "chat",
      message: `${sender.name} has sent a message`,
      link: `/auth/chat?userId=${userId}`,
    });

    await useNotifyUser(sender.id, userId, "chat", `${sender.name} has sent a message`, `/auth/chat?userId=${userId}`);
  };

  return (
    <Fade in={true}>
      <Paper
        sx={{
          width: "100%",
          height: "100%",
          borderRadius: 2,
          marginLeft: 1,
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
          boxShadow: 3,
        }}
        className="font-poppins"
      >
        {/* Chat Header */}
        <Box
          sx={{
            p: 2,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            backgroundColor: "rgba(255,255,255,0.9)",
            backdropFilter: "blur(10px)",
            borderBottom: "1px solid rgba(0,0,0,0.1)",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <IoMdArrowRoundBack className="me-4 size-5 cursor-pointer" onClick={handleBackClick} />
            {user?.profileImageUrl ? (
              <Avatar
                src={user?.profileImageUrl}
                alt="User"
                sx={{ width: 48, height: 48, cursor: "pointer" }}
                onClick={() => navigate(`/auth/OtherProfileView/${user._id}`)}
              />
            ) : (
              <Avatar sx={{ width: 48, height: 48, cursor: "pointer" }} />
            )}
            <Box sx={{ ml: 2 }}>
              <Typography variant="subtitle1" color="#151719" fontFamily="Poppins" fontWeight="Bold">
                {user?.name || "Select a conversation"}
              </Typography>
              <Typography variant="body2" color="#151719" sx={{ opacity: 0.7 }}></Typography>
            </Box>
          </Box>
          {user?.name && (
            <Box>
              <IconButton
                sx={{
                  "&:hover": {
                    animation: "0.5s ease-in-out pulse",
                    animationIterationCount: "infinite",
                  },
                }}
                onClick={() => handleCall(userId, user?.name)}
              >
                <VideocamIcon />
              </IconButton>
            </Box>
          )}
        </Box>

        {/* Chat Messages */}
        <Box
          sx={{
            flex: 1,
            p: 2,
            overflowY: "auto",
            display: "flex",
            flexDirection: "column-reverse",
          }}
          ref={chatContainerRef}
        >
          {chats.map((chat: any, index: number) => (
            <div key={index} ref={lastMessageRef}>
              <TimeLine />
              <Typography variant="body2" color="gray">
                {formatTime(chat.createAt)}
              </Typography>
            </div>
          ))}
        </Box>

        {/* Message Input */}
        <Divider />
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            padding: "0.5rem",
          }}
        >
          <InputBase
            sx={{ flex: 1, ml: 1 }}
            placeholder="Type a message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          />
          <IconButton onClick={() => setShowEmojiPicker(!showEmojiPicker)}>
            <InsertEmoticonIcon />
          </IconButton>
          <IconButton
            sx={{ ml: 1 }}
            onClick={() => imageUseRef.current?.click()}
          >
            <BiImageAdd />
          </IconButton>
          <IconButton sx={{ ml: 1 }} onClick={sendMessage}>
            <BiPaperPlane />
          </IconButton>
          <input
            type="file"
            ref={imageUseRef}
            style={{ display: "none" }}
            onChange={handlePreviewImage}
            accept="image/*"
          />
        </Box>

        {showEmojiPicker && (
          <Box sx={{ position: "absolute", bottom: 100, right: 20 }}>
            <EmojiPicker onEmojiClick={onEmojiClick} />
          </Box>
        )}

        {/* Image Preview Modal */}
        <Dialog open={prevModal} onClose={handleCloseModal}>
          <DialogTitle>Image Preview</DialogTitle>
          <DialogContent>
            {imagePreview && <img src={imagePreview} alt="Preview" style={{ width: "100%" }} />}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseModal} color="primary">
              Cancel
            </Button>
            <Button onClick={sendImage} color="primary">
              Send
            </Button>
          </DialogActions>
        </Dialog>
      </Paper>
    </Fade>
  );
};

export default ChatComponent;
