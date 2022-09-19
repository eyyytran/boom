import React, { useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from './server/firebase'
import userSlice from './store/userSlice'
import { RootState } from './store'
import Component from './components/Component'
import Boom from './pages/Boom'
import NotFound from './pages/NotFound'
import Signup from './pages/Signup'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import PrivateRoutes from './components/PrivateRoutes'

function App() {
    const userState = {
        state: useSelector((state: RootState) => state.user),
        actions: userSlice.actions,
    }

    const useAuth = () => {
        const dispatch = useDispatch()
        useEffect(() => {
            const unsubscribe = onAuthStateChanged(auth, user => {
                if (!user) {
                    dispatch(userState.actions.setUser(null))
                } else {
                    dispatch(userState.actions.setUser(user))
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
                <Route element={<PrivateRoutes />}>
                    <Route path='/boom' element={<Boom />} />
                    <Route path='/' element={<Dashboard />} />
                </Route>
                <Route path='*' element={<NotFound />} />
                <Route path='signup' element={<Signup />} />
                <Route path='login' element={<Login />} />
            </Routes>
            <div className=''></div>
        </Component>
    )
}

export default App
