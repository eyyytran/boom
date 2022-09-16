import React, { ReactElement, useEffect, useRef } from "react";

import { config, useClient, useMicrophoneAndCameraTracks, channelName } from "../server/agora";

import Component from "../components/Component";
import Titlebar from "../components/Titlebar";
import Timer from "../components/Timer";
import Gallery from "../components/Gallery";
import Artboard from "../components/Artboard";
import Display from "../components/Display";
import Chat from "../components/Chat";
import Navbar from "../components/Navbar";

type Styles = {
  static: string;
};

const styles = {} as Styles;

styles.static = "fixed inset-0 bg-neutral-200";

export default function Boom() {
  const galleryRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    console.log(galleryRef);
  }, []);

  return (
    <Component id="Boom">
      <div className={`${styles.static}`}>
        <div className="flex flex-col justify-start h-full">
          <Titlebar className="shrink-0" />
          <Timer className="shrink-0" />
          <div className="flex h-full overflow-y-clip overflow-x-auto snap-x snap-mandatory no-scrollbar">
            <Gallery galleryRef={galleryRef} className="snap-center" />
            {/* <Artboard className="snap-center" /> */}
            <Display className="snap-center" />
            <Chat className="snap-center" />
          </div>
          <Navbar className="shrink-0" />
        </div>
      </div>
    </Component>
  );
}
