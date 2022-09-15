import { collection, addDoc } from "firebase/firestore";
import { db } from "./db";
import { pc, uid } from "./pc";

export const createAnswer = async () => await pc.createAnswer();

export const addAnswer = async (data: any) => {
  try {
    const docRef = await addDoc(collection(db, "answers"), data);
    console.log(`Document written with ID: ${docRef.id}}`);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};
