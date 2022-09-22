import React from 'react'
import IParticipant from '../interfaces/IParticipant'

type Props = {
    participant: IParticipant | any
}

const PlayerButton = ({ participant }: Props) => {
    return <button>{participant.player}</button>
}

export default PlayerButton
