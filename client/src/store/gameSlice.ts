import { createSlice } from '@reduxjs/toolkit'
import { doc, getDoc } from 'firebase/firestore'
import { db } from '../server/firebase'

const gameSlice = createSlice({
    name: 'game',
    initialState: {
        roomId: null,
        isOwner: false,
        playerNum: null,
        participants: null,
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
        setParticipants: (state, action) => {
            const getParticipants = async () => {
                const docSnap = await getDoc(
                    doc(db, 'rooms', state.roomId as unknown as string)
                )
                if (docSnap.exists()) {
                    const data = docSnap.data()
                    const participants = data.gameState.players
                    state.participants = participants
                }
            }
            getParticipants()
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
