import { FC, SyntheticEvent } from "react";
import { useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { doc, updateDoc } from "firebase/firestore";
import {
  faRightToBracket,
  faMessage,
  faTableCellsLarge,
  faVideo,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Component from "./Component";
import Container from "../layout/Container";
import { auth, db } from "../server/firebase";
import { RootState } from "../store";
import gameSlice from "../store/gameSlice";
import { randomIntegerInInterval } from "../util/randomIntegerInInterval";

type Props = {
  galleryButtonRef: any;
  artboardButtonRef: any;
  chatButtonRef: any;
  exitButtonRef: any;
  className?: string | null;
};

type Styles = {
  static: string;
  dynamic?: string | null;
};

const styles = {} as Styles;

styles.static = "p-2 md:p-3 lg:p-4  bg-neutral-300";

const Navbar: FC<Props> = ({
  galleryButtonRef,
  artboardButtonRef,
  chatButtonRef,
  exitButtonRef,
  className = null,
}) => {
  styles.dynamic = className;

  const game = {
    state: useSelector((state: RootState) => state.game),
    actions: gameSlice.actions,
  };

  const navigate = useNavigate();

  const startGame = async (e: SyntheticEvent) => {
    e.preventDefault();
    await updateDoc(doc(db, "rooms", game.state.roomId), {
      "gameState.gameStarted": true,
      "gameState.whosTurn": randomIntegerInInterval(
        0,
        game.state.players.length - 1
      ),
    });
  };

  const endGame = async (e: SyntheticEvent) => {
    e.preventDefault();
    await updateDoc(doc(db, "rooms", game.state.roomId), {
      "gameState.gameStarted": false,
    });
  };

  // const handleSignout = (e: SyntheticEvent) => {
  //     e.preventDefault()
  //     auth.signOut()
  //     navigate('/')
  // }

  return (
    <Component id="Navbar">
      <div className={`${styles.static} ${styles.dynamic}`}>
        <Container>
          <div className="flex justify-between items-center gap-2 h-full">
            {/* Game started: {`${game.state.isInit}`} */}
            {game.state.isOwner && (
              <button
                className={
                  game.state.isInit
                    ? "py-2 px-4 bg-red-700 rounded-md md:w-40 sm:w-40"
                    : "py-2 px-4 bg-green-700 rounded-md md:w-40 sm:w-40"
                }
                onClick={(e: SyntheticEvent) =>
                  game.state.isInit ? endGame(e) : startGame(e)
                }
              >
                <span className="text-neutral-100">
                  {game.state.isInit ? "End Game" : "Start Game"}
                </span>
              </button>
            )}
            <div className="flex justify-center items-center gap-2 h-full">
              <button ref={galleryButtonRef} className="py-2 px-4">
                <FontAwesomeIcon icon={faVideo} className="text-violet-500" />
              </button>
              <button ref={artboardButtonRef} className="py-2 px-4">
                <FontAwesomeIcon icon={faTableCellsLarge} className="" />
              </button>
              <button ref={chatButtonRef} className="py-2 px-4">
                <FontAwesomeIcon icon={faMessage} className="" />
              </button>
            </div>
            <Link to="/dashboard" className="py-2 px-4">
              <FontAwesomeIcon icon={faRightToBracket} className="" />
            </Link>
          </div>
        </Container>
      </div>
    </Component>
  );
};

export default Navbar;
