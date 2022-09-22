import { createSlice } from '@reduxjs/toolkit'

const modalSlice = createSlice({
    name: 'modal',
    initialState: {
        isShowGivePointModal: false,
    },
    reducers: {
        setIsShowGivePointModal: (state, action) => {
            state.isShowGivePointModal = action.payload
        },
    },
})

export default modalSlice
