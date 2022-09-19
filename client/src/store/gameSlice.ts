import { createSlice } from '@reduxjs/toolkit'
import { doc, onSnapshot } from 'firebase/firestore'
import { auth, db } from '../server/firebase'

const gameSlice = createSlice({
    name: 'game',
    initialState: {
        roomId: null,
        isOwner: false,
        isTurn: false,
    },
    reducers: {
        setRoomId: (state, action) => {
            state.roomId = action.payload
        },
        setIsOwner: (state, action) => {
            state.isOwner = action.payload
        },
        setIsTurn: (state, action) => {
            if (state.roomId === null) return
            const unsub = onSnapshot(doc(db, 'rooms', state.roomId), doc => {
                const data = doc.data()
                const primaryUser = data?.primaryUser
                if (primaryUser !== auth.currentUser?.displayName) {
                    state.isTurn = false
                } else {
                    state.isTurn = true
                }
            })
        },
    },
})

export default gameSlice
