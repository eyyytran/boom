import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC2GBBuIqFW7-l4mX6mI47HCV7O9njsOTk",
  authDomain: "boom-e4528.firebaseapp.com",
  projectId: "boom-e4528",
  storageBucket: "boom-e4528.appspot.com",
  messagingSenderId: "649424857876",
  appId: "1:649424857876:web:7f71c7fb489862539a3001",
};

// const urlparams = new URLSearchParams(window.location.search);
// const roomId = urlparams.get("id");

export const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
