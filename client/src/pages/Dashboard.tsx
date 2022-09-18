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
import { Link } from 'react-router-dom'

type Props = {}

export default function Dashboard({}: Props) {
    const urlparams = new URLSearchParams(window.location.search)
    const roomId: any = urlparams.get('id')
    var firepadRef = collection(db, 'rooms')
    const navigate = useNavigate()

    const getUser = () => {
        const userName = prompt('What is your name?')
        return userName
    }
    const createRoom = async () => {
        try {
            const userName = getUser()
            const docRef = await addDoc(firepadRef, { primaryUser: userName })
            navigate(`/boom/?id=${docRef.id}`)
            // window.history.replaceState(null, 'Meet', '?id=' + docRef.id)
        } catch (error) {
            console.error('error adding document', error)
        }
    }

    const updateRoom = async () => {
        try {
            const roomId: any = prompt('Enter the Meeting Key')
            const userName = getUser()
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
