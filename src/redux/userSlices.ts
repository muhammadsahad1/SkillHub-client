import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  id: "",
  name: "",
  email: "",
  role: "",
  bio: "",
  city: "",
  country: "",
  states: "",
  skill: "",
  profile: false,
  picture: "",
  profileImage: "",
  imageKey: "",
  blocked: false,
  approved: false,
  // Additional fields if any can be added here
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
        profileImage,
        imageKey,
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
      state.profileImage = profileImage;
      state.imageKey = imageKey;
      state.blocked = blocked;
      state.approved = approved;
    },
    setEmail: (state, action) => {
      state.email = action.payload;
    },
    setProfileImage: (state, action) => {
      state.picture = action.payload;
    },
    setRole: (state, action) => {
      state.role = action.payload;
    },
    deleteUser: (state) => {
      state.id = "";
      state.name = "";
      state.email = "";
      state.role = "";
      state.bio = "";
      state.city = "";
      state.country = "";
      state.states = "";
      state.skill = "";
      state.profile = false;
      state.picture = "";
      state.profileImage = "";
      state.imageKey = "";
      state.blocked = false;
      state.approved = false;
    },
  },
});

export const { setUser, setEmail, setRole, setProfileImage, deleteUser } =
  userSlice.actions;
export default userSlice.reducer;
