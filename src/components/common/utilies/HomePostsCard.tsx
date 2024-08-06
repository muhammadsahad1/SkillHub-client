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
  Button,
  Modal,
  TextField,
} from "@mui/material";
import {
  ThumbUp as LikeIcon,
  Comment as CommentIcon,
  Report as ReportIcon,
  Send as SendIcon,
  MoreVert as MoreVertIcon,
} from "@mui/icons-material";
import { styled } from "@mui/material/styles";
import useGetUser from "../../../hook/getUser";
import {
  useDeletePost,
  useEditPost,
  usePostLike,
} from "../../../hook/usePosts";
import { showToastError } from "./toast";
import { Link } from "react-router-dom";

const ActionButton = styled(Button)(({ theme }) => ({
  color: theme.palette.grey[400],
  textTransform: "none",
  "&:hover": {
    backgroundColor: "transparent",
    color: theme.palette.common.white,
  },
}));



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
  const { mutate: editPost } = useEditPost();
  const { mutate: postLike } = usePostLike();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [isEditModalOpen, setEditModalOpen] = useState<boolean>(false);
  const [editedCaption, setEditedCaption] = useState<string>("");
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
    setEditModalOpen(true);
  };

  const handleModalClose = () => {
    setEditModalOpen(false);
  };

  // saving the edited content
  const handleSave = async () => {
    try {
      editPost({ id: post._id, caption: editedCaption });
      setEditModalOpen(false);
    } catch (error) {
      console.error(error);
      showToastError("Error updating post");
    }
  };

  const handlePostLike = async () => {
    try {
      postLike(post._id)
    } catch (error) {
      console.error(error);
      showToastError("Error like post");
    }
  };


  return (
    <Card
      sx={{
        maxWidth: 800,
        margin: "auto",
        marginTop: 3,
        boxShadow: 2,
        marginBottom: 2,
      }}
      className="w-full"
    >
      <CardHeader
      
        avatar={<Link to={`auth/OtherProfileView/${post.userId}`}><Avatar src={post.userImageUrl}/></Link>}
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

      <CardActions className="bg-zinc-100 flex justify-between py-1">
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <ActionButton
            onClick={handlePostLike}
            sx={{
              color: "#18181b",
              "&:hover": {
                backgroundColor: "#d0d0d0", // Zinc-300 color
                color: "#000000", // You can adjust this to your desired hover text color
              },
            }}
            startIcon={<LikeIcon />}
          >
            Like
          </ActionButton>
          <ActionButton
            sx={{
              color: "#18181b",
              "&:hover": {
                backgroundColor: "#d0d0d0", // Zinc-300 color
                color: "#000000", // You can adjust this to your desired hover text color
              },
            }}
            startIcon={<CommentIcon />}
          >
            Comment
          </ActionButton>
          <ActionButton
            sx={{
              color: "#18181b",
              "&:hover": {
                backgroundColor: "#d0d0d0", // Zinc-300 color
                color: "#000000", // You can adjust this to your desired hover text color
              },
            }}
            startIcon={<ReportIcon />}
          >
            Repost
          </ActionButton>
          <ActionButton
            sx={{
              color: "#18181b",
              "&:hover": {
                backgroundColor: "#d0d0d0", // Zinc-300 color
                color: "#000000", // You can adjust this to your desired hover text color
              },
            }}
            startIcon={<SendIcon />}
          >
            Send
          </ActionButton>
        </Box>
      </CardActions>
      <Modal
        open={isEditModalOpen}
        onClose={handleModalClose}
        aria-labelledby="edit-post-modal"
        aria-describedby="edit-post-modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography id="edit-post-modal" variant="h6" component="h2">
            Edit Post
          </Typography>
          <TextField
            fullWidth
            margin="normal"
            label="Caption"
            value={editedCaption}
            onChange={(e) => setEditedCaption(e.target.value)}
          />
          <Box mt={2} display="flex" justifyContent="flex-end">
            <Button variant="contained" color="primary" onClick={handleSave}>
              Save
            </Button>
            <Button
              variant="outlined"
              color="secondary"
              onClick={handleModalClose}
              sx={{ ml: 2 }}
            >
              Cancel
            </Button>
          </Box>
        </Box>
      </Modal>
      <Menu anchorEl={anchorEl} open={isMenuOpen} onClose={handleMenuClose}>
        <MenuItem onClick={handleEdit}>Edit</MenuItem>
        <MenuItem onClick={handleDelete}>Delete</MenuItem>
      </Menu>
    </Card>
  );
};

export default HomePostCard;
