import { createSlice } from "@reduxjs/toolkit";

const videoSlice = createSlice({
  name: "video",
  initialState: {
    userMedia: null,
    userId: null,
  },
  reducers: {
    setUserMedia: (state, action) => {
      state.userMedia = action.payload;
    },
    setUserId: (state, action) => {
      state.userId = action.payload;
    },
    reset: state => {
      state = videoSlice.getInitialState();
    },
  },
});

export default videoSlice;
