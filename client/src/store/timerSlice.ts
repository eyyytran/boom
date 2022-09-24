import { createSlice } from '@reduxjs/toolkit'

const timerSlice = createSlice({
    name: 'timer',
    initialState: {
        turnTime: 1,
        remainingTime: {
            total: 0,
            minutes: 0,
            seconds: 0,
        },
    },
    reducers: {
        resetTime: state => {
            state.turnTime = 1
        },
        setRemainingTime: (state, { payload }) => {
            state.remainingTime = payload
        },
    },
})

export default timerSlice
