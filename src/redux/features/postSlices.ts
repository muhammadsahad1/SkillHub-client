// import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// export interface Ipost {
//   id: string;
//   userId: string;
//   postUrl: string;
//   caption: string;
//   skill: string;
//   likes: string[];
//   createdAt: string;
//   updatedAt: string;
// }

// export interface PostsState {
//   posts: Ipost[];
// }

// const initialState: PostsState = {
//   posts: [],
// };

// const postSlice = createSlice({
//   name: "posts",
//   initialState,
//   reducers: {
//     addPost: (state, action: PayloadAction<Ipost>) => {
//       state.posts.push(action.payload);
//     },
//     setPost: (state, action: PayloadAction<Ipost>) => {
//       console.log("action payload ===>", action.payload);
//       const newPost = action.payload;
//       const findIndex = state.posts.findIndex((post) => post.id === newPost.id);
//       if (findIndex !== -1) {
//         state.posts[findIndex] = newPost;
//       } else {
//         state.posts.push(newPost);
//       }
//     },
//     removePost: (state, action: PayloadAction<string>) => {
//       state.posts = state.posts.filter((post) => post.id !== action.payload);
//       console.log("state posts ===>", state.posts);
//     },
//     removeAllPost: (state) => {
//       state.posts = [];
//     },
//     updatePost: (state, action: PayloadAction<Ipost>) => {
//       const updatedPost = action.payload;
//       const index = state.posts.findIndex(
//         (post) => post.id === updatedPost?.postId
//       );
//       if (index !== -1) {
//         state.posts[index].caption = updatedPost.caption;
//       }
//     },
//     likePost: (
//       state,
//       action: PayloadAction<{ postId: string; userId: string }>
//     ) => {
//       const { postId, userId } = action.payload;
//       const post = state.posts.find((post) => post.id === postId);
//       if (post) {
//         let likesSet = new Set(post.likes);
//         if (likesSet.has(userId)) {
//           likesSet.delete(userId);
//         } else {
//           likesSet.add(userId);
//         }
//         post.likes = Array.from(likesSet);
//       }
//     },
//   },
// });

// export const {
//   addPost,
//   setPost,
//   removePost,
//   removeAllPost,
//   updatePost,
//   likePost,
// } = postSlice.actions;
// export default postSlice.reducer;
