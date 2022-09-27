import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { User } from 'firebase/auth'

interface ICurrentUser {
    user: User | null
    userName: string
    image: string
}

type State = ICurrentUser

const initialState: ICurrentUser = {
    user: null,
    userName: '',
    image: '',
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state: State, action: PayloadAction<any>) => {
            state.user = action.payload
            if (!state.user) return
            state.userName = action.payload.displayName
        },
        setUserName: (state: State, action) => {
            state.userName = action.payload
        },
        setUserImage: (state: State, action) => {
            state.image = action.payload
        },
    },
})

export default userSlice
