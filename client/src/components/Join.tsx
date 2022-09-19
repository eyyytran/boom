import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Component from "./Component";

type Props = {};

const Join = (props: Props) => {
  const [gameCode, setGameCode] = useState<string>("");
  const navigate = useNavigate();
  const joinGame = (e: React.SyntheticEvent) => {
    e.preventDefault();
    console.log(gameCode);
    navigate(`/boom/?id=${gameCode}`);
  };

  return (
    <Component id="NewGame">
      <div className="flex flex-col items-center h-full w-full">
        <div className="flex flex-col items-center m-16">
          <h1 className="text-xl text-center font-bold text-gray-900">
            Join A Game
          </h1>
          <form onSubmit={joinGame}>
            <input
              type="text"
              name="gameCode"
              id="gameCode"
              placeholder="Enter Your Game Code"
              className="w-full bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 mt-5"
              required={true}
              value={gameCode}
              onChange={(e) => {
                setGameCode(e.target.value);
              }}
            />
            <button
              className="w-full text-white bg-violet-500 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mt-5"
              type="submit"
            >
              Join
            </button>
          </form>
        </div>
      </div>
    </Component>
  );
};

export default Join;
