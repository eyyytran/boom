import React from 'react'
import {
    collection,
    doc,
    addDoc,
    updateDoc,
    arrayUnion,
} from 'firebase/firestore'
import { db } from '../server/firebase'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { RootState } from '../store'
import userSlice from '../store/userSlice'
import { Link } from 'react-router-dom'

type Props = {}

export default function Dashboard({}: Props) {
    const app = {
        state: useSelector((state: RootState) => state.user),
        action: userSlice.actions,
    }
    var firepadRef = collection(db, 'rooms')
    const navigate = useNavigate()

    const userName = app.state.userName

    const createRoom = async () => {
        try {
            const docRef = await addDoc(firepadRef, { primaryUser: userName })
            navigate(`/boom/?id=${docRef.id}`)
        } catch (error) {
            console.error('error adding document', error)
        }
    }

    const updateRoom = async () => {
        try {
            const roomId: any = prompt('Enter the Meeting Key')
            const docRef = doc(db, 'rooms', roomId)
            await updateDoc(docRef, {
                participants: arrayUnion(userName),
            })
            navigate(`/boom/?id=${roomId}`)
        } catch (error) {
            console.error('error adding a participant', error)
        }
    }
    return (
        <div>
            <button
                className='w-full text-white bg-indigo-500 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center'
                onClick={async () => {
                    await createRoom()
                }}
            >
                Start a Game
            </button>
            <button
                className='w-full text-white bg-indigo-500 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center'
                onClick={async () => {
                    updateRoom()
                }}
            >
                Join a Game
            </button>
        </div>
    )
}
