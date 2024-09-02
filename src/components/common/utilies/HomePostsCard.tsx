import React, { useEffect, useState } from "react";
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
  FavoriteBorder as LikeIcon,
  Comment as CommentIcon,
  MoreVert as MoreVertIcon,
} from "@mui/icons-material";
import { HiDotsCircleHorizontal } from "react-icons/hi";
import { styled } from "@mui/material/styles";
import useGetUser from "../../../hook/getUser";
import {
  useDeleteComment,
  useDeletePost,
  useEditComment,
  useEditPost,
  usePostLike,
  useViewPost,
} from "../../../hook/usePosts";
import { showToastError } from "./toast";
import { Link, useNavigate } from "react-router-dom";
import CommentBox from "./CommentBox";
import PopUpModal from "./Modal";
import { useQueryClient } from "react-query";
import { useSocket } from "../../../hook/useSocket";
import { useNotifyUser } from "../../../hook/useNotifyUser";
import { LuBadgeCheck } from "react-icons/lu";

const ActionButton = styled(Button)(({ theme }) => ({
  color: theme.palette.grey[400],
  textTransform: "none",
  "&:hover": {
    backgroundColor: "transparent",
    color: theme.palette.common.white,
  },
}));

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
  console.log("post ==>", post);
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
  const queryClient = useQueryClient();

  useEffect(() => {
    const isUserLiked = post.likes.includes(user.id);
    setLiked(isUserLiked);
    setLikeCount(post.likes.length);
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
      queryClient.invalidateQueries(["posts"]);
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
      id: comment._id,
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
      if (captionBeingEdit && captionBeingEdit.text.trim() !== "") {
        await editPost({ id: post._id, caption: captionBeingEdit.text });
        post.caption = captionBeingEdit?.text;
        setEditModalOpen(false);
      }
    } catch (error) {
      console.error("Error updating post:", error);
      showToastError("Error updating post");
    }
  };

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
      console.log("id ==>", commentBeingEdited.id);

      try {
        editComment({
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

  return (
    <Card
      sx={{
        width: "100%",
        maxWidth: "800px",
        margin: "auto",
        marginTop: 3,
        boxShadow: 2,
        marginBottom: 2,
        borderRadius: 4,
        height: 600, // Fixed height for all cards
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <CardHeader
        avatar={
          <Link to={`auth/OtherProfileView/${post?.userId}`}>
            {post.isProfessional && <LuBadgeCheck />}
            <Avatar src={post?.userImageUrl} />
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
      <CardContent
        sx={{
          flex: 1,
          overflow: "hidden",
        }}
      >
        {post?.caption && (
          <Typography
            variant="body2"
            color="text.secondary"
            paragraph
            sx={{
              fontSize: post.type === "thoughts" ? "1.5rem" : "1rem",
              fontWeight: post.type === "thoughts" ? "bold" : "normal",
              textAlign: post.type === "thoughts" ? "center" : "left",
            }}
          >
            {post.caption}
          </Typography>
        )}

        {post?.postImageUrl && (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              mb: 2,
              p: 0,
              m: 0,
              overflow: "hidden",
              flex: 1,
              height: "100%",
              "@media (max-width: 600px)": {
                maxWidth: "100%",
              },
            }}
          >
            {post.type === "video" ? (
              <video
                src={post?.postImageUrl}
                controls
                style={{
                  width: "100%",
                  objectFit: "cover",
                  height: "100%", // Ensure video fills the box height
                }}
              />
            ) : (
              <img
                src={post?.postImageUrl}
                alt="Post content"
                style={{
                  width: "100%",
                  objectFit: "cover",
                  height: "100%", // Ensure image fills the box height
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
                  src={comment?.imageUrl}
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
          <CommentBox postId={post._id} onClose={commentClose} />
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

export default HomePostCard;
