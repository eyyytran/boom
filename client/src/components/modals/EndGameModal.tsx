import { deleteDoc, doc, updateDoc } from 'firebase/firestore'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { db } from '../../server/firebase'
import { RootState } from '../../store'
import gameSlice from '../../store/gameSlice'
import modalSlice from '../../store/modalSlice'

const EndGameModal = () => {
    const game = {
        state: useSelector((state: RootState) => state.game),
        action: gameSlice.actions,
    }

    const modal = {
        state: useSelector((state: RootState) => state.modal),
        action: modalSlice.actions,
    }

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const resetDb = async () => {
        await updateDoc(doc(db, 'rooms', game.state.roomId), {
            'gameState.players': game.state.players.map(player => ({ ...player, points: 0 })),
            'gameState.winner': '',
        })
    }

    const handleStartNewGame = (e: React.SyntheticEvent) => {
        e.preventDefault()
        resetDb()
        dispatch(modal.action.setIsShowWinnerModal(false))
    }

    const handleEndGame = async (e: React.SyntheticEvent) => {
        e.preventDefault()
        await deleteDoc(doc(db, 'rooms', game.state.roomId))
    }

    return (
        <div>
            <h1>{game.state.winner} won!</h1>
            {game.state.isOwner && (
                    <button onClick={handleStartNewGame}>Start A New Game</button>
                ) && <button onClick={handleEndGame}>Back to Dashboard</button>}
        </div>
    )
}

export default EndGameModal
