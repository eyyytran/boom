import { createSlice } from "@reduxjs/toolkit";

const videoSlice = createSlice({
  name: "video",
  initialState: {
    users: new Array(),
    start: false,
  },
  reducers: {
    setUsers: (state, action) => {
      state.users = [...state.users, action.payload];
    },
    setStart: (state, action) => {
      state.start = action.payload;
    },
    reset: state => {
      state = videoSlice.getInitialState();
    },
  },
});

export default videoSlice;
