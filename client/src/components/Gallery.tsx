import React, { forwardRef, MutableRefObject, ReactElement, useEffect, useRef, useState } from "react";

import videoSlice from "../store/videoSlice";

import { useSelector } from "react-redux";
import { RootState } from "../store";
import { useDispatch } from "react-redux";

import Component from "./Component";
import Video from "./Video";
import Container from "../layout/Container";

import { config, useClient, useMicrophoneAndCameraTracks } from "../server/agora";
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

styles.static = "shrink-0 w-full h-full p-2 md:p-3 lg:p-4";

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

  // const url = window.location.pathname.split("/").pop();

  // console.log(window.location.href !== "http://localhost:3000/boom/" + game.state.roomId);

  useEffect(() => {
    const init = async () => {
      if (!roomId) return;

      try {
        await client.join(config.appId, roomId, null, user.state.userName);
      } catch (error) {
        console.log("error");
      }

      if (tracks) {
        await client.publish([tracks[0], tracks[1]]);
      }
    };

    if (ready && tracks) {
      try {
        init();

        client.on("user-published", async (user, mediaType) => {
          alert(`user-publish ${user.uid}`);
          await client.subscribe(user, mediaType);
          if (mediaType === "video") {
            dispatch(video.actions.addUser(user));
          }
          if (mediaType === "audio") {
            if (user.audioTrack) user.audioTrack.play();
          }
        });

        client.on("user-unpublished", (user, mediaType) => {
          alert(`user-unpublish ${user.uid}`);
          if (mediaType === "audio") {
            if (user.audioTrack) user.audioTrack.stop();
          }
          if (mediaType === "video") {
            if (user.videoTrack) user.videoTrack.stop();
          }
        });

        client.on("user-left", user => {
          alert(`user-left ${user.uid}`);
          dispatch(video.actions.removeUser(user));
        });
      } catch (error) {
        console.log(error);
      }
    }
  }, [roomId, client, ready, tracks]);

  useEffect(() => {
    const unpublish = async () => {
      await client.unpublish();
      await client.leave();
      dispatch(video.actions.removeUser(user));
      alert("Client Unpublished");
    };
    return () => {
      try {
        unpublish();
      } catch (error) {
        console.log(error);
      }
    };
  }, []);

  styles.dynamic = className;

  return (
    <Component id="Gallery">
      <div ref={galleryRef} className={`${styles.static} ${styles.dynamic}`}>
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 justify-center items-center h-full gap-2 md:gap-3 lg:gap-4 border border-red-500">
            {tracks && (
              <div className="contents">
                <Video tracks={tracks} active={true} username={user.state.userName} />
                {video.state.users?.length > 0 &&
                  video.state.users.map(user => {
                    if (user.videoTrack) {
                      return <Video tracks={[user.audioTrack, user.videoTrack]} username={user.uid} key={user.uid} active={false} />;
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
