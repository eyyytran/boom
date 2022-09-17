import React, { ReactElement } from "react";

import artboardSlice from "../store/artboardSlice";

import { useSelector } from "react-redux";
import { RootState } from "../store";
import { useDispatch } from "react-redux";

import Component from "../components/Component";
import Container from "../layout/Container";
import Instructions from "../components/Instructions";
import Toolbar from "../components/Toolbar";
import Taskbar from "../components/Taskbar";
import Canvas from "../components/Canvas";
import Guess from "./Guess";

type Props = {
  className?: string | null;
};

type Styles = {
  static: string;
  dynamic?: string | null;
};

const styles = {} as Styles;

styles.static = "shrink-0 w-full h-full p-2 md:p-3 lg:p-4";

export default function Display({ className = null }: Props) {
  const artboard = {
    state: useSelector((state: RootState) => state.artboard),
    actions: artboardSlice.actions,
  };

  styles.dynamic = className;
  return (
    <Component id="Display">
      <div className={`${styles.static} ${styles.dynamic}`}>
        <Container className="overflow-y-auto no-scrollbar">
          <div className="flex portrait:flex-col justify-start gap-2 md:gap-3 lg:gap-4 h-full">
            <div className="flex portrait:flex-col justify-start h-max">
              <div className="p-2 bg-neutral-200 border-t border-x border-neutral-400 rounded-t text-xs font-bold text-center">Username</div>
              <div className="portrait:w-full landscape:h-max aspect-square bg-white border-x border-neutral-400">
                <Canvas />
              </div>
              <div className="p-2 bg-violet-500 rounded-b text-xs font-bold text-white text-center">Hint</div>
            </div>
            <Guess />
          </div>
        </Container>
      </div>
    </Component>
  );
}
