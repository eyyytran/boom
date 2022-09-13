import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'

import Component from './components/Component'
import Boom from './pages/Boom'
import NotFound from './pages/NotFound'
import Signup from './pages/Signup'

import { v4 as uuidv4 } from 'uuid'

function App() {
    return (
        <Component id='App'>
            <Routes>
                {/* <Route path="/" element={<Navigate replace to={`/${URL}`} />} /> */}
                {/* <Route path={URL} element={<Boom />} /> */}
                <Route path='/' element={<Boom />} />
                <Route path='*' element={<NotFound />} />
                <Route path='signup' element={<Signup />} />
            </Routes>
            <div className=''></div>
        </Component>
    )
}

export default App
