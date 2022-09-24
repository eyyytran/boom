import { useEffect, useState, SyntheticEvent } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import Component from "../components/Component";
import Container from "../layout/Container";
import Instructions from "../components/Instructions";
import Toolbar from "../components/Toolbar";
import Taskbar from "../components/Taskbar";
import Canvas from "../components/Canvas";
import GivePointModal from "./modals/GivePointModal";
import IsTurnModal from "./modals/IsTurnModal";
import gameSlice from "../store/gameSlice";
import { arrayUnion, collection, doc, getDoc, getDocs, query, updateDoc, where } from "firebase/firestore";
import { db } from "../server/firebase";
import modalSlice from "../store/modalSlice";
import { randomIntegerInInterval } from "../util/randomIntegerInInterval";

type Props = {
  artboardRef: any;
  className?: string | null;
};

type Styles = {
  static: string;
  dynamic?: string | null;
};

const styles = {} as Styles;

styles.static = "flex justify-center items-center w-full h-full p-2 md:p-3 lg:p-4 lg:col-start-1 lg:col-span-2 lg:row-start-1 lg:row-span-1 border-4 border-violet-700";

export default function Artboard({ artboardRef, className = null }: Props) {
  const game = {
    state: useSelector((state: RootState) => state.game),
    action: gameSlice.actions,
  };

  const modal = {
    state: useSelector((state: RootState) => state.modal),
    action: modalSlice.actions,
  };

  const [prompt, setPrompt] = useState<string>("");
  const [wasClicked, setWasClicked] = useState<boolean>(false);

  const getPrompt: any = async (alreadyUsedPromptIds: Array<number>) => {
    const randomPromptId = randomIntegerInInterval(0, 24);
    if (alreadyUsedPromptIds.includes(randomPromptId)) return getPrompt(alreadyUsedPromptIds);
    try {
      const querySnapshot = await getDocs(query(collection(db, "game-prompts"), where("id", "==", randomPromptId)));
      querySnapshot.forEach(doc => {
        setPrompt(doc.data().prompt);
      });
      await updateDoc(doc(db, "rooms", game.state.roomId), {
        "gameState.usedPrompts": arrayUnion(randomPromptId),
      });
    } catch (error) {
      console.error();
    }
  };

  const handleGetPrompt = async (e: SyntheticEvent) => {
    e.preventDefault();
    if (wasClicked === true) return;
    setWasClicked(true);
    const docSnap = await getDoc(doc(db, "rooms", game.state.roomId));
    if (docSnap.exists()) {
      const data = docSnap.data();
      let usedPromptsArray = data.usedPrompts;
      if (!data.usedPrompts) {
        usedPromptsArray = [];
      }
      await getPrompt(usedPromptsArray);
    }
  };

  useEffect(() => {
    const sendPrompt = async () => {
      await updateDoc(doc(db, "rooms", game.state.roomId as unknown as string), {
        "gameState.currentPrompt": prompt,
      });
    };
    sendPrompt();
  }, [game.state.roomId, prompt]);

  styles.dynamic = className;
  return (
    <Component id="Artboard">
      <div ref={artboardRef} className={`${styles.static} ${styles.dynamic}`}>
        {modal.state.isShowIsTurnModal && <IsTurnModal />}
        {modal.state.isShowIsTurnModal && modal.state.isShowGivePointModal && <GivePointModal />}
        <Container className="w-full h-full overflow-y-auto no-scrollbar border border-neutral-400 rounded">
          <div className="flex portrait:flex-col lg:flex-col justify-start h-full">
            <Toolbar />
            <div className="portrait:w-full landscape:h-max lg:landscape:h-full aspect-auto bg-white">
              <Canvas />
            </div>
            <button className={game.state.isTurn ? "p-2 bg-violet-500 text-xs font-bold text-white text-center" : "hidden"} onClick={handleGetPrompt}>
              {!prompt ? "Generate Prompt" : prompt}
            </button>
            <Taskbar />
          </div>
        </Container>
      </div>
    </Component>
  );
}
