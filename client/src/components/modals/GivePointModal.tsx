import { useMemo } from "react";
import { useSelector } from "react-redux";

import { RootState } from "../../store/index";
import gameSlice from "../../store/gameSlice";
import PlayerButton from "./PlayerButton";
import IParticipant from "../interfaces/IParticipant";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

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
    <div className="absolute inset-0 bg-neutral-900 bg-opacity-60 opacity-100 flex flex-col items-center justify-center border border-neutral-400 rounded z-20">
      <div className="flex flex-col w-max h-max space-y-2 p-8 opacity-100 bg-slate-50 z-30 rounded">
        <h1 className="text-center text-4xl text-amber-300">
          <FontAwesomeIcon icon={faStar} />
        </h1>
        <h1 className="text-center text-base font-bold">Who deserves the point?</h1>
        {participants.map(({ index, player }: IParticipantWithIndex) => {
          return <PlayerButton index={index} name={player} />;
        })}
      </div>
    </div>
  );
};

export default GivePointModal;
