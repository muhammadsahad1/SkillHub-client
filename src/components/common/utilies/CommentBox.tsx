import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import { useState } from "react";
import { useAddComment } from "../../../hook/usePosts";
import { showToastError } from "./toast";

interface CommentBoxProps {
  postId: string;
  userId: string;
  onClose: () => void;
}

export default function CommentBox({ postId, onClose }: CommentBoxProps) {
  
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [comment, setComment] = useState<string>("");
  const [isValid, setValid] = useState<boolean>(true);
  const addCommentMutation = useAddComment();
  const commentInputRef = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    if (commentInputRef.current) {
      commentInputRef.current.focus();
    }
  }, []);

  const handleAddComment = async () => {
    try {
      if (comment) {
        console.log("comment ===>",comment , postId);
        
        await addCommentMutation.mutateAsync({ postId, comment });
        onClose();
        setComment("");
      }
    } catch (error: any) {
      console.error("Error in handleAddComment:", error);
      showToastError("An error occurred while uploading the comment.");
    }
  };
  const handleSetComment = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    let value = e.target.value;
    setComment(value);
    if (value.trim() === "") {
      setValid(false);
    } else {
      setValid(true);
    }
  };

  return (
    <FormControl fullWidth>
      <FormLabel>
        <p className="font-poppins font-semibold text-zinc-900">Your comment</p>
      </FormLabel>
      <TextField
        inputRef={commentInputRef}
        onChange={handleSetComment}
        value={comment}
        placeholder="Type something here…"
        multiline
        minRows={3}
        variant="outlined"
        fullWidth
      />
      <Box
        sx={{
          display: "flex",
          gap: 2,
          pt: 2,
          borderTop: "1px solid",
          borderColor: "divider",
          flex: "auto",
        }}
      >
        <IconButton
          color="default"
          onClick={(event) => setAnchorEl(event.currentTarget)}
        >
          {/* Add icon if needed */}
        </IconButton>
        <Button
          sx={{ ml: "auto" }}
          onClick={handleAddComment}
          variant="contained"
          disabled={!isValid}
        >
          Send
        </Button>
      </Box>
    </FormControl>
  );
}
