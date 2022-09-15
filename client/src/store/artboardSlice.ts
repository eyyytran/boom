import { createSlice } from "@reduxjs/toolkit";

const artboardSlice = createSlice({
  name: "artboard",
  initialState: {
    isDrawing: false,
    currentColor: "#171717",
    lineWidth: 8,
  },
  reducers: {
    setIsDrawing: (state, action) => {
      state.isDrawing = action.payload;
    },
    setCurrentColor: (state, action) => {
      state.currentColor = action.payload;
    },
    setLineWidth: (state, action) => {
      state.lineWidth = action.payload;
    },
    reset: state => {
      state = artboardSlice.getInitialState();
    },
  },
});

export default artboardSlice;
