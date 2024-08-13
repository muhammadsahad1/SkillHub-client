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
import { useSocket } from "../../contexts/SocketContext";
import useGetUser from "../../hook/getUser";
import { useParams } from "react-router-dom";
import { fetchChatUsers, sendChat } from "../../API/conversation";

const ChatComponent = () => {
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [message, setMessage] = useState<string>("");
  const [chat, setChat] = useState<any>({ messages: [] });
  const [user, setUser] = useState<any>({});
  const socket = useSocket();
  const sender = useGetUser();

  const { userId } = useParams();

  const fetchChat = async () => {
    try {
      const userChat = await fetchChatUsers(sender.id as string, userId as string);
      // setUser()
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    if (userId) {
      fetchChat();
    }
  }, [userId, sender.id]);

  console.log("user id ===>",sender.id);
  
  

  const sendMessage = async () => {
    try {
      console.log("called ayi ");
      
      const messages = message;
      let newMessage = {
        _id: new Date().getTime().toString(),
        senderId: sender.id,
        receiverId: userId,
        media: "",
        createAt: new Date().toISOString(),
      };
      setMessage("");
      socket?.emit("sendData", { ...newMessage });
      await sendChat(sender.id as string, userId as string, messages as string);
      setMessage("");
      // again fetch chat after the message send
      fetchChat();
    } catch (error) {}
  };


  const messages = [
    {
      id: 1,
      sender: "self",
      text: "Hey! How are you?",
      time: "2:00 PM",
    },
    {
      id: 2,
      sender: "Anil",
      text: "I'm good, thanks! How about you?",
      time: "2:01 PM",
    },
    {
      id: 3,
      sender: "self",
      text: "Doing well, just working on some code.",
      time: "2:02 PM",
    },
    {
      id: 4,
      sender: "Anil",
      text: "Nice! Keep it up.",
      time: "2:03 PM",
    },
  ];
  
  


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
            src="/path-to-anil-avatar.jpg"
            alt="Anil"
            sx={{ width: 48, height: 48 }}
          />
          <Box sx={{ ml: 2 }}>
            <Typography
              variant="subtitle1"
              color="#151719"
              className="font-bold"
            >
              Anil
            </Typography>
            <Typography variant="body2" color="#151719" sx={{ opacity: 0.7 }}>
              Online - Last seen, 2:02pm
            </Typography>
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
        <TimeLine />
        {messages.map((message) => (
          <Fade in={true} key={message.id}>
            <Box
              sx={{
                display: "flex",
                justifyContent:
                  message.sender === "self" ? "flex-end" : "flex-start",
                mb: 2,
              }}
            >
              <Paper
                elevation={3}
                sx={{
                  p: 1.5,
                  bgcolor:
                    message.sender === "self"
                      ? "rgba(31, 31, 31, 0.9)"
                      : "rgba(255, 255, 255, 0.9)",
                  color: message.sender === "self" ? "white" : "text.primary",
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
                  className={message.sender === "self" ? "font-bold" : ""}
                >
                  {message.text}
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
            if(e.key === "Enter"){
              sendMessage()
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
          <BiPaperPlane onClick={sendMessage}/>
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
