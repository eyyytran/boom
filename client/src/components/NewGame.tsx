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
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '../store'
import userSlice from '../store/userSlice'
import gameSlice from '../store/gameSlice'

type Props = {}

const NewGame = (props: Props) => {
    const user = {
        state: useSelector((state: RootState) => state.user),
        action: userSlice.actions,
    }

    const game = {
        state: useSelector((state: RootState) => state.game),
        action: gameSlice.actions,
    }
    var firepadRef = collection(db, 'rooms')
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const userName = user.state.userName

    const createRoom = async () => {
        try {
            const docRef = await addDoc(firepadRef, {
                primaryUser: userName,
                gameState: {
                    players: arrayUnion({
                        player: userName,
                        points: 0,
                    }),
                },
            })
            dispatch(game.action.setRoomId(docRef.id))
            dispatch(game.action.setIsOwner(true))
            navigate(`/boom/?id=${docRef.id}`)
        } catch (error) {
            console.error('error adding document', error)
        }
    }
    return (
        <div>
            <h1>Click Here to Start a New Game</h1>
            <button onClick={createRoom}>New Game</button>
        </div>
    )
}

export default NewGame
