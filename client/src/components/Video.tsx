import React, { ReactElement } from "react";

import videoSlice from "../store/videoSlice";

import { useClient } from "../server/agora";

import { useSelector } from "react-redux";
import { RootState } from "../store";
import { useDispatch } from "react-redux";

import Component from "../components/Component";

import { AgoraVideoPlayer } from "agora-rtc-react";

import { faMicrophone, faMicrophoneSlash, faVideoCamera, faVideoSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

type Props = {
  tracks: any;
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

styles.static = "relative h-full aspect-video md:aspect-auto rounded overflow-clip";

styles.conditional = {
  active: "bg-violet-500 text-neutral-50",
  inactive: "bg-neutral-300",
};

export default function Video({ active, className = null, tracks }: Props) {
  const video = {
    state: useSelector((state: RootState) => state.video),
    actions: videoSlice.actions,
  };

  const dispatch = useDispatch();

  styles.dynamic = className;

  return (
    <Component id="Video">
      <div className={`${styles.static} ${styles.dynamic}`}>
        <div className="h-full w-full object-cover object-center">
          <AgoraVideoPlayer videoTrack={tracks[1]} className="w-full h-full scale-105" />
        </div>

        <div className="absolute inset-0 flex justify-start items-end">
          <div className={`w-full p-2 flex justify-between items-center ${active ? styles.conditional.active : styles.conditional.inactive}`}>
            <button
              className={`${!active && "invisible"} w-8`}
              onClick={async () => {
                if (!active) return;
                // await tracks[0].setEnabled(!video.state.microphone);
                dispatch(video.actions.setMicrophone(!video.state.microphone));
              }}
            >
              <FontAwesomeIcon icon={video.state.microphone ? faMicrophone : faMicrophoneSlash} className="text-xs text-inherit" />
            </button>
            <span className="w-full text-xs text-inherit text-center">Username</span>
            <button
              className={`${!active && "invisible"} w-8`}
              onClick={async () => {
                if (!active) return;
                await tracks[1].setEnabled(!video.state.camera);
                dispatch(video.actions.setCamera(!video.state.camera));
                console.log(tracks[1]);
                switch (video.state.camera) {
                  case true:
                    return await tracks[1].setEnabled(true);
                  default:
                    return await tracks[1].setEnabled(false);
                }
              }}
            >
              <FontAwesomeIcon icon={video.state.camera ? faVideoCamera : faVideoSlash} className="text-xs text-inherit" />
            </button>
          </div>
        </div>
      </div>
    </Component>
  );
}
