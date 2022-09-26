import { FC, ReactElement, SyntheticEvent, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { doc, updateDoc } from "firebase/firestore";
import { faRightToBracket, faMessage, faTableCellsLarge, faVideo, faPenToSquare, faLink } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Component from "./Component";
import Container from "../layout/Container";
import { db } from "../server/firebase";
import { RootState } from "../store";
import gameSlice from "../store/gameSlice";
import { randomIntegerInInterval } from "../util/randomIntegerInInterval";
import { cleanupUser } from "../util/cleanupUser";
import { useDispatch } from "react-redux";
import userSlice from "../store/userSlice";
import modalSlice from "../store/modalSlice";
import { endGame } from "../util/handleEndGame";

type Props = {
  galleryButtonRef: any;
  artboardButtonRef: any;
  chatButtonRef: any;
  exitButtonRef: any;
  className?: string | null;
  isGalleryInView: boolean;
  isChatInView: boolean;
  isArtboardInView: boolean;
};

type Styles = {
  static: string;
  dynamic?: string | null;
};

const styles = {} as Styles;

styles.static = "bg-neutral-300";

const Navbar: FC<Props> = ({ galleryButtonRef, artboardButtonRef, chatButtonRef, exitButtonRef, className = null, isGalleryInView, isChatInView, isArtboardInView }) => {
  styles.dynamic = className;

  const game = {
    state: useSelector((state: RootState) => state.game),
    action: gameSlice.actions,
  };

  const user = {
    state: useSelector((state: RootState) => state.user),
    action: userSlice.actions,
  };

  const modal = {
    state: useSelector((state: RootState) => state.modal),
    action: modalSlice.actions,
  };

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const startGame = async (e: SyntheticEvent) => {
    e.preventDefault();
    await updateDoc(doc(db, "rooms", game.state.roomId), {
      "gameState.gameStarted": true,
      "gameState.whosTurn": randomIntegerInInterval(0, game.state.players.length - 1),
    });
  };

  const handleEndGame = async (e: SyntheticEvent) => {
    e.preventDefault();
    endGame(game.state.roomId);
  };

  const handleUserCleanup = () => {
    cleanupUser(game.state.roomId, user.state.user?.uid, game.state.players);
    navigate("/dashboard");
    dispatch(game.action.resetState());
    dispatch(modal.action.resetModals());
  };

  const [copyLink, setCopyLink] = useState<ReactElement | String>(<FontAwesomeIcon icon={faLink} />);

  return (
    <Component id="Navbar">
      <div className={`${styles.static} ${styles.dynamic}`}>
        <div className="grid grid-cols-5 justify-center items-center gap-2 h-full">
          <button
            className="bg-neutral-400 hover:bg-neutral-500 text-white col-start-1 col-span-1 row-start-2 row-span-1 m-2 md:m-3 lg:m-4 p-2 md:p-3 lg:p-4 rounded"
            onClick={() => {
              navigator.clipboard.writeText(game.state.roomId);
              setCopyLink("Copied");
              const coppiedSound = new Audio("/sounds/coppied.mp3");
              coppiedSound.volume = 0.1;
              coppiedSound.play();
              setTimeout(() => {
                setCopyLink(<FontAwesomeIcon icon={faLink} />);
              }, 750);
            }}
          >
            {copyLink}
          </button>
          {game.state.isOwner && (
            <button
              className={
                game.state.isInit
                  ? "col-start-2 col-span-3 row-start-2 row-span-1 p-2 md:p-3 lg:p-4 bg-rose-500 hover:bg-rose-600 rounded"
                  : "col-start-2 col-span-3 row-start-2 row-span-1 p-2 md:p-3 lg:p-4 bg-emerald-500 hover:bg-emerald-400 rounded"
              }
              onClick={(e: SyntheticEvent) => (game.state.isInit ? handleEndGame(e) : startGame(e))}
            >
              <span className="text-neutral-100">{game.state.isInit ? "End Game" : "Start Game"}</span>
            </button>
          )}
          <div className="xl:hidden col-start-1 col-span-5 row-start-1 row-span-1 flex justify-center items-center gap-2 h-full bg-neutral-200">
            <button ref={galleryButtonRef} className="py-2 px-4 text-xl">
              <FontAwesomeIcon icon={faVideo} className={isGalleryInView ? "text-violet-500" : ""} />
            </button>
            <button ref={artboardButtonRef} className="py-2 px-4 text-xl">
              <FontAwesomeIcon icon={faPenToSquare} className={isArtboardInView ? "text-violet-500" : ""} />
            </button>
            <button ref={chatButtonRef} className="py-2 px-4 text-xl">
              <FontAwesomeIcon icon={faMessage} className={isChatInView ? "text-violet-500" : ""} />
            </button>
          </div>
          <button
            ref={exitButtonRef}
            className="bg-neutral-900 hover:bg-neutral-800 text-white col-start-5 col-span-1 row-start-2 row-span-1 m-2 md:m-3 lg:m-4  p-2 md:p-3 lg:p-4 rounded"
            onClick={handleUserCleanup}
          >
            <FontAwesomeIcon icon={faRightToBracket} className="" />
          </button>
        </div>
      </div>
    </Component>
  );
};

export default Navbar;
