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
        city,
        country,
        states,
        skill,
        profile,
        picture,
        coverImage,
        coverImageKey,
        imageKey,
        profileImage,
        approved,
        showNotification,
        accountPrivacy,
        isRequested,
        verificationStatus,
        isProfessional,
        professionalBadge,
      } = action.payload;
      state.id = _id;
      state.name = name;
      state.email = email;
      state.role = role;
      state.bio = bio;
      state.city = city;
      state.country = country;
      state.states = states;
      state.skill = skill;
      state.profile = profile;
      state.picture = picture;
      state.coverImage = coverImage;
      state.coverImageKey = coverImageKey;
      state.blocked = blocked;
      state.imageKey = imageKey;
      state.profileImage = profileImage;
      state.approved = approved;
      state.showNotification = showNotification;
      state.accountPrivacy = accountPrivacy;
      state.followersCount = action.payload.followersCount;
      state.followingsCount = action.payload.followingsCount;
      state.isRequested = isRequested;
      state.verificationStatus = verificationStatus;
      state.isProfessional = isProfessional;
      state.professionalBadge = professionalBadge;
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
