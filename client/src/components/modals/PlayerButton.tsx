import { FC } from "react";
import { useSelector, useDispatch } from "react-redux";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../server/firebase";
import { RootState } from "../../store";
import gameSlice from "../../store/gameSlice";
import modalSlice from "../../store/modalSlice";

type Props = {
  index: number;
  name: string;
};

const PlayerButton: FC<Props> = ({ index, name }) => {
  const dispatch = useDispatch();

  const game = {
    state: useSelector((state: RootState) => state.game),
    action: gameSlice.actions,
  };

  const modal = {
    state: useSelector((state: RootState) => state.modal),
    action: modalSlice.actions,
  };

  const givePointToPlayer = async () => {
    const newPlayers = Array.from(game.state.players);
    const newPlayer = {
      ...newPlayers[index],
      points: newPlayers[index].points + 1,
    };
    newPlayers[index] = newPlayer;
    const isGameWon = newPlayer.points >= 5; //TODO change back to 5 for deployment

    function getWhosTurn() {
      if (isGameWon) return null;
      const whosTurn = game.state.whosTurn as number;
      return whosTurn === game.state.players.length - 1 ? 0 : whosTurn + 1;
    }

    await updateDoc(doc(db, "rooms", game.state.roomId), {
      "gameState.players": newPlayers,
      drawings: null,
      "gameState.whosTurn": getWhosTurn(),
      "gameState.gameWon": isGameWon,
      "gameState.winner": isGameWon ? newPlayer : null,
      "gameState.gameStarted": isGameWon ? false : true,
      "gameState.isTurnStart": false,
    });
  };

  const handleGivePoint = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    givePointToPlayer();
    dispatch(game.action.setCurrentPrompt(""));
    dispatch(modal.action.setIsShowGivePointModal(false));
    const winnerSound = new Audio("/sounds/winner.mp3");
    winnerSound.volume = 0.1;
    winnerSound.play();
  };

  return (
    <button
      className="text-white py-2 px-6 font-bold bg-neutral-900 bg-opacity-100 rounded z-40"
      onClick={handleGivePoint}
    >
      {name}
    </button>
  );
};

export default PlayerButton;
