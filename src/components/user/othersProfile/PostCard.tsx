import React, { useState, MouseEvent } from "react";
import {
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  CardActions,
  Avatar,
  IconButton,
  Typography,
  Menu,
  Modal,
  MenuItem,
  Box,
  Button,
  TextField,
} from "@mui/material";
import {
  FavoriteBorder as LikeIcon,
  Comment as CommentIcon,
  BookmarkBorder as SaveIcon,
  Flag as ReportIcon,
  MoreVert as MoreVertIcon,
} from "@mui/icons-material";

import { useDeletePost } from "../../../hook/usePosts";
import useGetUser from "../../../hook/getUser";
import { showToastError } from "../../common/utilies/toast";
import { useEditPost } from "../../../hook/usePosts";

interface PostCardProps {
  post: {
    id: string;
    postUrl: string;
    caption: string;
    createdAt: string;
  };
}

const PostCard: React.FC<PostCardProps> = ({ post }) => {
  const { mutate: deletPost } = useDeletePost();
  const { mutate : editPost } = useEditPost();
  const user = useGetUser();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [isEditModalOpen, setEditModalOpen] = useState<boolean>(false);
  const [editedCaption, setEditedCaption] = useState<string>("");
  const isMenuOpen = Boolean(anchorEl);

  const handleMenuOpen = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleDelete = async () => {
    try {
      deletPost(post?.id);
      handleMenuClose();
    } catch (error) {
      console.error(error);
    }
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
        editPost({ id: post.id, caption: editedCaption })
        setEditModalOpen(false);
    } catch (error) {
      console.error(error);
      showToastError("Error updating post");
    }
  };

  return (
    <Card sx={{ maxWidth: 300, margin: "auto", height: 380, boxShadow: 9 }}>
      <CardHeader
        avatar={<Avatar src={user.picture?.imageUrl} />}
        action={
          <IconButton aria-label="settings" onClick={handleMenuOpen}>
            <MoreVertIcon />
          </IconButton>
        }
        title={user.name}
        subheader={new Date(post.createdAt).toLocaleDateString()}
      />
      <Menu anchorEl={anchorEl} open={isMenuOpen} onClose={handleMenuClose}>
        <MenuItem onClick={handleEdit}>Edit</MenuItem>
        <MenuItem onClick={handleDelete}>Delete</MenuItem>
      </Menu>
      <CardMedia
        component="img"
        image={post.postUrl}
        alt="Post image"
        sx={{
          height: 190,
          width: "100%",
          objectFit: "cover",
        }}
      />
      <CardContent>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            height: 30,
            width: "100%",
          }}
        >
          {post.caption}
        </Typography>
      </CardContent>
      <CardActions
        disableSpacing
        sx={{
          height: 30,
          width: "100%",
        }}
      >
        <IconButton aria-label="like">
          <LikeIcon />
        </IconButton>
        <IconButton aria-label="comment">
          <CommentIcon />
        </IconButton>
        <IconButton aria-label="save">
          <SaveIcon />
        </IconButton>
        <IconButton aria-label="report">
          <ReportIcon />
        </IconButton>
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
              sx={{ ml: 2 }}>

              Cancel
            </Button>
          </Box>
        </Box>
      </Modal>
    </Card>
  );
};

export default PostCard;
