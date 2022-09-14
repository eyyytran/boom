import { initializeApp } from 'firebase/app'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import { child, getDatabase, ref, get, set } from 'firebase/database'
import firebase from 'firebase/compat/app'

const firebaseConfig = {
    apiKey: 'AIzaSyAXZOpO_nf5jKExRW-zMk8JWSXZalVK49A',
    authDomain: 'boom-test-fe706.firebaseapp.com',
    projectId: 'boom-test-fe706',
    storageBucket: 'boom-test-fe706.appspot.com',
    messagingSenderId: '447496272705',
    appId: '1:447496272705:web:6da20aee0b46b90f45ffc0',
    measurementId: 'G-G9XHREWSFP',
    databaseURL: 'https://boom-test-fe706-default-rtdb.firebaseio.com/',
}

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

<<<<<<< HEAD
if (roomId) {
    firepadRef = child(db, roomId)
} else {
    firepadRef = push(db)
    window.history.replaceState(null, 'Meet', '?id=' + firepadRef.key)
}
=======
// if (roomId) {
//     firepadRef = firepadRef.child(roomId)
// } else {
//     firepadRef = firepadRef.push()
//     window.history.replaceState(null, 'Meet', '?id=' + firepadRef.key)
// }
>>>>>>> parent of ca282ad (fixing syntax)

export default firepadRef
