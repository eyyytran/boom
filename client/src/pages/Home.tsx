import React from "react";
import Component from "../components/Component";
import Titlebar from "../components/Titlebar";
import { Link } from "react-router-dom";

// import {
//   faRightToBracket,
//   faMessage,
//   faPenToSquare,
//   faTableCellsLarge,
//   faVideo,
//   faCog,
//   faBars,
// } from "@fortawesome/free-solid-svg-icons";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

type Props = {};

export default function Home({}: Props) {
  return (
    <Component id="Home">
      <div>
        <Titlebar className="shrink-0" />
        {/* <button className="py-2 px-4">
          <FontAwesomeIcon icon={faBars} className="" />
        </button> */}
        <div className="flex flex-col justify-center items-center h-full">
          <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl ">
            Welcome to Boom!
          </h1>
          <h3 className="text-center leading-tight tracking-tight text-gray-900 md:text-xl mt-10">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. At sunt
            consequatur nisi consequuntur, necessitatibus a, et ratione
            laudantium fugiat sequi dicta sapiente! Recusandae, saepe? Qui quod
            labore quia nihil maxime?
          </h3>
          <div
            className="flex flex-col items-center justify-flex-start px-6 py-8 mx-auto md:h-auto lg:py-0
            mt-10"
          >
            <div className="flex flex-col items-center w-full p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className=" w-full text-xl text-center font-bold leading-tight tracking-tight text-gray-900 md:text-2xl ">
                Create an Account
              </h1>
              <Link
                to="/signup"
                type="submit"
                className="w-full text-white bg-violet-500 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
              >
                Sign Up for Free!
              </Link>
            </div>
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-900">
              Or
            </label>
            <div className="flex flex-col items-center w-full p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="w-full text-xl text-center font-bold leading-tight tracking-tight text-gray-900 md:text-2xl ">
                Existing Account
              </h1>
              <Link
                to="/login"
                type="submit"
                className="w-full text-white bg-violet-500 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
              >
                Welcome Back!
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Component>
  );
}
