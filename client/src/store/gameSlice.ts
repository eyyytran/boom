import { createSlice } from '@reduxjs/toolkit'
import IParticipant from '../components/interfaces/IParticipant'

interface IGameSliceInitialState {
    roomId: string
    isOwner: boolean
    players: IParticipant[]
    playerNum: number | null
    isTurn: boolean
    isInit: boolean
    isWon: boolean
    winner: string
    whosTurn: number | null
    isTurnStarted: boolean
    currentPrompt: string
    playerPoints: number
}

const initialState: IGameSliceInitialState = {
    roomId: '',
    isOwner: false,
    players: [],
    playerNum: null,
    isTurn: false,
    isInit: false,
    isWon: false,
    winner: '',
    whosTurn: null,
    isTurnStarted: false,
    currentPrompt: '',
    playerPoints: 0,
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
        setWinner: (state, action) => {
            state.winner = action.payload
        },
        setWhosTurn: (state, { payload }) => {
            state.whosTurn = payload
        },
        setIsTurnStarted: (state, { payload }) => {
            state.isTurnStarted = payload
        },
        setCurrentPrompt: (state, { payload }) => {
            state.currentPrompt = payload
        },
        setPlayerPoints: (state, { payload }) => {
            state.playerPoints = payload
        },
        resetState: state => {
            state.roomId = ''
            state.isOwner = false
            state.players = []
            state.playerNum = null
            state.isTurn = false
            state.isInit = false
            state.isWon = false
            state.winner = ''
            state.whosTurn = null
            state.isTurnStarted = false
            state.currentPrompt = ''
            state.playerPoints = 0
        },
    },
})

export default gameSlice
