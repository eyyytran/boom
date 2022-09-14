import React, { ReactElement, useEffect, useRef } from "react";

import subscriberSlice from "../store/subscriberSlice";

import { addOffer, createOffer, pc } from "../firebase/pc";

import { useSelector } from "react-redux";
import { RootState } from "../store";
import { useDispatch } from "react-redux";

import Component from "../components/Component";

import { faMicrophone, faVideoCamera } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

type Props = {
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

export default function Video({ className = null }: Props) {
  const subscriber = {
    state: useSelector((state: RootState) => state.subscriber),
    actions: subscriberSlice.actions,
  };

  const mediaStream = new MediaStream();

  const ref = useRef() as any;

  // mediaStream.getTracks().forEach(track => pc.addTrack(track, mediaStream));

  pc.ontrack = e => {
    e.streams[0].getTracks().forEach(track => mediaStream.addTrack(track));
  };

  if (ref.current) ref.current.srcObject = mediaStream;

  createOffer();

  pc.onicecandidate = e => {
    if (e.candidate) addOffer(e.candidate.toJSON());
  };

  const dispatch = useDispatch();

  styles.dynamic = className;

  return (
    <Component id="Video">
      <div className={`${styles.static} ${styles.dynamic}`}>
        <video playsInline muted autoPlay ref={ref} className="h-full w-full object-cover object-center rounded -scale-x-100"></video>
        <div className="absolute inset-0 flex justify-start items-end">
          <div className={`w-full p-2 flex justify-between items-center rounded-b ${true ? styles.conditional.active : styles.conditional.inactive}`}>
            <FontAwesomeIcon icon={faMicrophone} className="text-xs text-inherit" />
            <span className="text-xs text-inherit">Username</span>
            <FontAwesomeIcon icon={faVideoCamera} className="text-xs text-inherit" />
          </div>
        </div>
      </div>
    </Component>
  );
}
