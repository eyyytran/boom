import React, { ReactElement } from "react";

import videoSlice from "../store/videoSlice";

import { useSelector } from "react-redux";
import { RootState } from "../store";
import { useDispatch } from "react-redux";

import Component from "../components/Component";

import { AgoraVideoPlayer } from "agora-rtc-react";

import { faMicrophone, faVideoCamera } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

type Props = {
  microphoneButtonRef: any;
  cameraButtonRef: any;
  videoTrack: any;
  active: boolean;
  className?: string | null;
};

type Styles = {
  static: string;
  dynamic?: string | null;
  conditional: {
    active: string;
    inactive: string;
  };
};

const styles = {} as Styles;

styles.static = "relative portrait:h-1/4 landscape:w-1/4 aspect-video";

styles.conditional = {
  active: "bg-violet-500 text-neutral-50",
  inactive: "bg-neutral-300",
};

export default function Video({ microphoneButtonRef, cameraButtonRef, active, className = null, videoTrack }: Props) {
  const video = {
    state: useSelector((state: RootState) => state.video),
    actions: videoSlice.actions,
  };

  styles.dynamic = className;

  return (
    <Component id="Video">
      <div className={`${styles.static} ${styles.dynamic}`}>
        <div className="h-full w-full object-cover object-center rounded overflow-clip">
          <AgoraVideoPlayer videoTrack={videoTrack} className="w-full h-full rounded scale-105" />
        </div>

        <div className="absolute inset-0 flex justify-start items-end">
          <div className={`w-full p-2 flex justify-between items-center rounded-b ${active ? styles.conditional.active : styles.conditional.inactive}`}>
            <FontAwesomeIcon ref={microphoneButtonRef} icon={faMicrophone} className="text-xs text-inherit" />
            <span className="text-xs text-inherit">Username</span>
            <FontAwesomeIcon ref={cameraButtonRef} icon={faVideoCamera} className="text-xs text-inherit" />
          </div>
        </div>
      </div>
    </Component>
  );
}
