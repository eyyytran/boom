import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { User } from 'firebase/auth'

interface ICurrentUser {
    user: User | null
    userName: string | null | undefined
}

type State = ICurrentUser

const userSlice = createSlice({
    name: 'user',
    initialState: {
        user: null,
        userName: '',
    },
    reducers: {
        setUser: (state: State, action: PayloadAction<any>) => {
            state.user = action.payload
            state.userName = action.payload.displayName
        },
    },
})

export default userSlice
