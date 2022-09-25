import React, {
  forwardRef,
  MutableRefObject,
  ReactElement,
  useEffect,
  useRef,
  useState,
} from "react";

import { useLocation } from "react-router-dom";

import videoSlice from "../store/videoSlice";

import { useSelector } from "react-redux";
import { RootState } from "../store";
import { useDispatch } from "react-redux";

import Component from "./Component";
import Video from "./Video";
import Container from "../layout/Container";

import {
  config,
  useClient,
  useMicrophoneAndCameraTracks,
} from "../server/agora";
import gameSlice from "../store/gameSlice";
import userSlice from "../store/userSlice";

import { v4 as uuid } from "uuid";

type Props = {
  galleryRef: any;
  className?: string;
};

type Styles = {
  static: string;
  dynamic?: string;
};

const styles = {} as Styles;

styles.static =
  "w-full lg:col-start-1 lg:col-span-full lg:row-start-2 lg:row-span-1 h-full p-2 md:p-3 lg:p-4 border-4 border-yellow-700";

export default function Gallery({ galleryRef, className = "" }: Props) {
  const user = {
    state: useSelector((state: RootState) => state.user),
    actions: userSlice.actions,
  };

  const video = {
    state: useSelector((state: RootState) => state.video),
    actions: videoSlice.actions,
  };

  const game = {
    state: useSelector((state: RootState) => state.game),
    actions: gameSlice.actions,
  };

  const client = useClient();

  const { ready, tracks } = useMicrophoneAndCameraTracks();

  const dispatch = useDispatch();

  const urlparams = new URLSearchParams(window.location.search);
  const roomId: any = urlparams.get("id");

  const videoStateUsersRef = useRef<any>([]);

  useEffect(() => {
    videoStateUsersRef.current = video.state.users;
  }, [video.state.users]);

  useEffect(() => {
    console.log("ready", ready);
    if (video.state.start) return;
    if (!roomId || !ready) return;

    const init = async () => {
      client.on("connection-state-change", async (curState, revState) => {
        console.log("HERE", "CONNECTION-STATE-CHANGE");
        if (curState === "CONNECTED") {
          client.on("user-published", async (user, mediaType) => {
            await client.subscribe(user, mediaType);
            user.audioTrack && user.audioTrack.play();
            if (mediaType === "video")
              try {
                videoStateUsersRef.current.forEach((stream: any) => {
                  if (stream.uid === user.uid)
                    throw new Error("duplicate user");
                });
                dispatch(video.actions.addUser(user));
                const publishSound = new Audio("/sounds/open-aim.mp3");
                publishSound.play();
              } catch (error) {
                console.log("HERE", error);
              }
            console.log("HERE", `${user.uid} PUBLISHED`);
          });

          client.on("stream-unpublished", (user: any, mediaType: any) => {
            user.audioTrack && user.audioTrack.stop();
            if (mediaType === "video")
              user.videoTrack && user.videoTrack.stop();
            console.log("HERE", "STREAM-PUBLISHED");
          });

          client.on("stream-removed", (user: any, mediaType: any) => {
            user.audioTrack && user.audioTrack.stop();
            if (mediaType === "video")
              user.videoTrack && user.videoTrack.stop();
            console.log("HERE", "STREAM-REMOVED");
          });

          client.on("user-unpublished", (user, mediaType) => {
            user.audioTrack && user.audioTrack.stop();
            if (mediaType === "video")
              user.videoTrack && user.videoTrack.stop();

            if (mediaType === "video") dispatch(video.actions.removeUser(user));
            console.log("HERE", `${user.uid} UNPUBLISHED`);
          });
        }
        console.log("HERE CUR STATE ", curState);
        if (curState === "DISCONNECTED") {
          client.on("user-left", (user) => {
            dispatch(video.actions.removeUser(user));
            console.log("HERE", `${user.uid} LEFT`);
            const unpublishSound = new Audio("/sounds/exit-aim.mp3");
            unpublishSound.play();
          });
        }
      });

      await client.join(config.appId, roomId, null, user.state.userName);
      tracks && (await client.publish(tracks));
    };

    init();
  }, [ready, client]);

  const location = useLocation();

  useEffect(() => {
    return () => {
      dispatch(video.actions.setUsers([]));
      try {
        tracks && tracks.forEach((track) => track.close());
        client.leave().then(() => {
          client.removeAllListeners();
        });
        window.location.reload();
      } catch (error) {
        console.log(error);
      }
    };
  }, [location]);

  styles.dynamic = className;

  return (
    <Component id="Gallery">
      <div ref={galleryRef} className={`${styles.static} ${styles.dynamic}`}>
        <Container>
          <div
            className={`flex portrait:flex-col lg:portrait:flex-row justify-center items-center w-full h-full gap-2 md:gap-3 lg:gap-4 border-4 border-black`}
          >
            {tracks && (
              <div className="contents">
                <Video
                  tracks={tracks}
                  active={true}
                  username={user.state.userName}
                />
                {video.state.users &&
                  video.state.users.map((user) => (
                    <Video
                      tracks={[user.audioTrack, user.videoTrack]}
                      username={user.uid}
                      key={user.uid}
                      active={false}
                    />
                  ))}
              </div>
            )}
          </div>
        </Container>
      </div>
    </Component>
  );
}
