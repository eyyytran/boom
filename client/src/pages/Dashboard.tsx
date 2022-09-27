import React from "react";
import Component from "../components/Component";
import Titlebar from "../components/Titlebar";
import { Link, Outlet } from "react-router-dom";
import {
  faGear,
  faUserGroup,
  faRightToBracket,
  faPlusSquare,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import userSlice from "../store/userSlice";
import { auth } from "../server/firebase";

type Props = {};

const Dashboard = (props: Props) => {
  const user = {
    state: useSelector((state: RootState) => state.user),
    action: userSlice.actions,
  };

  const userName = user.state.userName;

  const navigate = useNavigate();

  const handleSignout = (e: React.SyntheticEvent) => {
    e.preventDefault();
    auth.signOut();
    navigate("/");
  };

  return (
    <Component id="Dashboard">
      <div className="w-full h-full flex flex-col fixed inset-0">
        <Titlebar className="shrink-0" />
        <div
          id="view"
          className="h-full w-full overflow-hidden flex flex-row"
          x-data="{ sidenav: true }"
        >
          <div
            id="sidebar"
            className="bg-white h-full md:block shadow-xl px-3 w-max md:w-60 lg:w-60 overflow-x-hidden transition-transform duration-300 ease-in-out"
            x-show="sidenav"
          >
            <div className="space-y-6 md:space-y-10 mt-10">
              <h1 className="font-bold text-3xl md:text-3xl text-center text-violet-500">
                Boom
              </h1>

              <img
                src={user.state.image || require("../images/defaultImg.jpeg")}
                alt="gray circle"
                className="w-16 h-16 md:w-36 md:h-36 object-cover rounded-full mx-auto"
              />
              <div>
                <h2 className="md:block font-medium text-lg md:text-lg text-center text-violet-500">
                  Hello {userName}!
                </h2>
              </div>

              <div
                id="menu"
                className="flex flex-col items-center space-y-2 w-max md:w-full md:items-start"
              >
                <Link
                  to="new"
                  className="group text-sm w-full font-medium text-gray-700 py-2 px-2 hover:bg-violet-500 hover:text-white hover:scale-105 rounded-md transition duration-150 ease-in-out"
                >
                  <FontAwesomeIcon
                    icon={faPlusSquare}
                    className="h-5 w-5 fill-current text-gray-600 group-hover:text-violet-500 group-hover:text-white"
                  />
                  <span className="hidden md:!inline ml-5">Start New Game</span>
                </Link>
                <Link
                  to="join"
                  className="group w-full text-sm font-medium text-gray-700 py-2 px-2 hover:bg-violet-500 hover:text-white hover:scale-105 rounded-md transition duration-150 ease-in-out"
                >
                  <FontAwesomeIcon
                    icon={faUserGroup}
                    className="h-5 w-5 fill-current text-gray-600 group-hover:text-violet-500 group-hover:text-white"
                  />
                  <span className="hidden md:!inline ml-5">Join a Game</span>
                </Link>
                <Link
                  to="settings"
                  className="group w-full text-sm font-medium text-gray-700 py-2 px-2 hover:bg-violet-500 hover:text-white hover:scale-105 rounded-md transition duration-150 ease-in-out"
                >
                  <FontAwesomeIcon
                    icon={faGear}
                    className="h-5 w-5 fill-current text-gray-600 group-hover:text-violet-500 group-hover:text-white"
                    fill="currentColor"
                  />
                  <span className="hidden md:!inline ml-5">Settings</span>
                </Link>
                <button
                  className="group w-full text-sm text-left font-medium text-gray-700 py-2 px-2 hover:bg-violet-500 hover:text-white hover:scale-105 rounded-md transition duration-150 ease-in-out"
                  onClick={handleSignout}
                >
                  <FontAwesomeIcon
                    icon={faRightToBracket}
                    className="h-5 w-5 fill-current text-gray-600 group-hover:text-violet-500 group-hover:text-white"
                  />
                  <h1 className="hidden md:!inline ml-5">Log Out</h1>
                </button>
              </div>
            </div>
          </div>
          <div className="flex flex-col items-center grow overflow-scroll">
            <Outlet />
          </div>
        </div>
      </div>
    </Component>
  );
};

export default Dashboard;
