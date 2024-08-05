import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Ipost {
  id: string;
  userId : string,
  postUrl: string;
  caption: string;
  skill: string;
  createdAt: string;
  updatedAt: string;
}

export interface PostsState {
  posts: Ipost[];
}

const initialState: PostsState = {
  posts: [],
};

const postSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    addPost: (state, action: PayloadAction<Ipost>) => {
      state.posts.push(action.payload);
    },
    setPost: (state, action: PayloadAction<Ipost>) => {
      console.log("action payload ===>",action.payload)
      const newPost = action.payload;
      const findIndex = state.posts.findIndex((post) => post.id === newPost.id);
      if (findIndex !== -1) {
        state.posts[findIndex] = newPost;
      } else {
        state.posts.push(newPost);
      }
    },
    removePost: (state, action: PayloadAction<string>) => {
      state.posts = state.posts.filter((post) => post.id !== action.payload);
    },
    removeAllPost: (state) => {
      state.posts = [];
    },
    updatePost: (state, action: PayloadAction<Ipost>) => {
      const updatedPost = action.payload;
      const index = state.posts.findIndex((post) => post.id === updatedPost.id);
      if (index !== -1) {
        state.posts[index] = updatedPost;
      }
    },
  },
});

export const { addPost, setPost, removePost, removeAllPost, updatePost } =
  postSlice.actions;
export default postSlice.reducer;
