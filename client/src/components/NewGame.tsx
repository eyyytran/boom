import React from 'react'
import { collection, addDoc, arrayUnion } from 'firebase/firestore'
import { db } from '../server/firebase'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '../store'
import userSlice from '../store/userSlice'
import gameSlice from '../store/gameSlice'
import Component from './Component'

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
    const User = user.state.user

    const createRoom = async () => {
        try {
            const docRef = await addDoc(firepadRef, {
                primaryUser: userName,
                gameState: {
                    players: arrayUnion({
                        player: userName,
                        points: 0,
                        uid: User?.uid,
                    }),
                    gameStarted: false,
                    gameWon: false,
                    winner: '',
                },
            })
            dispatch(game.action.setRoomId(docRef.id))
            dispatch(game.action.setIsOwner(true))
            dispatch(game.action.setPlayerNum(0))
            setTimeout(() => {
                navigate(`/boom/?id=${docRef.id}`)
            }, 100)
        } catch (error) {
            console.error('error adding document', error)
        }
    }

    return (
        <Component id='NewGame'>
            <div className='flex flex-col items-center h-full w-full'>
                <div className='flex flex-col items-center m-16'>
                    <h1 className='text-xl text-center font-bold text-gray-900'>
                        Start a New Game
                    </h1>
                    <button
                        className='text-white bg-violet-500 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mt-5 hover:scale-105'
                        onClick={createRoom}
                    >
                        New Game
                    </button>
                </div>
            </div>
        </Component>
    )
}

export default NewGame
