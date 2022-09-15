import React, { useEffect } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from './server/firebase'
import appSlice from './store/appSlice'
import { RootState } from './store'
import Component from './components/Component'
import Boom from './pages/Boom'
import NotFound from './pages/NotFound'
import Signup from './pages/Signup'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'

import { v4 as uuidv4 } from 'uuid'

function App() {
    const app = {
        state: useSelector((state: RootState) => state.app),
        actions: appSlice.actions,
    }

    const useAuth = () => {
        const dispatch = useDispatch()
        useEffect(() => {
            const unsubscribe = onAuthStateChanged(auth, user => {
                if (!user) {
                    dispatch(app.actions.setUser(null))
                } else {
                    dispatch(app.actions.setUser(user))
                }
            })
            return unsubscribe
        }, [])
    }

    useAuth()

    return (
        <Component id='App'>
            <Routes>
                {/* <Route path="/" element={<Navigate replace to={`/${URL}`} />} /> */}
                {/* <Route path={URL} element={<Boom />} /> */}
                <Route path='/' element={<Dashboard />} />
                <Route path='/boom' element={<Boom />} />
                <Route path='*' element={<NotFound />} />
                <Route path='signup' element={<Signup />} />
                <Route path='login' element={<Login />} />
            </Routes>
            <div className=''></div>
        </Component>
    )
}

export default App
