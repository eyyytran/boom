import React from "react";
import { createRoom, updateRoom, roomId } from "../server/firebase";
import { Link } from "react-router-dom";
import Component from "../components/Component";
import Titlebar from "../components/Titlebar";

type Props = {};

type Styles = {
  static: string;
};

const styles = {} as Styles;

styles.static = "fixed inset-0 bg-neutral-200";

export default function Dashboard({}: Props) {
  return (
    <Component id="Dashboard">
      <div className="flex flex-col justify-start h-full">
        <Titlebar className="shrink-0" />
        <img
          // src={require("../images/Boom.png")}
          style={{ height: "250px", width: "250px" }}
        />
        <button
          className="w-full text-white bg-indigo-500 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
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
        <button className="w-full text-white bg-indigo-500 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
          Join a Game
        </button>
      </div>
    </Component>
  );
}
