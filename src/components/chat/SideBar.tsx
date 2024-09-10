import {
  Box,
  Divider,
  Stack,
  Typography,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
  Badge,
} from "@mui/material";
import React, {
  useEffect,
  useState,
  useImperativeHandle,
  forwardRef,
} from "react";
import SimpleBarReact from "simplebar-react";
import { TbMessages } from "react-icons/tb";
import {
  getConversationsUsers,
  markMessageAsRead,
} from "../../API/conversation";
import { Link } from "react-router-dom";
import { useSocket } from "../../hook/useSocket";
import useGetUser from "../../hook/getUser";

type SideBarHandle = {
  fetchChatUsers: () => Promise<void>;
};

type SideBarProps = {
  onSelectUser: (userId: string) => void;
};

const SideBar = forwardRef<SideBarHandle, SideBarProps>((props, ref) => {
  const [chatUsers, setChatUsers] = useState<any[]>([]);
  const [searchVal, setSearchVal] = useState<string>("");
  const [filteredUser, setFilteredUser] = useState<any[]>([]);
  const { socket } = useSocket();
  const sender = useGetUser();

  const fetchChatUsers = async () => {
    try {
      const result = await getConversationsUsers();
      const sortedResultByRecentlyChat = result.sort((a: any, b: any) => {
        const dateA = new Date(a.lastMessageTime).getTime();
        const dateB = new Date(b.lastMessageTime).getTime();

        return dateB - dateA;
      });
      setChatUsers(result);
    } catch (error) {}
  };
  // using forward ref for sorting list call
  useImperativeHandle(ref, () => ({
    fetchChatUsers,
  }));

  useEffect(() => {
    fetchChatUsers();

    if (socket) {
      // Listener for when a new message is received
      socket.on("receiveData", (newMessage) => {
        setChatUsers((prevChatUsers) => {
          const userIndex = prevChatUsers.findIndex(
            (user) => user.user._id === newMessage.senderId
          );

          if (userIndex !== -1) {
            // Update the existing user's lastMessage and isRead
            const updatedUsers = [...prevChatUsers];
            updatedUsers[userIndex] = {
              ...updatedUsers[userIndex],
              lastMessage: newMessage.message,
              lastMessageData: new Date(newMessage.createdAt),
              isRead: false,
            };
            return updatedUsers;
          } else {
            // Add a new user to the chat list if not already present
            return [
              ...prevChatUsers,
              {
                _id: newMessage._id,
                isRead: false,
                lastMessage: newMessage.message,
                user: {
                  _id: newMessage.senderId,
                  name: newMessage.senderName,
                  profileImageUrl: newMessage.senderProfileImageUrl,
                },
              },
            ];
          }
        });
      });

      // Listener for when a message is marked as read
      socket.on("messageRead", ({ conversationId }) => {
        setChatUsers((prevChatUsers) =>
          prevChatUsers.map((user) =>
            user._id === conversationId ? { ...user, isRead: true } : user
          )
        );
      });
    }

    return () => {
      if (socket) {
        socket.off("receiveData");
        socket.off("messageRead");
      }
    };
  }, [socket]);

  const handleClick = async (conversationId: string, receiverId: string) => {
    try {
      if (socket) {
        socket.emit("messageRead", {
          conversationId,
          senderId: sender.id,
          receiverId: receiverId,
        });
        // Update the state immediately
        setChatUsers((prev) =>
          prev.map((user) =>
            user._id === conversationId ? { ...user, isRead: true } : user
          )
        );
      }

      if (props.onSelectUser) {
        props.onSelectUser(receiverId);
      }
      // function to mark message as read
      await markMessageAsRead(conversationId);
      fetchChatUsers();
      // onConversationSelect(true)
    } catch (error) {}
  };

  // forSearch
  const handleSearchPeople = (value: string) => {
    setSearchVal(value);
    if (value.trim() === "") {
      setFilteredUser(chatUsers);
    } else {
      const filteredUser = chatUsers.filter((user) => {
        return user.user.name.toLowerCase().includes(searchVal.toLowerCase());
      });
      setFilteredUser(filteredUser);
    }
  };

  return (
    <Box
      sx={{
        position: "relative",
        height: "100%",
        width: "100%",
        backgroundColor: "rgb(245, 245, 245)",
        boxShadow: "0px 0px 1px rgba(0,0,0,0.05)",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Stack padding={3}>
        <Stack direction="row" alignItems="center" marginBottom={3}>
          <Typography
            style={{
              color: "#1F1F1F",
              marginLeft: 7,
              fontFamily: "Poppins",
              letterSpacing: "1px",
              fontWeight: "Bold",
              fontSize: 20,
            }}
          >
            Messages
          </Typography>
          <TbMessages className="ms-10" size={32} />
        </Stack>

        <input
          className="shadow-md p-2 rounded-full border-2"
          type="text"
          placeholder="Search people"
          value={searchVal}
          onChange={(e) => handleSearchPeople(e.target.value)}
        />
      </Stack>
      <Divider
        sx={{
          borderWidth: "1px",
          borderColor: "gray",
          mx: 2, // margin-left and margin-right for spacing
        }}
      />
      <Stack
        direction="column"
        margin={2}
        sx={{
          flexGrow: 1,
          overflowY: "auto", // Enable vertical scrolling
        }}
      >
        <Box
          sx={{
            bgcolor: "background.paper",
            borderRadius: 4,
            p: 2,
            maxWidth: 360,
          }}
        >
          <Typography
            style={{
              fontFamily: "Poppins",
              fontWeight: "bold",
            }}
          >
            People
          </Typography>
          <List
            sx={{
              width: "100%",
              maxWidth: 360,
              bgcolor: "background.paper",
            }}
          >
            {filteredUser.length > 0
              ? filteredUser?.map((person: any) => (
                  <Link
                    to="/auth/chat"
                    state={{ userId: person.user._id }}
                    key={person.user._id}
                  >
                    <ListItem
                      key={person.user._id}
                      alignItems="flex-start"
                      onClick={() => handleClick(person._id, person.user._id)}
                    >
                      <Badge
                        color="primary"
                        variant="dot"
                        invisible={
                          person.isRead || sender.id === person.user._id
                        } // Hide badge if message is read
                      ></Badge>
                      <ListItemAvatar>
                        <Avatar
                          alt={person.user.name}
                          src={person.user.profileImageUrl}
                        />
                      </ListItemAvatar>
                      <ListItemText
                        primary={
                          <Typography
                            style={{
                              fontFamily: "Poppins",
                              fontWeight: "semiBold",
                            }}
                          >
                            {person.user.name}
                          </Typography>
                        }
                        secondary={
                          <React.Fragment>
                            <Typography
                              sx={{ display: "inline" }}
                              component="span"
                              variant="body2"
                              color="text.primary"
                              fontSize={12}
                            >
                              {person.lastMessage}
                            </Typography>
                          </React.Fragment>
                        }
                      />
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "flex-end",
                        }}
                      ></Box>
                    </ListItem>
                  </Link>
                ))
              : chatUsers?.map((person: any) => (
                  <Link
                    to="/auth/chat"
                    state={{ userId: person.user._id }}
                    key={person.user._id}
                  >
                    <ListItem
                      key={person.user._id}
                      alignItems="flex-start"
                      onClick={() => handleClick(person._id, person.user._id)}
                    >
                      <Badge
                        color="primary"
                        variant="dot"
                        invisible={
                          person.isRead && sender.id !== person.user._id
                        } // Hide badge if message is read
                      ></Badge>
                      <ListItemAvatar>
                        <Avatar
                          alt={person.user.name}
                          src={person.user.profileImageUrl}
                        />
                      </ListItemAvatar>
                      <ListItemText
                        primary={
                          <Typography
                            style={{
                              fontFamily: "Poppins",
                              fontWeight: "semiBold",
                            }}
                          >
                            {person.user.name}
                          </Typography>
                        }
                        secondary={
                          <React.Fragment>
                            <Typography
                              sx={{ display: "inline" }}
                              component="span"
                              variant="body2"
                              color="text.primary"
                              fontSize={12}
                            >
                              {person.lastMessage}
                            </Typography>
                          </React.Fragment>
                        }
                      />
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "flex-end",
                        }}
                      >
                        {/* Optional time and unread badge */}
                      </Box>
                    </ListItem>
                  </Link>
                ))}
          </List>
        </Box>
      </Stack>
    </Box>
  );
});

export default SideBar;
