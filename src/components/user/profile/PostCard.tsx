import React from "react";
import {
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  CardActions,
  Collapse,
  Avatar,
  IconButton,
  Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import {
  FavoriteBorder as LikeIcon,
  Comment as CommentIcon,
  BookmarkBorder as SaveIcon,
  Flag as ReportIcon,
  ExpandMore as ExpandMoreIcon,
  MoreVert as MoreVertIcon,
} from "@mui/icons-material";
import { red } from "@mui/material/colors";
import useGetUser from "../../../hook/getUser";

const PostCard = ({ post }) => {
  const user = useGetUser();

  return (
    <Card sx={{ maxWidth: 300, margin: "auto", height: 380, boxShadow: 9 }}>
      <CardHeader
        avatar={<Avatar src={user.picture?.imageUrl} />}
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={user.name}
        subheader={new Date(post.createdAt).toLocaleDateString()}
      />
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
    </Card>
  );
};

export default PostCard;
