import { CaseReducer, CaseReducerActions, createSlice } from '@reduxjs/toolkit'
import { User } from 'firebase/auth'
import { auth } from '../server/firebase'

interface ICurrentUser {
    user: User | null
    userName: string | null | undefined
}

type State = ICurrentUser

const appSlice = createSlice({
    name: 'app',
    initialState: {
        user: null,
        userName: '',
    },
    reducers: {
        setUser: (state: State, action) => {
            state.user = action.payload
            state.userName = auth.currentUser?.displayName
        },
    },
})

export default appSlice
