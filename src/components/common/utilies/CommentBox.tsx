import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import TextField from "@mui/material/TextField";
import { useState } from "react";
import { useAddComment } from "../../../hook/usePosts";
import { showToastError } from "./toast";
import { useNotifyUser } from "../../../hook/useNotifyUser";
import useGetUser from "../../../hook/getUser";
import { useSocket } from "../../../hook/useSocket";

interface CommentBoxProps {
  postId: string;

  onClose: () => void;
}

export default function CommentBox({ postId, onClose }: CommentBoxProps) {
  const [comment, setComment] = useState<string>("");
  const [isValid, setValid] = useState<boolean>(false);
  const addCommentMutation = useAddComment();
  const user = useGetUser();
  const { socket } = useSocket();

  const handleAddComment = async () => {
    try {
      const result = await addCommentMutation.mutateAsync({ postId, comment });

      if (result.success) {
        socket?.emit("comment", {
          senderId: user.id,
          receiverId: result?.comment?.postOwnerId,
          type: "comment",
          message: `${user.name} comment on your post`,
          link: `/auth/post/${postId}`,
        });
        // creating notification and sending to user in realTime
        await useNotifyUser(
          user.id,
          result?.comment?.postOwnerId,
          "comment",
          `${user.name} comment on you post`,
          `/auth/post/${postId}`
        );

        onClose();
        setComment("");
      } else {
        showToastError("An error occurred while uploading the comment.");
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
