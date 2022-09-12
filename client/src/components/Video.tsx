import React, { ReactElement } from "react";

import videoSlice from "../store/videoSlice";

import { useSelector } from "react-redux";
import { RootState } from "../store";
import { useDispatch } from "react-redux";

import { io } from "socket.io-client";

import Component from "../components/Component";

import { faMicrophone, faVideoCamera } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

type Props = {
  userVideo?: any;
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

export default function Video({ userVideo, active, className = null }: Props) {
  const video = {
    state: useSelector((state: RootState) => state.video),
    actions: videoSlice.actions,
  };

  styles.dynamic = className;
  return (
    <Component id="Video">
      <div className={`${styles.static} ${styles.dynamic}`}>
        <video playsInline muted autoPlay ref={userVideo} className="h-full w-full object-cover object-center rounded -scale-x-100"></video>
        <div className="absolute inset-0 flex justify-start items-end">
          <div className={`w-full p-2 flex justify-between items-center rounded-b ${active ? styles.conditional.active : styles.conditional.inactive}`}>
            <FontAwesomeIcon icon={faMicrophone} className="text-xs text-inherit" />
            <span className="text-xs text-inherit">Username</span>
            <FontAwesomeIcon
              icon={faVideoCamera}
              className="text-xs text-inherit"
              onClick={() => {
                // @ts-ignore
                console.log(video.state.userMedia!.getTracks());
                // @ts-ignore
                video.state.userMedia!.getTracks().forEach(track => {
                  switch (track.kind) {
                    case "video":
                      switch (track.enabled) {
                        default:
                          return track.stop();
                      }
                  }
                });
              }}
            />
          </div>
        </div>
      </div>
    </Component>
  );
}
