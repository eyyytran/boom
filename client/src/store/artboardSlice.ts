import { createSlice } from "@reduxjs/toolkit";

const artboardSlice = createSlice({
  name: "artboard",
  initialState: {
    isDrawing: false,
    currentColor: "#171717",
    eraserWidth: 8,
    lineWidth: 8,
  },
  reducers: {
    setIsDrawing: (state, action) => {
      state.isDrawing = action.payload;
    },
    setCurrentColor: (state, action) => {
      state.currentColor = action.payload;
    },
    setEraserWidth: (state, action) => {
      state.eraserWidth = action.payload;
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
