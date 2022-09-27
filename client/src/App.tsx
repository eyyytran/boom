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
import Home from './pages/Home'
import Settings from './components/Settings'
import Join from './components/Join'
import NewGame from './components/NewGame'
import PhotoUpload from './components/PhotoUpload'
import './index.css'

function App() {
    const userState = {
        state: useSelector((state: RootState) => state.user),
        actions: userSlice.actions,
    }
    const dispatch = useDispatch()
    // const useAuth = () => {
    //   const dispatch = useDispatch();
    //   useEffect(() => {
    //     const unsubscribe = onAuthStateChanged(auth, user => {
    //       if (!user) {
    //         dispatch(userState.actions.setUser(null));
    //       } else {
    //         dispatch(userState.actions.setUser(user));
    //       }
    //     });
    //     return unsubscribe;
    //   }, []);
    // };
    // useAuth();
    onAuthStateChanged(auth, user => {
        if (!user) {
            dispatch(userState.actions.setUser(null))
        } else {
            dispatch(userState.actions.setUser(user))
            dispatch(userState.actions.setUserImage(user.photoURL))
        }
    })

    return (
        <Component id='App'>
            <Routes>
                {/* <Route path="/" element={<Navigate replace to={`/${URL}`} />} /> */}
                {/* <Route path={URL} element={<Boom />} /> */}
                <Route element={<PrivateRoutes />}>
                    <Route path='boom' element={<Boom />} />
                    <Route path='dashboard' element={<Dashboard />}>
                        <Route path='picture' element={<PhotoUpload />} />
                        <Route path='settings' element={<Settings />} />
                        <Route path='join' element={<Join />} />
                        <Route path='new' element={<NewGame />} />
                    </Route>
                </Route>
                <Route path='/' element={<Home />} />
                <Route path='*' element={<NotFound />} />
                <Route path='signup' element={<Signup />} />
                <Route path='login' element={<Login />} />
            </Routes>
        </Component>
    )
}

export default App
