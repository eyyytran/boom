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
import appSlice from '../store/appSlice'
import { Link } from 'react-router-dom'

type Props = {}

export default function Dashboard({}: Props) {
    const app = {
        state: useSelector((state: RootState) => state.app),
        action: appSlice.actions,
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
                onClick={async () => {
                    await createRoom()
                }}
            >
                Start a Game
            </button>
            <button
                onClick={async () => {
                    updateRoom()
                }}
            >
                Join a Game
            </button>
        </div>
    )
}
