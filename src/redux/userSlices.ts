import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  id: "",
  name: "",
  profileKey: "",
  profileImage: "",
  email: "",
  role: "",
  bio: "",
  city: "",
  country: "",
  states: "",
  skill: "",
  profile: false,
  picture: {
    imageUrl: "",
    coverImageUrl: "",
  },
  imageKey: "",
  coverImage: "",
  coverImageKey: "",
  showNotification: "",
  accountPrivacy: false,
  blocked: false,
  approved: false,
  followingsCount: 0,
  followersCount: 0,
  isRequested: false,
  verificationStatus: "",
  isProfessional: false,
  professionalBadge: false,
  website : ""
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {

    
setUser: (state, action) => {
  const {
    _id,
    name,
    email,
    role,
    bio,
    blocked,
    country,
    states,        // Assuming "states" is the same as in the payload
    skill,
    profile,
    isProfessional,
    professionalBadge,
    verificationStatus,
    isRequested,
    accountPrivacy,
    followers = [],  // Fallback to empty array if not present
    following = [],  // Fallback to empty array if not present
    website = "",    // Defaulting to empty string if not present
  } = action.payload;

  // Update the state with the received user data
  state.id = _id;
  state.name = name;
  state.email = email;
  state.role = role;
  state.bio = bio;
  state.blocked = blocked;
  state.country = country;
  state.states = states;
  state.skill = skill;
  state.profile = profile;
  state.isProfessional = isProfessional;
  state.professionalBadge = professionalBadge;
  state.verificationStatus = verificationStatus;
  state.isRequested = isRequested;
  state.accountPrivacy = accountPrivacy;
  state.followersCount = followers.length;  // Count of followers
  state.followingsCount = following.length; // Count of followings
  state.website = website;
},
    setIsRequest: (state, action) => {
      state.isRequested = action.payload;
    },
    setVerificationStatus: (state, action) => {
      state.verificationStatus = action.payload;
    },
    setIsProfessional: (state, action) => {
      state.isProfessional = action.payload;
    },
    setProfessionalBedge: (state, action) => {
      state.professionalBadge = action.payload;
    },
    setEmail: (state, action) => {
      state.email = action.payload;
    },
    setUserImages: (state, action) => {
      if (action.payload) {
        state.picture = {
          ...state.picture,
          imageUrl: action.payload || state.picture?.imageUrl,
        };
      }
    },
    setCoverImage: (state, action) => {
      const { coverImage, coverImageKey } = action.payload;
      state.coverImage = coverImage;
      state.coverImageKey = coverImageKey;
    },
    setFollowingsFollowersCount: (state, action) => {
      const { followersCount, followingsCount } = action.payload;
      state.followersCount = followersCount;
      state.followingsCount = followingsCount;
    },
    setShowNotificationChange: (state, action) => {
      state.showNotification = action.payload;
    },
    setAccountPrivacy: (state, action) => {
      state.accountPrivacy = action.payload;
    },
    setRole: (state, action) => {
      state.role = action.payload;
    },
    deleteUser: (state) => {
      state.id = "";
      state.name = "";
      state.profileImage = "";
      state.email = "";
      state.role = "";
      state.bio = "";
      state.city = "";
      state.country = "";
      state.states = "";
      state.skill = "";
      state.profile = false;
      state.picture = {
        imageUrl: "",
        coverImageUrl: "",
      };
      state.imageKey = "";
      state.coverImage = "";
      state.coverImageKey = "";
      state.accountPrivacy = false;
      state.blocked = false;
      state.approved = false;
      state.isProfessional = false;
      state.verificationStatus = "";
      state.isRequested = false;
      state.professionalBadge = false;
    },
  },
});

export const {
  setUser,
  setEmail,
  setRole,
  setUserImages,
  setCoverImage,
  setAccountPrivacy,
  deleteUser,
  setShowNotificationChange,
  setFollowingsFollowersCount,
  setIsRequest,
  setVerificationStatus,
  setIsProfessional,
  setProfessionalBedge,
} = userSlice.actions;

export default userSlice.reducer;
