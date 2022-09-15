import { initializeApp } from 'firebase/app'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import {
    getFirestore,
    collection,
    doc,
    addDoc,
    updateDoc,
    arrayUnion,
} from 'firebase/firestore'
import { firebaseConfig } from './config'

const app = initializeApp(firebaseConfig)

export const db = getFirestore(app)
export const auth = getAuth(app)

// if (!roomId) {
//   createRoom();
// } else {
//   updateRoom();
// }
export default app
