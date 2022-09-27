import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { config, useClient, useMicrophoneAndCameraTracks } from "../server/agora";
import { RootState } from "../store";
import Video from "./Video";

import Component from "./Component";
import Container from "../layout/Container";

import videoSlice from "../store/videoSlice";
import gameSlice from "../store/gameSlice";
import userSlice from "../store/userSlice";

type Props = {
  galleryRef: any;
  className?: string;
};

type Styles = {
  static: string;
  dynamic?: string;
};

const styles = {} as Styles;

styles.static = "w-full lg:col-start-1 lg:col-span-full lg:row-start-2 lg:row-span-1 h-full p-2 md:p-3 lg:p-4 bg-neutral-300 rounded";

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
                  if (stream.uid === user.uid) throw new Error("duplicate user");
                });
                dispatch(video.actions.addUser(user));
                const publishSound = new Audio("/sounds/publish.mp3");
                publishSound.volume = 0.1;
                publishSound.play();
              } catch (error) {
                console.log("HERE", error);
              }
            console.log("HERE", `${user.uid} PUBLISHED`);
          });

          client.on("stream-unpublished", (user: any, mediaType: any) => {
            user.audioTrack && user.audioTrack.stop();
            if (mediaType === "video") user.videoTrack && user.videoTrack.stop();
            console.log("HERE", "STREAM-PUBLISHED");
          });

          client.on("stream-removed", (user: any, mediaType: any) => {
            user.audioTrack && user.audioTrack.stop();
            if (mediaType === "video") user.videoTrack && user.videoTrack.stop();
            console.log("HERE", "STREAM-REMOVED");
          });

          client.on("user-unpublished", (user, mediaType) => {
            user.audioTrack && user.audioTrack.stop();
            if (mediaType === "video") {
              user.videoTrack && user.videoTrack.stop();
              const unpublishSound = new Audio("/sounds/unpublish.mp3");
              unpublishSound.volume = 0.1;
              unpublishSound.play();
              dispatch(video.actions.removeUser(user));
            }
            console.log("HERE", `${user.uid} UNPUBLISHED`);
          });
        }
        if (curState === "DISCONNECTED") {
          client.on("user-left", user => {
            dispatch(video.actions.removeUser(user));
            console.log("HERE", `${user.uid} LEFT`);
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

      tracks && tracks.forEach(track => track.close());
      client.leave().then(() => {
        client.removeAllListeners();
      });
      window.location.reload();
    };
  }, [location]);

  const handlePoints = (uid: any) => {
    const player = game.state.players.find(player => player.player === uid);
    if (!player) return;
    return player.points;
  };

  styles.dynamic = className;

  return (
    <Component id="Gallery">
      <div ref={galleryRef} className={`${styles.static} ${styles.dynamic}`}>
        <Container>
          <div className={`flex flex-col xl:flex-row 6xl:flex-col justify-center items-center h-full gap-2 md:gap-3 lg:gap-4`}>
            {tracks && (
              <div className="contents">
                <Video tracks={tracks} active={true} username={user.state.userName} points={game.state.playerPoints} />
                {video.state.users &&
                  video.state.users.map(user => {
                    const points = handlePoints(user.uid);
                    return <Video tracks={[user.audioTrack, user.videoTrack]} username={user.uid} key={user.uid} points={points} active={false} />;
                  })}
              </div>
            )}
          </div>
        </Container>
      </div>
    </Component>
  );
}
