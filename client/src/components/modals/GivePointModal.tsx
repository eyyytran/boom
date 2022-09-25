import { useMemo } from "react";
import { useSelector } from "react-redux";

import { RootState } from "../../store/index";
import gameSlice from "../../store/gameSlice";
import PlayerButton from "./PlayerButton";
import IParticipant from "../interfaces/IParticipant";

interface IParticipantWithIndex extends IParticipant {
  index: number;
}

const GivePointModal = () => {
  const game = {
    state: useSelector((state: RootState) => state.game),
    action: gameSlice.actions,
  };

  const participants = useMemo(() => {
    const participants: IParticipantWithIndex[] = [];
    game.state.players.forEach((player, index) => {
      if (index !== game.state.whosTurn)
        participants.push({
          ...player,
          index,
        });
    });
    return participants;
  }, [game.state.players, game.state.whosTurn]);

  return (
    <div className="flex justify-center items-center gap-2">
      {participants.map(({ index, player }: IParticipantWithIndex) => {
        return <PlayerButton index={index} name={player} />;
      })}
    </div>
  );
};

export default GivePointModal;
