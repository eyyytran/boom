import { updateDoc, doc, deleteDoc } from 'firebase/firestore'
import IParticipant from '../components/interfaces/IParticipant'
import { db } from '../server/firebase'

export const cleanupUser = async (
    roomId: string,
    currentUser: string,
    listOfPlayers: IParticipant[]
) => {
    const newList = Array.from(listOfPlayers)
    const index = newList.findIndex(player => player.player === currentUser)
    newList.splice(index, 1)
    if (newList.length === 0) {
        return await deleteDoc(doc(db, 'rooms', roomId))
    }
    await updateDoc(doc(db, 'rooms', roomId), {
        'gameState.players': newList,
    })
}
