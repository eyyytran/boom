import { combineReducers, configureStore } from '@reduxjs/toolkit'
import logger from 'redux-logger'
import persistReducer from 'redux-persist/es/persistReducer'
import storage from 'redux-persist/lib/storage'
import videoSlice from './videoSlice'
import artboardSlice from './artboardSlice'
import userSlice from './userSlice'
import gameSlice from './gameSlice'
import modalSlice from './modalSlice'
import timerSlice from './timerSlice'

const rootReducer = combineReducers({
    video: videoSlice.reducer,
    artboard: artboardSlice.reducer,
    user: userSlice.reducer,
    game: gameSlice.reducer,
    modal: modalSlice.reducer,
    timer: timerSlice.reducer,
})

const persistConfig = {
    key: 'persistedReducer',
    blacklist: ['video'],
    storage,
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
    reducer: persistedReducer,
    middleware: [logger],
})

export type RootState = ReturnType<typeof store.getState>
