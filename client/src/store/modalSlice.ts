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
    resetModals: (state) => {
      state.isShowGivePointModal = false;
      state.isShowIsTurnModal = false;
      state.isShowWinnerModal = false;
    },
  },
});

export default modalSlice;
