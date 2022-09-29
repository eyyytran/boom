import { Route, Routes } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from './server/firebase'
import { RootState } from './store'
import userSlice from './store/userSlice'
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
import PhotoUpload from './components/settings-tab/PhotoUpload'
import './index.css'

function App() {
    const userState = {
        state: useSelector((state: RootState) => state.user),
        actions: userSlice.actions,
    }
    const dispatch = useDispatch()

    onAuthStateChanged(auth, user => {
        if (!user) {
            dispatch(userState.actions.setUser(null))
        } else {
            dispatch(userState.actions.setUser(user))
        }
    })

    return (
        <Component id='App'>
            <Routes>
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
