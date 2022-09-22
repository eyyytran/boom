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

    return (
        <div>
            {game.state.players.map((player: IParticipant) => {
                return <PlayerButton player={player} />
            })}
        </div>
    )
}

export default GivePointModal
