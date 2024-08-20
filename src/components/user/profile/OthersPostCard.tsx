import React, { useState } from "react";
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  IconButton,
  TextField,
  Typography,
  CardActions,
  Menu,
  MenuItem,
  Modal,
  Button,
} from "@mui/material";
import { Avatar } from "antd";
import {
  MoreVert as MoreVertIcon,
  Favorite as LikeIcon,
  Comment as CommentIcon,
  Send as SendIcon,
  Delete as DeleteIcon,
} from "@mui/icons-material";
import { HiDotsCircleHorizontal } from "react-icons/hi";
import CommentBox from "../../common/utilies/CommentBox"; // Ensure this path is correct
import useGetUser from "../../../hook/getUser";
import { Link, useNavigate } from "react-router-dom";
import { useDeleteComment, useEditComment, usePostLike } from "../../../hook/usePosts";
import { useNotifyUser } from "../../../hook/useNotifyUser";
import { useSocket } from "../../../hook/useSocket";

interface Comment {
  _id: string;
  userName: string;
  userImageUrl: string;
  comment: string;
}

interface PostCardProps {
  post: {
    _id: string;
    postUrl: string;
    caption: string;
    createdAt: string;
    profileImageUrl?: string;
    userName?: string;
    likes: string[];
    comments: Comment[];
  };
}
const ActionButton: React.FC<React.ComponentProps<typeof Button>> = (props) => (
  <Button {...props} sx={{ minWidth: "80px", ...props.sx }} />
);

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

const OthersPostCard: React.FC<PostCardProps> = ({ post }) => {
  console.log("post in othersview ++.", post);
  
  const user = useGetUser();
  const navigate = useNavigate()
  const { socket } = useSocket()
  const { mutate: deleteComment } = useDeleteComment();
  const { mutate: postLike } = usePostLike();
  const { mutate: editComment } = useEditComment();
  const [isLiked, setLiked] = useState<boolean>(false);
  const [likeCount, setLikeCount] = useState(post.likes.length);
  const [isCommentBoxOpen, setCommentBoxOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [commentAnchorEl, setCommentAnchorEl] = useState<null | HTMLElement>(
    null
  );
  const [isCommentEditModalOpen, setCommentEditModalOpen] = useState(false);
  const [commentBeingEdited, setCommentBeingEdited] = useState<{
    id: string;
    text: string;
  } | null>(null);

  const isMenuOpen = Boolean(anchorEl);
  const isCommentMenuOpen = Boolean(commentAnchorEl);

  const handlePostLike = async () => {
    const wasLiked = !isLiked;
      await postLike(post._id);
      setLiked(wasLiked);
  
      // Check if the current user is not the owner of the post
      if (wasLiked && user.id !== post?.userId) {
        // Emit socket event for liking the post
        socket?.emit("postLiked", {
          senderId: user.id,
          receiverId: post?.userId,
          type: "like",
          message: `${user.name} liked your post`,
          link: `/auth/post/${post._id}`,
        });
  
        // Create a new notification for the post like
        await useNotifyUser(
          user.id,
          post?.userId,
          "like",
          `${user.name} liked your post`,
          `/auth/post/${post._id}`
        );
      }
  
      // Update like count
      setLikeCount((prevCount) => {
        const newCount = wasLiked ? prevCount + 1 : prevCount - 1;
        return newCount;
      });
  };

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const openMiniModal = (event: React.MouseEvent<HTMLElement>) => {
    setCommentAnchorEl(event.currentTarget);
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

  const deletingComment = async (commentId: string, postId: string) => {
    try {
      await deleteComment({ commentId, postId });
      handleCommentMenuClose();
    } catch (error) {
      console.error("Failed to delete comment:", error);
    }
  };

  const commentClose = () => {
    setCommentBoxOpen(!isCommentBoxOpen);
  };

  const handleEditModal = (comment: any) => {
    setCommentBeingEdited({
      id: comment.id,
      text: comment.comment,
    });
    setCommentEditModalOpen(true);
    handleCommentMenuClose();
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
  >
    <CardHeader
      avatar={
        <Link to={`auth/OtherProfileView/${post?.userId}`}>
          <Avatar src={post.profileImageUrl} />
        </Link>
      }
      title={
        <Typography variant="subtitle1" fontWeight="bold">
          {post?.userName}
        </Typography>
      }
      subheader={
        post.createdAt ? (
          <Typography variant="body2" color="text.secondary">
            {formatDate(post.createdAt)}
          </Typography>
        ) : null
      }
    />
    <CardContent>
      {post?.caption && (
        <Typography variant="body2" color="text.secondary" paragraph>
          {post?.caption}
        </Typography>
      )}
      {post?.postUrl && (
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
          {post?.type === "video" ? (
            <video
              src={post?.postUrl}
              controls
              style={{
                width: "100%",
                objectFit: "cover",
                "@media (max-width: 600px)": {
                  height: 250,
                },
                "@media (min-width: 600px)": {
                  height: 400,
                },
              }}
            />
          ) : (
            <img
              src={post?.postUrl}
              alt="Post content"
              style={{
                width: "100%",
                objectFit: "cover",
                "@media (max-width: 600px)": {
                  height: 250,
                },
                "@media (min-width: 600px)": {
                  height: 400,
                },
              }}
            />
          )}
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
            color: isLiked ? "#007BFF" : "#18181b",
            backgroundColor: isLiked ? "#E3F2FD" : "transparent",
            "&:hover": {
              backgroundColor: isLiked ? "#BBDEFB" : "#d0d0d0",
              color: isLiked ? "#007BFF" : "#000",
            },
          }}
        >
          <LikeIcon sx={{ mr: 0.5 }} />
          {likeCount} Likes
        </ActionButton>
        <ActionButton onClick={commentClose}>
          <CommentIcon sx={{ mr: 0.5, color: "black" }} />
          <p className="text-zinc-800">{post?.comments?.length} Comments</p>
        </ActionButton>
      </Box>
    </CardActions>

    {/* Comment Section */}
    {isCommentBoxOpen && (
      <Box
        sx={{
          padding: "8px 16px",
          display: "flex",
          flexDirection: "column",
          gap: 2,
        }}
      >
        {post?.comments?.map((comment: any) => (
          <Box
            key={comment._id}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <Avatar
                alt={comment.userName}
                src={comment?.userImageUrl}
                sx={{ width: 30, height: 30 }}
              />
              <Box>
                <Typography
                  variant="body2"
                  sx={{ fontWeight: "bold", color: "#333" }}
                >
                  {comment.userName}
                </Typography>
                <Typography variant="body2" sx={{ color: "#555" }}>
                  {comment.comment}
                </Typography>
              </Box>
            </Box>
            {comment.userId === user.id && (
              <IconButton onClick={openMiniModal}>
                <HiDotsCircleHorizontal />
              </IconButton>
            )}
            <Menu
              anchorEl={commentAnchorEl}
              open={isCommentMenuOpen}
              onClose={handleCommentMenuClose}
              PaperProps={{
                elevation: 1,
                sx: {
                  width: "150px",
                  bgcolor: "background.paper",
                },
              }}
            >
              <MenuItem onClick={() => handleEditModal(comment)}>
                Edit
              </MenuItem>
              <MenuItem
                onClick={() => deletingComment(comment._id, post._id)}
              >
                Delete
              </MenuItem>
            </Menu>
          </Box>
        ))}
        <CommentBox postId={post._id} onClose={commentClose}/>
      </Box>
    )}
  </Card>
  );
};

export default OthersPostCard;
