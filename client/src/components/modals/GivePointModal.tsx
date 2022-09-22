import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { doc, getDoc } from 'firebase/firestore'
import { db } from '../../server/firebase'
import { RootState } from '../../store/index'
import gameSlice from '../../store/gameSlice'
import PlayerButton from './PlayerButton'
import IParticipant from '../interfaces/IParticipant'

const GivePointModal = () => {
    const game = {
        state: useSelector((state: RootState) => state.game),
        action: gameSlice.actions,
    }

    const [participants, setParticipants] = useState<Array<IParticipant>>([])

    const getParticipants = async () => {
        const docSnap = await getDoc(
            doc(db, 'rooms', game.state.roomId as unknown as string)
        )
        if (docSnap.exists()) {
            const data = docSnap.data()
            const participants = data.gameState.players
            setParticipants(participants)
        }
    }

    getParticipants()

    return (
        <div>
            {participants.map((participant: Object) => {
                return <PlayerButton participant={participant} />
            })}
        </div>
    )
}

export default GivePointModal
