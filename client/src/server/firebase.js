import { initializeApp } from 'firebase/app'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import { child, getDatabase, ref, get, set, push } from 'firebase/database'
import firebase from 'firebase/compat/app'
import { firebaseConfig } from './config'

firebase.initializeApp(firebaseConfig)
const app = initializeApp(firebaseConfig)
export const firestore = getFirestore(app)
export const auth = getAuth(app)
export const db = getDatabase(app)

let firepadRef = ref(db)
export const userName = prompt("What's your name?")
const urlparams = new URLSearchParams(window.location.search)
const roomId = urlparams.get('id')

console.log(firepadRef)

if (roomId) {
    firepadRef = child(db, roomId)
} else {
    firepadRef = push(db)
    window.history.replaceState(null, 'Meet', '?id=' + firepadRef.key)
}

export default firepadRef
