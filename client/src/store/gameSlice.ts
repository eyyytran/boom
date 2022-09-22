import { createSlice } from '@reduxjs/toolkit'

const gameSlice = createSlice({
    name: 'game',
    initialState: {
        roomId: null,
        isOwner: false,
        playerNum: null,
        isTurn: false,
        isInit: false,
        isWon: false,
    },
    reducers: {
        setRoomId: (state, action) => {
            state.roomId = action.payload
        },
        setIsOwner: (state, action) => {
            state.isOwner = action.payload
        },
        setPlayerNum: (state, action) => {
            state.playerNum = action.payload
        },
        setIsTurn: (state, action) => {
            state.isTurn = action.payload
        },
        setIsInit: (state, action) => {
            state.isInit = action.payload
        },
        setIsWon: (state, action) => {
            state.isWon = action.payload
        },
    },
})

export default gameSlice
