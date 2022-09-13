import { createSlice } from "@reduxjs/toolkit";

const subscriberSlice = createSlice({
  name: "video",
  initialState: {
    users: new Array(),
  },
  reducers: {
    setUsers: (state, action) => {
      state.users = action.payload;
    },
    addUser: (state, action) => {
      state.users = [...state.users, action.payload];
    },
    reset: state => {
      state = subscriberSlice.getInitialState();
    },
  },
});

export default subscriberSlice;
