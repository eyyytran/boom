import React, { forwardRef, MutableRefObject, ReactElement, useEffect, useRef } from "react";

import firepadRef, { db, userName } from "../server/firebase";

import videoSlice from "../store/videoSlice";

import { useSelector } from "react-redux";
import { RootState } from "../store";
import { useDispatch } from "react-redux";

import Component from "./Component";
import Video from "./Video";
import Container from "../layout/Container";

import { channelName, config, useClient, useMicrophoneAndCameraTracks } from "../server/agora";

type Props = {
  galleryRef: any;
  className?: string;
};

type Styles = {
  static: string;
  dynamic?: string;
};

const styles = {} as Styles;

styles.static = "shrink-0 w-full h-full p-2 md:p-3 lg:p-4";

export default function Gallery({ galleryRef, className = "" }: Props) {
  const video = {
    state: useSelector((state: RootState) => state.video),
    actions: videoSlice.actions,
  };

  const client = useClient();
  const { ready, tracks } = useMicrophoneAndCameraTracks();

  const dispatch = useDispatch();

  const microphoneButtonRef = useRef<HTMLDivElement>(null);
  const cameraButtonRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!microphoneButtonRef.current) return;
    microphoneButtonRef.current.onclick = () => {
      alert("microphoneButtonRef");
    };
  }, []);

  useEffect(() => {
    if (!cameraButtonRef.current) return;
    cameraButtonRef.current.onclick = () => {
      alert("cameraButtonRef");
    };
  }, []);

  useEffect(() => {
    let init = async (name: string) => {
      client.on("user-published", async (user, mediaType) => {
        await client.subscribe(user, mediaType);
        if (mediaType === "video") {
          dispatch(video.actions.setUsers(user));
        }
        if (mediaType === "audio") {
          if (user.audioTrack) user.audioTrack.play();
        }
      });

      client.on("user-unpublished", (user, mediaType) => {
        if (mediaType === "audio") {
          if (user.audioTrack) user.audioTrack.stop();
        }
        if (mediaType === "video") {
          dispatch(video.actions.setUsers(video.state.users.filter(User => User.uid !== user.uid)));
        }
      });

      client.on("user-left", user => {
        dispatch(video.actions.setUsers(video.state.users.filter(User => User.uid !== user.uid)));
      });

      try {
        await client.join(config.appId, name, config.token, null);
      } catch (error) {
        console.log("error");
      }

      if (tracks) await client.publish([tracks[0], tracks[1]]);
      dispatch(video.actions.setStart(true));
    };

    if (ready && tracks) {
      try {
        init(channelName);
      } catch (error) {
        console.log(error);
      }
    }
  }, [channelName, client, ready, tracks]);

  styles.dynamic = className;

  return (
    <Component id="Gallery">
      <div ref={galleryRef} className={`${styles.static} ${styles.dynamic}`}>
        <Container>
          <div className="flex portrait:flex-col justify-center items-center h-full gap-2 md:gap-3 lg:gap-4">
            {video.state.start && tracks && (
              <div className="contents">
                <Video videoTrack={tracks[1]} active={true} microphoneButtonRef={microphoneButtonRef} cameraButtonRef={cameraButtonRef} />
                {video.state.users?.length > 0 &&
                  video.state.users.map(user => {
                    if (user.videoTrack) {
                      return <Video videoTrack={user.videoTrack} key={user.uid} active={false} microphoneButtonRef={microphoneButtonRef} cameraButtonRef={cameraButtonRef} />;
                    } else return null;
                  })}
              </div>
            )}
          </div>
        </Container>
      </div>
    </Component>
  );
}
