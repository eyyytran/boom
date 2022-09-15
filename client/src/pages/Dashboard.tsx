import React from "react";
import { createRoom, updateRoom, roomId } from "../server/firebase";
import { Link } from "react-router-dom";

type Props = {};

export default function Dashboard({}: Props) {
  return (
    <div>
      <button
        onClick={async () => {
          if (!roomId) {
            await createRoom();
            //@ts-ignore
            // window.location.href = room;
          } else {
            await updateRoom();
            //@ts-ignore
            // window.location.href = room;
          }
        }}
      >
        Start a Game
      </button>
    </div>
  );
}
