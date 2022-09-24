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
        endTime: 0,
        isStopTimer: false,
    },
    reducers: {
        resetTime: state => {
            state.remainingTime = {
                total: 0,
                minutes: 0,
                seconds: 0,
            }
            state.endTime = 0
            state.isStopTimer = false
        },
        setRemainingTime: (state, { payload }) => {
            state.remainingTime = payload
        },
        setEndTime: (state, { payload }) => {
            state.endTime = payload
        },
        setIsStopTimer: (state, { payload }) => {
            state.isStopTimer = payload
        },
    },
})

export default timerSlice
