import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import {
    browserSessionPersistence,
    setPersistence,
    signInWithEmailAndPassword,
} from 'firebase/auth'
import { auth } from '../../server/firebase'
import Component from '../Component'

const LoginForm = () => {
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [errorMessage, setErrorMessage] = useState<string>('')

    const navigate = useNavigate()

    const login = async (e: React.SyntheticEvent) => {
        e.preventDefault()
        setPersistence(auth, browserSessionPersistence).then(async () => {
            return signInWithEmailAndPassword(auth, email, password)
                .then(() => {
                    setErrorMessage('')
                    navigate('/dashboard')
                })
                .catch(error => {
                    if (error === 'FirebaseError: Firebase: Error (auth/wrong-password).') {
                        setErrorMessage('That Username/Password is incorrect.')
                    } else if (error === 'FirebaseError: Firebase: Error (auth/user-not-found).') {
                        setErrorMessage('That Username/Password is incorrect.')
                    }
                })
        })
    }

    return (
        <Component id='Column'>
            <div className='flex flex-col items-center justify-flex-start px-6 py-8 mx-auto md:h-screen lg:py-0'>
                <div
                    className='w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0'
                    style={{
                        height: 'auto',
                        width: '100%',
                        marginTop: '100px',
                    }}
                >
                    <div className='p-6 space-y-4 md:space-y-6 sm:p-8'>
                        <h1 className='text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl '>
                            Welcome Back
                        </h1>
                        <form className='space-y-4 md:space-y-6' onSubmit={login}>
                            <div>
                                <label className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>
                                    Your email
                                </label>
                                <input
                                    type='email'
                                    name='email'
                                    id='email'
                                    className='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5'
                                    placeholder='name@company.com'
                                    required={true}
                                    value={email}
                                    onChange={e => setEmail(e.target.value)}
                                />
                            </div>
                            <div>
                                <label className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>
                                    Password
                                </label>
                                <input
                                    type='password'
                                    name='password'
                                    id='password'
                                    placeholder='••••••••'
                                    className='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5'
                                    required={true}
                                    value={password}
                                    onChange={e => setPassword(e.target.value)}
                                />
                            </div>
                            <small className='text-red-500'>{errorMessage}</small>
                            <button
                                type='submit'
                                className='w-full text-white bg-violet-500 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center'
                            >
                                Login
                            </button>
                            <p className='text-sm font-light text-gray-500 dark:text-gray-400'>
                                Don't have an account?{' '}
                                <Link
                                    to='/signup'
                                    className='font-medium text-primary-600 hover:underline dark:text-primary-500'
                                >
                                    Sign up and get started!
                                </Link>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </Component>
    )
}

export default LoginForm
