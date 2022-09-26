import { deleteDoc, doc, updateDoc } from 'firebase/firestore'
import { db } from '../server/firebase'

export const endGame = async (roomId: string) => {
    await updateDoc(doc(db, 'rooms', roomId), {
        'gameState.isEnded': true,
    })
    setTimeout(async () => {
        await deleteDoc(doc(db, 'rooms', roomId))
    }, 3000)
}
