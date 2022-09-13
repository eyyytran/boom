import { initializeApp } from 'firebase/app'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import { child, getDatabase, ref, get, set } from 'firebase/database'

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

const app = initializeApp(firebaseConfig)
export const firestore = getFirestore(app)
export const auth = getAuth(app)
export const db = getDatabase(app)

var firepadRef = ref(db)

export const userName = prompt("What's your name?")
const urlparams = new URLSearchParams(window.location.search)
const roomId = urlparams.get('id')

if (roomId) {
    get(child(firepadRef, `${roomId}`))
        .then(snapshot => {
            if (snapshot.exists) {
                firepadRef = snapshot.val
            } else {
                console.log('no data available')
            }
        })
        .catch(error => {
            console.log(error)
        })
} else {
    console.log(db)
    window.history.replaceState(null, 'Meet', '?id=' + firepadRef.key)
}

export default firepadRef
