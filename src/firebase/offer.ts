import { addDoc, collection, doc } from "firebase/firestore";
import { db } from "./db";
import { pc, uid } from "./pc";

export const createOffer = async () => await pc.createOffer();

export const addOffer = async (data: any) => {
  const uidRef = doc(db, "users", `${uid}`);
  try {
    const docRef = await addDoc(collection(db, "offers"), data);
    console.log(`Document written with ID: ${docRef.id}}`);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};
