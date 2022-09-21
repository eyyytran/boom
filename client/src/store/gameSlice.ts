import { createSlice } from '@reduxjs/toolkit'
import { doc, onSnapshot } from 'firebase/firestore'
import { auth, db } from '../server/firebase'

const gameSlice = createSlice({
    name: 'game',
    initialState: {
        roomId: null,
        isOwner: false,
        playerNum: null,
        isTurn: false,
        isInit: false,
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
    },
})

export default gameSlice
