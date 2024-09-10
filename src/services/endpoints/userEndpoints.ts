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
  getOthersPosts: "/user/OthersPosts",

  //verifiy request for proffessional account
  verifyRequesting: "/user/verification-request",

  // followings $ followers
  getMyFollowings: "/user/getMyFollowings",
  unFollow: "/user/unFollow",
  userFollowing: "/user/followup",
  userFollowers: "/user/followers",
  removeFollower: "/user/follower",
  followBack: "/user/followBack",
  othersFollowers: "/user/othersFollowers",
  othersFollowings: "/user/othersFollowings",
  searchUser: "/user/searchUser",

  // posts
  uploadPost: "/user/uploadPost",
  fetchPosts: "/user/posts",
  delelePost: "/user/posts",
  editPost: "/user/post",
  postLike: "/user/postLike",
  fetchMyPost: "/user/myPosts",
  addComment: "/user/addComment",
  deleteComment: "/user/deleteComment",
  editComment: "/user/editComment",
  viewPost: "/user/viewPost",
  thoughtPost: "/user/postThoughts",
  reportPost : "/user/report",

  // Conversations
  getChatUsers: "/user/getChat",
  sendChat: "/user/sendChat",
  fetchUsers: "/user/chatUsers",
  markMessage: "/user/markAsRead",
  sendImage: "/user/sendImage",

  //Notifications
  notification: "/user/notification",
  notificationMarkAsRead: "/user/markAsReadNotify",

  // Events
  createEvent: "/user/createEvent",
  listEvents: "/user/getEvents",
  event: "/user/eventDetails",
  joinLink: "/user/joinLink",
  eventRegister: "/user/eventRegister",
  makePayment: "/user/create-checkout-session",
  getToken: "/user/generateToken",
  joinMeeting: "/user/joinMeeting",
  updateEvent: "/user/updateEvent",
  changeStatus: "/user/changeStatus",

  //groups
  createGroup: "/user/createGroup",
  getGroups: "/user/groups",
  joinGroup : "/user/joinGroup",
  getGroup : "/user/group",
  sendMessage :"/user/sendGroupMessage",
  getChatMessages :"/user/messages",
  updateStatus : "/user/status",
  leaveGroup : "/user/leave",

  logout: "/user/logout",
};

export default userRoutes;
