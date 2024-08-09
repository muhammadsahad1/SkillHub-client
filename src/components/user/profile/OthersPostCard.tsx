import React, { useState } from 'react';
import { 
  Box, Card, CardContent, CardHeader, CardMedia, IconButton, 
  TextField, Typography, CardActions, Menu, MenuItem, Modal, Button 
} from "@mui/material";
import { Avatar } from 'antd';
import { MoreVert as MoreVertIcon, Favorite as LikeIcon, Comment as CommentIcon, Send as SendIcon, Delete as DeleteIcon } from '@mui/icons-material';
import { HiDotsCircleHorizontal } from "react-icons/hi";
import CommentBox from '../../common/utilies/CommentBox'; // Ensure this path is correct

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
  <Button {...props} sx={{ minWidth: '80px', ...props.sx }} />
);

const OthersPostCard: React.FC<PostCardProps> = ({ post }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(post.likes.length);
  const [isCommentBoxOpen, setCommentBoxOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [commentAnchorEl, setCommentAnchorEl] = useState<null | HTMLElement>(null);
  const [isCommentEditModalOpen, setCommentEditModalOpen] = useState(false);
  const [commentBeingEdited, setCommentBeingEdited] = useState<{ id: string; text: string } | null>(null);

  const isMenuOpen = Boolean(anchorEl);
  const isCommentMenuOpen = Boolean(commentAnchorEl);

  const handlePostLike = () => {
    setIsLiked(!isLiked);
    setLikeCount(isLiked ? likeCount - 1 : likeCount + 1);
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

  const handleEdit = () => {
    // Implement edit functionality
  };

  const handleDelete = () => {
    // Implement delete functionality
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

  return (
    <Card sx={{ 
      bgcolor:"black", 
      maxWidth: 800,
      margin: "auto",
      marginTop: 3,
      boxShadow: 5,
      marginBottom: 2,
    }}>
      <CardHeader
        avatar={<Avatar src={post.profileImageUrl} />}
        action={
          <IconButton aria-label="settings" onClick={handleMenuOpen}>
            <MoreVertIcon />
          </IconButton>
        }
        title={post.userName}
        subheader={new Date(post.createdAt).toLocaleDateString()}
      />
      <CardMedia
        component="img"
        image={post.postUrl} 
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
        <Typography variant="body2" color="text.secondary">
          {post.caption}
        </Typography>
      </CardContent>
      
    
<CardActions className="bg-zinc-100 py-1">
  <Box sx={{ display: "flex", justifyContent: "space-between", width: "100%" }}>
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
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%' }}>
        <span>{isLiked ? "Unlike" : "Like"}</span>
        {likeCount > 0 && <span style={{ marginLeft: '4px' }}>({likeCount})</span>}
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

      <Box sx={{ p: 2 }}>
        {post.comments.length > 0 ? (
          post.comments.map((comment) => (
            <Box key={comment._id} sx={{ display: "flex", alignItems: "center", mb: 1 }}>
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
            </Box>
          ))
        ) : (
          <Typography variant="body2" color="text.secondary">
            No comments yet. Be the first to comment!
          </Typography>
        )}
      </Box>

      <Menu
        anchorEl={commentAnchorEl}
        open={isCommentMenuOpen}
        onClose={handleCommentMenuClose}
      >
        <MenuItem onClick={() => {
          setCommentBeingEdited({id: 'comment._id', text: 'comment.comment'});
          setCommentEditModalOpen(true);
          handleCommentMenuClose();
        }}>
          <Typography>Edit</Typography>
        </MenuItem>
        <MenuItem onClick={() => {
          deletingComment('comment._id', post._id);
          handleCommentMenuClose();
        }}>
          <DeleteIcon fontSize="small" style={{ marginRight: "8px" }} />
          <Typography>Delete</Typography>
        </MenuItem>
      </Menu>

      <Modal
        open={isCommentEditModalOpen}
        onClose={handleCommentEditModalClose}
      >
        <Box sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          bgcolor: "background.paper",
          border: "2px solid #000",
          boxShadow: 24,
          p: 4,
        }}>
          <Typography id="edit-post-modal-title" variant="h6" component="h2">
            Edit Comment
          </Typography>
          <TextField
            fullWidth
            variant="outlined"
            label="Comment"
            value={commentBeingEdited?.text || ''}
            onChange={(e) => setCommentBeingEdited(prev => ({ ...prev!, text: e.target.value }))}
            sx={{ mt: 2 }}
          />
          <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
            <Button onClick={handleCommentEditModalClose} sx={{ mr: 2 }}>
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

      <Menu
        anchorEl={anchorEl}
        open={isMenuOpen}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={handleEdit}>Edit</MenuItem>
        <MenuItem onClick={handleDelete}>Delete</MenuItem>
      </Menu>
    </Card>
  );
};

export default OthersPostCard;