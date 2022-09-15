import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getFirestore, collection, doc, addDoc, updateDoc, arrayUnion } from "firebase/firestore";
import { firebaseConfig } from "./config";

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);
export const userName = "Blake";

const urlparams = new URLSearchParams(window.location.search);
export const roomId = urlparams.get("id");

var firepadRef = collection(db, "rooms");

export const createRoom = async () => {
  try {
    const docRef = await addDoc(firepadRef, { primaryUser: userName });
    window.history.replaceState(null, "Meet", "?id=" + docRef.id);
  } catch (error) {
    console.error("error adding document", error);
  }
};

export const updateRoom = async () => {
  try {
    const docRef = doc(db, "rooms", roomId);
    await updateDoc(docRef, {
      participants: arrayUnion(userName),
    });
    window.history.replaceState(null, "Meet", "?id=" + roomId);
  } catch (error) {
    console.error("error adding a participant", error);
  }
};

// if (!roomId) {
//   createRoom();
// } else {
//   updateRoom();
// }
export default firepadRef;
