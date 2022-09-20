import React, { ReactElement } from "react";

import videoSlice from "../store/videoSlice";

import { useSelector } from "react-redux";
import { RootState } from "../store";
import { useDispatch } from "react-redux";

import Component from "../components/Component";

import { AgoraVideoPlayer } from "agora-rtc-react";

import { faMicrophone, faMicrophoneSlash, faVideoCamera, faVideoSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

type Props = {
  tracks: any;
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

styles.static = "relative h-full md:h-auto aspect-video border border-red-500";

styles.conditional = {
  active: "bg-violet-500 text-neutral-50",
  inactive: "bg-neutral-300",
};

export default function Video({ active, className = null, tracks, videoTrack }: Props) {
  const video = {
    state: useSelector((state: RootState) => state.video),
    actions: videoSlice.actions,
  };

  const dispatch = useDispatch();

  styles.dynamic = className;

  return (
    <Component id="Video">
      <div className={`${styles.static} ${styles.dynamic}`}>
        <div className="h-full w-full object-cover object-center rounded overflow-clip">
          <AgoraVideoPlayer videoTrack={videoTrack} className="w-full h-full rounded scale-105" />
        </div>

        <div className="absolute inset-0 flex justify-start items-end">
          <div className={`w-full p-2 flex justify-between items-center rounded-b ${active ? styles.conditional.active : styles.conditional.inactive}`}>
            <button
              className="w-8"
              onClick={async () => {
                dispatch(video.actions.toggleMicrophone());
                await tracks[0].setEnabled(video.state.microphone);
              }}
            >
              <FontAwesomeIcon icon={video.state.microphone ? faMicrophoneSlash : faMicrophone} className="text-xs text-inherit" />
            </button>
            <span className="text-xs text-inherit">Username</span>
            <button
              className="w-8"
              onClick={async () => {
                dispatch(video.actions.toggleCamera());
                await tracks[1].setEnabled(video.state.camera);
              }}
            >
              <FontAwesomeIcon icon={video.state.camera ? faVideoSlash : faVideoCamera} className="text-xs text-inherit" />
            </button>
          </div>
        </div>
      </div>
    </Component>
  );
}
