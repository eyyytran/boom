import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { RootState } from '../store'
import appSlice from '../store/appSlice'

const PrivateRoutes = () => {
    const app = {
        state: useSelector((state: RootState) => state.app),
        actions: appSlice.actions,
    }
    const user = app.state.user
    return user ? <Outlet /> : <Navigate to='/login' />
}

export default PrivateRoutes
