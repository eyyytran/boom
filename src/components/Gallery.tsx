import React, { MutableRefObject, ReactElement, useEffect, useRef } from "react";

import subscriberSlice from "../store/subscriberSlice";

import { pc } from "../firebase/pc";
import { addUser } from "../firebase/user";
import { createOffer } from "../firebase/offer";

import { useSelector } from "react-redux";
import { RootState } from "../store";
import { useDispatch } from "react-redux";

import Component from "./Component";
import Video from "./Video";
import Container from "../layout/Container";

type Props = {
  className?: string;
};

type Styles = {
  static: string;
  dynamic?: string;
};

const getUserMedia = async () => await navigator.mediaDevices.getUserMedia({ audio: true, video: true });

const styles = {} as Styles;

styles.static = "shrink-0 w-full h-full p-2 md:p-3 lg:p-4";

export default function Gallery({ className = "" }: Props) {
  const subscriber = {
    state: useSelector((state: RootState) => state.subscriber),
    actions: subscriberSlice.actions,
  };

  const dispatch = useDispatch();

  useEffect(() => {}, []);

  styles.dynamic = className;

  return (
    <Component id="Gallery">
      <div className={`${styles.static} ${styles.dynamic}`}>
        <Container>
          <div className="flex portrait:flex-col justify-center items-center h-full gap-2 md:gap-3 lg:gap-4">
            <Video srcObject={"srcObject"} />
          </div>
        </Container>
      </div>
    </Component>
  );
}
