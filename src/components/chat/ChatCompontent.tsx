import React, { useEffect, useState } from "react";
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
import MoreVertIcon from "@mui/icons-material/MoreVert";
import bgWp from "../../assets/bg black.jpg";
import InsertEmoticonIcon from "@mui/icons-material/InsertEmoticon";
import { BiPaperPlane } from "react-icons/bi";
import EmojiPicker from "emoji-picker-react";
import TimeLine from "./TimeLine";
// import { useSocket } from "../../contexts/SocketContext";
import { Socket } from "socket.io-client";
import useGetUser from "../../hook/getUser";
import { useParams } from "react-router-dom";
import { fetchChatUsers, sendChat } from "../../API/conversation";

const ChatComponent = ({ socket }: { socket: Socket }) => {
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [message, setMessage] = useState<string>("");
  const [chats, setChat] = useState<any>([]);
  const [user, setUser] = useState<any>({});
  // const socket = useSocket();
  const sender = useGetUser();

  const { userId } = useParams();

  const fetchChat = async () => {
    try {
      const userChat = await fetchChatUsers(
        sender.id as string,
        userId as string
      );
      console.log("res ====> userChat ==>", userChat);

      setUser(userChat?.userWithProfileImage);

      setChat(userChat?.messages || []);
      socket?.emit("joinRoom", { senderId: sender.id, receiverId: userId });
    } catch (error) {
      console.log("error", error);
    }
  };
  console.log("chattt ===> ===>", chats);
  console.log("user ====> ===>", user);

  useEffect(() => {
    if (userId) {
      fetchChat();
    }
  }, [userId, sender.id]);

  useEffect(() => {
    if (socket) {
      const handleReieveData = (data: string) => {
        setChat((prevChat: string) => [...prevChat, data]);
      };
      socket.on("receiveData", handleReieveData);

      return () => {
        socket.off("receiveData", handleReieveData);
      };
    }
  }, [socket]);

  console.log("user id ===>", sender.id);

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
      await sendChat(sender.id as string, userId as string, messages as string);
      // again fetch chat after the message send
      fetchChat();
    } catch (error) {}
  };

  const onEmojiClick = (event, emojiObject) => {
    setMessage(message + emojiObject.emoji);
    setShowEmojiPicker(false);
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
          <Avatar
            src={user?.profileImageUrl}
            alt="Anil"
            sx={{ width: 48, height: 48 }}
          />
          <Box sx={{ ml: 2 }}>
            <Typography
              variant="subtitle1"
              color="#151719"
              fontFamily="Poppins"
              fontWeight="Bold"
            >
              {user?.name}
            </Typography>
            <Typography
              variant="body2"
              color="#151719"
              sx={{ opacity: 0.7 }}
            ></Typography>
          </Box>
        </Box>
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
          >
            <VideocamIcon sx={{ color: "#151719" }} />
          </IconButton>
          <IconButton
            sx={{ "&:hover": { backgroundColor: "rgba(0,0,0,0.05)" } }}
          >
            <MoreVertIcon sx={{ color: "#151719" }} />
          </IconButton>
        </Box>
      </Box>

      {/* Chat Messages */}
      <Box
        sx={{
          flexGrow: 1,
          overflowY: "auto",
          p: 2,
          backgroundImage: `url(${bgWp})`,
          backgroundSize: "cover",
          backgroundPosition: "end",
        }}
      >
        {chats.length > 0 ? (
          <>
            <TimeLine />
            {chats.map((message: any) => (
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
                    <Typography
                      variant="body1"
                      className={
                        message.senderId === sender.id ? "font-bold" : ""
                      }
                    >
                      {message.message}
                    </Typography>
                    <Typography
                      variant="caption"
                      sx={{
                        display: "block",
                        mt: 0.5,
                        textAlign: "right",
                        opacity: 0.7,
                      }}
                    >
                      {message.time}
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
      {/* Message Input */}
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
