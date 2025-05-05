import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: { token: null, username: null, firstname: null, likedTweets: [] },
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action) => {
      state.value.token = action.payload.token;
      state.value.username = action.payload.username;
      state.value.firstname = action.payload.firstname;
      state.value.likedTweets = action.payload.likedTweets;
    },
    logout: (state) => {
      state.value.token = null;
      state.value.username = null;
      state.value.firstname = null;
      state.value.likedTweets = null;
    },
    setLiked: (state, action) => {
      if (state.value.likedTweets.some(e => e === action.payload.tweetId)) {
        state.value.likedTweets = state.value.likedTweets.filter(e => e !== action.payload.tweetId)
      } else {
        state.value.likedTweets.push(action.payload.tweetId)
      }
      
    }
  },
});

export const { login, logout, setLiked } = userSlice.actions;
export default userSlice.reducer;
