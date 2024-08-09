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
  Favorite as LikeIcon,
  Comment as CommentIcon,
  Report as ReportIcon,
  Send as SendIcon,
  MoreVert as MoreVertIcon,
  Delete as DeleteIcon,
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
} from "../../../hook/usePosts";
import { showToastError } from "./toast";
import { Link } from "react-router-dom";
import CommentBox from "./CommentBox";

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
  const [isCommentEditModalOpen, setCommentEditModalOpen] =
    useState<boolean>(false);
  const [commentBeingEdited, setCommentBeingEdited] = useState<{
    id: string;
    text: string;
  } | null>(null);

  const isMenuOpen = Boolean(anchorEl);
  const isCommentMenuOpen = Boolean(commentAnchorEl);

  // Ensure the like
  useEffect(() => {
    const isUserLiked = post.likes.includes(user.id);
    setLiked(isUserLiked);
    setLikeCount(post.likes.length);
  }, [post.likes, user.id]);

  const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleEditMenuClick = (event: React.MouseEvent<HTMLElement>) => {
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

  const handleEditModal = () => {
    setCommentEditModalOpen(true);
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
      postLike(post._id);
      setLiked((prevLike) => {
        const isUserLiked = !prevLike;
        setLikeCount((prevCount) =>
          isUserLiked ? prevCount + 1 : prevCount - 1
        );
        return isUserLiked;
      });
    } catch (error) {
      console.error(error);
      showToastError("Error like post");
    }
  };

  // Comment closer handler
  const commentClose = () => {
    setCommentBoxOpen(!isCommentBoxOpen);
  };

  const deletingComment = async (commentId: string, postId: string) => {
    try {
      deleteComment({ commentId, postId });
    } catch (error) {
      console.error("Failed to delete comment:", error);
    }
  };

  const handleEditComment = async () => {
    if(commentBeingEdited){
      try {
       await editComment({
        commentId : commentBeingEdited.id,
        postId : post._id,
        updatedText : commentBeingEdited.text,
       })
       setCommentEditModalOpen(false)
      } catch (error) {
        console.error(error);
        showToastError("Error updating comment");
      }
    };
  }

  const openMiniModal = (event: React.MouseEvent<HTMLElement>) => {
    setCommentAnchorEl(event.currentTarget);
  };

  const handleCommentMenuClose = () => {
    setCommentAnchorEl(null);
  };

  const handleCommentEditModalClose = () => {
    setCommentEditModalOpen(false);
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
        avatar={
          <Link to={`auth/OtherProfileView/${post.userId}`}>
            <Avatar src={post.userImageUrl} />
          </Link>
        }
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
          }}>

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
            {isLiked ? "Unlike" : "Like"}
            {likeCount > 0 ? <span className="ms-2">{likeCount}</span> : null}
          </ActionButton>
          <ActionButton
            onClick={() => setCommentBoxOpen(!isCommentBoxOpen)}
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
                backgroundColor: "#d0d0d0",
                color: "#000000",
              },
            }}
            startIcon={<SendIcon />}
          >
            Send
          </ActionButton>
        </Box>
      </CardActions>

      {isCommentBoxOpen && (
        <CommentBox key={post._id} postId={post._id} onClose={commentClose} />
      )}

      {/* Displaying comments */}
      <Box sx={{ p: 2 }}>
        {post.comments.length > 0 ? (
          post.comments.map((comment: any) => (
            <Box
              key={comment._id}
              sx={{ display: "flex", alignItems: "center", mb: 1 }}
            >
              <Avatar src={comment.userImageUrl} sx={{ mr: 2 }} />
              <Box sx={{ flexGrow: 1 }}>
                <Typography variant="subtitle2" fontWeight="bold">
                  {comment.userName}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {comment.comment}
                </Typography>
              </Box>
              <IconButton onClick={openMiniModal}>
                <HiDotsCircleHorizontal />
              </IconButton>

              {/* Mini Modal */}
              <Menu
                anchorEl={commentAnchorEl}
                open={isCommentMenuOpen}
                onClose={handleCommentMenuClose}
                sx={{
                  style: {
                    maxHeight: 200,
                    width: "20ch",
                  },
                }}
              >
                <MenuItem
                  onClick={()=>{
                    setCommentBeingEdited({id : comment._id,text :comment.comment})
                    handleEditModal()
                    handleCommentMenuClose()
                  }
                  }
                >
                  <Typography>Edit</Typography>
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    deletingComment(comment._id, post._id);
                    handleCommentMenuClose();
                  }}
                >
                  <DeleteIcon fontSize="small" style={{ marginRight: "8px" }} />
                  <Typography>Delete</Typography>
                </MenuItem>
              </Menu>
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
                    border: "2px solid #000",
                    boxShadow: 24,
                    p: 4,
                  }}
                >
                  <Typography
                    id="edit-post-modal-title"
                    variant="h6"
                    component="h2"
                  >
                    Edit Comment
                  </Typography>
                  <TextField
                    fullWidth
                    variant="outlined"
                    label="Caption"
                    value={commentBeingEdited?.text || comment.comment}
                    defaultValue={post.caption}
                    onChange={(e) =>
                      setCommentBeingEdited((prev) => ({
                        ...prev!,
                        text: e.target.value,
                      }))
                    }
                    sx={{ mt: 2 }}
                  />
                  <Box
                    sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}
                  >
                    <Button
                      onClick={handleCommentEditModalClose}
                      sx={{ mr: 2 }}
                    >
                      Cancel
                    </Button>
                    <Button
                      variant="contained"
                      onClick={handleEditComment}
                      sx={{
                        backgroundColor: "#007BFF",
                        color: "#FFFFFF",
                        "&:hover": {
                          backgroundColor: "#0056b3",
                        },
                      }}
                    >
                      Save
                    </Button>
                  </Box>
                </Box>
              </Modal>

              {/* Post Menu */}
              <Menu
                anchorEl={anchorEl}
                open={isMenuOpen}
                onClose={handleMenuClose}
                sx={{
                  style: {
                    maxHeight: 200,
                    width: "20ch",
                  },
                }}
              >
                <MenuItem onClick={handleEdit}>Edit</MenuItem>
                <MenuItem onClick={handleDelete}>Delete</MenuItem>
              </Menu>
            </Box>
          ))
        ) : (
          <Typography variant="body2" color="text.secondary">
            No comments yet. Be the first to comment!
          </Typography>
        )}
      </Box>

      {/* Edit Post Modal */}
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
            border: "2px solid #000",
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography id="edit-post-modal-title" variant="h6" component="h2">
            Edit post
          </Typography>
          <TextField
            fullWidth
            variant="outlined"
            label="Caption"
            value={editedCaption}
            defaultValue={post.caption}
            onChange={(e) => setEditedCaption(e.target.value)}
            sx={{ mt: 2 }}
          />
          <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
            <Button onClick={handleModalClose} sx={{ mr: 2 }}>
              Cancel
            </Button>
            <Button
              variant="contained"
              onClick={handleSave}
              sx={{
                backgroundColor: "#007BFF",
                color: "#FFFFFF",
                "&:hover": {
                  backgroundColor: "#0056b3",
                },
              }}
            >
              Save
            </Button>
          </Box>
        </Box>
      </Modal>
    </Card>
  );
};

export default HomePostCard;
