const userRoutes = {
  // begin
  signup: "/user/register",
  createUser: "/user/createUser",
  resentOtp: "/user/resentOtp",
  login: "/user/login",
  googleLogin: "/user/googleLogin",
  fogotPassword: "/user/forgotPassword",
  resetPassword: "/user/resetPassword",
  changePassword: "/user/changePassword",

  // profile
  createProfile: "/user/createProfile",
  uploadCoverImg: "/user/coverImage",
  viewProfile: "/user/viewProfile",
  profileImage: "/user/profileImage",
  accountPrivacy: "/user/accountPrivacy",
  showNotification: "/user/showNotification",
  getSkillRelatedUsers: "/user/getSkillRelatedUsers",
  getUserDetails: "/user/getUserDetails",
  getOthersPosts : "/user/OthersPosts",
  
  // followings $ followers
  getMyFollowings: "/user/getMyFollowings",
  unFollow: "/user/unFollow",
  userFollowing: "/user/followup",
  userFollowers: "/user/followers",
  removeFollower: "/user/follower",
  followBack: "/user/followBack",
  othersFollowers: "/user/othersFollowers",
  othersFollowings: "/user/othersFollowings",
  searchUser : "/user/searchUser",

  // posts
  uploadPost: "/user/uploadPost",
  fetchPosts: "/user/posts",
  delelePost: "/user/posts",
  editPost: "/user/post",
  postLike: "/user/postLike",
  fetchMyPost: "/user/myPosts",
  addComment : "/user/addComment",
  deleteComment : "/user/deleteComment",
  editComment : "/user/editComment",

  // Conversations
  getChatUsers : '/user/getChat',
  sendChat : '/user/sendChat',
  fetchUsers : '/user/chatUsers',
  markMessage : '/user/markAsRead',

  //Notifications
  notification : '/user/notification',

  logout: "/user/logout",
};

export default userRoutes;
