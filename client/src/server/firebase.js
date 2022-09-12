// import { initializeApp } from "firebase/app";
// import { getFirestore } from "firebase/firestore";

// const firebaseConfig = {
//   apiKey: process.env.apiKey,
//   authDomain: process.env.authDomain,
//   projectId: process.env.projectId,
//   storageBucket: process.env.storageBucket,
//   messagingSenderId: process.env.messagingSenderId,
//   appId: process.env.appId,
// };

// const app = initializeApp(firebaseConfig);

// const firestore = getFirestore();

// const db = getFirestore(app);

// console.log(firestore);
// console.log(db);

import firebase from "firebase";

var firebaseConfig = {
  apiKey: "",
  databaseURL: "",
};

firebase.initializeApp(firebaseConfig);

export const db = firebase;

var firepadRef = firebase.database().ref();

export const userName = prompt("What's your name?");
const urlparams = new URLSearchParams(window.location.search);
const roomId = urlparams.get("id");

if (roomId) {
  firepadRef = firepadRef.child(roomId);
} else {
  firepadRef = firepadRef.push();
  window.history.replaceState(null, "Meet", "?id=" + firepadRef.key);
}

export default firepadRef;
