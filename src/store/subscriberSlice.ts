import { createSlice } from "@reduxjs/toolkit";

const subscriberSlice = createSlice({
  name: "user",
  initialState: {
    users: new Array(),
    user: {
      username: "",
      userMedia: {},
    },
  },
  reducers: {
    setUsers: (state, action) => {
      state.users = action.payload;
    },
    addUser: (state, action: { type: string; payload: { username: string; userMedia: any } }) => {
      state.users = [...state.users, action.payload];
    },
    setUserMedia: (state, action) => {
      state.user.userMedia = action.payload;
    },
    reset: state => {
      state = subscriberSlice.getInitialState();
    },
  },
});

export default subscriberSlice;
