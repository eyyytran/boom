import { createSlice } from "@reduxjs/toolkit";

const videoSlice = createSlice({
  name: "video",
  initialState: {
    users: new Array(),
    start: false,
    microphone: false,
    camera: false,
  },
  reducers: {
    setUsers: (state, action) => {
      state.users = [...state.users, action.payload];
    },
    setStart: (state, action) => {
      state.start = action.payload;
    },
    toggleMicrophone: state => {
      state.microphone = !state.microphone;
    },
    toggleCamera: state => {
      state.camera = !state.camera;
    },
    reset: state => {
      state = videoSlice.getInitialState();
    },
  },
});

export default videoSlice;
