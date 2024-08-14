  import { Box, Divider, Stack, Typography, List, ListItem, ListItemAvatar, ListItemText, Avatar } from "@mui/material";
  import React, { useEffect, useState } from "react";
  import SimpleBarReact from  'simplebar-react'
  import { TbMessages } from "react-icons/tb";
import { fetchUsers, getConversationsUsers } from "../../API/conversation";

  const SideBar = () => {
    const [chatUsers,setChatUsers] = useState<any[]>([])

    const fetchChatUsers = async ()=> {
      try {
        console.log("calledddddddd");
        const result = await getConversationsUsers()
        console.log("result ====>",result);
        setChatUsers(result.users)
      } catch (error) {
        
      }
    }

    useEffect(()=>{
      fetchChatUsers()
    },[])

    const people = [
      {
        id: 1,
        name: "Anil",
        message: "April fool's day",
        time: "Today, 9:52pm",
        avatar: "/path/to/anil.jpg",
        read: true,
      },
      {
        id: 2,
        name: "Chuthiya",
        message: "Baag",
        time: "Today, 12:11pm",
        avatar: "/path/to/chuthiya.jpg",
        unread: 1,
      },
      {
        id: 3,
        name: "Mary ma'am",
        message: "You have to report it...",
        time: "Today, 2:40pm",
        avatar: "/path/to/mary.jpg",
        unread: 1,
      },
      {
        id: 4,
        name: "Bill Gates",
        message: "Nevermind bro",
        time: "Yesterday, 12:31pm",
        avatar: "/path/to/bill.jpg",
        unread: 5,
      },
      {
        id: 5,
        name: "Victoria H",
        message: "Okay, brother. let's see...",
        time: "Wednesday, 11:12am",
        avatar: "/path/to/victoria.jpg",
        read: true,
      },
    ];

    return (
      <Box
        sx={{
          position: "relative",
          height: "100%",
          width: "100%",
          backgroundColor: "rgb(245, 245, 245)",
          boxShadow: "0px 0px 1px rgba(0,0,0,0.05)",
          display: 'flex',
          flexDirection: 'column',
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
            <TbMessages className="ms-10" size={32}/>
          </Stack>

          <input
            className="shadow-md p-2 rounded-full border-2"
            type="text"
            placeholder="Search people"
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
              {people.map((person) => (
                <ListItem key={person.id} alignItems="flex-start">
                  <ListItemAvatar>
                    <Avatar alt={person.name} src={person.avatar} />
                  </ListItemAvatar>
                  <ListItemText
                    primary={
                      <Typography
                        style={{
                          fontFamily: "Poppins",
                          fontWeight: "semiBold",
                        }}
                      >
                        {person.name}
                      </Typography>
                    }
                    secondary={
                      <React.Fragment>
                        <Typography
                          sx={{ display: "inline" }}
                          component="span"
                          variant="body2"
                          color="text.primary"
                          fontSize={ 12}
                        >
                          {person.message}
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
              ))}
            </List>
          </Box>
        </Stack>
      </Box>
    );
  };

  export default SideBar;
