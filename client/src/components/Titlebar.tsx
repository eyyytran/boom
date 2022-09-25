import { Link } from "react-router-dom";
import { cleanupUser } from "../util/cleanupUser";
import Component from "./Component";
import Container from "../layout/Container";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import gameSlice from "../store/gameSlice";
import userSlice from "../store/userSlice";
import { useMemo } from "react";
import { useDispatch } from "react-redux";
import modalSlice from "../store/modalSlice";

type Props = {
  className?: string;
};

type Styles = {
  static: string;
  dynamic?: string;
};

const styles = {} as Styles;

styles.static = "p-2 md:p-3 lg:p-4 bg-neutral-900";

export default function Titlebar({ className = "" }: Props) {
  styles.dynamic = className;

  const dispatch = useDispatch();

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

  const handleUserCleanup = () => {
    cleanupUser(game.state.roomId, user.state.userName, game.state.players);
    dispatch(game.action.resetState());
    dispatch(modal.action.resetModals());
  };
  console.log("GAMETITLE", game.state.roomId);
  return (
    <Component id="Titlebar">
      <div className={`${styles.static} ${styles.dynamic}`}>
        <Container>
          <div className="flex justify-center items-center gap-2 h-full">
            <FontAwesomeIcon
              icon={faPenToSquare}
              className="text-xs text-violet-500"
            />
            <span className="text-xs text-white font-bold">
              {/* <Link to="/dashboard" onClick={handleUserCleanup}>
                Boom
              </Link> */}
              {game.state.roomId ? `Room ID: ${game.state.roomId}` : "Boom"}
            </span>
          </div>
        </Container>
      </div>
    </Component>
  );
}
