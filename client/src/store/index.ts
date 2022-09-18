import { combineReducers, configureStore } from '@reduxjs/toolkit'
import logger from 'redux-logger'
import persistReducer from 'redux-persist/es/persistReducer'
import storage from 'redux-persist/lib/storage'
import videoSlice from './videoSlice'
import artboardSlice from './artboardSlice'
import appSlice from './appSlice'

const rootReducer = combineReducers({
    video: videoSlice.reducer,
    artboard: artboardSlice.reducer,
    app: appSlice.reducer,
})

const persistConfig = {
    key: 'persistedReducer',
    storage,
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
    reducer: persistedReducer,
    middleware: [logger],
})

export const { dispatch } = store

export type RootState = ReturnType<typeof store.getState>
