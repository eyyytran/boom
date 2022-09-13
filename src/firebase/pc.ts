import { collection, getDocs } from "firebase/firestore";
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

export const pc = new RTCPeerConnection(servers);
