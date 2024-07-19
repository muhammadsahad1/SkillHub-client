import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  id: '',
  name: '',
  email: '',
  role: '',
  bio: '',
  city: '',
  country: '',
  skill: '',
  profile: false,
  picture: '',
  profileImage: '',
  blocked: false,
  approved: false,
  // Additional fields if any can be added here
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      const { 
        id, 
        name, 
        email, 
        role, 
        bio, 
        blocked, 
        city, 
        country, 
        skill, 
        profile, 
        picture, 
        profileImage, 
        approved 
      } = action.payload;
      state.id = id;
      state.name = name;
      state.email = email;
      state.role = role;
      state.bio = bio;
      state.city = city;
      state.country = country;
      state.skill = skill;
      state.profile = profile;
      state.picture = picture;
      state.profileImage = profileImage;
      state.blocked = blocked;
      state.approved = approved;
    },
    setEmail: (state, action) => {
      state.email = action.payload;
    },
    setRole: (state, action) => {
      state.role = action.payload;
    },
    deleteUser: (state) => {
      state.id = '';
      state.name = '';
      state.email = '';
      state.role = '';
      state.bio = '';
      state.city = '';
      state.country = '';
      state.skill = '';
      state.profile = false;
      state.picture = '';
      state.profileImage = '';
      state.blocked = false;
      state.approved = false;
    },
  },
});

export const { setUser, setEmail, setRole, deleteUser } = userSlice.actions;
export default userSlice.reducer;
