import React, { useState } from "react";
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Avatar,
  IconButton,
  Typography,
  Box,
  Menu,
  MenuItem,
} from "@mui/material";
import {
  ThumbUp as LikeIcon,
  Comment as CommentIcon,
  Repeat as RepostIcon,
  Send as SendIcon,
  MoreVert as MoreVertIcon,
} from "@mui/icons-material";
import useGetUser from "../../../hook/getUser";

import { useDeletePost } from "../../../hook/usePosts";

// Function to format the date
const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
  }).format(date);
};

const HomePostCard = ({ post }: any) => {
  const user = useGetUser();

  const { mutate: deletPost } = useDeletePost();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const isMenuOpen = Boolean(anchorEl);

  const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleDelete = async () => {
    try {
      deletPost(post._id);
      handleMenuClose();
    } catch (error) {}
  };

  const handleEdit = () => {
    // Handle edit logic here
    handleMenuClose();
  };

  return (
    <Card
      sx={{ maxWidth: 800, margin: "auto", marginTop: 5, boxShadow: 2 }}
      className="w-full"
    >
      <CardHeader
        avatar={<Avatar src={post.userImageUrl} />}
        title={
          <Typography variant="subtitle1" fontWeight="bold">
            {post.userName}
          </Typography>
        }
        subheader={
          post.createdAt ? (
            <Typography variant="body2" color="text.secondary">
              {formatDate(post.createdAt)}
            </Typography>
          ) : null
        }
        action={
          post.userId === user.id ? (
            <IconButton onClick={handleMenuClick}>
              <MoreVertIcon />
            </IconButton>
          ) : null
        }
      />
      <CardContent>
        {post.caption && (
          <Typography variant="body2" color="text.secondary" paragraph>
            {post.caption}
          </Typography>
        )}
        {post.postImageUrl && (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              mb: 2,
              p: 0,
              m: 0,
              overflow: "hidden",
              height: 400,
              width: "100%",
              "@media (max-width: 600px)": {
                maxWidth: "100%",
              },
            }}
          >
            <img
              src={post.postImageUrl}
              alt="Post content"
              style={{
                width: "100%",
                objectFit: "cover",
                "@media (max-width: 600px)": {
                  height: 250, // Adjust for smaller screens
                },
                "@media (min-width: 600px)": {
                  height: 400, // Default height
                },
              }}
            />
          </Box>
        )}
      </CardContent>

      <CardActions sx={{ justifyContent: "space-between", px: 2 }}>
        <Box>
          <IconButton size="small">
            <LikeIcon fontSize="small" />
          </IconButton>
          <IconButton size="small">
            <CommentIcon fontSize="small" />
          </IconButton>
          <IconButton size="small">
            <RepostIcon fontSize="small" />
          </IconButton>
          <IconButton size="small">
            <SendIcon fontSize="small" />
          </IconButton>
        </Box>
        <Typography variant="caption" color="text.secondary">
          {post.comments} comments
        </Typography>
      </CardActions>

      <Menu anchorEl={anchorEl} open={isMenuOpen} onClose={handleMenuClose}>
        <MenuItem onClick={handleEdit}>Edit</MenuItem>
        <MenuItem onClick={handleDelete}>Delete</MenuItem>
      </Menu>
    </Card>
  );
};

export default HomePostCard;
