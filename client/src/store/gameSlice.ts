import { createSlice } from '@reduxjs/toolkit'
import IParticipant from '../components/interfaces/IParticipant'

interface IGameSliceInitialState {
    roomId: string | null
    isOwner: boolean
    players: IParticipant[]
    playerNum: number | null
    isTurn: boolean
    isInit: boolean
    isWon: boolean
}

const initialState: IGameSliceInitialState = {
    roomId: null,
    isOwner: false,
    players: [],
    playerNum: null,
    isTurn: false,
    isInit: false,
    isWon: false,
}

const gameSlice = createSlice({
    name: 'game',
    initialState,
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
        setPlayers: (state, action) => {
            state.players = action.payload
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
