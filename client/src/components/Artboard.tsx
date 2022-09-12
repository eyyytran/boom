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

type Props = {
  className?: string | null;
};

type Styles = {
  static: string;
  dynamic?: string | null;
};

const styles = {} as Styles;

styles.static = "shrink-0 w-full h-full p-2 md:p-3 lg:p-4";

export default function Artboard({ className = null }: Props) {
  const artboard = {
    state: useSelector((state: RootState) => state.artboard),
    actions: artboardSlice.actions,
  };

  styles.dynamic = className;
  return (
    <Component id="Artboard">
      <div className={`${styles.static} ${styles.dynamic}`}>
        <Container className="overflow-y-auto no-scrollbar">
          <div className="flex portrait:flex-col justify-center h-full">
            <Instructions />
            <Toolbar />
            <div className="portrait:w-full landscape:h-full aspect-square bg-white border-x border-neutral-400">
              <Canvas />
            </div>
            <Taskbar />
          </div>
        </Container>
      </div>
    </Component>
  );
}
