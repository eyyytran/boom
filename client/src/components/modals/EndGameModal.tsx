import { faCrown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { doc, updateDoc } from "firebase/firestore";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { db } from "../../server/firebase";
import { RootState } from "../../store";
import { endGame } from "../../util/handleEndGame";
import gameSlice from "../../store/gameSlice";
import modalSlice from "../../store/modalSlice";

const EndGameModal = () => {
  const game = {
    state: useSelector((state: RootState) => state.game),
    action: gameSlice.actions,
  };

  const modal = {
    state: useSelector((state: RootState) => state.modal),
    action: modalSlice.actions,
  };

  const dispatch = useDispatch();

  const resetDb = async () => {
    await updateDoc(doc(db, "rooms", game.state.roomId), {
      "gameState.players": game.state.players.map(player => ({
        ...player,
        points: 0,
      })),
      "gameState.winner": null,
      "gameState.gameStarted": false,
      "gameState.gameWon": false,
      "gameState.usedPrompts": [],
    });
  };

  const handleStartNewGame = (e: React.SyntheticEvent) => {
    e.preventDefault();
    resetDb();
    dispatch(modal.action.resetModals());
  };

  const handleEndClick = (e: React.SyntheticEvent) => {
    e.preventDefault();
    endGame(game.state.roomId);
  };

  return (
    <div className="absolute inset-0 bg-neutral-900 bg-opacity-60 opacity-100 flex flex-col items-center justify-center border border-neutral-400 rounded z-20">
      <div className="flex flex-col w-max h-max space-y-2 p-8 opacity-100 bg-slate-50 z-30 rounded">
        <h1 className="text-center text-4xl text-amber-300">
          <FontAwesomeIcon icon={faCrown} />
        </h1>
        <h1 className="py-2 px-6 font-bold text-neutral-900 text-center">{game.state.winner} won!</h1>
        {game.state.isOwner && (
          <button className="text-white py-2 px-6 font-bold bg-neutral-900 rounded" onClick={handleEndClick}>
            Back to Dashboard
          </button>
        )}
        {game.state.isOwner && (
          <button className="text-white py-2 px-6 font-bold bg-violet-500 rounded" onClick={handleStartNewGame}>
            Start A New Game
          </button>
        )}
      </div>
    </div>
  );
};

export default EndGameModal;
