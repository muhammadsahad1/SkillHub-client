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
import { BiPaperPlane } from "react-icons/bi";
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
import { BiImageAdd } from "react-icons/bi";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Button } from "antd";
import { showToastError } from "../common/utilies/toast";
import { IoMdArrowRoundBack } from "react-icons/io";

const formatTime = (dateString: string) => {
  const date = new Date(dateString);

  // Check if the date is invalid
  if (isNaN(date.getTime())) {
    return "Invalid date";
  }

  let hours = date.getHours();
  let minutes = String(date.getMinutes()).padStart(2, "0");
  const ampm = hours >= 12 ? "PM" : "AM";

  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  const strTime = `${hours}:${minutes} ${ampm}`;

  return strTime;
};

type OnNewMessage = {
  onNewMessage: () => Promise<void>;
  handleBackClick: () => void;
};

const ChatComponent = ({ onNewMessage, handleBackClick }: OnNewMessage) => {
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [image, setImage] = useState<null | File>(null);
  const [prevModal, setPrevModal] = useState<boolean>(false);
  const [imagePreviev, setImagePrev] = useState<string | null>(null);
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

  //access the userId from url in route

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

  // fetch the chat history
  const fetchChat = async () => {
    try {
      if (userId) {
        const userChat = await fetchChatUsers(
          sender.id as string,
          userId as string
        );

        setUser(userChat?.userWithProfileImage);
        setChat(userChat?.messages || []);
        socket?.emit("joinRoom", { senderId: sender.id, receiverId: userId });
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    if (userId) {
      fetchChat();
    }
  }, [userId, sender.id]);

  // useEffect for scroll to last message
  useEffect(() => {
    if (lastMessageRef.current) {
      lastMessageRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [chats]);
  // to handle the preve image
  const handlePreviewImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const validImage = ["imgae/jpg", "image/jpeg", "image/png", "image/gif"];
      if (!validImage.includes(file.type)) {
        showToastError("its must be valid image");
        return;
      }
      setImage(file);
      const previewUrl = URL.createObjectURL(file);

      // const tempMsbId = new Date().getTime().toString();

      // // let newMessage = {
      // //   _id: tempMsbId,
      // //   senderId: sender.id,
      // //   receiverId: userId,
      // //   message: " ",
      // //   mediaUrl: previewUrl,
      // //   createAt: new Date().toISOString(),
      // // };

      setImagePrev(previewUrl);
      setPrevModal(true);
    }
  };

  // sending message function
  const sendMessage = async () => {
    try {
      if (!socket) {
        console.error("Socket is not initialized");
        return;
      }

      const messages = message.trim();
      if (!message) {
        return;
      }

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
      // creating noification for chat
      await useNotifyUser(
        sender.id,
        userId,
        "chat",
        `${sender.name} has sent a message`,
        `/auth/chat?userId=${userId}`
      );
      fetchChat();

      // again fetch chat after the message send
    } catch (error) {}
  };
  // handling the emoji click
  const onEmojiClick = (emoji: any) => {
    const emojiCharacter = emoji.emoji;
    setMessage(message + emojiCharacter);
    setShowEmojiPicker(false);
  };
  // handleCall
  const handleCall = (userId: string, userName: string) => {
    try {
      requestCall(userId, userName as string);
    } catch (error) {}
  };

  const handleCloseModal = () => {
    setPrevModal(false);
  };

  // sending the imge
  // here some issues like after sender sent the image that not
  //showing the image in receiver side in realtime after refresh only
  const sendImage = async () => {
    try {
      if (!image) {
        return;
      }

      if (!socket) {
        console.error("Socket is not initialized");
        return;
      }

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

      await useNotifyUser(
        sender.id,
        userId,
        "chat",
        `${sender.name} has sent a message`,
        `/auth/chat?userId=${userId}`
      );

      fetchChat();
      onNewMessage();
    } catch (error) {}
  };

  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        borderRadius: 2,
        marginLeft: 1,
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        boxShadow: "0 0 15px rgba(0,0,0,0.1)",
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
          <IoMdArrowRoundBack
            className="me-4 size-5 cursor-pointer"
            onClick={handleBackClick}
          />
          {user?.profileImageUrl ? (
            <Avatar
              src={user?.profileImageUrl}
              alt="User"
              sx={{ width: 48, height: 48, cursor: "pointer" }}
              onClick={() => navigate(`/auth/OtherProfileView/${user._id}`)}
            />
          ) : (
            <Avatar
              src={user?.profileImageUrl}
              alt="User"
              sx={{ width: 48, height: 48, cursor: "pointer" }}
            />
          )}

          <Box sx={{ ml: 2 }}>
            <Typography
              variant="subtitle1"
              color="#151719"
              fontFamily="Poppins"
              fontWeight="Bold"
            >
              {user?.name || "select a conversation"}
            </Typography>
            <Typography
              variant="body2"
              color="#151719"
              sx={{ opacity: 0.7 }}
            ></Typography>
          </Box>
        </Box>
        {user?.name ? (
          <Box>
            <IconButton
              sx={{
                "&:hover": {
                  animation: "pulse 0.5s ease-in-out",
                  backgroundColor: "rgba(0,0,0,0.05)",
                },
                "@keyframes pulse": {
                  "0%": { transform: "scale(1)" },
                  "50%": { transform: "scale(1.1)" },
                  "100%": { transform: "scale(1)" },
                },
              }}
              // here requesting to call the people
              onClick={() => handleCall(userId, user?.name)}
            >
              <VideocamIcon sx={{ color: "#151719" }} />
            </IconButton>
    
          </Box>
        ) : null}
      </Box>

      {/* Chat Messages */}
      <Box
        ref={chatContainerRef}
        sx={{
          flexGrow: 1,
          overflowY: "auto",
          p: 2,
          background: "linear-gradient(to right, #6f6a6a , #feb47b)",
          backgroundSize: "cover",
          backgroundPosition: "end",
        }}
      >
        {chats.length > 0 ? (
          <>
            <TimeLine />
            {chats.map((message: any, index: number) => (
              <Fade in={true} key={message._id}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent:
                      message.senderId === sender.id
                        ? "flex-end"
                        : "flex-start",
                    mb: 2,
                  }}
                  ref={index === chats.length - 1 ? lastMessageRef : null}
                >
                  <Paper
                    elevation={3}
                    sx={{
                      p: 1.5,
                      bgcolor:
                        message.senderId === sender.id
                          ? "rgba(31, 31, 31, 0.9)"
                          : "rgba(255, 255, 255, 0.9)",
                      color:
                        message.senderId === sender.id
                          ? "white"
                          : "text.primary",
                      borderRadius: 2,
                      maxWidth: "70%",
                      backdropFilter: "blur(5px)",
                      transition: "all 0.3s ease",
                      "&:hover": {
                        transform: "translateY(-2px)",
                        boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
                      },
                    }}
                    className="font-poppins"
                  >
                    {message.message ? (
                      <Typography
                        variant="body1"
                        className={
                          message.senderId === sender.id ? "font-bold" : ""
                        }
                      >
                        {message?.message}
                      </Typography>
                    ) : (
                      <img className="w-64" src={message.mediaUrl} />
                    )}
                    <Typography
                      variant="caption"
                      sx={{
                        display: "block",
                        mt: 0.5,
                        textAlign: "right",
                        opacity: 0.7,
                      }}
                    >
                      {formatTime(message.createdAt)}
                    </Typography>
                  </Paper>
                </Box>
              </Fade>
            ))}
          </>
        ) : (
          <Box
            sx={{
              height: "100%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "rgba(0, 0, 0, 0.7)",
              borderRadius: 2,
              padding: 4,
            }}
          >
            <Typography
              variant="h5"
              sx={{
                color: "grey.100",
                mb: 2,
                textAlign: "center",
                fontFamily: "Poppins",
              }}
            >
              Welcome to Your Skill Exchange Hub
            </Typography>
            <Typography
              variant="body1"
              sx={{ color: "grey.300", textAlign: "center", maxWidth: 400 }}
            >
              Ready to grow your skills? Select a conversation from the list or
              start a new chat to connect and share knowledge with fellow
              learners and experts. Engage, learn, and contribute to a community
              of growth.
            </Typography>
          </Box>
        )}
      </Box>
      {userId && (
        <Paper
          component="form"
          sx={{
            p: "2px 4px",
            display: "flex",
            alignItems: "center",
            m: 1,
            position: "relative",
            borderRadius: 30,
            boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
          }}
          className="font-poppins"
        >
          <InputBase
            sx={{ ml: 2, flex: 1 }}
            placeholder="Type your message here..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                sendMessage();
              }
            }}
          />
          <input
            hidden
            ref={imageUseRef}
            type="file"
            id="imageAddInput"
            onChange={handlePreviewImage}
          />
          <IconButton
            onClick={() => imageUseRef.current?.click()}
            color="primary"
            sx={{ p: "10px" }}
          >
            <BiImageAdd />
          </IconButton>
          <IconButton
            color="primary"
            sx={{ p: "10px" }}
            onClick={() => setShowEmojiPicker(!showEmojiPicker)}
          >
            <InsertEmoticonIcon />
          </IconButton>
          <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
          <IconButton color="primary" sx={{ p: "10px" }}>
            <BiPaperPlane onClick={sendMessage} />
          </IconButton>
        </Paper>
      )}

      <Dialog open={prevModal} onClose={handleCloseModal}>
        <DialogTitle>Image Preview</DialogTitle>
        <DialogContent>
          {imagePreviev && (
            <img
              src={imagePreviev}
              alt="Preview"
              id="imagePreview"
              style={{ maxWidth: "100%", maxHeight: "400px" }}
            />
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModal}>Cancel</Button>
          <Button
            onClick={() => {
              handleCloseModal();
              sendImage();
              // Add logic here to send the image after confirming preview
            }}
          >
            Send
          </Button>
        </DialogActions>
      </Dialog>

      {/* Emoji Picker */}
      {showEmojiPicker && (
        <Box sx={{ position: "absolute", bottom: "60px", right: "80px" }}>
          <EmojiPicker onEmojiClick={onEmojiClick} />
        </Box>
      )}
    </Box>
  );
};

export default ChatComponent;
