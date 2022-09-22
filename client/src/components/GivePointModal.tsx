import React from 'react'
import { useSelector } from 'react-redux'
import { doc, getDoc } from 'firebase/firestore'
import { db } from '../server/firebase'
import { RootState } from '../store/index'
import gameSlice from '../store/gameSlice'

const GivePointModal = () => {
    const game = {
        state: useSelector((state: RootState) => state.game),
        action: gameSlice.actions,
    }

    // const getParticipants = async () => {
    //     const docsnap = await getDoc(doc(db, 'rooms', game.state.roomId as unknown to string))
    // }
    return <div>GivePointModal</div>
}

export default GivePointModal
