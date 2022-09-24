import { createSlice } from "@reduxjs/toolkit";

const modalSlice = createSlice({
  name: "modal",
  initialState: {
    isShowGivePointModal: false,
    isShowIsTurnModal: false,
    isShowWinnerModal: false,
  },
  reducers: {
    setIsShowGivePointModal: (state, { payload }) => {
      state.isShowGivePointModal = payload;
    },
    setIsShowIsTurnModal: (state, { payload }) => {
      state.isShowIsTurnModal = payload;
    },
    setIsShowWinnerModal: (state, { payload }) => {
      state.isShowWinnerModal = payload;
    },
  },
});

export default modalSlice;
