import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { deleteUser, updateEmail, updatePassword, updateProfile } from 'firebase/auth'
import { auth, storage } from '../server/firebase'
import { isEmail, isSecure } from './forms/formValidation'
import { RootState } from '../store'
import userSlice from '../store/userSlice'

// Image upload
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage'

type Props = {}

function Settings({}: Props) {
    const [newEmail, setNewEmail] = useState<string>('')
    const [newPassword, setNewPassword] = useState<string>('')
    const [newUsername, setNewUsername] = useState<string>('')
    const [emailErrorMessage, setEmailErrorMessage] = useState<string>('')
    const [confirm, setConfirm] = useState<string>('')
    const [passwordErrorMessage, setPasswordErrorMessage] = useState<string>('')
    const [confirmErrorMessage, setConfirmErrorMessage] = useState<string>('')
    const [emailError, setEmailError] = useState<boolean>(false)
    const [passwordError, setPasswordError] = useState<boolean>(false)
    const [confirmError, setConfirmError] = useState<boolean>(false)
    const [file, setFile] = useState()
    const [picture, setPicture] = useState<string>('')

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const userState = {
        state: useSelector((state: RootState) => state.user),
        action: userSlice.actions,
    }

    // Variables containing current information to display in placeholders
    const userName = userState.state.userName
    const currentEmail = auth.currentUser?.email

    // Validation Functions
    const validateEmail = () => {
        let valid = false
        if (!isEmail(newEmail)) {
            setEmailErrorMessage('Not a valid email')
            setEmailError(true)
        } else {
            setEmailErrorMessage('')
            setEmailError(false)
            valid = true
        }
        return valid
    }

    const validatePassword = () => {
        let valid = false

        if (!isSecure(newPassword)) {
            setPasswordErrorMessage(
                'Passwords must be between 8-50 characters, include 1 uppercase, 1 number, and 1 special character'
            )
            setPasswordError(true)
        } else {
            setConfirmErrorMessage('')
            setPasswordErrorMessage('')
            setPasswordError(false)
            setConfirmError(false)
            valid = true
        }
        return valid
    }

    // Functions to Change Profile Picture

    useEffect(() => {
        const uploadFile = () => {
            //@ts-ignore
            const name = new Date().getTime() + file?.name
            const storageRef = ref(storage, name)

            if (!file) return
            const uploadTask = uploadBytesResumable(storageRef, file)

            uploadTask.on(
                'state_changed',
                snapshot => {
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                    console.log('Upload is ' + progress + '% done')
                    switch (snapshot.state) {
                        case 'paused':
                            console.log('Upload is paused')
                            break
                        case 'running':
                            console.log('Upload is running')
                            break
                        default:
                            break
                    }
                },

                error => {
                    console.log(error)
                },
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then(downloadURL => {
                        setPicture(downloadURL)
                        dispatch(userState.action.setUserImage(downloadURL))
                    })
                }
            )
        }
        file && uploadFile()
    }, [file, dispatch, userState.action])

    const changeProfilePicture = () => {
        console.log(userState.state.image)
        const user = auth.currentUser
        if (user) {
            updateProfile(user, {
                photoURL: userState.state.image,
            })
                .then(() => {
                    navigate('/dashboard')
                })
                .catch(error => console.error(error))
        }
    }

    // Function to Update user email address
    const updateEmailAddress = (e: React.SyntheticEvent) => {
        e.preventDefault()
        const user = auth.currentUser
        const confirmEmailUpdate = window.confirm(
            `Are you sure you want to update your Email Address to ${newEmail}?`
        )
        if (confirmEmailUpdate && user && validateEmail()) {
            updateEmail(user, newEmail)
                .then(() => {
                    navigate('/dashboard')
                })
                .catch(error => {
                    if (error === 'FirebaseError: Firebase: Error (auth/email-already-in-use).') {
                        setEmailErrorMessage('There is already an account with that email address.')
                        setEmailError(true)
                    }
                })
        }
    }

    // Function to Update Password
    const updateUserPassword = (e: React.SyntheticEvent) => {
        e.preventDefault()
        const user = auth.currentUser
        const confirmPasswordChange = window.confirm(
            'Are you sure you want to change your password?'
        )
        if (confirmPasswordChange && user && validatePassword()) {
            updatePassword(user, newPassword).then(() => {
                navigate('/dashboard')
            })
        }
    }

    // Function to update username

    const updateUsername = (e: React.SyntheticEvent) => {
        e.preventDefault()
        const user = auth.currentUser
        if (newUsername !== '') {
            const confirmChange = window.confirm(
                `Are you sure you want to change your Username to ${newUsername}?`
            )

            if (confirmChange && user && newUsername !== '') {
                updateProfile(user, {
                    displayName: newUsername,
                }).then(() => {
                    dispatch(userState.action.setUserName(newUsername))
                    navigate('/dashboard')
                })
            }
        }
    }

    // Function to Delete User account
    const deleteAccount = () => {
        const user = auth.currentUser
        const confirmDelete = window.confirm(
            'Are you sure you want to permanently delete your Boom Account?'
        )
        if (confirmDelete && user) {
            deleteUser(user).then(() => {
                navigate('/login')
            })
        }
    }

    useEffect(() => {
        if (!auth.currentUser?.photoURL) return
        dispatch(userState.action.setUserImage(auth.currentUser?.photoURL))
    }, [auth.currentUser?.photoURL])

    return (
        <div className='flex flex-col items-center'>
            <div className='flex flex-col items-center m-16'>
                <h1 className='text-2xl text-center font-bold text-gray-900'>Settings</h1>
                <div className='flex flex-col items-center mt-5'>
                    <div className='m-5 w-full'>
                        <img
                            src={userState.state.image || require('../images/defaultImg.jpeg')}
                            alt='default'
                            className='w-16 h-16 md:w-36 md:h-36 object-cover rounded-full mx-auto'
                        />
                        <input
                            type='file'
                            name='profile-picture'
                            className=' text-xs w-full bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 mt-5'
                            onChange={(e: any) => {
                                if (!e.target.files) return
                                setFile(e.target.files[0])
                            }}
                        />
                        <button
                            onClick={changeProfilePicture}
                            className='w-full text-white bg-violet-500 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mt-5 hover:scale-105'
                        >
                            Change
                        </button>
                    </div>
                    <form
                        className='flex flex-col items-center m-5 w-full'
                        onSubmit={updateEmailAddress}
                    >
                        <span className='text-center'>Change Email</span>
                        <input
                            className='w-full bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 mt-5'
                            //@ts-ignore
                            placeholder={currentEmail}
                            name='new-email'
                            id='new-email'
                            required={true}
                            type='email'
                            value={newEmail}
                            onChange={e => setNewEmail(e.target.value)}
                        />{' '}
                        <small className='text-red-500'>{emailErrorMessage}</small>
                        <input
                            type='submit'
                            value='Change'
                            className='w-full text-white bg-violet-500 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mt-5 hover:scale-105'
                        />
                    </form>

                    <form
                        className='flex flex-col items-center m-5 w-full'
                        onSubmit={updateUserPassword}
                    >
                        <span className='text-center'>Change Password</span>
                        <input
                            className='w-full bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 mt-5'
                            placeholder='••••••••'
                            name='new-password'
                            id='new-password'
                            type='password'
                            required={true}
                            value={newPassword}
                            onChange={e => setNewPassword(e.target.value)}
                        />
                        <small className='text-red-500'>{passwordErrorMessage}</small>
                        <input
                            type='submit'
                            value='Change'
                            className='w-full text-white bg-violet-500 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mt-5 hover:scale-105'
                        />
                    </form>
                    <form
                        className='flex flex-col items-center m-5 w-full'
                        onClick={updateUsername}
                    >
                        <span className='text-center'>Change Username</span>
                        <input
                            className='w-full bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 mt-5'
                            placeholder={userName}
                            name='new-username'
                            id='new-username'
                            type='text'
                            required={true}
                            value={newUsername}
                            onChange={e => setNewUsername(e.target.value)}
                        />
                        <input
                            type='submit'
                            value='Change'
                            className='w-full text-white bg-violet-500 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mt-5 hover:scale-105'
                        />
                    </form>
                    <button
                        className='w-full text-white bg-red-500 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mt-5 hover:scale-105'
                        onClick={deleteAccount}
                    >
                        Delete Account
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Settings
