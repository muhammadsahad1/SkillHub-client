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
  Send as SendIcon,
  Delete as DeleteIcon,
  MoreVert as MoreVertIcon,
  Save as SaveIcon,
  Report as ReportIcon,
} from "@mui/icons-material";
import { HiDotsCircleHorizontal } from "react-icons/hi";

import { useDeletePost, useEditPost } from "../../../hook/usePosts";
import useGetUser from "../../../hook/getUser";
import { showToastError } from "../../common/utilies/toast";
import CommentBox from "../../common/utilies/CommentBox";

const ActionButton: React.FC<React.ComponentProps<typeof Button>> = (props) => (
  <Button {...props} sx={{ minWidth: "80px", ...props.sx }} />
);

interface Post {
  _id: string;
  userId: string;
  imageName: string;
  caption: string;
  type: string;
  imageUrl: string;
  createdAt: string;
  updatedAt: string;
  likes: string[];
  comments: Array<{ _id: string; userImageUrl: string; userName: string; comment: string }>;
  reports: any[];
  saves: any[];
  __v: number;
}

interface PostCardProps {
  post: Post;
}

const PostCard: React.FC<PostCardProps> = ({ post }) => {
  const { mutate: deletePost } = useDeletePost();
  const { mutate: editPost } = useEditPost();
  const user = useGetUser();
  const [isLiked, setIsLiked] = useState(post.likes.includes(user._id));
  const [likeCount, setLikeCount] = useState(post.likes.length);
  const [isCommentBoxOpen, setCommentBoxOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [isEditModalOpen, setEditModalOpen] = useState<boolean>(false);
  const [editedCaption, setEditedCaption] = useState<string>(post.caption);
  const [commentAnchorEl, setCommentAnchorEl] = useState<null | HTMLElement>(null);
  const [isCommentEditModalOpen, setCommentEditModalOpen] = useState(false);
  const [commentBeingEdited, setCommentBeingEdited] = useState<{
    id: string;
    text: string;
  } | null>(null);

  const isMenuOpen = Boolean(anchorEl);
  const isCommentMenuOpen = Boolean(commentAnchorEl);

  const handlePostLike = () => {
    setIsLiked(!isLiked);
    setLikeCount(isLiked ? likeCount - 1 : likeCount + 1);
  };

  const handleMenuOpen = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleDelete = async () => {
    try {
      deletePost(post._id);
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

  const handleSave = async () => {
    try {
      editPost({ id: post._id, caption: editedCaption });
      setEditModalOpen(false);
    } catch (error) {
      console.error(error);
      showToastError("Error updating post");
    }
  };

  const handleCommentMenuClose = () => {
    setCommentAnchorEl(null);
  };

  const handleCommentEditModalClose = () => {
    setCommentEditModalOpen(false);
  };

  const handleEditComment = () => {
    // Implement edit comment functionality
    handleCommentEditModalClose();
  };

  const deletingComment = (commentId: string, postId: string) => {
    // Implement delete comment functionality
  };

  const commentClose = () => {
    setCommentBoxOpen(!isCommentBoxOpen);
  };

  const openCommentMenu = (event: React.MouseEvent<HTMLElement>) => {
    setCommentAnchorEl(event.currentTarget);
  };

  return (
    <Card
      sx={{
        maxWidth: 800,
        margin: "auto",
        marginTop: 3,
        boxShadow: 5,
        marginBottom: 2,
      }}
    >
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
        image={post.imageUrl}
        alt="Post image"
        sx={{
          mb: 2,
          p: 0,
          m: 0,
          overflow: "hidden",
          height: 400,
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
      {/* <CardActions
        disableSpacing
        sx={{
          height: 30,
          width: "100%",
        }}
      >
        <IconButton aria-label="like" onClick={handlePostLike}>
          <LikeIcon color={isLiked ? "primary" : "action"} />
        </IconButton>
        <IconButton aria-label="comment" onClick={() => setCommentBoxOpen(!isCommentBoxOpen)}>
          <CommentIcon />
        </IconButton>
        <IconButton aria-label="save">
          <SaveIcon />
        </IconButton>
        <IconButton aria-label="report">
          <ReportIcon />
        </IconButton>
      </CardActions> */}

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

      <CardActions className="bg-zinc-100 py-1">
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
              color: isLiked ? "#007BFF" : "#18181b",
              backgroundColor: isLiked ? "#E3F2FD" : "transparent",
              "&:hover": {
                backgroundColor: isLiked ? "#BBDEFB" : "#d0d0d0",
                color: isLiked ? "#0056b3" : "#000000",
              },
            }}
            startIcon={<LikeIcon />}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "100%",
              }}
            >
              <span>{isLiked ? "Unlike" : "Like"}</span>
              {likeCount > 0 && (
                <span style={{ marginLeft: "4px" }}>({likeCount})</span>
              )}
            </Box>
          </ActionButton>
          <ActionButton
            onClick={() => setCommentBoxOpen(!isCommentBoxOpen)}
            sx={{
              color: "#18181b",
              "&:hover": {
                backgroundColor: "#d0d0d0",
                color: "#000000",
              },
            }}
            startIcon={<CommentIcon />}
          >
            Comment
          </ActionButton>
          <ActionButton
            onClick={() => console.log("Share")}
            sx={{
              color: "#18181b",
              "&:hover": {
                backgroundColor: "#d0d0d0",
                color: "#000000",
              },
            }}
            startIcon={<SendIcon />}
          >
            Share
          </ActionButton>
        </Box>
      </CardActions>

      {isCommentBoxOpen && (
        <CommentBox
          postId={post._id}
          userId={user._id}
          comments={post.comments}
          onClose={commentClose}
          openCommentMenu={openCommentMenu}
          isCommentMenuOpen={isCommentMenuOpen}
          handleCommentMenuClose={handleCommentMenuClose}
          deletingComment={deletingComment}
          handleEditComment={handleEditComment}
        />
      )}
    </Card>
  );
};

export default PostCard;
