import { initializeApp } from 'firebase/app'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { getFirestore, collection, doc, addDoc } from 'firebase/firestore'
import { firebaseConfig } from './config'

const app = initializeApp(firebaseConfig)

export const db = getFirestore(app)
export const auth = getAuth(app)
export const userName = prompt("What's your name?")

const urlparams = new URLSearchParams(window.location.search)
const roomId = urlparams.get('id')

let firepadRef = collection(db, 'rooms')
const createRoom = async () => {
    try {
        const docRef = await addDoc(firepadRef, { name: 'test-room' })
        firepadRef = doc(db, 'rooms', docRef.id)
        window.history.replaceState(null, 'Meet', '?id=' + docRef.id)
    } catch (error) {
        console.error('error adding document', error)
    }
}

if (!roomId) {
    createRoom()
} else {
    firepadRef = doc(db, 'rooms', roomId)
}
export default firepadRef
