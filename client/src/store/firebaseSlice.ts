import { createSlice, current } from '@reduxjs/toolkit'

const servers = {
    iceServers: [
        {
            urls: [
                'stun:stun1.l.google.com:19302',
                'stun:stun2.l.google.com:19302',
                'stun:stun.l.google.com:19302',
                'stun:stun3.l.google.com:19302',
                'stun:stun4.l.google.com:19302',
                'stun:stun.services.mozilla.com',
            ],
        },
    ],
    iceCandidatePoolSize: 10,
}

const addConnection = (newUser, currentUser, stream) => {
    const peerConnection = new RTCPeerConnection(servers)
    stream.getTracks().forEach(track => {
        peerConnection.addTrack(track, stream)
    })
    const newUserId = Object.keys(newUser)[0]
    const currentUserId = Object.keys(currentUser)[0]

    const offerIds = [newUserId, currentUserId].sort((a, b) =>
        a.localeCompare(b)
    )
}

const firebaseSlice = createSlice({
    name: 'firebase',
    initialState: {
        mainStream: null,
        participants: {},
        currentUser: null,
    },
    reducers: {
        setMainStream: (state, action) => {
            state.mainStream = action.payload
        },
        addParticipant: (state, action) => {
            //@ts-ignore
            const currentUserId = Object.keys(state.currentUser)[0]
            const newUserId = Object.keys(action.payload.newUser)[0]
            if (state.mainStream && currentUserId !== newUserId) {
                action.payload.newUser = addConnection(
                    action.payload.newUser,
                    state.currentUser,
                    state.mainStream
                )
            }
        },
    },
})

export default firebaseSlice
