import { collection, getDocs, addDoc } from "firebase/firestore";
import { db } from "./db";

const servers = {
  iceServers: [
    {
      urls: ["stun:stun1.l.google.com:19302", "stun:stun2.l.google.com:19302"],
    },
  ],
  iceCandidatePoolSize: 10,
};

export const getUsers = async () => {
  const querySnapshot = await getDocs(collection(db, "users"));
  return querySnapshot;
};

export const getCalls = async () => {
  const querySnapshot = await getDocs(collection(db, "calls"));
  return querySnapshot;
};

export const addCall = async (data: any) => {
  try {
    const docRef = await addDoc(collection(db, "calls"), data);
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};

export const addOffer = async (data: any) => {
  try {
    const docRef = await addDoc(collection(db, "calls"), addDoc(collection(db, "offers"), data));
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};

export const addAnswer = async (data: any) => {
  try {
    const docRef = await addDoc(collection(db, "calls"), addDoc(collection(db, "answers"), data));
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};

export const pc = new RTCPeerConnection(servers);

export const createOffer = async () => {
  const offerDescription = await pc.createOffer();
  await pc.setLocalDescription(offerDescription);

  const offer = {
    sdp: offerDescription.sdp,
    type: offerDescription.type,
  };

  await addCall({ offer });
};
