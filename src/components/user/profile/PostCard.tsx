import React, { useState, MouseEvent, useEffect } from "react";
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

import {
  useDeleteComment,
  useDeletePost,
  useEditComment,
  useEditPost,
  usePostLike,
} from "../../../hook/usePosts";
import useGetUser from "../../../hook/getUser";
import { showToastError } from "../../common/utilies/toast";
import CommentBox from "../../common/utilies/CommentBox";
import { Link, useNavigate } from "react-router-dom";
import PopUpModal from "../../common/PopUpModal";
import { useNotifyUser } from "../../../hook/useNotifyUser";
import { useSocket } from "../../../hook/useSocket";

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
  comments: Array<{
    _id: string;
    userImageUrl: string;
    userName: string;
    comment: string;
  }>;
  reports: any[];
  saves: any[];
  __v: number;
}

interface PostCardProps {
  post: Post;
}

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

const PostCard: React.FC<PostCardProps> = ({ post }: any) => {
  const user = useGetUser();
  const navigate = useNavigate();
  const { socket } = useSocket();
  const { mutate: deletePost } = useDeletePost();
  const { mutate: editPost } = useEditPost();
  const { mutate: postLike } = usePostLike();
  const { mutate: editComment } = useEditComment();
  const { mutate: deleteComment } = useDeleteComment();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [isEditModalOpen, setEditModalOpen] = useState<boolean>(false);
  const [editedCaption, setEditedCaption] = useState<string>("");
  const [isLiked, setLiked] = useState<boolean>(false);
  const [likeCount, setLikeCount] = useState<number>(0);
  const [isCommentBoxOpen, setCommentBoxOpen] = useState<boolean>(false);
  const [commentAnchorEl, setCommentAnchorEl] = useState<null | HTMLElement>(
    null
  );
  const [isDeleteModalOpen, setDeleteModalOpen] = useState<boolean>(false);
  const [isCommentEditModalOpen, setCommentEditModalOpen] =
    useState<boolean>(false);
  const [commentBeingEdited, setCommentBeingEdited] = useState<{
    id: string;
    text: string;
  } | null>(null);

  const [captionBeingEdit, setCaptionBeingEdit] = useState<{
    id: string;
    text: string;
  } | null>(null);

  const isCommentMenuOpen = Boolean(commentAnchorEl);

  useEffect(() => {
    const isUserLiked = post?.likes?.includes(user?.id as string);
    setLiked(isUserLiked);
    setLikeCount(post?.likes?.length);
  }, [post.likes, user.id]);

  const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleDelete = async () => {
    try {
      await deletePost(post._id);
      handleMenuClose();
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  const handleEdit = () => {
    setCaptionBeingEdit({
      id: post._id,
      text: post.caption,
    });
    setEditModalOpen(true);
    handleMenuClose();
  };

  const handleModalClose = () => {
    setEditModalOpen(false);
  };

  const handleEditModal = (comment: any) => {
    setCommentBeingEdited({
      id: comment.id,
      text: comment.comment,
    });
    setCommentEditModalOpen(true);
    handleCommentMenuClose();
  };

  const closeDeleteModal = () => {
    setDeleteModalOpen(false);
  };

  const handleSave = async () => {
    try {
      await editPost({ id: post._id, caption: editedCaption });
      setEditModalOpen(false);
    } catch (error) {
      console.error("Error updating post:", error);
      showToastError("Error updating post");
    }
  };
  // handling the post like
  const handlePostLike = async () => {
    try {
      const wasLiked = !isLiked;
      await postLike(post._id);
      setLiked(wasLiked);

      // Check if the current user is not the owner of the post
      if (wasLiked && user.id !== post.userId) {
        // Emit socket event for liking the post
        socket?.emit("postLiked", {
          senderId: user.id,
          receiverId: post.userId,
          type: "like",
          message: `${user.name} liked your post`,
          link: `/auth/post/${post._id}`,
        });

        // Create a new notification for the post like
        await useNotifyUser(
          user.id,
          post.userId,
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
    } catch (error) {
      console.error("Error liking post:", error);
      showToastError("Error liking post");
    }
  };

  const commentClose = () => {
    setCommentBoxOpen(!isCommentBoxOpen);
  };

  const deletingComment = async (commentId: string, postId: string) => {
    try {
      await deleteComment({ commentId, postId });
      handleCommentMenuClose();
    } catch (error) {
      console.error("Failed to delete comment:", error);
    }
  };

  const handleEditComment = async () => {
    if (commentBeingEdited) {
      try {
        await editComment({
          commentId: commentBeingEdited.id,
          postId: post._id,
          updatedText: commentBeingEdited.text,
        });
        setCommentEditModalOpen(false);
      } catch (error) {
        console.error("Error updating comment:", error);
        showToastError("Error updating comment");
      }
    }
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

  const handleDeleteModalOpen = () => {
    setDeleteModalOpen(true);
    handleMenuClose();
  };

  // for view the one post
  const handlePostDetaileView = async () => {
    navigate(`/auth/post/${post._id}`);
  };

  // width: "100%",
  // maxWidth: "800px",
  // margin: "auto",
  // marginTop: 3,
  // boxShadow: 2,
  // marginBottom: 2,
  // borderRadius: 4,
  // height: 600,
  // display: "flex",
  // flexDirection: "column",
  // justifyContent: "space-between",

  return (
    <Card
      sx={{
        maxWidth: 800,
        margin: "auto",
        marginTop: 3,
        boxShadow: 2,
        marginBottom: 2,
        borderRadius: 4,
      }}
    >
      <CardHeader
        avatar={
          <Link to={`auth/OtherProfileView/${post?.userId}`}>
            <Avatar src={user?.picture?.imageUrl} />
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
        action={
          post.userId === user.id ? (
            <IconButton onClick={handleMenuClick}>
              <MoreVertIcon />
            </IconButton>
          ) : null
        }
      />
      <CardContent>
        {post?.caption && (
          <Typography variant="body2" color="text.secondary" paragraph>
            {post?.caption}
          </Typography>
        )}
        {post?.imageUrl && (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              mb: 2,
              p: 0,
              m: 0,
              overflow: "hidden",
              height: { xs: 250, sm: 400 }, // Using MUI's breakpoints
              width: "100%",
            }}
          >
            {post.type === "video" ? (
              <Box
                component="video"
                src={post?.imageUrl}
                controls
                sx={{
                  width: "100%",
                  objectFit: "cover",
                  height: { xs: 250, sm: 400 }, // Responsive heights based on screen size
                }}
              />
            ) : (
              <Box
                component="img"
                src={post?.imageUrl}
                alt="Post content"
                sx={{
                  width: "100%",
                  objectFit: "cover",
                  height: { xs: 250, sm: 400 }, // Responsive heights based on screen size
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
          <CommentBox
            postId={post._id}
            onClose={commentClose}
            userId={""}
            comments={[]}
          />
        </Box>
      )}

      {/* Post Edit Modal */}
      <Modal open={isEditModalOpen} onClose={handleModalClose}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            borderRadius: 2,
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Edit Post
          </Typography>
          <TextField
            fullWidth
            multiline
            rows={4}
            value={captionBeingEdit?.text || ""}
            onChange={(e) => {
              if (captionBeingEdit) {
                setCaptionBeingEdit({
                  ...captionBeingEdit,
                  text: e.target.value,
                });
              }
            }}
            sx={{ mt: 2 }}
          />
          <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
            <Button onClick={handleModalClose} sx={{ mr: 1 }}>
              Cancel
            </Button>
            <Button variant="contained" color="primary" onClick={handleSave}>
              Save
            </Button>
          </Box>
        </Box>
      </Modal>

      {/* Comment Edit Modal */}
      <Modal
        open={isCommentEditModalOpen}
        onClose={handleCommentEditModalClose}
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            borderRadius: 2,
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography id="comment-edit-modal-title" variant="h6" component="h2">
            Edit Comment
          </Typography>
          <TextField
            label="Comment"
            multiline
            rows={4}
            fullWidth
            value={commentBeingEdited?.text || ""}
            onChange={(e) => {
              if (commentBeingEdited) {
                setCommentBeingEdited({
                  ...commentBeingEdited,
                  text: e.target.value,
                });
              }
            }}
            sx={{ mt: 2 }}
          />
          <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
            <Button onClick={handleCommentEditModalClose} sx={{ mr: 1 }}>
              Cancel
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={handleEditComment}
            >
              Save
            </Button>
          </Box>
        </Box>
      </Modal>

      {/* Post Options Menu */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={handleEdit}>Edit</MenuItem>
        <MenuItem onClick={handleDeleteModalOpen}>Delete</MenuItem>
        <MenuItem onClick={handlePostDetaileView}>view Post</MenuItem>
      </Menu>

      {/* Post Delete Modal */}
      <PopUpModal
        isOpen={isDeleteModalOpen}
        isClose={closeDeleteModal}
        onConfirm={handleDelete}
        title="Are you sure you want to delete this post?"
        content={""}
      />
    </Card>
  );
};

export default PostCard;
