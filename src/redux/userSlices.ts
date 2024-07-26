import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  id: "",
  name: "",
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
  imageKey : "",
  coverImage: "",
  coverImageKey: "",
  blocked: false,
  approved: false,
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
        approved,
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
      state.approved = approved;
    },
    setEmail: (state, action) => {
      state.email = action.payload;
    },
    setProfileImage: (state, action) => {
      const { coverImageUrl, imageUrl } = action.payload;
      state.picture = {
        ...state.picture,
        coverImageUrl,
        imageUrl,
      };
    },
    setCoverImage: (state, action) => {
      const { coverImage, coverImageKey } = action.payload;
      state.coverImage = coverImage;
      state.coverImageKey = coverImageKey;
    },
    setRole: (state, action) => {
      state.role = action.payload;
    },
    deleteUser: (state) => {
      Object.assign(state, initialState);
    },
  },
});

export const {
  setUser,
  setEmail,
  setRole,
  setProfileImage,
  setCoverImage,
  deleteUser,
} = userSlice.actions;
export default userSlice.reducer;
