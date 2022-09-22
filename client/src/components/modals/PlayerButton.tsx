import { doc, updateDoc } from 'firebase/firestore'
import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { db } from '../../server/firebase'
import { RootState } from '../../store'
import gameSlice from '../../store/gameSlice'
import modalSlice from '../../store/modalSlice'
import IParticipant from '../interfaces/IParticipant'

type Props = {
    player: IParticipant
}

const PlayerButton = ({ player }: Props) => {
    const dispatch = useDispatch()

    const game = {
        state: useSelector((state: RootState) => state.game),
        action: gameSlice.actions,
    }

    const modal = {
        state: useSelector((state: RootState) => state.modal),
        action: modalSlice.actions,
    }

    const givePointToPlayer = async () => {
        const newPlayers = [...game.state.players]
        const foundIndex = newPlayers.findIndex(p => p.player === player.player)
        const newPlayer = {
            ...newPlayers[foundIndex],
            points: newPlayers[foundIndex].points + 1,
        }
        newPlayers.splice(foundIndex, 1, newPlayer)
        await updateDoc(doc(db, 'rooms', game.state.roomId as string), {
            'gameState.players': newPlayers,
        })
    }

    const handleGivePoint = async (e: React.SyntheticEvent) => {
        e.preventDefault()
        givePointToPlayer()
    }

    return (
        <button
            className='bg-purple-500'
            // disabled={game.state.isTurn === true ? true : false}
            onClick={handleGivePoint}
        >
            {player.player}
        </button>
    )
}

export default PlayerButton
