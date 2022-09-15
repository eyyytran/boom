import { collection, doc, setDoc } from "firebase/firestore";
import { db } from "./db";
import { pc, uid } from "./pc";

export const addUser = async (data: any) => {
  try {
    await setDoc(doc(db, "users", `${uid}`), data);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};
