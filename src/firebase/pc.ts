import { addOffer } from "./offer";

import { v4 as uuid } from "uuid";

export const pc = new RTCPeerConnection({
  iceServers: [{ urls: ["stun:stun1.l.google.com:19302", "stun:stun2.l.google.com:19302"] }],
  iceCandidatePoolSize: 10,
});

export const uid = uuid();

pc.onicecandidate = e => {
  if (!e.candidate) return;
  console.log(e.candidate);
  addOffer({
    address: e.candidate.address,
    candidate: e.candidate.candidate,
    component: e.candidate.component,
    foundation: e.candidate.foundation,
    port: e.candidate.port,
    priority: e.candidate.priority,
    protocol: e.candidate.protocol,
    relatedAddress: e.candidate.relatedAddress,
    relatedPort: e.candidate.relatedPort,
    sdpMLineIndex: e.candidate.sdpMLineIndex,
    sdpMid: e.candidate.sdpMid,
    tcpType: e.candidate.tcpType,
    type: e.candidate.type,
    usernameFragment: e.candidate.usernameFragment,
    uid: uid,
  });
};
